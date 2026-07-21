function ambilData() {

    fetch("http://192.168.100.90:5000/metrics")
        .then(response => response.json())
        .then(data => {

            updateUbuntuDashboard(data);

            });

}
function ambilDataProxmox() {

    fetch("http://192.168.100.90:5000/proxmox-metrics")
        .then(response => response.json())
        .then(data => {

            updateProxmoxDashboard(data);

        });

}

function ambilDataDocker(){
        fetch("http://192.168.100.90:5000/docker-metrics")
        .then(response => response.json())
        .then(data => {

            updateDockerDashboard(data);

        });
}
ambilDataDocker();