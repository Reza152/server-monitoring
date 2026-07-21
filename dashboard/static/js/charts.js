let ramData = [];
let diskData = [];
let cpuData = [];
let labels = [];
const ctx = document.getElementById("cpuChart");
console.log(ctx);
const ramCtx = document.getElementById("ramChart");
const diskCtx = document.getElementById("diskChart");

const cpuChart = new Chart(ctx, {
    
    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: "CPU Usage (%)",
            data: cpuData,
            borderColor: "#3498db",
            backgroundColor: "rgba(52,152,219,0.2)",
            borderWidth: 2,
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        animation: false,
        scales: {
            y: {
                min: 0,
                max: 100
            }
        }
    }
});
console.log(cpuChart);

const ramChart = new Chart(ramCtx, {

    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: "RAM Usage (%)",
            data: ramData,
            borderColor: "#2ecc71",
            backgroundColor: "rgba(46,204,113,0.2)",
            borderWidth: 2,
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        animation: false,
        scales: {
            y: {
                min: 0,
                max: 100
            }
        }
    }
});

const diskChart = new Chart(diskCtx, {

    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: "Disk Usage (%)",
            data: diskData,
            borderColor: "#f39c12",
            backgroundColor: "rgba(243,156,18,0.2)",
            borderWidth: 2,
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        animation: false,
        scales: {
            y: {
                min: 0,
                max: 100
            }
        }
    }
});