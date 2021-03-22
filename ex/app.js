// Create an instance of readline by configuring the readable and the writable streams
const readline = require('readline');
// Load module to read file json.
const fs = require ('fs');
// Function to print list of tasks in Json file
const outputList = require('./codeList'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getTasklist() {
     // read list of tasks from file
     let tasks = fs.readFileSync('TASQUES.json');
     // Parse JSON  constructing the JavaScript value or object described by the JSON - string. 
     let taskList = JSON.parse(tasks); 
     // Print on console only the list of tasks with a number
      outputList(taskList); 
}

const recursiveAsyncReadLine = function () {
    rl.question("Please Choose an option:\n"
        + "1) Add new task\n"
        + "2) Edit an existing task\n"
        + "3) Delete a task \n"
        + "4) Show all tasks\n"
        + "5) Exit app\n"
        , function (line) {

            switch (line){
                case "1":
                   console.log("this is option 1");
                   break;
                case "2":
                    console.log("this is option 2");
                    getTasklist();
                    // Ask for the number of the task to edit
                    rl.question("Which task would you like to modify? ", (userInput) => {
                        //Covnert the input to a number
                        let selectedTask = parseInt(userInput)
                        if (selectedTask){
                            // Pass selected task and print on console
                            let taskToUpdate = outputList(taskList, selectedTask);
                            //console.log(taskToUpdate);
                            rl.question("what would you like to update: status, start time or end time?\n", (updateInput)=> {
                                rl.setPrompt("Please, enter the change: \n");
                                rl.prompt();
                                // Task updated. New update with rest of documents is saved again in Json file. Old contest deleted.
                                rl.on("line", (userUpdate)=>{
                                    if (userUpdate){
                                        taskToUpdate[updateInput] = userUpdate; // update assignment
                                        fs.writeFileSync('TASQUES.json', JSON.stringify(taskList), {flag: "w+"});
                                        rl.close();

                                    }
                                });
                            });
                        } 
                    });
                    // Update of task is done
                    rl.on("close", ()=> console.log("Task was succesfully  updated!"))
                   
                   break;
                case "3":
                   console.log("this is option 3");
                   break;
                case "4":
                    console.log("this is option 4");
                    getTasklist(); 
                    break;
                case "5":
                    console.log("this is option 5");
                    return rl.close();
                default:
                    console.log("No such option. Please enter another: ");
            }
    recursiveAsyncReadLine(); //Calling this function again to ask new question
    });
};

recursiveAsyncReadLine();