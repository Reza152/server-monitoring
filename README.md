# Linux Server Monitoring 

## Deskripsi

project ini merupakan monitorting server sederhana menggunakan Bash Script pada linux. 

Script akan melakukan monitoring:

-CPU Usage
-RAM Usage
-DISK Usage

apa bila terjadi perubahan status dari HEALTHY menjadi WARNING atau WARNING menjadi HEALTHY maka sistem akan mengirim notifikasi ke DISCORD menggunakan WEBHOOK.

Monitoring dijalankan otomatis menggunakan cron dan log akan dikelola menggunakan Logrotate

--

## Fitur

✅ CPU Monitoring

✅ RAM Monitoring

✅ Disk Monitoring

✅ Logging

✅ Discord Notification

✅ Recovery Notification

✅ Anti Spam Notification

✅ Cron Job

✅ Logrotate

---

## Teknologi

- Ubuntu Server
- Bash Script
- Cron
- Logrotate
- Discord Webhook

---

## Struktur Project

```
server-monitoring/
│
├── health-check.sh
├── .env
├── status.txt
├── health-check.log
├── README.md
└── logrotate.conf
```

---

## Cara Menjalankan

Jalankan manual

```bash
./health-check.sh
```

Menjalankan otomatis

```bash
crontab -e
```

Tambahkan

```bash
* * * * * /home/reza/projects/server-monitoring/health-check.sh
```

---

## Screenshot

Tambahkan screenshot terminal dan Discord Notification.

---

## Author

Reza Arishadilah 
