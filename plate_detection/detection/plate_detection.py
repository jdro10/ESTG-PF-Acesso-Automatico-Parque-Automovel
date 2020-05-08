import re
import sys
import json
import pika
import datetime
import numpy as np
from openalpr import Alpr
from threading import Thread


class PlateDetection:

    def __init__(self):
        self.alpr = Alpr('eu', '/etc/openalpr/openalpr.conf', '/usr/share/openalpr/runtime_data')
        self.old_portuguese_plate_pattern = re.compile(r'[A-Z]{2}[0-9]{2}[0-9]{2}$|[0-9]{2}[A-Z]{2}[0-9]{2}$|[0-9]{2}[0-9]{2}[A-Z]{2}$')
        self.new_portuguese_plate_pattern = re.compile(r'[A-Z]{2}[0-9]{2}[A-Z]{2}$')
        self.plate_list = []
        self.recognized_plates = []
        self.last_plate = None
        self.queue_name = None


    def read_plate(self, frame):
        if not self.alpr.is_loaded():
            print('Error loading openalpr')
            sys.exit(1)
        
        self.alpr.set_top_n(1)

        results = self.alpr.recognize_ndarray(frame)

        if results['results'] != []:
            Thread(target=self.get_plate_as_text, args=(results,)).start()


    def get_plate_as_text(self, results):
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
                self.final_json()


    def final_json(self):
        current_time = str(datetime.datetime.now())

        car_info = {
            "time": current_time,
            "detected_plates": self.plate_list[0]
        }

        car_info_json = json.dumps(car_info)

        print(car_info_json)

        self.send_json_to_server(car_info_json, self.queue_name)

        self.last_plate = self.plate_list[0]
        self.plate_list = []


    def equal_elements(self, items):
        return all(plate == items[0] for plate in items)

    
    def send_json_to_server(self, json, queue_name):  
        connection = pika.BlockingConnection(
        pika.ConnectionParameters(host='localhost'))
        channel = connection.channel()

        channel.queue_declare(queue=self.queue_name)

        channel.basic_publish(exchange='', routing_key='plates_queue', body=json)
        print("Plate sent to server... Queue:", queue_name)
        connection.close()

    def set_queue_name(self, queue_name):
        self.queue_name = queue_name