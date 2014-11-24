#!/usr/bin/env bash

IFS='%' # preserve spaces in string

# first, rename the directory to the argument
DIR=theme_to_rename
NEW_DIR=$1
` mv "$DIR" "$NEW_DIR" `

# second, descend into the theme directory and do a mass find-and-replace to the new theme name
cd "$NEW_DIR"
pwd

textdomain=$1
functionname="${textdomain}_"

# Capitalize the first letter of the theme name for DocBlocks
foo="$(tr '[:lower:]' '[:upper:]' <<< ${textdomain:0:1})${textdomain:1}"
docblock=" $foo"

prefix="${textdomain}-"

echo "$textdomain is the new text domain."
find . -type f \( -iname "*.php" -o -iname "*.css" -o -iname "*.md" -o -iname "*.js" \) -exec sed -i.bak "s/'_tk'/'${textdomain}'/g"  {} \;

echo "$functionname is the new theme name in functions."
find . -type f \( -iname "*.php" -o -iname "*.css" -o -iname "*.md" -o -iname "*.js" \) -exec sed -i.bak "s/_tk_/${functionname}/g"  {} \;

echo "$docblock is the theme name in DocBlocks."
find . -type f \( -iname "*.php" -o -iname "*.css" -o -iname "*.md" -o -iname "*.js" \) -exec sed -i.bak "s/ _tk/${docblock}/g"  {} \;

echo "$prefix is the new handle prefix."
find . -type f \( -iname "*.php" -o -iname "*.css" -o -iname "*.md" -o -iname "*.js" \) -exec sed -i.bak "s/_tk-/${prefix}/g"  {} \;

# third, change the theme name in the build script
echo "Renaming theme in Gruntfile.js to $1 ..."
sed -i.bak "s/<themename>/$1/g" Gruntfile.js;

# get rid of any backup files created by sed
find . -type f \( -iname "*.bak" \) -exec rm -rf  {} \;

unset IFS

