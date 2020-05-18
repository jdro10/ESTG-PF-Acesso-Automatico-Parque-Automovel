from http.server import BaseHTTPRequestHandler,HTTPServer
import cv2

PORT_NUMBER = 8000

#capture image from webcam 0
cap = cv2.VideoCapture(0)

class CamHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            self.send_response(200)
            self.send_header('Content-type', 'multipart/x-mixed-replace; boundary=--jpgboundary')
            self.end_headers()

            while True:
                ret, frame = cap.read()
                ret2, jpeg = cv2.imencode('.jpeg', frame)
            
                self.wfile.write("--jpgboundary".encode())
                self.send_header('Content-type', 'image/jpeg')
                self.send_header('Content-length', str(len(jpeg)))
                self.end_headers()
                self.wfile.write(bytearray(jpeg))
        except ConnectionResetError:
            print("Conexão terminada.")
            

try:
    serverEntry = HTTPServer(('localhost', PORT_NUMBER), CamHandler)
    print('Entry capture started httpserver on port', PORT_NUMBER)
    serverEntry.serve_forever()
except KeyboardInterrupt:
    cap.release()
    serverEntry.server_close()