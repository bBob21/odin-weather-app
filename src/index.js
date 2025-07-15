import "./styles.css";

const URL_BASE = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
const URL_KEY = `?key=${process.env.API_KEY}`

function getData(location){
  return fetch(URL_BASE+location+URL_KEY)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    return data;
  })
  .catch(function(error){
    console.error(error);
  });
}

const melbourne = await getData("Melbourne")
window.melbourne = melbourne;
