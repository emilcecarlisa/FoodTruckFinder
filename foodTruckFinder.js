const axios = require('axios'); 
const readline = require('readline-sync');

/**
 * Returns object containing food truck details from API
 * @return {Object} with array of objects.
 **/
function fetchData() {
  return axios.get('http://data.sfgov.org/resource/bbb8-hzi6.json')
  .then(response => {
    return response.data;
  }).catch(err => { console.log(`Problem with data fetch. See error: ${err}`) });
}
/**
 * Gets current time 
 * @return {Date Object} 
 **/
function getTime() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  return time;
}
/**
 * Function manipulates API data into object containing currently open food trucks 
 * @return {Array} of strings containing details of open food trucks.
 **/
async function openFoodTrucks() {
  const foodData = await fetchData();
  const currentTime = getTime();

  let truckList = [];
  for (let value of Object.values(foodData)) {
    if (currentTime < value["end24"] && currentTime > value["start24"]) {
      truckList.push(`${value["applicant"]} (${value["location"]})`);
    };
  }
  const sortedFoodList = truckList.sort();
  const uniqList = [...new Set(sortedFoodList)];
  return uniqList;
}
/**
 * Function paginates an input array to the requested size and starting page.
 * @return {Array} 
 **/
function paginate(array, pageSize, pageNumber) {
  --pageNumber;
  return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
}

async function showFoodTrucks() {
  const openFoodList = await openFoodTrucks();
  const pageLimit = 10; 
  let currentPage = 1;
  
  if (openFoodList.length == 0 || openFoodList == []) {return console.log("Nothing's open!")};
  console.log('Open Food Trucks: ',openFoodList.length);

  for (let grouping = 0; grouping < openFoodList.length; grouping += pageLimit) {
    const truckGroup = paginate(openFoodList,pageLimit,currentPage);
      
    if (truckGroup) { 
      console.log('Page Number', currentPage);

      for (let company of truckGroup) {
        console.log("\n", company);
      }
      var answer = readline.question("\nSee more food trucks? (y/n):");

      if (answer == 'y') { 
        ++currentPage;
      } else if (answer == 'n') {
        console.log("Bon appetit!")
        break
      } else {
        console.log("Please enter 'y' or 'n'.")
      }
    }
  }
}

showFoodTrucks(); // runs program