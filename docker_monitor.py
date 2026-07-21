import subprocess


def get_docker_status():

    hasil = subprocess.check_output(
        [
            "docker",
            "ps",
            "-a",
            "--format",
            "{{.ID}}|{{.Names}}|{{.Image}}|{{.Status}}|{{.Ports}}"
        ],
        text=True
    )


    containers = []


    for line in hasil.strip().split("\n"):

        if line == "":
            continue


        data = line.split("|", 4)


        container_id = data[0]
        name = data[1]
        image = data[2]
        status = data[3]
        ports = data[4]


        cpu = "N/A"
        memory = "N/A"


        if status.startswith("Up"):

            try:

                stats = subprocess.check_output(

                    [

                        "docker",
                        "stats",
                        "--no-stream",
                        "--format",
                        "{{.CPUPerc}}|{{.MemUsage}}",
                        name

                    ],

                    text=True

                ).strip()


                cpu, memory = stats.split("|", 1)


            except subprocess.CalledProcessError:

                pass


        containers.append({

            "id": container_id,

            "name": name,

            "image": image,

            "status": status,

            "ports": ports,

            "cpu": cpu,

            "memory": memory

        })


    return containers