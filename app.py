from flask import Flask, jsonify
from flask_cors import CORS
from docker_monitor import get_docker_status
from flask import request
import subprocess
import psutil
import socket
import platform
import time
from proxmox import get_status

app = Flask(__name__)
CORS(app)
@app.route("/metrics")
def metrics():
    uptime_seconds = time.time() - psutil.boot_time()
    uptime_hours = int(uptime_seconds // 3600)

    data = {
        "hostname": socket.gethostname(),
        "ip": socket.gethostbyname(socket.gethostname()),
        "os": f"{platform.system()} {platform.release()}",
        "cpu": psutil.cpu_percent(interval=1),
        "memory": psutil.virtual_memory().percent,
        "disk": psutil.disk_usage("/").percent,
        "uptime_hours": uptime_hours,
        "status": "running"
    }

    return jsonify(data)

@app.route("/proxmox-metrics")
def proxmox_mertrics():
    return jsonify(get_status())


@app.route("/docker-metrics")
def docker_metrics():
    return jsonify(get_docker_status())



@app.route("/docker/start", methods=["POST"])
def start_container():

    data = request.get_json()

    container_name = data.get("name")

    if not container_name:

        return {

            "status": "error",

            "message": "Nama container wajib diisi"

        }, 400


    try:

        subprocess.run(

            [
                "docker",
                "start",
                container_name
            ],

            check=True,

            capture_output=True,

            text=True

        )


        return {

            "status": "success",

            "message":
                f"Container {container_name} berhasil di-start"

        }


    except subprocess.CalledProcessError as error:

        return {

            "status": "error",

            "message":
                error.stderr

        }, 500

@app.route("/docker/stop", methods=["POST"])
def stop_container():

    data = request.get_json()

    container_name = data.get("name")

    if not container_name:

        return {

            "status": "error",

            "message": "Nama container wajib diisi"

        }, 400


    try:

        subprocess.run(

            [

                "docker",

                "stop",

                container_name

            ],

            check=True,

            capture_output=True,

            text=True

        )


        return {

            "status": "success",

            "message":
                f"Container {container_name} berhasil di-stop"

        }


    except subprocess.CalledProcessError as error:

        return {

            "status": "error",

            "message":
                error.stderr

        }, 500

@app.route("/docker/restart", methods=["POST"])
def restart_container():

    data = request.get_json()

    container_name = data.get("name")

    if not container_name:

        return {

            "status": "error",

            "message": "Nama container wajib diisi"

        }, 400


    try:

        subprocess.run(

            [

                "docker",

                "restart",

                container_name

            ],

            check=True,

            capture_output=True,

            text=True

        )


        return {

            "status": "success",

            "message":
                f"Container {container_name} berhasil di-restart"

        }


    except subprocess.CalledProcessError as error:

        return {

            "status": "error",

            "message":
                error.stderr

        }, 500



    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)



