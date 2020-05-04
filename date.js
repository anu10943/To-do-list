//console.log(module);//has exports={} a json obj
//22 min last lesson of EJS ughh 283
exports.getDate=function(){

    const today = new Date(); //JS way of getting day,date
    const currentDay = today.getDay(); //returns a NUMBER ,1=Monday ,2=tues,7=sunday,
    const options={
        weekday:'long',
        day:'numeric',
        //year :'numeric',
        month:'long'// Saturday, September 17, 2016
    };
    return today.toLocaleDateString("en-US",options);//from format js Date google srch
    // var day = "";
    // switch (currentDay) {
    //     case (0):
    //         day = "Sunday";
    //         break;
    //     case (1):
    //         day = "Monday";
    //         break;
    //     case (2):
    //         day = "Tuesday";
    //         break;
    //     case (3):
    //         day = "Wednesday";
    //         break;
    //     case (4):
    //         day = "Thursday";
    //         break;
    //     case (5):
    //         day = "Friday";
    //         break;
    //     case (6):
    //         day = "Saturday";
    //         break;
    //     default:
    //             console.log("Error");
    // }
     


     
}
exports.getDay=function (){

    const today = new Date(); //JS way of getting day,date
    const currentDay = today.getDay(); //returns a NUMBER ,1=Monday ,2=tues,7=sunday,
    const options={
        
        day:'numeric',
        weekday:'long',
        //year :'numeric',
        // Saturday, September 17, 2016
    };
   return today.toLocaleDateString("en-US",options);//from format js Date google srch
    // var day = "";
    // switch (currentDay) {
    //     case (0):
    //         day = "Sunday";
    //         break;
    //     case (1):
    //         day = "Monday";
    //         break;
    //     case (2):
    //         day = "Tuesday";
    //         break;
    //     case (3):
    //         day = "Wednesday";
    //         break;
    //     case (4):
    //         day = "Thursday";
    //         break;
    //     case (5):
    //         day = "Friday";
    //         break;
    //     case (6):
    //         day = "Saturday";
    //         break;
    //     default:
    //             console.log("Error");
    // }
  


     
}
//console.log(module.exports);