#!/bin/bash 
while :; do

  # Get the first line with aggregate of all CPUs 
  cpu_now=($(head -n1 /proc/stat)) 
  # Get all columns but skip the first (which is the "cpu" string) 
  cpu_sum="${cpu_now[@]:1}" 
  # Replace the column separator (space) with + 
  cpu_sum=$((${cpu_sum// /+})) 
  # Get the delta between two reads 
  cpu_delta=$((cpu_sum - cpu_last_sum)) 
  # Get the idle time Delta 
  cpu_idle=$((cpu_now[4]- cpu_last[4])) 
  # Calc time spent working 
  cpu_used=$((cpu_delta - cpu_idle)) 
  # Calc percentage 
  cpu_usage=$((100 * cpu_used / cpu_delta)) 

  # Calculate CPU system time percentage
  cpu_system=$((cpu_now[3]- cpu_last[3]))
  cpu_system_usage=$((100 * cpu_system / cpu_delta))

  # Calculate CPU user time percentage
  cpu_user=$((cpu_now[1]- cpu_last[1]))
  cpu_user_usage=$((100 * cpu_user / cpu_delta))
  
  # Keep this as last for our next read 
  cpu_last=("${cpu_now[@]}") 
  cpu_last_sum=$cpu_sum 
  
  echo "$cpu_usage"
  #echo "CPU system usage at $cpu_system_usage%"
  #echo "CPU user usage at $cpu_user_usage%"
  #echo "================================="
  # Wait a second before the next read 
  sleep 1 
done
