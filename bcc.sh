#!/bin/bash

# Run npm build
npm run build

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Define the source directory (subdirectory named 'build')
SOURCE_DIR="$SCRIPT_DIR/build"

# Check if the 'build' directory exists
if [ -d "$SOURCE_DIR" ]; then
  # Copy the contents of the 'build' directory to the script's directory
  cp -r "$SOURCE_DIR"/* "$SCRIPT_DIR"
  echo "Contents of 'build' have been copied to the script directory."
else
  echo "Error: 'build' directory not found in $SCRIPT_DIR."
  exit 1
fi

# Define the files to be deleted
FILES_TO_DELETE=("logo192.png" "logo512.png")

# Delete the specified files if they exist
for FILE in "${FILES_TO_DELETE[@]}"; do
  if [ -f "$SCRIPT_DIR/$FILE" ]; then
    rm "$SCRIPT_DIR/$FILE"
    echo "$FILE has been deleted."
  else
    echo "$FILE not found, skipping deletion."
  fi
done

# Git actions
git add .
git commit -m "this is a commit. w00tz."
git push origin main
