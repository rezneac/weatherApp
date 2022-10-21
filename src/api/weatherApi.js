const fetchApiCall = () => {
  fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/nn3%208ax?unitGroup=metric&include=days%2Chours%2Ccurrent&key=VPTUW45YW8CY9Q8TAEQ43BLNR&contentType=json",
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
};
