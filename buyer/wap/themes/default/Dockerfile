# 指定我们的基础镜像是node，版本是v8.10.0
FROM node:8.10.0
# 指定制作我们的镜像的联系人信息（镜像创建者）
MAINTAINER Javashop

# 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的app文件夹下
ADD . /app/
# cd到app文件夹下
WORKDIR /app

# 安装项目依赖包
RUN npm install

# 配置环境变量
ENV NODE_ENV=production
ENV HOST 0.0.0.0

# 容器对外暴露的端口号
EXPOSE 3001

# 容器启动时执行的命令，类似npm run start
CMD ["npm", "run", "deploy"]
