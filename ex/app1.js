// Create an instance of readline by configuring the readable and the writable streams
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });




  
  readline.question('Welcome, please enter your username?', function(userName){
       console.log(`Hey there ${userName}!`);
       menuTasks();
          readline.question('Which action are you intending to perform?', function(action){
          console.log(action)
       readline.close();
});
});
    
// Show Menu-options
function menuTasks(){

    console.log("Menu:");
    console.log("1. Add new task.");
    console.log("2. Edit a existing task.");
    console.log("3. Delete a task.");
    console.log("4. Show all tasks.");
    console.log("5. Exit.")
}

/*
readline.question('Which action are you intending to perform?', action =>{
    readline.close(action);  
    option(action)

});
*/