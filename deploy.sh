#! /bin/bash

WEB_PATH='/opt/server/ui'$1

echo "开始部署..."
cd $WEB_PATH
echo "拉取最新的代码..."
git reset --hard origin/master
git clean -f
git pull origin master
git submodule update --init --recursive
git submodule update
echo "代码拉取完成..."

echo "开始部署后台管理(manager-admin)..."
cd $WEB_PATH/manager-admin
rm -rf node_modules
echo "开始安装项目依赖..."
sudo npm install
echo "开始打包..."
sudo npm run build:prod
echo "后台管理部署完成..."

echo "开始部署商家中心(manager-seller)..."
cd $WEB_PATH/manager-seller
rm -rf node_modules
echo "开始安装项目依赖..."
sudo npm install
echo "开始打包..."
sudo npm run build:prod
echo "商家中心部署完成..."

echo "开始部署买家PC端(buyer-pc)..."
cd $WEB_PATH/buyer/pc/themes/b2b2c_v5
rm -rf node_modules
echo "开始安装项目依赖..."
sudo npm install
sudo npm run build
echo "买家PC端build完成，等待部署..."

echo "开始部署买家WAP端(buyer-wap)..."
cd $WEB_PATH/buyer/wap/themes/default
rm -rf node_modules
echo "开始安装项目依赖..."
sudo npm install
sudo npm run build
echo "买家WAP端build完成，等待部署..."

# 删除所有应用
pm2 stop "buyer-pc"
pm2 stop "buyer-wap"

# 启动买家端PC
cd $WEB_PATH/buyer/pc/themes/b2b2c_v5
pm2 start npm --name "buyer-pc" -- run start

# 启动买家端WAP
cd $WEB_PATH/buyer/wap/themes/default
pm2 start npm --name "buyer-wap" -- run start

echo -e "\033[32m全部部署完成！\033[0m"

