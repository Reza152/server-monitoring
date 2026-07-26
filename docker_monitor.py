import docker


def get_container_stats(container):

    try:
        stats = container.stats(stream=False)

        cpu_delta = (
            stats["cpu_stats"]["cpu_usage"]["total_usage"]
            - stats["precpu_stats"]["cpu_usage"]["total_usage"]
        )

        system_delta = (
            stats["cpu_stats"]["system_cpu_usage"]
            - stats["precpu_stats"]["system_cpu_usage"]
        )

        cpu_count = stats["cpu_stats"].get("online_cpus", 1)

        if system_delta > 0 and cpu_delta > 0:
            cpu_percent = (
                cpu_delta
                / system_delta
                * cpu_count
                * 100
            )
        else:
            cpu_percent = 0

        memory_usage = stats["memory_stats"].get("usage", 0)
        memory_limit = stats["memory_stats"].get("limit", 0)

        memory_usage_mb = memory_usage / 1024 / 1024
        memory_limit_mb = memory_limit / 1024 / 1024

        return {
            "cpu": round(cpu_percent, 2),
            "memory": round(memory_usage_mb, 2),
            "memory_limit": round(memory_limit_mb, 2)
        }

    except Exception:
        return {
            "cpu": 0,
            "memory": 0,
            "memory_limit": 0
        }


def get_docker_status():

    client = docker.from_env()

    containers = client.containers.list(all=True)

    result = []

    for container in containers:

        container_data = {
            "id": container.short_id,
            "name": container.name,
            "status": container.status,
            "image": container.image.tags,
            "cpu": 0,
            "memory": 0,
            "memory_limit": 0
        }

        if container.status == "running":

            stats = get_container_stats(container)

            container_data.update(stats)

        result.append(container_data)

    return result