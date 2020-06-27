// Include dependencies
const fs = require("fs");
const inquirer = require("inquirer");

inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "Project name: "
    },
    {
        type: "input",
        name: "version",
        message: "Project version (leave empty to skip): "
    },
    {
        type: "editor",
        name: "description",
        message: "Project description: "
    },
    {
        type: "input",
        name: "installation",
        message: "Installation steps: "
    },
    {
        type: "input",
        name: "usage",
        message: "Usage steps: "
    },
    {
        type: "input",
        name: "contribution",
        message: "Contribution info: "
    },
    {
        type: "input",
        name: "test",
        message: "Test steps: "
    },
    {
        type: "list",
        name: "license",
        message: "License type: ",
        choices: [
            "MIT",
            "GNU AGPLv3",
            "GNU GPLv3",
            "GNU LGPLv3",
            "Mozilla Public License 2.0",
            "Apache License 2.0",
            "Boost Software License 1.0",
            "The Unilicense",
            "Do What the Fuck You Want to Public License"
        ]
    },
    {
        type: "input",
        name: "userName",
        message: "What is your github username?"
    },
    {
        type: "input",
        name: "email",
        message: "Author's e-Mail: "
    },
    {
        type: "list",
        name: "type",
        message: "Is this a website?",
        choices: [
            "Yes",
            "No"
        ]
    }
])
.then(answers => {
    // Required variables
    const tableOfContents = `
<details>
<summary>TABLE OF CONTENTS</summary>
<p>

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

</p>
</details>
`;
    const filename = "README.md";
    const newLine = "\n";
    const newLineBig = "\n\n";
    let data = [];
    let licenseBadge = "";
    
    
    // Push project name
    data.push(`# ${answers.name}`);
    data.push(newLineBig);

    if(answers.version.length >= 1){
        data.push(`Version ${answers.version}`);
        data.push(newLineBig);
    }

    switch(answers.license){
        case 'MIT':
            licenseBadge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            break;

        case 'GNU AGPLv3':
            licenseBadge = "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
            break;

        case 'GNU GPLv3':
            licenseBadge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
            break;

        case 'GNU LGPLv3':
            licenseBadge = "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
            break;

        case "Mozilla Public License 2.0":
            licenseBadge = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
            break;

        case "Apache License 2.0":
            licenseBadge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            break;

        case "Boost Software License 1.0":
            licenseBadge = "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
            break;

        case "The Unilicense":
            licenseBadge = "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
            break;

        case "Do What the Fuck You Want to Public License":
            licenseBadge = "[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)";
            break;
    }
    data.push(licenseBadge);

    // Create status badges
    const webBadge = `[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/${answers.userName}.github.io/${answers.name}.svg)](http://${answers.userName}.github.io/${answers.name}/) `;
    const commitBadge = `[![GitHub last commit](https://img.shields.io/github/last-commit/${answers.userName}/${answers.name})](https://github.com/${answers.userName}/${answers.name}/graphs/commit-activity)`
    if(answers.type === "Yes"){
        data.push(webBadge);
    }
    data.push(commitBadge);
    data.push(newLineBig);

    // Input description
    data.push(`# Description`)
    data.push(answers.description);
    data.push(newLineBig);


    // Input table of contents
    data.push(tableOfContents);
    data.push(newLineBig);


    fs.writeFile(filename, data.join(' '), function(err){
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