#! /bin/sh
sudo service motion restart
sudo service motion start
python -m SimpleHTTPServer 8084 &
python camera-livestream/stepper_con.py 10.101.39.186 &
node camera-livestream/websocket-controls

#  xterm -title "python" -hold -e python.sh &
#  xterm -title "brower" -hold -e brower.sh