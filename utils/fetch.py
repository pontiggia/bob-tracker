import json
from curl_cffi import requests

def fetch():
    try:
        r = requests.get("https://ws.duelbits.com/user/bets/live", impersonate="chrome110")
        data = r.json()
        print(json.dumps(data))  # Escribir la salida como JSON en la salida estándar
    except Exception as e:
        print(json.dumps({"error": str(e)}))  # Manejo de errores y escritura de errores a la salida estándar

fetch()