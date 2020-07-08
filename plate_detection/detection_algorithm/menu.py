import os
import sys
from threading import Thread
from park_access import ParkAccess
from alpr_exception import AlprException
from plate_detection import PlateDetection

class Menu:

    def __init__(self):
        self.entry_park_lights = None
        self.exit_park_lights = None
        self.entry_plate_detection = None
        self.exit_plate_detection = None


    def menu(self):
        try:
            print("DETEÇÃO DE MATRÍCULAS")
            print("1 - Deteção de matrículas na entrada")
            print("2 - Deteção de matrículas na saída")
            print("0 - Sair")
            print("Introduza a sua escolha (1/2/0): ")
            choice = input()

            if choice == '1':
                print("\nDeteção de matrículas iniciada na entrada.\n")
                try:
                    self.entry_park_lights = ParkAccess("entry_queue_p")
                    self.entry_plate_detection = PlateDetection("entry_queue", '192.168.1.65', 9000)
                        
                    thread1 = Thread(target=self.entry_plate_detection.read_stream)
                    thread2 = Thread(target=self.entry_park_lights.loop)

                    thread1.start()
                    thread2.start()

                except AlprException:
                    print("\nERRO: Verifique se o OpenALPR está corretamente instalado.\n")
                    print("Programa terminado.")
                    os._exit(0)

                except ConnectionRefusedError:
                    print("\nERRO: Verifique a ligação de rede com o computador responsável pela captura de imagens.\n")
                    print("Programa terminado.")
                    os._exit(0)

                except IOError as e:
                    if e.errno == 101:
                        print("\nERRO: Verifique a sua conexão à rede.\n")
                        print("Programa terminado.")
                        os._exit(0)

            elif choice == '2':
                try:
                    self.exit_park_lights = ParkAccess("exit_queue_p")
                    self.exit_plate_detection = PlateDetection("exit_queue", '192.168.1.120', 9001)

                    thread3 = Thread(target=self.exit_plate_detection.read_stream)
                    thread4 = Thread(target=self.exit_park_lights.loop)

                    thread3.start()
                    thread4.start()
                        
                except AlprException:
                    print("\nERRO: Verifique se o OpenALPR está corretamente instalado.\n")
                    print("Programa terminado.")
                    os._exit(0)

                except ConnectionRefusedError:
                    print("\nERRO: Verifique a ligação de rede com o computador responsável pela captura de imagens.\n")
                    print("Programa terminado.")
                    os._exit(0)

                except IOError as e:
                    if e.errno == 101:
                        print("\nERRO: Verifique a sua conexão à rede.\n")
                        print("Programa terminado.")
                        os._exit(0)

            elif choice == '0':                        
                print("Programa terminado.")   
                os._exit(0)

            else:
                print("Escolha inválida.")
                print("Programa terminado.")
                os._exit(0)

        except KeyboardInterrupt:
            print("Programa terminado.")
            os._exit(0)

        end_program = None
        print("Para terminar o programa, introduza um input.\n")

        try:
            end_program = input()

            if end_program != None:
                print("Programa terminado.")
                os._exit(0)
        except KeyboardInterrupt:
            print("Programa terminado.")
            os._exit(0)
        


if __name__ == "__main__":
    menu = Menu()
    menu.menu()