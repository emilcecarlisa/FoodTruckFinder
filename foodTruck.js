const axios = require('axios'); // import not supported by NodeJS by default
var readline = require('readline-sync');

/**
 * Returns object containing food truck details from API
 * @return {Object} with array of objects
 **/
function fetchData() {
  return axios.get('http://data.sfgov.org/resource/bbb8-hzi6.json')
  .then(response => {
    return response.data
  }).catch(err => { console.log(`Problem with data fetch. See error: ${err}`) });
}
/**
 * Takes current time 
 * @return {Date Object} 
 **/
function getTime() {
  let now = new Date()
  let time = now.toLocaleTimeString();
  // console.log('DATE', time)
  return time
}
/**
 * Function manipulates API data into object containing currently open food trucks 
 * @return {Object} 
 **/
async function openFoodTrucks() {
  const foodData = await fetchData();
  const currentTime = getTime();
  let foodList = [];
  for (let value of Object.values(foodData)) {
    if (currentTime < value["end24"] && currentTime > value["start24"]) {
      foodList.push(`${value["applicant"]} (${value["location"]}): ${value["starttime"]}-${value["endtime"]}`);
    };
  }
  const sortedFoodList = foodList.sort();
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
        console.log("Bon apetit!")
        break
      } else {
        console.log("Sorry, I didn't understand")
      }
    }
  }
}
showFoodTrucks();