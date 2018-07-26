#! /bin/sh
sudo service motion restart
sudo service motion start
node camera-livestream/websocket-controls &
python camera-livestream/stepper_con.py 10.101.39.186 &
python -m SimpleHTTPServer 8084

#  xterm -title "python" -hold -e python.sh &
#  xterm -title "brower" -hold -e brower.sh