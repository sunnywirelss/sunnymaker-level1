cd ./esp32Build && ./esptool --port $2 --baud $1 erase_flash && ./esptool --port $2 --baud $1 write_flash 0x1000 esp32-20180604-v1.9.4.bin;echo ""
