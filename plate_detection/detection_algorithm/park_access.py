import pygame
import pika
import time
from threading import Thread

class ParkAccess:

    def __init__(self, queue_name):
        pygame.init()
        pygame.display.set_caption('Parking lot')
        self.red = (255, 0, 0)
        self.green = (0,128,0)
        self.white = (255, 255, 255)
        self.black = (0, 0, 0)
        self.display_width = 250
        self.display_height = 125
        self.display = pygame.display.set_mode((self.display_width, self.display_height))
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        self.channel = self.connection.channel()
        self.msg = None
        self.queue_name = queue_name

    
    def circle(self, pos_x, pos_y, color):
        position = (pos_x, pos_y)
        pygame.draw.circle(self.display, color, position, 20)


    def consume(self):
        self.channel.queue_declare(queue=self.queue_name)
        self.channel.basic_consume(self.queue_name, self.receive, auto_ack=True) 
        self.channel.start_consuming()


    def receive(self, ch, method, properties, body):
        self.msg = body.decode("utf-8")
    
    def loop(self):
        thread = Thread(target=self.consume)
        thread.start()
        running = True

        while running:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    thread.join()
                    running = False

            self.display.fill(self.black)
            self.circle(75, int(self.display_height/2), self.white)
            self.circle(175, int(self.display_height/2), self.white)

            if self.msg == 'allowed':
                self.circle(75, int(self.display_height/2), self.green)
            elif self.msg == 'denied':
                self.circle(175, int(self.display_height/2), self.red)

            pygame.display.update()
            if self.msg == 'allowed' or self.msg == 'denied':
                time.sleep(3)
                self.msg = None

            pygame.time.Clock().tick(15)