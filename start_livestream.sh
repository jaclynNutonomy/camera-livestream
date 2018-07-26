#! /bin/bash
sudo service motion restart
sudo service motion start
node camera-livestream/websocket-controls &
python camera-livestream/stepper_con.py &
python -m SimpleHTTPServer 8084

#  xterm -title "python" -hold -e python.sh &
#  xterm -title "brower" -hold -e brower.sh