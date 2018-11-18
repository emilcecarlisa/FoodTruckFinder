const axios = require('axios'); // import not supported by NodeJS by default
const readline = require('readline-sync');
const uniq = require('underscore');
/**
 * Returns object containing food truck details from API
 * @return {Object} with array of objects.
 **/
function fetchData() {
  return axios.get('http://data.sfgov.org/resource/bbb8-hzi6.json')
  .then(response => {
    return response.data
  }).catch(err => { console.log(`Problem with data fetch. See error: ${err}`) });
}
/**
 * Logs current time 
 * @return {Date Object} 
 **/
function getTime() {
  let now = new Date()
  let time = now.toLocaleTimeString();
  return time
}
/**
 * Function manipulates API data into object containing currently open food trucks 
 * @return {Array} of strings containing details of open food trucks.
 **/
async function openFoodTrucks() {
  const foodData = await fetchData();
//   const currentTime = getTime();
const date = new Date('November 15, 2018 :21:30 GMT+00:00');  
const currentTime = date.toLocaleTimeString();
console.log(currentTime)
  let truckList = [];
  for (let value of Object.values(foodData)) {
    //   console.log('in here!')
    if (currentTime < value["end24"] && currentTime > value["start24"]) {
      truckList.push(`${value["applicant"]} (${value["location"]}): ${value["starttime"]}-${value["endtime"]}`);
    };
  }
  const sortedFoodList = truckList.sort();
  const uniqList = uniq(sortedFoodList,true);
  console.log(uniqList)
  return sortedFoodList;
}
/**
 * Function paginates an input array to the requested size and starting page  
 * @return {Array} 
 **/
function paginate(array, pageSize, pageNumber) {
  --pageNumber;
  return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
}

async function showFoodTrucks() {
  const openFood = await openFoodTrucks();
  const pageLimit = 10; 
  let currentPage = 1;

  if (openFood.length == 0 || openFood == []) {return console.log("Nothing's open!")}
  
  for (let i = 0; i < openFood.length; i += 10) {
    const truckGroup = paginate(openFood,pageLimit,currentPage);
    
    if (truckGroup) {
      for (let company of truckGroup) {
        console.log(company);
      }
      var answer = readline.question("See more food trucks? (y/n):");

      if (answer == 'y') { 
        ++currentPage;
        console.log('page number', currentPage);
      } else if (answer == 'n') {
        console.log("Bon appetit!")
        break
      } else {
        console.log("Please enter 'y' or 'n'.")
      }
    }
  }
}
showFoodTrucks();