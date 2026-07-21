// Pertama kali halaman dibuka
ambilData();

// Update setiap 2 detik
setInterval(ambilData, 2000);

ambilDataProxmox();
setInterval(ambilDataProxmox, 2000);

ambilDataDocker();
setInterval(ambilDataDocker, 2000);