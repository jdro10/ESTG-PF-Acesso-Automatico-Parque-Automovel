# https://github.com/openalpr/openalpr/wiki/Integrating-OpenALPR

from openalpr import Alpr
import sys
import time
import json

alpr = Alpr("eu", "/etc/openalpr/openalpr.conf", "/usr/share/openalpr/runtime_data")

if not alpr.is_loaded():
    print("Error loading OpenALPR")
    sys.exit(1)
    
alpr.set_top_n(5)

results = alpr.recognize_file("lp.jpg")

detected_plates_dict = {}

for plate in results["results"]:
    for candidate in plate['candidates']:
        detected_plates_dict[candidate['plate']] = candidate['confidence']

detection_results = {
    "Data":  time.ctime(float(str(results["epoch_time"])[:10])),
    "Tempo processamento": results["processing_time_ms"],
    "Resultados": detected_plates_dict
}

results_json = json.dumps(detection_results)

print(json.dumps(json.loads(results_json), indent=2, sort_keys=True))

alpr.unload()