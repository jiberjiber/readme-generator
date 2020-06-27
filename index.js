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
        message: "Project description: ",
        default: "Write a description of your program. Markdown is supported."
    },
    {
        type: "input",
        name: "installation",
        message: "Installation command: "
    },
    {
        type: "editor",
        name: "usage",
        message: "Usage steps: ",
        default: "Write a brief set of instructions on how to use your program. Markdown is supported."
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
            "GNU GPLv3",
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
        name: "authorName",
        message: "Author's name: "
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
    const tableOfContents = `<details>
<summary>TABLE OF CONTENTS</summary>
<p>

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

</p>
</details>`;
    const filename = "README.md";
    const newLine = "\n";
    const newLineBig = "\n\n";
    let data = [];
    let licenseBadge = "";
    let licenseNotice = "";
    
    
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
            licenseNotice = `Copyright 2020 ${answers.authorName}

            Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
            
            The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
            
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;
            break;

        case 'GNU GPLv3':
            licenseBadge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
            licenseNotice = `    This program is free software: you can redistribute it and/or modify
            it under the terms of the GNU General Public License as published by
            the Free Software Foundation, either version 3 of the License, or
            (at your option) any later version.
        
            This program is distributed in the hope that it will be useful,
            but WITHOUT ANY WARRANTY; without even the implied warranty of
            MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
            GNU General Public License for more details.
        
            You should have received a copy of the GNU General Public License
            along with this program.  If not, see <https://www.gnu.org/licenses/>.`;
            break;

        case "Mozilla Public License 2.0":
            licenseBadge = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
            licenseNotice = `This Source Code Form is subject to the terms of the Mozilla Public
            License, v. 2.0. If a copy of the MPL was not distributed with this
            file, You can obtain one at https://mozilla.org/MPL/2.0/.`;
            break;

        case "Apache License 2.0":
            licenseBadge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            licenseNotice = `Copyright 2020 ${answers.authorName}

            Licensed under the Apache License, Version 2.0 (the "License");
            you may not use this file except in compliance with the License.
            You may obtain a copy of the License at
         
                http://www.apache.org/licenses/LICENSE-2.0
         
            Unless required by applicable law or agreed to in writing, software
            distributed under the License is distributed on an "AS IS" BASIS,
            WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
            See the License for the specific language governing permissions and
            limitations under the License.`;
            break;

        case "Boost Software License 1.0":
            licenseBadge = "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
            licenseNotice = `Boost Software License - Version 1.0 - August 17th, 2003

            Permission is hereby granted, free of charge, to any person or organization
            obtaining a copy of the software and accompanying documentation covered by
            this license (the "Software") to use, reproduce, display, distribute,
            execute, and transmit the Software, and to prepare derivative works of the
            Software, and to permit third-parties to whom the Software is furnished to
            do so, all subject to the following:
            
            The copyright notices in the Software and this entire statement, including
            the above license grant, this restriction and the following disclaimer,
            must be included in all copies of the Software, in whole or in part, and
            all derivative works of the Software, unless such copies or derivative
            works are solely in the form of machine-executable object code generated by
            a source language processor.
            
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT
            SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE
            FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE,
            ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
            DEALINGS IN THE SOFTWARE.
            `;
            break;

        case "The Unlicense":
            licenseBadge = "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
            licenseNotice = `I dedicate any and all copyright interest in this software to the
            public domain. I make this dedication for the benefit of the public at
            large and to the detriment of my heirs and successors. I intend this
            dedication to be an overt act of relinquishment in perpetuity of all
            present and future rights to this software under copyright law.`;
            break;

        case "Do What the Fuck You Want to Public License":
            licenseBadge = "[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)";
            licenseNotice = `        DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
            Version 2, December 2004 

Copyright (C) 2020 ${answers.authorName} <${answers.email}> 

Everyone is permitted to copy and distribute verbatim or modified 
copies of this license document, and changing it is allowed as long 
as the name is changed. 

    DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION 

0. You just DO WHAT THE FUCK YOU WANT TO.`;
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
    data.push(`# Description`);
    data.push(newLine);
    data.push(answers.description);
    data.push(newLineBig);


    // Input table of contents
    data.push(tableOfContents);
    data.push(newLineBig);


    // Installation instructions
    data.push(`# Installation`);
    data.push(newLine);
    data.push(`To install this program, you have a couple options. \n1. Install program using \`${answers.installation}\`\n2. Download the repo and use node to run the index.js file`);
    data.push(newLineBig);

    
    // Usage instructions
    data.push(`# Usage`);
    data.push(newLine);
    data.push(answers.usage);
    data.push(newLineBig);

    
    // License notice
    data.push(`# License`);
    data.push(newLine);
    data.push(licenseNotice);
    data.push(newLineBig)


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