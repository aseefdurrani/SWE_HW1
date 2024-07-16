function main() {

    //get input from user
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    //dealing with the input from user
    const getInputAndProcess = () => {
        readline.question('Enter valid date-time phrase or type "exit" to leave: ', (input) => {

            if (input.toLocaleLowerCase() === 'exit') { //lowercase so it doesnt matter if user types EXIT or Exit or exit
                console.log('Program ended');
                readline.close();
                return;
            }
            //call function to act on input
            const dateTimeComponenets = parseInput(input);
            const check = validInput(dateTimeComponenets);

            if (!check) {
                console.log("Invalid Input please try again");
                getInputAndProcess(); // calling function again to ask user to try again if input string invalid
                
            } else {
                //create date object
                const dateObject = createDate(dateTimeComponenets);
                //format and print the date
                console.log(formatDate(dateObject));
            }

            // Ask again for another input
            getInputAndProcess();
        });
    };

    //loop for taking user input begins
    getInputAndProcess();
}

//converting our input into the type we want and isolating year, month, day, etc...
function parseInput(input) {


    if (input[8] !== "T") {
        return null;
    }

    //extract string components from input
    const year = input.substring(0,4);
    const month = input.substring(4,6);
    const day = input.substring(6,8);
    const hour = input.substring(9,11);
    const minute = input.substring(11,13);
    const second = input.substring(13,15);

    // this is what deals with the input if there a non number in th user input string, ie 202t0101T230000
    //so we check for is not a number and space characters, used arrow function to do so and built in .some() funct
    if ([year, month, day, hour, minute, second].some(part => isNaN(part) || part.includes(' '))) {
        return null;
    }

    return {
        year: parseInt(year, 10),
        month: parseInt(month, 10) - 1, 
        day: parseInt(day, 10),
        hour: parseInt(hour, 10),
        minute: parseInt(minute, 10),
        second: parseInt(second, 10)
    };
}

// create and return a date object using the components
function createDate(components) {

    return new Date(components.year, components.month, components.day, components.hour, components.minute, components.second);
}


function validInput(components) {
    //making sure components object is valid and that each component is not 'NaN'
    if (!components || typeof components !== 'object' ||
        isNaN(components.year) || isNaN(components.month) || isNaN(components.day) ||
        isNaN(components.hour) || isNaN(components.minute) || isNaN(components.second)) {
        return false;
    }

    // Check year
    if (typeof components.year !== 'number' || components.year < 0 || components.year > 9999) {
        return false;
    }

    // Check month
    if (typeof components.month !== 'number' || components.month < 0 || components.month > 11) {
        return false;
    }

    // Check day, accounting for leap years and different month lengths
    const daysInMonth = getDaysInMonth(components.year, components.month);
    if (typeof components.day !== 'number' || components.day < 1 || components.day > daysInMonth) {
        return false;
    }

    // Check hour
    if (typeof components.hour !== 'number' || components.hour < 0 || components.hour > 23) {
        return false;
    }

    // Check minute
    if (typeof components.minute !== 'number' || components.minute < 0 || components.minute > 59) {
        return false;
    }

    // Check second
    if (typeof components.second !== 'number' || components.second < 0 || components.second > 59) {
        return false;
    }

    return true;
}

//this deals with leap year functionality for us. Date object will automatically create date for us
// if we enter day as 0 (like below) JS will just roll back to the previous month, interms of leap year, if we ask for 0th day of march 
//it will return feb 29th or feb 28th depending on lep year or non leap year. also months are 0-indexed in python (used this earlier above)
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

//formatting date to get output as question asks
function formatDate(date) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    let hour = date.getHours();
    let hourFormatted = hour % 12 || 12; // '0' should be '12'
    const amPm = hour >= 12 ? 'PM' : 'AM'; //like an if else statement to determine AM or PM

    const minute = date.getMinutes();
    const second = date.getSeconds();
    let timeString = `${hourFormatted} ${amPm}`;

    // If either minute or second is not zero, include them in the output
    if (minute !== 0 || second !== 0) {
        let minuteFormatted = minute.toString().padStart(2, '0'); // Ensure two digits
        let secondFormatted = second.toString().padStart(2, '0'); // Ensure two digits
        timeString = `${hourFormatted}:${minuteFormatted}:${secondFormatted} ${amPm}`;
    }

    return `${monthName} ${day}, ${year}, at ${timeString}`;
}

// Only run main if file is run directly from terminal, not when imported by another framework like Jasmine
if (require.main === module) {
    main();
} else {
    module.exports = { parseInput, createDate, formatDate, validInput };
}
