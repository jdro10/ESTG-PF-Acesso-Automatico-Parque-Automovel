import re
import sys
import cv2
import json
import pika
import socket
import pygame
import datetime
import numpy as np
from openalpr import Alpr
from threading import Thread
from alpr_exception import AlprException

class PlateDetection:

    def __init__(self, queue_name, host, port):
        self.old_portuguese_plate_pattern = re.compile(r'[A-Z]{2}[0-9]{2}[0-9]{2}$|[0-9]{2}[A-Z]{2}[0-9]{2}$|[0-9]{2}[0-9]{2}[A-Z]{2}$')
        self.new_portuguese_plate_pattern = re.compile(r'[A-Z]{2}[0-9]{2}[A-Z]{2}$')
        self.plate_list = []
        self.recognized_plates = []
        self.last_plate = None
        self.queue_name = queue_name
        self.current_time = datetime.datetime.now()
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        self.channel = self.connection.channel()
        self.stream = True
        self.HOST = host
        self.PORT = port
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.connect((self.HOST, self.PORT))

    
    def read_stream(self):
        socket_bytes = bytes()

        while self.stream:
            delta = datetime.datetime.now() - self.current_time

            if delta.seconds >= 15:
                self.plate_list  = []
                self.last_plate = None
                self.current_time = datetime.datetime.now()

            socket_bytes += self.socket.recv(1024)

            jpeg_start_marker = socket_bytes.find(b'\xff\xd8')
            jpeg_end_marker = socket_bytes.find(b'\xff\xd9')

            if jpeg_end_marker != -1 and jpeg_end_marker != -1:
                full_jpeg_bytes = socket_bytes[jpeg_start_marker : jpeg_end_marker + 2]
                socket_bytes = socket_bytes[jpeg_end_marker + 2 : ]

                frame = cv2.imdecode(np.fromstring(full_jpeg_bytes, dtype=np.uint8), cv2.IMREAD_COLOR)
                cv2.imshow('Stream', frame)

                Thread(target=self.plate_detection, args=(frame, )).start()

                if cv2.waitKey(1) == 27:
                    self.stream = False
                    cv2.destroyAllWindows()      

    
    def plate_detection(self, frame):
        alpr = Alpr('eu', '/etc/openalpr/openalpr.conf', '/usr/share/openalpr/runtime_data')

        if not alpr.is_loaded():
            raise AlprException("Error loading openALPR")
             
        alpr.set_top_n(1)

        results = alpr.recognize_ndarray(frame)

        if results['results'] != []:
            self.plate_as_text(results)

    
    def plate_as_text(self, results):
        for plate in results['results']:
            for candidate in plate['candidates']:
                if self.old_portuguese_plate_pattern.match(candidate['plate']) or self.new_portuguese_plate_pattern.match(candidate['plate']):
                    self.plate_list.append(candidate['plate'])

        if not self.equal_elements(self.plate_list):
            self.plate_list = []

        found = False

        if len(self.plate_list) == 3 and self.equal_elements(self.plate_list):
            for plate in self.recognized_plates:
                if self.plate_list[0] == plate:
                    found = True

            if not found or not self.last_plate == self.plate_list[0]:       
                self.recognized_plates.append(self.plate_list[0])
                self.current_time = datetime.datetime.now()
                self.plate_info_json()

    
    def plate_info_json(self):
        current_time_info = str(datetime.datetime.now())
        date_time = current_time_info.split('.')[0]

        car_info = {
            "date": date_time,
            "plate": self.plate_list[0]
        }

        car_info_json = json.dumps(car_info)

        print(car_info_json)

        self.send_json_to_server(car_info_json, self.queue_name)

        self.last_plate = self.plate_list[0]
        self.plate_list = []

    
    def send_json_to_server(self, json, queue_name):  
        self.channel.queue_declare(queue=self.queue_name)
        self.channel.basic_publish(exchange='', routing_key=self.queue_name, body=json)

        print("Plate sent to queue:", queue_name)

    
    def equal_elements(self, items):
        return all(plate == items[0] for plate in items)

    
    def end_program(self):
        cv2.destroyAllWindows()
        cv2.waitKey(1)
        self.socket.close()
        self.stream = False