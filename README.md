# Linux Server Monitoring & Infrastructure Dashboard

Project monitoring infrastructure yang berkembang dari Bash Script
menjadi dashboard monitoring berbasis Python Flask.

---

# PART 1 - Linux Server Monitoring

## Deskripsi

Project ini merupakan monitoring server sederhana menggunakan Bash Script
pada Linux.

Script melakukan monitoring:

- CPU Usage
- RAM Usage
- Disk Usage

Apabila terjadi perubahan status dari HEALTHY menjadi WARNING atau
WARNING menjadi HEALTHY, sistem akan mengirim notifikasi ke Discord
menggunakan Webhook.

Monitoring dijalankan otomatis menggunakan Cron dan log dikelola
menggunakan Logrotate.

---

## Fitur Bash Monitoring

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

# PART 2 - Server Monitoring Dashboard

## Deskripsi

Project kemudian dikembangkan menjadi dashboard monitoring berbasis
Python dan Flask.

Dashboard digunakan untuk memonitor:

- Ubuntu Server
- Proxmox Host
- Docker Containers

---

## Fitur Ubuntu Server

- CPU usage
- RAM usage
- Disk usage
- Server status
- Hostname
- IP Address
- Operating System
- Uptime

---

## Fitur Proxmox

- Proxmox status
- CPU usage
- RAM usage
- Disk usage
- Hostname
- Uptime

---

## Fitur Docker

- Total container
- Running container
- Stopped container
- Created container
- Container health status
- Docker image
- Port information
- Container ID
- CPU usage
- Memory usage

---

## Docker Container Management

Dashboard dapat melakukan:

- Start container
- Stop container
- Restart container

---

## Teknologi

- Ubuntu Server
- Bash Script
- Python
- Flask
- JavaScript
- HTML5
- CSS3
- Chart.js
- Docker
- Proxmox
- Git
- GitHub

---

# Project Architecture

```text
Windows Laptop
       │
       │ Web Browser
       ▼
┌─────────────────────────┐
│   Flask Dashboard        │
│   Port 5001              │
└────────────┬────────────┘
             │ HTTP API
             ▼
┌─────────────────────────┐
│ Ubuntu Server            │
│ 192.168.100.90           │
│                         │
│ Flask Monitoring Agent  │
│ Port 5000               │
└────────────┬────────────┘
             │
      ┌──────┴──────┐
      ▼             ▼
┌───────────┐  ┌──────────────┐
│ Proxmox    │  │ Docker       │
│ Host       │  │ Containers   │
└───────────┘  └──────────────┘