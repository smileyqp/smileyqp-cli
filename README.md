##### 命令行工具需要用到的依赖
- node环境
- commander用于定义命令
- inquire用于和用户进行交互
- chalk让命令行的字符带上颜色
- progress命令行进度条
##### 配置一个脚手架工具的流程
- 编写脚手架工具项目
- 配置pakage.json
- 发布到npm(本地测试可以使用npm link)
- 运行命令
- 解析命令
- 下载模板

```shell
//注意本地测试需要npm link注册命令
sudo npm link
```
