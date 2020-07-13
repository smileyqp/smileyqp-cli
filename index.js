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