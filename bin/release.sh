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

TMPDIR=$(mktemp -d)

cd "$TMPDIR";
git clone $REPOSITORY
pwd
cd js-helper

npm install
npm run build
git add -u
git commit -m "pre-version-commit for version $versionName"
npm version "$versionName"
npm publish
git push

echo "$TMPDIR"

