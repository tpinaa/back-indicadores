# IndCalc

IndCalc is a performance indicator automation system. It focuses on automating the collection, formatting and calculation of indicators for a Mineral Technology Center.

Main Objectives:
Data Automation: Collect, format, and calculate evaluation indicators automatically.
Optimization: Minimize errors, reduce time spent, and rework in data management.
Improved Documentation: Improve the performance monitoring process, as evidenced in the compilation of the Management Commitment Term (TCG).
Technology: Propose a low-cost information system using modern technologies and focused on advancing knowledge in JavaScript.
Result: An efficient system for calculating indicators, making CETEM's management process more accurate and agile.

---

## Table of Contents

- [Technologies](#computer-technologies)
- [Features](#star2-features)
- [Pre-requisites](#package-pre-requisites)
- [Running](#hammer_and_wrench-running)

---

## :computer: Technologies

![Express]([https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Json Web Token](https://img.shields.io/badge/JSON%20Web%20Tokens-000000.svg?style=for-the-badge&logo=JSON-Web-Tokens&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000.svg?style=for-the-badge&logo=Mongoose&logoColor=white) ![Jest](https://img.shields.io/badge/Jest-C21325.svg?style=for-the-badge&logo=Jest&logoColor=white) ![Node]([https://img.shields.io/badge/Jest-C21325.svg?style=for-the-badge&logo=Jest&logoColor=white](https://img.shields.io/badge/Node.js-5FA04E.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)) ![JavaScript]([https://img.shields.io/badge/Jest-C21325.svg?style=for-the-badge&logo=Jest&logoColor=white](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)) ![Docker](https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=Docker&logoColor=white)

---

## :star2: Features

CRUD
Optimized Route Calculation - Google's API integration guarantees best possible route between origin and destination.

Access to Ride history - Access to a complete list of rides taken with the option to filter by driver.

---

## :package: Pre-requisites

Docker and Node.js are required to run the application locally.

### Docker

Download Docker from https://docs.docker.com/desktop/.

### Node

Download Node from https://nodejs.org/en/download/prebuilt-installer.

---

## :hammer_and_wrench: Running

1 - Fork project repository

Create a new fork at https://github.com/tpinaa/back-indicadores/fork.

2 - Clone repository with CLI

`git clone https://github.com/tpinaa/back-indicadores.git`

3 - Access local cloned repository

`cd back-indicadores`

4 - Install dependencies in root directory

`npm install` 

5 - Run MongoDB Image in Docker

`docker run --name calc-indicadores -p 27017:27017 -d mongo`

6 - Run the application

`npm run start`

7 - Application is available via http://localhost:3000
