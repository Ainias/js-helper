#! /bin/bash

# Exit when a command fails
set -e

REPOSITORY=git@github.com:Ainias/js-helper.git

if [[ -z "$1" ]]; then
  echo "versioname not given!"
  exit;
fi;

versionName=$1
versionExists="$(git ls-remote $REPOSITORY refs/tags/"$versionName"| tr -d '\n')"

if [ -n "$versionExists" ]; then
	echo "Version existiert bereits!";
	exit 1;
fi;
WORKING_DIR=$(pwd)
TMPDIR=$(mktemp -d)

cd "$TMPDIR";
git clone $REPOSITORY project
cd project

npm install
npm run build
npm version "$versionName"
git add -u
git commit -m "pre-version-commit for version $versionName" || echo "no commit needed"
npm publish --tag latest
git push

cd "$WORKING_DIR"
git pull;

echo "$TMPDIR"

