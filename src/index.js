import "./styles.css";

const URL_BASE = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
const URL_KEY = `?key=${process.env.API_KEY}`
const URL_UNIT = "&unitGroup=metric"

const form = document.querySelector("form")
const locationInput = document.getElementById("location")
const loading = document.querySelector(".loading");
const fullAddress = document.querySelector(".fullAddress");
const timezone = document.querySelector(".timezone");
const temp = document.querySelector(".temp");
const feelslike = document.querySelector(".feelslike");
const conditions = document.querySelector(".conditions")

function getData(location){
  return fetch(URL_BASE + location + URL_KEY + URL_UNIT)
  .then(function(response){
    console.log("RESPONSE CODE: " + response.status)
    if (response.status == 200)
      return response.json();
    else if (response.status == 400)
      loading.textContent = "Please enter a valid location.";
    else
      loading.textContent = "An error occured."
    
  })
  .then(function(data){
    console.log("RESPONSE DATA: ", data)
    return data;
  })
  .catch(function(error){
    console.error("FETCH ERROR: " + error);
  });
}

function processData(data){
  return {
    fullAddress: data.resolvedAddress,
    timezone: data.timezone,
    temp: data.currentConditions.temp,
    feelslike: data.currentConditions.feelslike,
    conditions: data.currentConditions.conditions
  }
}


form.addEventListener("submit", (event) => {
  event.preventDefault();
  loading.textContent = "Loading..."
  console.log(locationInput.value)
  getData(locationInput.value)
  .then(function(fullData) {
    let processedData = processData(fullData)
    fullAddress.textContent = `Full Address: ${processedData.fullAddress}`;
    timezone.textContent = `Time Zone: ${processedData.timezone}`;
    temp.textContent = `Temp: ${processedData.temp} C`;
    feelslike.textContent = `Feels Like: ${processedData.feelslike} C`;
    conditions.textContent = `Conditions: ${processedData.conditions}`;

    loading.textContent = "Loaded!";
  })
  .catch(function(error) {
    console.log(error)
  });
  
})
