import subprocess
import sys
import json

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

# Descargar get-pip.py y ejecutar
def setup_pip():
    import urllib.request
    url = "https://bootstrap.pypa.io/get-pip.py"
    urllib.request.urlretrieve(url, "get-pip.py")
    subprocess.check_call([sys.executable, "get-pip.py"])

try:
    import pip
except ImportError:
    setup_pip()
    install("curl-cffi")

from curl_cffi import requests

def fetch():
    try:
        r = requests.get("https://ws.duelbits.com/user/bets/live", impersonate="chrome110")
        data = r.json()
        print(json.dumps(data))  # Escribir la salida como JSON en la salida estándar
    except Exception as e:
        print(json.dumps({"error": str(e)}))  # Manejo de errores y escritura de errores a la salida estándar

fetch()
