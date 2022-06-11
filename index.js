//Setting up node modules 
let fs = require('fs'); 
let inquirer = require('inquirer');
//Setting up variables for team profiles
let Manager = require('./lib/Manager');
let Engineer = require('./lib/Engineer');
let Intern = require('./lib/Intern'); 
//Setting up variable for generated page
let generateHTML = require('./src/generateHTML');
//Array of questions
let teamArray = [];  
//Manager prompts
let addManager = () => {
    return inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "Team manager name:", 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("You must the name of your team manager.");
                    return false; 
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "Team manager ID:",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("You must enter the team manager's ID.")
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "Team manager's email address:",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ("You must enter the email address of your manager.")
                    return false; 
                }
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Team manager's phone number:",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("You must enter the team manager's phone number.")
                    return false; 
                } else {
                    return true;
                }
            }
        }
    ])
    .then(managerInput => {
        let  { name, id, email, officeNumber } = managerInput; 
        let manager = new Manager (name, id, email, officeNumber);

        teamArray.push(manager); 
        console.log(manager); 
    })
};
let addEmployee = () => {
    console.log("Adding employees to the team");
    return inquirer.prompt ([
        {
            type: "list",
            name: "role",
            message: "Employee Role:",
            choices: ["Engineer", "Intern"]
        },
        {
            type: "input",
            name: "name",
            message: "Employee Name:", 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("You must enter a name for the employee.");
                    return false; 
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "Employee ID:",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("You must enter the ID for the employee.")
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "Employee Email:",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ("You must enter the employee's email.")
                    return false; 
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "Employee Github Username:",
            when: (input) => input.role === "Engineer",
            validate: nameInput => {
                if (nameInput ) {
                    return true;
                } else {
                    console.log ("You must enter the Github username of the employee.")
                }
            }
        },
        {
            type: "input",
            name: "school",
            message: "Employee Educational Background:",
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("You must enter the employee's educational background.")
                }
            }
        },
        {
            type: "confirm",
            name: "confirmAddEmployee",
            message: "Add more team members?",
            default: false
        }
    ])
    .then(employeeData => {
        //Employee role data
        let { name, id, email, role, github, school, confirmAddEmployee } = employeeData; 
        let employee; 

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);

            console.log(employee);

        } else if (role === "Intern") {
            employee = new Intern (name, id, email, school);

            console.log(employee);
        }

        teamArray.push(employee); 

        if (confirmAddEmployee) {
            return addEmployee(teamArray); 
        } else {
            return teamArray;
        }
    })
};
//Generate HTML using file system
let writeFile = data => {
    fs.writeFile("./output/index.html", data, err => {
        //If an error occurs
        if (err) {
            console.log(err);
            return;
        //Upon successful profile generation 
        } else {
            console.log("Your team profile has been created. Please check the index.html")
        }
    })
}; 
addManager()
  .then(addEmployee)
  .then(teamArray => {
    return generateHTML(teamArray);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .catch(err => {
 console.log(err);
  });