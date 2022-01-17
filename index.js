const inquirer = require('inquirer');
const fs = require('fs');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const genTeam = require("./src/generateteam.js");

const teamArray = [];

function createTeam() {
    inquirer.prompt([
        {
            message: "please write team name:",
            name:"teamname"
        }
    ])

    .then(function(input){
        const chosenName = input.teamname
        // teamArray.push(chosenName);
        addTeamManager();
    })
}

function addTeamManager() {
    inquirer.prompt([
        {

            message: "What is your team manager's name?",
            name: 'name',
        },

        {

            message: "What is your manager's email?",
            name: 'email',
        },


        {

            message: "What is your manager's office number?",
            name: 'officeNumber',
        },

    ])
        .then(function (input) {
            const name = input.name;
            const id = 1;
            const email = input.email;
            const officeNumber = input.officeNumber;
            const teamMember = new Manager(name, id, email, officeNumber)
            teamArray.push(teamMember)
            addNewMember();
        })

}





function addNewMember() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add more team members?",
            choices: ["engineer", "intern", "no"],
            name: "newTeamMember",
        },



    ])
        .then(function (input) {
            switch (input.newTeamMember) {
                case "engineer":
                    console.log("you selected engineer!");
                    addEngineer();
                    // addNewMember();
                    break;

                case "intern":
                    console.log("you selected intern!");
                    addIntern();
                    // addNewMember();
                    break;

                default:
                    console.log("goodbye");
                    writeTeamToFile()
                    break;
            }

        })
}

function addEngineer() {
    inquirer.prompt([

        {

            message: "What is your engineer's name?",
            name: 'name',
        },

        {

            message: "What is your engineer's email?",
            name: 'email',
        },


        {

            message: "What is your engineer's Github profile?",
            name: 'github',
        },
    ])
        .then(function (input) {
            const name = input.name;
            const id = teamArray.length + 1;
            const email = input.email;
            const github = input.github;
            const teamMember = new Engineer(name, id, email, github)
            teamArray.push(teamMember)
            addNewMember();
        })

   } 

   function addIntern() {
    inquirer.prompt([

        {

            message: "What is your intern's name?",
            name: 'name',
        },

        {

            message: "What is your intern's email?",
            name: 'email',
        },


        {

            message: "What is your intern's school name?",
            name: 'school',
        },
    ])
        .then(function (input) {
            const name = input.name;
            const id = teamArray.length + 1;
            const email = input.email;
            const school = input.school;
            const teamMember = new Intern(name, id, email, school)
            teamArray.push(teamMember)
            addNewMember();
        })

   };


   function writeTeamToFile() {
       console.log("team created!")

       fs.writeFileSync(genTeam(teamArray))
   }
createTeam();
