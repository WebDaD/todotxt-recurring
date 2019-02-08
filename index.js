const fs = require('fs')
const path = require('path')
const moment = require('moment')

// Check if first argument is a Folder and writableor exit with error
try {
  if (process.argv && process.argv.length > 2) {
    fs.accessSync(process.argv[2], fs.constants.R_OK | fs.constants.W_OK)
  } else {
    console.error('Usage: todotxt-recurring FOLDER/OF/TODO.TXT/')
    process.exit(1)
  }
} catch (err) {
  console.error(process.argv[2] + ' does not exist or is not readable')
  process.exit(2)
}

// Check if is folder contains todo.txt, todo.recurring
let todoFolder = process.argv[2]
if (!fs.lstatSync(todoFolder).isDirectory()) {
  console.error(todoFolder + 'is not a directory')
  process.exit(3)
}
let todoTXT = path.join(todoFolder, 'todo.txt')
try {
  fs.accessSync(todoTXT, fs.constants.W_OK)
} catch (err) {
  console.error(todoTXT + 'does not exist or is not writable')
  process.exit(4)
}
let todoRecurring = path.join(todoFolder, 'todo.recurring')
try {
  fs.accessSync(todoRecurring, fs.constants.R_OK)
} catch (err) {
  console.error(todoRecurring + 'does not exist or is not readable')
  process.exit(4)
}

// Create todo.recurring.added if needed
let todoRecurringAdded = path.join(todoFolder, 'todo.recurring.added')
try {
  fs.accessSync(todoRecurringAdded, fs.constants.R_OK | fs.constants.W_OK)
} catch (err) {
  fs.writeFileSync(todoRecurringAdded, '', 'utf8')
  console.log('Created a new and empty todo.recurring.added')
}

// backup todo.txt to todo.bak
console.log('Backing up todo.txt to todo.bak')
fs.copyFileSync(todoTXT, path.join(todoFolder, 'todo.bak'))

// read in recurring file line by line into array
console.log('Reading ' + todoRecurring)
let todosToAdd = fs.readFileSync(todoRecurring).toString().split('\n')
console.log('Got ' + todosToAdd.length + ' Lines')

// read in recurringAdded file line by line into array
console.log('Reading ' + todoRecurringAdded)
let todosAdded = fs.readFileSync(todoRecurringAdded).toString().split('\n')
console.log('Got ' + todosAdded.length + ' Lines')

// Getting Todays Date
const now = moment()
const today = now.format('YYYY-MM-DD')
console.log('Todays Date is ' + today)

// loop todo.recurring
console.log('Starting to create Todos')
for (let index = 0; index < todosToAdd.length; index++) {
  const todo = todosToAdd[index]
  let timer = todo.split(/-(.+)/)[0]
  let unit = timer.split(';')[0].trim()
  let line = todo.split(/-(.+)/)[1]
  switch (unit) {
    case 'daily':
      line = today + line.replace(/\$DATE/g, today)
      if (todosAdded.indexOf(line) < 0) {
        fs.appendFileSync(todoTXT, line + '\n', 'utf8')
        fs.appendFileSync(todoRecurringAdded, line + '\n', 'utf8')
        console.log('Added Line: ' + line)
      }
      break
    case 'weekly':
      // let number = timer.split(';')[1].trim()
      // TODO: whole week (loop over moment)
      break
    case 'monthly':
      // TODO: whole week (loop over moment)
      break
    case 'yearly':
      // TODO: whole week (loop over moment)
      break
    default:
      console.error(unit + ' is not a valid unit.')
      continue
  }
}
console.log('Done')
