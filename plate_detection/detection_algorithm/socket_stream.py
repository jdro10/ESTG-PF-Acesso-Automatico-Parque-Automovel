import os
import cv2
import socket

class VideoCapture():

    def __init__(self, host, port):
        self.HOST = host
        self.PORT = port
        self.capture = cv2.VideoCapture(0)
        self.socket = socket.socket.(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.bind((self.HOST, self.PORT))
        self.socket.listen()
        self.listen = True
        self.stream = True

    
    def send_jpeg_bytes(self):
        try:
            while self.listen:
                print("A espera de uma conexão...")
                (connection, address) = self.socket.accept()

                try:
                    if connection:
                        print("Conexão: ", address)

                        while self.stream:
                            ret, frame = self.capture.read()
                            jpeg = cv2.imencode('.jpeg', frame)[1]

                            connection.send(jpeg.tobytes())

                except (ConnectionResetError, BrokenPipeError) as e:
                    print('Conexão terminada.')

        except KeyboardInterrupt:
            print("Captura de imagens terminada.")
            os._exit(0)