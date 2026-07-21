#!/bin/bash
set -a
source /home/reza/projects/server-monitoring/.env
set +a

waktu=$(date "+%Y-%m-%d %H:%M:%S")
hostname=$(hostname)

server_status="HEALTHY"

LOG_FILE="/home/reza/projects/server-monitoring/health-check.log"
STATUS_FILE="/home/reza/projects/server-monitoring/status.txt"

last_status=$(cat "$STATUS_FILE")



cek_status(){

    if [ "$1" -ge "$2" ]
    then
        echo "WARNING"
    else
        echo "INFO"
    fi

}

send_discord(){

    if [ "$server_status" = "WARNING" ]
    then
        title="[WARNING] SERVER ALERT"
    else
        title="[INFO] SERVER RECOVERY"
    fi

    curl -H "Content-Type: application/json" \
    -X POST \
    -d "{\"content\":\"$title\n\n🖥 Hostname : $hostname\n\n🔥 CPU : $cpu%\n🧠 RAM : $memory%\n💾 DISK : $disk%\n\n📢 Status : $server_status\n\n🕒 Waktu : $waktu\"}" \
    "$DISCORD_WEBHOOK"

}


cek_cpu(){

    cpu=$(top -bn1 | grep "Cpu(s)" | awk '{print int($2)}')

    level=$(cek_status "$cpu" 80)
	if [ "$level" = "WARNING" ]
	then
		server_status="WARNING"
	fi

    echo "CPU  : ${cpu}% [$level]"
    echo "[$waktu] CPU : ${cpu}% [$level]" >> "$LOG_FILE"
}

cek_ram(){
	memory=$(free | awk '/Mem:/ {printf("%.0f", $3/$2 * 100)}')
	level=$(cek_status "$memory" 80)
	if [ "$level" = "WARNING" ]
	then
		server_status="WARNING"
	fi
	echo "RAM  : ${memory}% [$level]"
	echo "[$waktu] RAM : ${memory}% [$level]" >> "$LOG_FILE" 
}


cek_disk(){
	disk=$(df -h / | awk 'NR==2 {print $5}' | tr -d '%')
	level=$(cek_status "$disk" 90 )
	if [ "$level" = "WARNING" ]
	then
		server_status="WARNING"
	fi
	echo "DISK : ${disk}% [$level]"
	echo "[$waktu] DISK : ${disk}% [$level]" >> "$LOG_FILE"
}




echo "===================================="
echo "      SERVER HEALTH CHECK"
echo "===================================="
echo
echo "Hostname : $hostname"
echo "Tanggal  : $waktu"
echo



cek_cpu
cek_ram
cek_disk

echo "[$waktu] STATUS : $server_status" >> "$LOG_FILE"
if [ "$server_status" != "$last_status" ]
then
	send_discord
	echo "$server_status" > "$STATUS_FILE"
fi


echo
echo "=================================="
echo "Status Server : $server_status"
echo "=================================="
