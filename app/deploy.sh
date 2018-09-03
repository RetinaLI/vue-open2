#!/bin/bash
function check_result(){
  if [ "$1" != "0" ]
  then
    echo "出错了，请检查！";
    exit 2;
  fi
}

rm -rf dist/*;

npm run build;
check_result $?;

cp -rf src/40* src/500.html dist/;

rm -rf /data/projects/foton/iov-web-api/src/*;
check_result $?;

cp -rf dist/* /data/projects/foton/iov-web-api/src/;
check_result $?;

cd /data/projects/foton/iov-web-api;
git add -A;
git commit -m "update";
git push;
check_result $?;