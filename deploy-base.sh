WEB_PATH=$PWD

# 移除yum lock
rm -f /var/run/yum.pid

# 关闭防火墙
systemctl stop firewalld
systemctl disable firewalld

# 安装nodejs
cd /usr/local/
wget https://npm.taobao.org/mirrors/node/v8.11.0/node-v8.11.0-linux-x64.tar.gz
tar -zxvf node-v8.11.0-linux-x64.tar.gz
rm -rf node-v8.11.0-linux-x64.tar.gz
mv node-v8.11.0-linux-x64 node
echo 'export NODE_HOME=/usr/local/node  
export PATH=$NODE_HOME/bin:$PATH'>/etc/profile
source /etc/profile

# 安装pm2
npm install pm2 -g

# 链接
sudo ln -s /usr/local/node/bin/node /usr/bin/node
sudo ln -s /usr/local/node/bin/node /usr/lib/node
sudo ln -s /usr/local/node/bin/npm /usr/bin/npm
sudo ln -s /usr/local/node/bin/pm2 /usr/bin/pm2
sudo ln -s /usr/local/node/bin/pm2 /usr/lib/pm2

# nginx安装
yum install -y gcc gcc-c++
yum install -y pcre pcre-devel
yum install -y zlib zlib-devel
yum install -y openssl openssl-devel

cd /usr/local
wget https://nginx.org/download/nginx-1.14.0.tar.gz
tar -zxvf nginx-1.14.0.tar.gz
cd nginx-1.14.0
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
make && make install
cd ..
rm -rf nginx-1.14.0.tar.gz
rm -rf nginx-1.14.0
