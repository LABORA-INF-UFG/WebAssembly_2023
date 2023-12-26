const fs = require('fs');
var events = require('events');

const event = new events.EventEmitter();

if(!fs.existsSync('./power.txt')){
    fs.writeFileSync('./power.txt', '')
}
fs.appendFileSync('power.txt',"asdasd")
const data = fs.readFileSync("power.txt", "utf8")
    

    // Split the file into lines and take off lines with [Time, ... ,Watts] information
    
const lines = data
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => !line.startsWith("Time"));

console.log(data)
// Find the lines with the desired data
const avgLine = lines.find((line) => line.includes("Average"));
const stdDevLine = lines.find((line) => line.includes("StdDev"));

// Extract the Watts data
const avgWatts = Number(avgLine
    .split(/\s+/)
    .filter((item) => item !== "")
    .pop());
const stdDevWatts = Number(stdDevLine
    .split(/\s+/)
    .filter((item) => item !== "")
    .pop());

// The number of samples is the number of lines between the headers and the summary
const startLine = lines.findIndex((line) => line.length === 0);
const endLine = lines.findIndex((line) => line.startsWith("-"));

const numSamples = endLine - startLine - 1;

const watts_upper = (avgWatts + 1.96*(stdDevWatts/Math.sqrt(numSamples)))
const watts_lower = (avgWatts - 1.96*(stdDevWatts/Math.sqrt(numSamples)))


console.log(watts_lower)
console.log(watts_upper)
console.log(avgWatts)


fs.unlinkSync('./power.txt')

