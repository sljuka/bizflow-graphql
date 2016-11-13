# bizflow-graphql

This project is intended as a test backend for bizflow project.

## Try it out

Clone this repo:

`git clone https://github.com/sljuka/bizflow-graphql.git`

Install dependencies:

`npm i`

Create an initial database (SQLite):

`npm run createDb`

Seed the database with random data. this is intended for easier development:

`npm run seed`

Create sample process file.

```json
// processes/breakfast_process.json

{
  "name": "Breakfast process",
  "description": "This is a sample process",
  "startAction": "Check supplies",
  "actions": [
    {
      "name": "Check supplies",
      "type": "input",
      "description": "Checks if all essential supplies are present",
      "question": "Are all supplies present?",
      "nextActions": {
        "notEnaughSupplies": "Get supplies",
        "enaughSupplies": "Make breakfast"
      }
    },
    {
      "name": "Get supplies",
      "type": "task",
      "description": "Gets all needed supplies",
      "nextAction": "Make breakfast",
      "tasks": [
        {
          "name": "Get bacon",
          "roles": ["storage", "kitchen"],
          "description": "Get some bacon, it's in the fridge or in the store"
        },
        {
          "name": "Get eggs",
          "roles": ["storage", "kitchen"],
          "description": "Get some eggs, they are in the fridge or in the store"
        },
        {
          "name": "Get bread",
          "roles": ["storage", "kitchen"],
          "description": "Get some bread from the store"
        }
      ]
    },
    {
      "name": "Make breakfast",
      "type": "task",
      "description": "Make breakfast",
      "nextAction": "Serve breakfast",
      "tasks": [
        {
          "name": "Make breakfast",
          "roles": ["kitchen"]
        }
      ]
    },
    {
      "name": "Serve breakfast",
      "type": "task",
      "tasks": [
        {
          "name": "Prepare table",
          "roles": ["service"]
        },
        {
          "name": "Slice bread",
          "roles": ["kitchen"]
        }
      ]
    }
  ]
}
```

Create process:

`npm run bizflow-process breakfast_process`

This command sets up a process in the database using `processes/breakfast_process.json` file. You can use `breakfast_process` or any other file name from /processes folder. Also a user can also define his process files and create processes using this command.


Start dev server:

`npm start`

and navigate to `localhost:8000/graphql`

There you should see the nice `graphiql` panel. Try it with some queries like

```
{
  users {
    firstName
    lastName
  }
}
```

or

```
{
  processes {
    name
    description
  }
}
```

This is intended to be a webapi for a process management app.
Since I am working alone on the project, I'm using this readme as a way of tracking features. :P

Bizflow features:
- [x] create process
- [x] create process instance
- [ ] run instance
- [ ] start/finish action
- [x] better build task naming (ex. `bizflow-process processDslScriptName`)
- [ ] check if process json is valid when executing `bizfow-process`
- [ ] add openedProcesses to user table
- [ ] make process runnable
