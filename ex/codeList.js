
// Print list of all tasks registered. In case function gets und updateTask parameter
// prints only the selected Task to be updated.
const printList = (arrList, updateTask = undefined) => {
    // Convert input string to number
    if (updateTask) {
        updateTask = parseInt(updateTask);
    }
    let counter = 1;
    // Pull out only the list of tasks with a order number
    if (updateTask){
        return arrList[updateTask-1];
    }else{
        arrList.forEach(function(elemList){ 
            console.log(`\t${counter++}: ${elemList.task} \n`);
        });
    }
    
} // end of arrow-function

module.exports = printList;


const question1 = () => {
    return new Promise((resolve, reject) => {
      rl.question('Add new task name please ', (answer) => {
        console.log(`New task ${answer} has been added`)
        newObject.task = answer 
        resolve()
      })
    })
  }     