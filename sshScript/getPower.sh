#!/bin/bash 

sudo /usr/bin/powerstat -R 1 10000  & POWERSTAT_PID=$!

while :; do
  if [ -f "./stop-signal-power" ]; then
    rm ./stop-signal-power

    # Send SIGINT to powerstat
    kill -SIGINT $POWERSTAT_PID
    break
  fi
done
