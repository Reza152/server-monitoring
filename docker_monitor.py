import docker


def get_docker_status():

    client = docker.from_env()

    containers = client.containers.list(all=True)

    result = []

    for container in containers:

        result.append({
            "id": container.short_id,
            "name": container.name,
            "status": container.status,
            "image": container.image.tags,
        })

    return result
