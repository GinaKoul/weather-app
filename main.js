(function (doc) {
  const key = "3RFBBRGPYLRTV7JL369Z57XJN";
  let searchField;
  let searchButton;

  async function getWeatherData(location) {
    const results = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`
    );
    return await results.json();
  }

  function proccessData(data) {
    const current = data["currentConditions"];

    return new Promise((resolve, reject) => {
      resolve({
        resolvedAddress: data["resolvedAddress"],
        currentConditions: {
          cloudcover: current["cloudcover"],
          conditions: current["conditions"],
          datetime: current["datetime"],
          feelslike: current["feelslike"],
          humidity: current["humidity"],
          icon: current["icon"],
          temp: current["temp"],
          windspeed: current["windspeed"],
          visibility: current["visibility"],
          snow: current["snow"],
        },
      });
    });
  }

  function searchWeather() {
    const searchValue = searchField.value;
    if (!searchValue) return;
    getWeatherData(searchValue).then(proccessData).then(console.log);
  }

  function cacheDom() {
    searchField = doc.querySelector("#weatherSearch");
    searchButton = doc.querySelector("#getWeather");
  }

  function bindEvents() {
    searchButton.addEventListener("click", searchWeather);
  }

  function init() {
    cacheDom();
    bindEvents();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(document);
