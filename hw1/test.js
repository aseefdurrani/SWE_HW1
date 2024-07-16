console.log("Hello, world!");
  
for (let i = 0; i < 5; i++) {
    console.log(i);
  }
  
const {argv} = require(('node:process'));

// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
