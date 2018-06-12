# vue-single-page-temp
这是一个单页面vue项目开发框架

### 修改不同服务地址
#### 文件：config/index.js
```
if (process.env.NODE_ENV == 'development') {
  api_server = "http://localhost:9000";
}
if (process.env.NODE_ENV == 'testing') {
  api_server = "http://localhost:9000";
}
if (process.env.NODE_ENV == 'product') {
  api_server = "http://localhost:9000";
}
```
### 安装依赖包
```
npm run install
```
### 运行项目(本地开发)
```
npm run dev
```
### 运行项目(本地测试)
```
npm run testing
```
### 访问项目
```
http:localhost:9000
```
### 服务器发布
```
npm run build
```
### 本地服务模拟启动
```
npm run server
```