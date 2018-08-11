#! /bin/bash

WEB_PATH=$PWD
cd $WEB_PATH

if [[ "$1" != "ui-domain" ]];then
  echo "拉取最新的代码..."
  git reset --hard origin/master
  git clean -f
  git pull origin master
  git submodule update --init --recursive
  git submodule update
  echo -e "\033[32m代码拉取完成...\033[0m"
fi

if [[ "$1" == "ui-domain" ]];then
  echo "拷贝ui-domain到buyer-pc..."
  cp -arf $WEB_PATH/ui-domain/ $WEB_PATH/buyer/pc/themes/b2b2c_v5/
  echo -e "\033[32m拷贝完成\033[0m"

  echo "拷贝ui-domain到buyer-wap..."
  cp -arf $WEB_PATH/ui-domain/ $WEB_PATH/buyer/wap/themes/default/
  echo -e "\033[32m拷贝完成\033[0m"

  echo "拷贝ui-domain到manager-seller..."
  cp -arf $WEB_PATH/ui-domain/ $WEB_PATH/manager-seller/
  echo -e "\033[32m拷贝到完成\033[0m"

  echo "拷贝ui-domain到manager-admin..."
  cp -arf $WEB_PATH/ui-domain/ $WEB_PATH/manager-admin/
  echo -e "\033[32m拷贝完成\033[0m"
fi

if [[ ! -n "$1" || "$1" == "manager-admin" ]];then
  echo "开始部署后台管理(manager-admin)..."
  cd $WEB_PATH/manager-admin
  rm -rf node_modules
  echo "开始安装项目依赖..."
  sudo npm install
  echo "开始打包..."
  sudo npm run build:prod
  echo -e "\033[32m后台管理部署完成...\033[0m"
fi

if [[ ! -n "$1" || "$1" == "manager-seller" ]];then
  echo "开始部署商家中心(manager-seller)..."
  cd $WEB_PATH/manager-seller
  rm -rf node_modules
  echo "开始安装项目依赖..."
  sudo npm install
  echo "开始打包..."
  sudo npm run build:prod
  echo -e "\033[32m商家中心部署完成...\033[0m"
fi

if [[ ! -n "$1" || "$1" == "buyer-pc" ]];then
  echo "开始部署买家PC端(buyer-pc)..."
  cd $WEB_PATH/buyer/pc/themes/b2b2c_v5
  rm -rf node_modules
  echo "开始安装项目依赖..."
  sudo npm install
  sudo npm run build
  echo -e "\033[32m买家PC端build完成，等待部署...\033[0m"
fi

if [[ ! -n "$1" || "$1" == "buyer-wap" ]];then
  echo "开始部署买家WAP端(buyer-wap)..."
  cd $WEB_PATH/buyer/wap/themes/default
  rm -rf node_modules
  echo "开始安装项目依赖..."
  sudo npm install
  sudo npm run build
  echo "买家WAP端build完成，等待部署..."
fi

if [[ ! -n "$1" || "$1" == "buyer-pc" ]];then
  # 启动买家端PC
  pm2 delete buyer-pc
  cd $WEB_PATH/buyer/pc/themes/b2b2c_v5
  pm2 start npm --name "buyer-pc" -- run start
  echo -e "\033[32mbuyer-pc部署完成！\033[0m"
fi

if [[ ! -n "$1" || "$1" == "buyer-wap" ]];then
  #启动买家端WAP
  pm2 delete buyer-wap
  cd $WEB_PATH/buyer/wap/themes/default
  pm2 start npm --name "buyer-wap" -- run start
  echo -e "\033[32mbuyer-wap部署完成！\033[0m"
fi

