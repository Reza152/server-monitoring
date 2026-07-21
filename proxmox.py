import os
import requests
from dotenv import load_dotenv

load_dotenv()

HOST = os.getenv("PROXMOX_HOST")
TOKEN_ID = os.getenv("PROXMOX_TOKEN_ID")
TOKEN_SECRET = os.getenv("PROXMOX_TOKEN_SECRET")

headers = {
    "Authorization": f"PVEAPIToken={TOKEN_ID}={TOKEN_SECRET}"
}

def test_connection():
    url = f"{HOST}/api2/json/version"

    response = requests.get(url, headers=headers, verify=False)

    return response.json()

def get_status():
    url = f"{HOST}/api2/json/nodes"

    response = requests.get(url, headers=headers, verify=False)

    data = response.json()["data"][0]
    cpu = round(data["cpu"] * 100, 2)
    memory = round((data["mem"] / data["maxmem"]) * 100, 2)
    disk = round((data["disk"] / data["maxdisk"]) * 100, 2)

    return {"hostname": data["node"],"cpu": cpu,"memory": memory,"disk": disk,"status": data["status"],"uptime": data["uptime"]}