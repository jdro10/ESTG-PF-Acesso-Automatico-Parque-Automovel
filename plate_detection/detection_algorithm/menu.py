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
        self.thread_list = []


    def menu(self):
        choice = '-1'

        while choice != '0':
            try:
                print("DETEÇÃO DE MATRÍCULAS")
                print("1 - Deteção de matrículas na entrada")
                print("2 - Deteção de matrículas na saída")
                print("0 - Sair")
                print("Introduza a sua escolha (1/2/0): ")
                choice = input()

                if choice == '1':
                    try:
                        self.entry_park_lights = ParkAccess("entry_queue_p")
                        self.entry_plate_detection = PlateDetection("entry_queue", '192.168.1.120', 9000)
                        
                        thread1 = Thread(target=self.entry_plate_detection.read_stream)
                        thread2 = Thread(target=self.entry_park_lights.loop)

                        thread1.start()
                        thread2.start()

                        self.thread_list.append(thread1)
                        self.thread_list.append(thread2)

                    except AlprException:
                        print("\nERRO: Verifique se o OpenALPR está corretamente instalado.\n")

                    except ConnectionRefusedError:
                        print("\nERRO: Verifique a ligação de rede com o computador responsável pela captura de imagens.\n")

                elif choice == '2':
                    try:
                        self.exit_park_lights = ParkAccess("exit_queue_p")
                        self.exit_plate_detection = PlateDetection("exit_queue", '192.168.1.120', 9001)

                        thread3 = Thread(target=self.exit_plate_detection.read_stream)
                        thread4 = Thread(target=self.exit_park_lights.loop)

                        thread3.start()
                        thread4.start()

                        self.thread_list.append(thread3)
                        self.thread_list.append(thread4)
                        
                    except AlprException:
                        print("\nERRO: Verifique se o OpenALPR está corretamente instalado.\n")

                    except ConnectionRefusedError:
                        print("\nERRO: Verifique a ligação de rede com o computador responsável pela captura de imagens.\n")

                elif choice == '0':
                    if self.entry_plate_detection != None:
                        self.entry_park_lights.running = False
                        self.entry_plate_detection.close_program() 
                        self.entry_park_lights.close_program()  

                        for t in self.thread_list:
                            t.join()

                    elif self.exit_plate_detection != None:
                        self.exit_park_lights.running = False
                        self.exit_plate_detection.close_program()
                        self.exit_park_lights.close_program()

                        for t in self.thread_list:
                            t.join()

                    print("Programa terminado.")   
                    
                else:
                    print("Escolha inválida, tente novamente.")

            except KeyboardInterrupt:
                print("Programa terminado.")
                sys.exit(0)



if __name__ == "__main__":
    menu = Menu()
    menu.menu()