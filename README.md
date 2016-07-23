# bizflow-graphql

Trying out graphql :)

build code (transpile):

`npm run build`

transpiled code will be stored in /lib.

To create a sqlite database (or renew) use this command:

`npm createDb`

Seed with following command:

`npm seed`

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
