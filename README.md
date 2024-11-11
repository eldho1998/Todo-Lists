# Todo List Application

## Project Overview

This is a simple Todo List application built with a Node.js backend and React.js front-end interface to manage tasks. The project also includes a feature to generate a project summary as a Markdown file, which lists pending and completed tasks.

---

## Features

- **Authentication**: User can Sign Up and Login In with their valid email id and password.
- **Create Todos**: Add new tasks to your todo list with a title, description and date.
- **Mark Todos as Completed**: Update the status of your tasks.
- **Update Todos**: Edit tasks if spell incorrect.
- **Delete Todos**: Remove tasks that are no longer needed.
- **Generate Summary**: Generate a summary of your todos as a Markdown file, displaying the count of completed and pending tasks.
- **Role Based Authentication** : Authentication approved by valid token and Id.
  -- **Bcrypt** : Passwords are in a bcrypted format in Database

---

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js, Javascript, HTML, CSS
- **Database**: MongoDB
- **API**: RESTful API for managing todos
- **API TEST TOOL**: Postman
- **Additional**: Axios (for making HTTP requests), Markdown (for generating the summary)
- **Mongoose** : Interaction between Database and Front end is through mongoose.

---

## Setup and Installation

### Prerequisites

1. **Node.js**: Make sure Node.js is installed on your machine. If not, download and install it from [here](https://nodejs.org/).
2. **MongoDB**: You need a running MongoDB instance, either locally or remotely.

---

### 1. Clone the Repository

_Clone the project to your local machine using the following command:_

**Command Prompt:**
_git clone https://github.com/eldho1998/Todo-Lists_

---

#### 2. Open it on the VS Code or your Text Editor

_bash_

**For Backend --> Todo-Lists\server**
**go to cd server**

First you need to install
------> npm i
------> npm i cors
------> npm i -D nodemon
------> npm i bcrypt
------> npm i dotenv
------> npm i ejs
------> npm i express
------> npm i mongoose
------> npm i jsonwebtoken

open your client package.json file and add this;

// "scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"dev": "nodemon server.js"
} //

_bash_

**For Frontend --> Todo-Lists\client**
**go to cd client**

First you need to install
------> npm i,
------> npm i vite (if not),
------> npm i react-router-dom,
------> npm i moment,
------> npm i antd,
------> npm i @antd-design/icons,
------> npm i axios

---

### 3. RUN Front end

**cd client -------> npm run dev**
_http://localhost:9999 (Port)_

### RUN Back end

**cd server -------> npm run dev**
_DB-CONNECTED_

---

### 4. To generate the Summary as .md file,

**RUN in the /Todo-Lists> node generateSummary.js**
**Open todo-summary.md file to view the Summary of Todo**

---
