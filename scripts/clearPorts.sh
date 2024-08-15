#!/bin/bash

# Function to kill processes on a specific port, skipping PID 0 and removing duplicates
kill_processes_on_port() {
  port=$1
  pids=$(netstat -aon | grep :$port | awk '{print $5}' | sort -u)

  for pid in $pids; do
    if [ -n "$pid" ] && [ "$pid" -ne 0 ]; then
      taskkill //PID $pid //F
    fi
  done
}

# Kill processes on port 3000
kill_processes_on_port 3000

# Kill processes on port 3001
kill_processes_on_port 3001

