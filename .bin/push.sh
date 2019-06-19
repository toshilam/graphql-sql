#!/bin/bash
versionprefix="v1.1"
revisioncount=`git log --oneline | wc -l | tr -d ' '`
projectversion=`git describe --tags --long`
cleanversion=${projectversion%%-*}

# echo "$projectversion-$revisioncount"
# echo "$cleanversion.$revisioncount"
version=$versionprefix.$revisioncount
gitmessage="Auto deployment $version"

echo $gitmessage

git add .
git commit -m "$gitmessage"
git push origin master
git tag -a $version -m "$gitmessage"
git push origin $version

npm version $version
npm publish
