from entry_plate_detection import EntryPlateDetection
from exit_plate_detection import ExitPlateDetection

def main():
    entry = EntryPlateDetection()
    entry.read_stream()

    #exit = ExitPlateDetection()
    #exit.read_stream()

if __name__ == "__main__":
    main()