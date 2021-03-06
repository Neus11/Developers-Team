// Load module to read file json.
const fs = require ('fs');
// Function to print list of tasks in Json file
const outputList = require('./codeList'); 

// Class constructor for newTasks to be added to the list
class Task{
    constructor(task, status, endtime, user){
        this.task = task;
        this.status = status;
        this.starttime = new Date(); // Add current date automically
        this.endtime = endtime;
        this.user = user;
    }
} // End class Task

// Class TaskFactor to create new tasks
class TaskFactory{
    createTask(task, status, endtime, user){
        return new Task(task, status, endtime, user);
    }
}

// Declare class TaskFactory
const taskMaker = new TaskFactory();



// Pattern Module
const TaskFunctions = (function( ) {
   

    return {
        getTasklist: ()=>{
            // read list of tasks from file
            let tasks = fs.readFileSync('TASQUES.json');
            // Parse JSON  constructing the JavaScript value or object described by the JSON - string. 
            let taskList = JSON.parse(tasks); 
            // Print on console only the list of tasks with a number
             return taskList; 
        },
        addNewTask: function(newTask, taskList) {
            return new Promise((resolve, reject) => {
            // Create a new Instance of class Task
            taskList.push(taskMaker.createTask(...newTask));
            fs.writeFileSync('TASQUES.json', JSON.stringify(taskList), {flag: "w+"});
            console.log("Task was succesfully added!")  
            resolve() 
            });
        },
        deleteTask : function(input, arrTask) {
            let selectedTask = parseInt(input);
            selectedTaskIndex = (selectedTask-1); //encontrar index del elemento seleccionado
            if(selectedTaskIndex < arrTask.length){
              arrTask.splice(selectedTaskIndex, 1);
              fs.writeFileSync('./TASQUES.json', JSON.stringify(arrTask), {flag: "w+"});
              console.log("Task was succesfully deleted!")    
            }else{
              console.log("Task selected doesn't exist")      
            }
        },
        viewTask: function(input, arrTask) {
            let selectedTask = parseInt(input);
            if (selectedTask){
                // Pass selected task and print on console
                let taskToView = outputList(arrTask, selectedTask);
                console.log(taskToView);
                console.log("\n");
            }
        }
    };
})();

   


module.exports = {
    Task,
    taskMaker,
    TaskFunctions
};
