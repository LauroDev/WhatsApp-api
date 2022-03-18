#!/bin/bash
COUNTPID=$(ps aux | grep npmStart.sh | wc -l)

if [ ! $COUNTPID -eq 3 ]; then
    HOME_PATH="/home/ubuntu"

    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME_PATH}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

    nvm use 16.13.1
    npm start
fi