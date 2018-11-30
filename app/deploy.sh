#!/bin/bash
function check_result(){
  if [ "$1" != "0" ]
  then
    echo "出错了，请检查！";
    exit 2;
  fi
}

port=$1;

rm -rf dist/*;

npm run build;
check_result $?;

cp -rf src/40* src/500.html dist/;

if [[ "$port" != "200" ]]; then

  rm -rf ../../../iov-web-api/src/*;
  check_result $?;

  cp -rf dist/* ../../../iov-web-api/src/;
  check_result $?;

  cd ../../../iov-web-api;
  git add -A;
  git commit -m "update";
  git push;
  check_result $?;
else
  scp -r ../../../iov-web-api/src/* devops@10.100.2.200:/data/platform-api-server/
fi

