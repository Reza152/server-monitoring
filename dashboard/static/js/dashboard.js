// ========================================
// DASHBOARD UBUNTU
// ========================================

function updateUbuntuDashboard(data) {

    const cpuBar =
        document.getElementById("cpu-bar");

    const memoryBar =
        document.getElementById("memory-bar");

    const diskBar =
        document.getElementById("disk-bar");


    document.getElementById("hostname").innerText =
        data.hostname;

    document.getElementById("cpu").innerText =
        data.cpu + "%";

    document.getElementById("memory").innerText =
        data.memory + "%";

    document.getElementById("disk").innerText =
        data.disk + "%";

    document.getElementById("status").innerText =
        data.status;

    document.getElementById("ip").innerText =
        data.ip;

    document.getElementById("os").innerText =
        data.os;

    document.getElementById("uptime").innerText =
        data.uptime_hours + " hours";


    const sekarang =
        new Date();


    document.getElementById("last-update").innerText =
        sekarang.toLocaleTimeString();


    labels.push(
        sekarang.toLocaleTimeString()
    );


    cpuData.push(data.cpu);

    ramData.push(data.memory);

    diskData.push(data.disk);


    if (cpuData.length > 10) {

        cpuData.shift();

        ramData.shift();

        diskData.shift();

        labels.shift();

    }


    cpuChart.update();

    ramChart.update();

    diskChart.update();


    cpuBar.style.width =
        data.cpu + "%";

    memoryBar.style.width =
        data.memory + "%";

    diskBar.style.width =
        data.disk + "%";


    if (data.cpu <= 50) {

        cpuBar.className =
            "fill green";

    }

    else if (data.cpu <= 80) {

        cpuBar.className =
            "fill yellow";

    }

    else {

        cpuBar.className =
            "fill red";

    }


    if (data.memory <= 50) {

        memoryBar.className =
            "fill green";

    }

    else if (data.memory <= 80) {

        memoryBar.className =
            "fill yellow";

    }

    else {

        memoryBar.className =
            "fill red";

    }


    if (data.disk <= 50) {

        diskBar.className =
            "fill green";

    }

    else if (data.disk <= 80) {

        diskBar.className =
            "fill yellow";

    }

    else {

        diskBar.className =
            "fill red";

    }


    const alert =
        document.getElementById("alert");


    if (data.cpu <= 80) {

        alert.innerText =
            "✅ Server Normal";

        alert.style.color =
            "green";

    }

    else if (data.cpu <= 95) {

        alert.innerText =
            "⚠ CPU Usage High";

        alert.style.color =
            "orange";

    }

    else {

        alert.innerText =
            "🚨 CRITICAL! Immediate Action Required";

        alert.style.color =
            "red";

    }

}



// ========================================
// DASHBOARD PROXMOX
// ========================================

function updateProxmoxDashboard(data) {

    document.getElementById(
        "proxmox-status"
    ).innerText =
        data.status;


    document.getElementById(
        "proxmox-hostname"
    ).innerText =
        data.hostname;


    document.getElementById(
        "proxmox-cpu"
    ).innerText =
        data.cpu + "%";


    document.getElementById(
        "proxmox-memory"
    ).innerText =
        data.memory + "%";


    document.getElementById(
        "proxmox-disk"
    ).innerText =
        data.disk + "%";


    const uptimeHours =
        Math.floor(
            data.uptime / 3600
        );


    document.getElementById(
        "proxmox-uptime"
    ).innerText =
        uptimeHours + " hours";


    const cpuBar =
        document.getElementById(
            "proxmox-cpu-bar"
        );


    const memoryBar =
        document.getElementById(
            "proxmox-memory-bar"
        );


    const diskBar =
        document.getElementById(
            "proxmox-disk-bar"
        );


    cpuBar.style.width =
        data.cpu + "%";


    memoryBar.style.width =
        data.memory + "%";


    diskBar.style.width =
        data.disk + "%";


    if (data.cpu <= 50) {

        cpuBar.className =
            "fill green";

    }

    else if (data.cpu <= 80) {

        cpuBar.className =
            "fill yellow";

    }

    else {

        cpuBar.className =
            "fill red";

    }


    if (data.memory <= 50) {

        memoryBar.className =
            "fill green";

    }

    else if (data.memory <= 80) {

        memoryBar.className =
            "fill yellow";

    }

    else {

        memoryBar.className =
            "fill red";

    }


    if (data.disk <= 50) {

        diskBar.className =
            "fill green";

    }

    else if (data.disk <= 80) {

        diskBar.className =
            "fill yellow";

    }

    else {

        diskBar.className =
            "fill red";

    }

}



// ========================================
// DATA DOCKER
// ========================================

let semuaContainers = [];

let filterAktif =
    "all";



// ========================================
// UPDATE DATA DOCKER
// ========================================

function updateDockerDashboard(containers) {

    semuaContainers =
        containers;


    tampilkanDockerContainers();

}



// ========================================
// FILTER DOCKER
// ========================================

function filterDocker(filter) {

    filterAktif =
        filter;


    tampilkanDockerContainers();

}



// ========================================
// TAMPILKAN CONTAINER DOCKER
// ========================================

function tampilkanDockerContainers() {

    const containerList =
        document.getElementById(
            "docker-container-list"
        );


    containerList.innerHTML =
        "";


    // ========================================
    // HITUNG SUMMARY
    // ========================================

    let total =
        semuaContainers.length;


    let running =
        0;


    let stopped =
        0;


    let created =
        0;


    semuaContainers.forEach(container => {

        if (
            container.status === "running"
        ) {

            running++;

        }

        else if (
            container.status === "exited"
        ) {

            stopped++;

        }

        else if (
            container.status === "created"
        ) {

            created++;

        }

    });


    document.getElementById(
        "docker-total"
    ).textContent =
        total;


    document.getElementById(
        "docker-running"
    ).textContent =
        running;


    document.getElementById(
        "docker-stopped"
    ).textContent =
        stopped;


    document.getElementById(
        "docker-created"
    ).textContent =
        created;



    // ========================================
    // FILTER DOCKER
    // ========================================

    let containers =
        semuaContainers;


    if (
        filterAktif !== "all"
    ) {

        containers =
            semuaContainers.filter(container => {

                if (
                    filterAktif === "running"
                ) {

                    return container.status === "running";

                }


                if (
                    filterAktif === "stopped"
                ) {

                    return container.status === "exited";

                }


                if (
                    filterAktif === "created"
                ) {

                    return container.status === "created";

                }


                return false;

            });

    }



    // ========================================
    // TAMPILKAN CONTAINER
    // ========================================

    containers.forEach(container => {


    let statusClass = "status-unknown";

    let statusText = container.health || "UNKNOWN";


    if (statusText === "NORMAL") {

        statusClass = "status-running";

    }


    else if (statusText === "WARNING") {

        statusClass = "status-created";

    }


    else if (statusText === "CRITICAL") {

        statusClass = "status-stopped";

    }



        const item =
            document.createElement(
                "div"
            );


        item.className =
            "docker-container";


        item.innerHTML = `

            <div class="docker-name">

                🐳 ${container.name}

            </div>


            <div class="${statusClass}">

                ${statusText}

            </div>


            <small>

                ${container.status}

            </small>


            <div class="docker-details">

                🖼 Image:
                ${
                    container.image
                    ? container.image.join(", ")
                    : "N/A"
                }

                <br>

                🔌 Ports:
                ${
                    container.ports
                    ? container.ports
                    : "Tidak ada"
                }

                <br>

                🆔 ID:
                ${
                    container.id
                    ? container.id.substring(0, 12)
                    : "N/A"
                }

                <br>

                🧠 CPU:
                ${
                    container.cpu !== undefined
                    ? container.cpu + "%"
                    : "N/A"
                }

                <br>

            💾 Memory:
            ${
                container.memory !== undefined
                ? container.memory + " MB / "
                    + container.memory_limit
                    + " MB "
                    + "("
                    + container.memory_percent
                    + "%)"
                : "N/A"
            }

            </div>


            <div class="docker-actions">

                ${
                    statusText === "CRITICAL" ||
                    statusText === "WARNING"

                    ?

                    `
                    <button
                        class="btn-start"
                        onclick="
                            startContainer(
                                '${container.name}'
                            )
                        ">

                        ▶ START

                    </button>
                    `

                    :

                    `
                    <button
                        class="btn-stop"
                        onclick="
                            stopContainer(
                                '${container.name}'
                            )
                        ">

                        ⏹ STOP

                    </button>
                    `

                }


                <button
                    class="btn-restart"
                    onclick="
                        restartContainer(
                            '${container.name}'
                        )
                    ">

                    🔄 RESTART

                </button>

            </div>

        `;


        containerList.appendChild(
            item
        );

    });

}



// ========================================
// AMBIL DATA UBUNTU
// ========================================

function ambilData() {

    fetch(
        "http://192.168.100.90:5000/metrics"
    )

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Agent mengembalikan error"
                );

            }

            return response.json();

        })

        .then(data => {

            updateUbuntuDashboard(
                data
            );

        })

        .catch(error => {

            console.error(
                "Agent offline:",
                error
            );

            document.getElementById(
                "status"
            ).innerText =
                "🔴 Agent Offline";

        });

}



// ========================================
// AMBIL DATA PROXMOX
// ========================================

function ambilDataProxmox() {

    fetch(
        "http://192.168.100.90:5000/proxmox-metrics"
    )

        .then(response =>
            response.json()
        )

        .then(data => {

            updateProxmoxDashboard(
                data
            );

        });

}



// ========================================
// AMBIL DATA DOCKER
// ========================================

function ambilDataDocker() {

    fetch(
        "http://192.168.100.90:5000/docker-metrics"
    )

        .then(response =>
            response.json()
        )

        .then(data => {

            updateDockerDashboard(
                data
            );

        });

}



// ========================================
// START CONTAINER
// ========================================

function startContainer(containerName) {

    fetch(
        "http://192.168.100.90:5000/docker/start",

        {

            method:
                "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify({

                name:
                    containerName

            })

        }

    )

        .then(response =>
            response.json()
        )

        .then(data => {

            alert(
                data.message
            );


            ambilDataDocker();

        });

}



// ========================================
// STOP CONTAINER
// ========================================

function stopContainer(containerName) {

    fetch(
        "http://192.168.100.90:5000/docker/stop",

        {

            method:
                "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify({

                name:
                    containerName

            })

        }

    )

        .then(response =>
            response.json()
        )

        .then(data => {

            alert(
                data.message
            );


            ambilDataDocker();

        });

}



// ========================================
// RESTART CONTAINER
// ========================================

function restartContainer(containerName) {

    fetch(
        "http://192.168.100.90:5000/docker/restart",

        {

            method:
                "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify({

                name:
                    containerName

            })

        }

    )

        .then(response =>
            response.json()
        )

        .then(data => {

            alert(
                data.message
            );


            ambilDataDocker();

        });

}