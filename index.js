// TODO: Include packages needed for this application

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: "What is your GitHub username? (No @ needed)",
        name: 'username',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub username is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is your email address?",
        name: 'repo',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub repo is required for a badge.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the name of your project?",
        name: 'title',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project title is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Write a short description of your project.",
        name: 'description',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project description is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What command should be run to install dependencies?",
        name: 'installation'
    },
    {
        type: 'input',
        message: "What command should be run to run tests?",
        name: 'test'
    },
    {
        type: 'input',
        message: "What does the user need to know about contributing to the repo?",
        name: 'contributing'
    },
    {
        type: 'input',
        message: "What does the user need to know about using the repo?",
        name: 'usage'
    },
    {
        type: 'list',
        message: "What kind of license should the project have?",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
    }
];


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log(err);
        }
        console.log("Success!")
    });
}

const writeFileAsync = util.promisify(writeToFile);

// TODO: Create a function to initialize app
async function init() {
    try{
        // Answer the Questions
        const userResponse = await inquirer.prompt(questions);
        console.log('Your Response: ', userResponse);
        console.log("Retrieving your GitHub data next");

        const userInfo = await api.getUser(userResponse);
        console.log("GitHub user info: ", userInfo);
        console.log("Making The README");

        const markdown = generateMarkdown(userResponse, userInfo);
        console.log(markdown);

        await writeFileAsync('ExampleREADME.md', markdown);
        console.log("README is Completed");

    
    } catch  (error) {
        console.error();
    }

}

// Function call to initialize app
init();
