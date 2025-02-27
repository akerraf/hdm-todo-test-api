# HDM Todo List - Backend

## Context

This is the backend part of the HDM Todo List application, built with NestJS and connected to a MySQL database.

## Setup
1. Clone the repository: `git clone https://github.com/akerraf/hdm-todo-test-api.git`
2. Navigate to the project folder: `cd hdm-todo-test-api`
3. Install dependencies: `yarn install`
4. Configure the `.env` file with your MySQL database credentials.
5. Run migrations: `yarn migrate`
6. Start the backend: `yarn start`

## Features Implemented
- Task creation and editing
- Task deletion via API

##  Decisions Made
- We used docker image for Mysql.
- Use tools like Postman to debug and test my code.

## Issue:
- The server returned an empty response after creating a task. The `handle` method in `SaveTaskUseCase` did not return the created task correctly.
- Data sent to the repository (`TaskRepository`) was not being saved correctly. The data sent to the `save` method was not formatted correctly. Verified that the data sent to `save` is correctly formatted. Types issues.
- Database Issue.The server was not runing correctly.

## Conclusion:
This project allowed me to better understand how React and NestJS can be used together to create web applications. I was able to understand and implement the basics of task management on both the server-side and client-side.

## Link to Frontend Repository
You can find the frontend repository here: [HDM Todo List - Frontend](https://github.com/akerraf/hdm-todo-test-web-app)
