#!/usr/bin/env bash

IFS='%' # preserve spaces in string


# first, change the theme name in the build script
echo "Renaming theme in Gruntfile.js to $1 ..."
sed -i '' "s/<themename>/$1/g" Gruntfile.js

# second, rename the directory to the argument
DIR=content/themes/theme_to_rename
NEW_DIR="content/themes/$1"
echo "Renaming $DIR to $NEW_DIR ..."

` mv "$DIR" "$NEW_DIR" `

# third, descend into the theme directory and do a mass find-and-replace to the new theme name
cd "$NEW_DIR"
pwd

textdomain=$1
functionname="${textdomain}_"

# Capitalize the first letter of the theme name for DocBlocks
foo="$(tr '[:lower:]' '[:upper:]' <<< ${textdomain:0:1})${textdomain:1}"
docblock=" $foo"

prefix="${textdomain}-"

echo "Changing the text domain to $textdomain ..."
find . -type f \( -iname "*.php" -o -iname "*.css" -o -iname "*.md" -o -iname "*.js" \) -exec sed -i '' "s/'_tk'/'${textdomain}'/g"  {} \;

echo "Changing the theme name in functions to $functionname ..."
find . -type f \( -iname "*.php" -o -iname "*.css" -o -iname "*.md" -o -iname "*.js" \) -exec sed -i '' "s/_tk_/${functionname}/g"  {} \;

echo "Changing the theme name in DocBlocks to $docblock ..."
find . -type f \( -iname "*.php" -o -iname "*.css" -o -iname "*.md" -o -iname "*.js" \) -exec sed -i '' "s/ _tk/${docblock}/g"  {} \;

echo "Changing the handle prefix to $prefix ..."
find . -type f \( -iname "*.php" -o -iname "*.css" -o -iname "*.md" -o -iname "*.js" \) -exec sed -i '' "s/_tk-/${prefix}/g"  {} \;

echo "Changing Javascript object to $textdomain ..."
find . -type f \( -iname "*.php" -o -iname "*.css" -o -iname "*.md" -o -iname "*.js" \) -exec sed -i '' "s/_tk/${textdomain}/g"  {} \;

# get rid of any backup files created by sed
find . -type f \( -iname "*.bak" \) -exec rm -rf  {} \;

unset IFS

