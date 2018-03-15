# ToDo App with SmartSheets

This todo app uses smartsheet's technology it allows you to create todo tasks, mark them as completed, and remove tasks.

You will need a SmartSheet Account.
For more information checkout SmartSheet.com

## Basic requirements

**You must have:**

- [Node.js](https://nodejs.org/en/download/)

## How to use

There is a **frontend** and a **backend** directory, they both will need to be configured and running for the application to work.

**How to configure:**

1. Each of the directories will contain an *.env.sample* file. The environment variables must be configured before running the app. 

2. After configuring the *.env.sample* rename the sample file to *.env*
(Always keep your environment variables secure)

3. Run the command `npm i` to install the dependencies in both the **frontend** and the **backend**

4. In the **backend** directory, first run `npm start` to start the node server. It will run on *locahost:3000/*

5. In the **frontend** directory, run `npm run watch` to run the frontend

6. In your browser, navigate to [localhost:8080](http://localhost:8080)

