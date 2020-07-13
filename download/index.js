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