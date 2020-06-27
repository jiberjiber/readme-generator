// Include dependencies
const fs = require("fs");
const inquirer = require("inquirer");

inquirer.prompt([
    {
        type: "input",
        name: "userName",
        message: "What is your github username?"
    },
    {
        type: "input",
        name: "name",
        message: "What is your project's name?"
    },
    {
        type: "input",
        name: "version",
        message: "Project version (leave empty to skip)"
    },
    {
        type: "input",
        name: "repoName",
        message: "What is your repo's name?"
    },
    {
        type: "input",
        name: "",
        message: ""
    },
])
.then(answers => {
    const filename = "README.md";

    fs.write(filename, JSON.stringify(answers, null, '\t'), function(err){
        if(err){
            console.log(err);
        }

        console.log(`Success! ${filename} created!`);
    });
})
.catch(err => {
    if(err.isTtyError){
        console.log('Error caught!',err);
    } else{
        console.log('Unkown error.',err);
    }
});