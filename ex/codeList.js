const fs = require ('fs');



    fs.readFile('./TASQUES.json', 'utf8', (err,data) => {
        if (err) {
            console.log(err)
            return
        } else {
            console.log(data)
        }
    })
   
/// leer datos archivo ./createfile 

