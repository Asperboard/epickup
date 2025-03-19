#!/bin/bash
##
## EPITECH PROJECT, 2024
## epickup
## File description:
## create_react_app.sh
##

TRUE=0
FALSE=1

function check_npm_installed {
    npm --version 1>/dev/null 2>&1

    if [ $? -ne 0 ]; then
        echo "npm could not be found"
        return $FALSE
    fi
    return $TRUE
}

function check_npx_installed {
    npx --version 1>/dev/null 2>&1

    if [ $? -ne 0 ]; then
        echo "npx could not be found"
        return $FALSE
    fi
    return $TRUE
}

function check_node_installed {
    node --version 1>/dev/null 2>&1

    if [ $? -ne 0 ]; then
        echo "node could not be found"
        return $FALSE
    fi
    return $TRUE
}

echo "Checking ressources..."
check_node_installed
if [ $? -eq $FALSE ]; then
    echo "Please install node"
    exit 1
fi

check_npm_installed
if [ $? -eq $FALSE ]; then
    echo "Please install npm"
    exit 1
fi

check_npx_installed
if [ $? -eq $FALSE ]; then
    echo "npx is not installed, installing it..."
    sudo npm install -g npx
fi

echo -n "app name: "
read -r appname

echo -n "App type, [(n)ext/(r)eact/(e)xpo]: "
read -r choice
if [ "$choice" = "n" ]; then
    echo "Next.js"
    npx create-next-app@latest $appname .
elif [ "$choice" = "r" ]; then
    echo "React"
    npx create-react-router@latest $appname .
elif [ "$choice" = "e" ]; then
    echo "Expo"
    npx npx create-expo-app@latest $appname .
else
    echo "Invalid choice"
    exit 1
fi

if [ -d $appname ]; then
    echo "App created"
    echo "Entering $appname directory..."
    cd $appname
    echo "Installing dependencies..."
    npm install
    echo "Building app..."
    npm run build
    echo "App built"
    echo "The app is ready to be worked on"
    exit 0
else
    echo "App not created"
    exit 1
fi
