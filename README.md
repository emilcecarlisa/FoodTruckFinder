# Food Truck Finder

## Dependencies
Dependencies include node, axios, and readline. See below for installation details.

Node:
brew install node or visit https://nodejs.org/en/ for more install options

Axios:
npm install axios or visit https://www.npmjs.com/package/axios

Readline:
npm install readline-sync or visit https://www.npmjs.com/package/readline-sync

You-Don't-Need-Lodash-Underscore:
npm install --save-dev eslint-plugin-you-dont-need-lodash-underscore

## How to run
After installing all necessary dependencies simply type "node foodTruckFinder.js" in your command line.

## Command line v. web page app 
For this challenge, I wanted to keep the code as simple as possible and focus on the requirements. If I were to write the same program for a full-scale web app I would certainly place my functions in classes such as foodTruck and foodTrucks. 'foodTruck' would have all the properties of a food truck while 'foodTrucks' would contain the list of trucks. This would allow me to easily reuse the objects. I would also combine classes with a tool like React so I could create a compartmentalized, responsive application. This setup would allow me to show more than just today's food trucks and keep track of a user's input.