// Load module to read file json.
const fs = require ('fs');

// Class constructor for newTasks to be added to the list
class Task{
    constructor(task, status, starttime, endtime, user){
        this.task = task;
        this.status = status;
        this.starttime = starttime;
        this.endtime = endtime;
        this.user = user;
    }
} // End class Task

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
    getTasklist
};
