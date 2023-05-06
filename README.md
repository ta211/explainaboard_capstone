# About this Project

This is the final prototype for a CMU undergraduate HCI Capstone project. 

The project is developed in collaboration with [ExplainaBoard](https://explainaboard.inspiredco.ai/) in order to create a better experience for AI developers to evaluate, diagnose, and revise their AI systems. 

The project focuses on creating a better information architecture to organize the user-uploaded AI systems, allow easier system upload and comparison, as well as introducing model metadata as a new field in the system submission flow to allow AI developers to compare model performance with model designs. 

# Understanding the Code

As a React project, most of the functional code is in the `./src/` respository, which is mainly composed of `./src/components/`, `./src/pages/`, and `./src/data`. I will explain the purpose of each of the three respositories. 

## Data

As we do not have any authentic data from ExplainaBoard users, the currently data we used are randomly generated or pulled from open source AI development projects. 

The `/data` repository currently has 2 files - `bert_project_systems.js` and `projects.js`, which respectively powers up the Project Overview page and the Projects List page.

## Pages

## Components

# Running the App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Run this code everytime you install a new package or edit the `package.json` or `package-lock.json` file.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Deployment

The website is deployed with gh-pages according to this [tutorial](https://blog.logrocket.com/deploying-react-apps-github-pages/). To make the website offline, you can change the setting of the project to private in the Settings. 

### `npm run deploy`

Builds the website and automatically deploys it on the gh-pages branch. 
