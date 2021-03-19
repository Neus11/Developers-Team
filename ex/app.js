// Create an instance of readline by configuring the readable and the writable streams
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const fs = require ('fs');

var recursiveAsyncReadLine = function () {
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
                   break;
               case "3":
                   console.log("this is option 3");
                   break;
               case "4":
                   console.log("this is option 4");
                   fs.readFile('./TASQUES.json', 'utf8', (err,data) => {
                    if (err) {
                        console.log(err)
                        return
                    } else {
                        console.log(data); 
                        recursiveAsyncReadLine()                       
                    }
                   })
                   break;
                   
                case "5":
                    return rl.close();
                    break;
                default:
                    console.log("No such option. Please enter another: ");
            }
    recursiveAsyncReadLine(); //Calling this function again to ask new question
    });
};

recursiveAsyncReadLine();