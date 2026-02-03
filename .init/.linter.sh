#!/bin/bash
cd /home/kavia/workspace/code-generation/tic-tac-toe-classic-313873-313887/frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

