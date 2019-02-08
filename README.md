# todotxt-recurring

Allows simple Recurring Events, Using a Flat-File

Uses extended Syntaxt of [Todo.txt](http://todotxt.org/)

## Installation

`npm install -g todotxt-recurring`

## Usage

`todotxt-recurring /path/to/your/todotxt/folder`

## The Files

In your Todo.txt Folder you must place a file called _todo.recurring_

The (simple) Format is:

__Unit ; day - Todo.txt Line to Add__

### Examples

`weekly ; 2 - $DATE (A) Windows Updates +server @company`  
(Add this on Tuesday)

`daily - $DATE (A) Windows Restart +server @company`  
(Add this today)

`monthly ; 1,15 - $DATE (A) Clean EventLog +server @company`  
(Add this on the first and 15th of this month)

`yearly ; 120 - $DATE (A) Reinstall Windows +server @company`  
(Add this on the 120th day of the year)

### Definitions

* daily (will add the line for today)
* weekly (will add the line for every day on this week where the day matches, may be an array. Days are numbers, starting from Sunday(=0))
* monthly (will add the line for every day in this month where the day matches, may be an array. Days are the day of month numbers)
* yearly (will add the line for every day in this year where the day matches, may be an array. Days are the day of year numbers)

In the Todo.txt Line you may use a variable $DATE.  
It holds the Date from the timecode.

Another File will be created in you Folder called _todo.recurring.added_

It holds the added lines to prevent multiple entries
