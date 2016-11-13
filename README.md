# bizflow-graphql

This project is intended as a test backend for bizflow project.

## Try it out

Clone this repo:

`git clone https://github.com/sljuka/bizflow-graphql.git`

Install dependencies:

`npm i`

Create an initial database (SQLite):

`npm run createDb`

Seed with following command:

`npm run seed`

Start dev server

`npm start`

Create process

`npm bizflow-process [processName]`

creates a process using `processName.json` which should be in /processes folder.

This is used as backend for [bizflow-ui](https://github.com/sljuka/bizflow-ui) project.
Bizflow ui is a html frontend which can be used to display processes, create instances, run instances...

Since I am working alone on the project, I'm using this readme as a way of tracking features :P

Bizflow features:
- [x] create process
- [x] create process instance
- [ ] run instance
- [ ] start/finish action
- [x] better build task naming (ex. `bizflow-process processDslScriptName`)
- [ ] check if process json is valid when executing `bizfow-process`
- [ ] add openedProcesses to user table
- [ ] make process runnable
- [ ]
