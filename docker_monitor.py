import docker


def get_container_stats(container):

    try:

        stats = container.stats(
            stream=False
        )

        cpu_delta = (
            stats["cpu_stats"]["cpu_usage"]["total_usage"]
            - stats["precpu_stats"]["cpu_usage"]["total_usage"]
        )

        system_delta = (
            stats["cpu_stats"]["system_cpu_usage"]
            - stats["precpu_stats"]["system_cpu_usage"]
        )

        cpu_count = stats["cpu_stats"].get(
            "online_cpus",
            1
        )

        if system_delta > 0 and cpu_delta > 0:

            cpu_percent = (
                cpu_delta
                / system_delta
                * cpu_count
                * 100
            )

        else:

            cpu_percent = 0


        memory_usage = stats["memory_stats"].get(
            "usage",
            0
        )

        memory_limit = stats["memory_stats"].get(
            "limit",
            0
        )


        memory_usage_mb = (
            memory_usage
            / 1024
            / 1024
        )

        memory_limit_mb = (
            memory_limit
            / 1024
            / 1024
        )


        memory_percent = 0


        if memory_limit > 0:

            memory_percent = (
                memory_usage
                / memory_limit
                * 100
            )


        return {

            "cpu": round(
                cpu_percent,
                2
            ),

            "memory": round(
                memory_usage_mb,
                2
            ),

            "memory_limit": round(
                memory_limit_mb,
                2
            ),

            "memory_percent": round(
                memory_percent,
                2
            )

        }


    except Exception:

        return {

            "cpu": 0,

            "memory": 0,

            "memory_limit": 0,

            "memory_percent": 0

        }



def get_docker_status():

    client = docker.from_env()


    containers = client.containers.list(
        all=True
    )


    result = []


    for container in containers:


        container_data = {

            "id": container.short_id,

            "name": container.name,

            "status": container.status,

            "image": container.image.tags,

            "cpu": 0,

            "memory": 0,

            "memory_limit": 0,

            "memory_percent": 0,

            "health": "NORMAL",

            "health_reason": "Container is running normally"

        }


        if container.status == "running":


            stats = get_container_stats(
                container
            )


            container_data.update(
                stats
            )


            cpu = container_data["cpu"]


            memory_percent = (
                container_data["memory_percent"]
            )


            if cpu > 90:

                container_data["health"] = (
                    "CRITICAL"
                )

                container_data["health_reason"] = (
                    f"CPU usage critical: {cpu}%"
                )


            elif memory_percent > 90:

                container_data["health"] = (
                    "CRITICAL"
                )

                container_data["health_reason"] = (
                    f"Memory usage critical: {memory_percent}%"
                )


            elif cpu >= 70:

                container_data["health"] = (
                    "WARNING"
                )

                container_data["health_reason"] = (
                    f"CPU usage high: {cpu}%"
                )


            elif memory_percent >= 70:

                container_data["health"] = (
                    "WARNING"
                )

                container_data["health_reason"] = (
                    f"Memory usage high: {memory_percent}%"
                )


            else:

                container_data["health"] = (
                    "NORMAL"
                )

                container_data["health_reason"] = (
                    "CPU and memory usage are normal"
                )


        elif container.status == "created":


            container_data["health"] = (
                "WARNING"
            )

            container_data["health_reason"] = (
                "Container has not started yet"
            )


        elif container.status == "exited":


            container_data["health"] = (
                "CRITICAL"
            )

            container_data["health_reason"] = (
                "Container is stopped"
            )


        result.append(
            container_data
        )


    return result