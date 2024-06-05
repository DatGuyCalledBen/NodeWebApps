#!/bin/bash

# Check if Pyodide package directory exists
if [ -d "node_modules/pyodide" ]; then
    echo "Pyodide package installed successfully."
else
    echo "Pyodide package not found. Please check the installation."
fi

