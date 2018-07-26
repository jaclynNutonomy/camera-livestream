#! /bin/bash
sudo service motion restart
sudo service motion start
 xterm -title "node" -hold -e node.sh &
 xterm -title "python" -hold -e python.sh &
 xterm -title "brower" -hold -e brower.sh