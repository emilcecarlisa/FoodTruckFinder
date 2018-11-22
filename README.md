# Food Truck Finder

##What This Program Does
It's a command line program that prints out a list of food trucks that are open at the current date and time. The food trucks are in San Francisco and more information about the API can be found through [Socrata](https://dev.socrata.com/foundry/data.sfgov.org/bbb8-hzi6).

##Install
Dependencies include node, axios, and readline. See below for installation details.

####Node:
```
brew install node 
```
or visit https://nodejs.org/en/ for more install options

####Axios:
```npm install axios ``` or visit https://www.npmjs.com/package/axios

####Readline:
```npm install readline-sync ``` or visit https://www.npmjs.com/package/readline-sync

####You-Don't-Need-Lodash-Underscore:
```npm install --save-dev eslint-plugin-you-dont-need-lodash-underscore```

## How to run
After installing all necessary dependencies type this in your command line: 
```
node foodTruckFinder.js
```
Navigate the results by responding to the prompt with 'y' for yes or 'n' for no.

## Command line v. web page app 
If I were to write the same program for a full-scale web app I would make the codebase more atomic by converting certain functions into classes. For example 'showFoodTrucks' could be a class called FoodTrucks, where it manages the state of the list. 'showFoodTrucks' is intricately tied to the pagination function. I could also make 'paginate' its own class and pass it as a parameter inside of the class rendering the list of open trucks. 

In addition, I'd introduce a tool like React so I could create a compartmentalized, responsive application. It would allow me to show a list that updates as the time changes or respond to user input. I'd also love to show more than just the name and location by expanding it with a map that uses your zipcode to determine the closest trucks to you. 