// Load module to read file json.
const fs = require ('fs');

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

const getTasklist = () => {
    // read list of tasks from file
    let tasks = fs.readFileSync('./TASQUES.json');
    // Parse JSON  constructing the JavaScript value or object described by the JSON - string. 
    let taskList = JSON.parse(tasks); 
    // Print on console only the list of tasks with a number
     return taskList; 
}

//module.exports = getTasklist; pasa la función y se invoca con getList()
module.exports = {
    Task,
    taskMaker,
    getTasklist
};
