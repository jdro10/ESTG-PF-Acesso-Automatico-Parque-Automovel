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
        choice = '-1'

        while choice != '0':
            print("DETEÇÃO DE MATRÍCULAS")
            print("1 - Deteção de matrículas na entrada")
            print("2 - Deteção de matrículas na saída")
            print("0 - Sair")
            print("Introduza a sua escolha (1/2): ")
            choice = input()

            if choice == '1':
                try:
                    self.entry_park_lights = ParkAccess("entry_queue_p")
                    self.entry_plate_detection = PlateDetection("entry_queue", '192.168.1.120', 9000)
                    
                    Thread(target=self.entry_plate_detection.read_stream).start()
                    Thread(target=self.entry_park_lights.loop).start()

                except AlprException as e:
                    print(e)

            elif choice == '2':
                try:
                    self.exit_park_lights = ParkAccess("exit_queue_p")
                    self.exit_plate_detection = PlateDetection("exit_queue", '192.168.1.120', 9001)

                    Thread(target=self.exit_plate_detection.read_stream).start()
                    Thread(target=self.exit_park_lights.loop).start()
                    
                except AlprException as e:
                    print(e)

            elif choice == '0':
                print("saiu")
                
            else:
                print("Escolha inválida, tente novamente.")



if __name__ == "__main__":
    menu = Menu()
    menu.menu()