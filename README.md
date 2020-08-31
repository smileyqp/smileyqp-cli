#### [项目仓库](https://github.com/smileyqp/smileyqp-cli)
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

Index.js
```shell
#!/usr/bin/env node
const cm = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const down = require('./download')

// console.log('hello world')
// console.log(chalk.blue('hello smileyqp'))
// console.log(chalk.yellow('yellow'))

cm.version('1.0.0','-v --version')

cm.command('init <name>').action((name)=>{
    inquirer.prompt([
        {
            type:"input",
            name:'projectname',
            message:'项目叫什么名字'
        }
    ]).then((answer)=>{
        console.log(answer)
        console.log(name)
       down(answer.projectname)
    })
})

cm.parse(process.argv)
```

download.js
```shell
const fs = require('fs')
module.exports = function(name){
//node读取文件不能整个读取，它只能读取到文件夹里面的内容信息
var demopath = './project'
var targetpath = './'+name;

//数据驱动思维
var arr = []
fs.mkdir(targetpath,function(){
    pusharr(demopath)
    
    //forEach循环中有异步，会导致问题，用闭包解决
    arr.forEach((item,index)=>{
        (function(item){
            console.log(item)
            if(item[0] =='file'){
                fs.readFile(item[1],(err,data)=>{
                    fs.writeFile(targetpath+'/'+item[1].replace('./project','.'),data,function(){})
                })
            }else{
                fs.mkdir(targetpath+'/'+item[1].replace('./project','.'),function(){})
            }
        })(item)
    })
})

function pusharr(path){
    var files = fs.readdirSync(path)
        files.forEach((item,index) => {
            var nowpath = path + '/'+item;
            var stat = fs.statSync(nowpath)
            if(stat.isDirectory()){ //如果是文件夹
                arr.push(['dir',nowpath])
                pusharr(nowpath) //是文件夹继续调用这个方法，进行递归
            }else{
                arr.push(['file',nowpath])
            }
        });
    } 
}
```
![](https://img-blog.csdnimg.cn/2020071315182669.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0MjczMDU5,size_16,color_FFFFFF,t_70)
