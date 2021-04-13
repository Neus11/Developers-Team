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

// Importing clas Task and function getTaskLIst
const {Task, taskMaker, TaskFunctions} = require('./tasks.js'); 


let question = {
    task: 'Add new task name please: ',
    status: 'Add new status please: ',
    endtime: 'Add end time please: ',
    user:  'Add user please: '
}
 // Array to collect all answer and create new Task
let tempTask = [];
const questions = (question, key) => {
    return new Promise((resolve, reject) => {
      rl.question(question, (answer) => {
        console.log(`${answer} has been added`)
        tempTask.push(answer);
        resolve();
      });
    });
}     


const recursiveAsyncReadLine = function () {
    rl.question("Please Choose an option:\n"
        + "1) Add new task\n"
        + "2) Edit an existing task\n"
        + "3) Delete a task \n"
        + "4) Show all tasks\n"
        + "5) Show a task\n"
        + "6) Exit app\n"
        , function (line) {

            switch (line){
                  case "1":
                    console.log("this is option 1");

                    const main = async () => {
                        await questions(question.task, 'task')
                        await questions(question.status, 'status')
                        await questions(question.endtime, 'endtime')
                        await questions(question.user, 'user')
                        await TaskFunctions.addNewTask(tempTask, TaskFunctions.getTasklist())
                        recursiveAsyncReadLine();
                    }                          
                    main()                         
                   break;                     
                case "2":
                    console.log("this is option 2");
                    // Print list of existing Tasks with numbers
                    outputList(TaskFunctions.getTasklist());
                    // Ask for the number of the task to edit
                    rl.question("Which task would you like to modify? ", (userInput) => {
                        //Covnert the input to a number
                        let selectedTask = parseInt(userInput)
                        if (selectedTask){
                            // Pass selected task and print on console
                            let taskToUpdate = outputList(TaskFunctions.getTasklist(), selectedTask);
                            //console.log(taskToUpdate);
                            rl.question("what would you like to update: status, start time or end time?\n", (updateInput)=> {
                                rl.setPrompt("Please, enter the change: \n");
                                rl.prompt();
                                // Task updated. New update with rest of documents is saved again in Json file. Old contest deleted.
                                rl.on("line", (userUpdate)=>{
                                    if (userUpdate){
                                        taskToUpdate[updateInput] = userUpdate; // update assignment
                                        fs.writeFileSync('TASQUES.json', JSON.stringify(TaskFunctions.getTasklist()), {flag: "w+"});
                                        rl.close();
                                        recursiveAsyncReadLine();
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
                    outputList(TaskFunctions.getTasklist());
                    // Ask for the number of the task to edit
                    rl.question("Which task would you like to delete? ", (userInput) => {
                        TaskFunctions.deleteTask(userInput, TaskFunctions.getTasklist());
                        recursiveAsyncReadLine()                     
                        })   
                   break;
                case "4":
                    console.log("this is option 4");
                    outputList(TaskFunctions.getTasklist());
                    break;
                case "5":
                    outputList(TaskFunctions.getTasklist());
                    rl.question("Which task would you like to view? ", (choice) => {
                        TaskFunctions.viewTask(choice, TaskFunctions.getTasklist());
                        recursiveAsyncReadLine();                    
                    });
                    // Update of task is done
                    rl.on("close", ()=> console.log("Task was succesfully  updated!"))
                    break;
                case "6":
                    console.log("this is option 6");
                    return rl.close();
                default:
                    console.log("No such option. Please enter another: ");
            }
    recursiveAsyncReadLine(); //Calling this function again to ask new question
    });
};

recursiveAsyncReadLine();