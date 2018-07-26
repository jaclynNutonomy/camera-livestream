#! /bin/sh
sudo service motion restart
sudo service motion start
sudo cd camera-livestream
node websocket-controls.js
python stepper_con.py 10.101.39.186
python -m SimpleHTTPServer 8084