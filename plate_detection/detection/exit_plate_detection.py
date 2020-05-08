import cv2
import urllib.request
import numpy as np
from plate_detection import PlateDetection

class ExitPlateDetection(PlateDetection):

    def __init__(self):
        super(ExitPlateDetection, self).__init__()
        self.entry_stream_url = urllib.request.urlopen('http://192.168.1.120:8001')
        super().set_queue_name("exit_queue")

    
    def read_stream(self):
        jpeg_bytes = bytes()

        while True:
            delta = datetime.datetime.now() - self.current_time

            if delta.seconds >= 15:
                self.plate_list = []
                self.last_plate = None
                self.current_time = datetime.datetime.now()
                
            jpeg_bytes += self.entry_stream_url.read(1024)
            start_b = jpeg_bytes.find(b'\xff\xd8')
            end_b = jpeg_bytes.find(b'\xff\xd9')

            if start_b != -1 and end_b != -1:
                jpeg = jpeg_bytes[start_b:end_b+2]
                jpeg_bytes = jpeg_bytes[end_b+2:]
                frame = cv2.imdecode(np.fromstring(jpeg, dtype=np.uint8), cv2.IMREAD_COLOR)
                
                cv2.imshow('Webcam', frame)

                super().read_plate(frame)

                if cv2.waitKey(1) == 27:
                    exit(0)