const WeatherAPI = (function () {
  const key = "3RFBBRGPYLRTV7JL369Z57XJN";

  async function getWeatherData(location) {
    try {
      const results = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`
      );
      return await results.json();
    } catch (error) {
      new Error(`Error status: ${error}`);
    }
  }

  function proccessData(data) {
    const current = data["currentConditions"];

    return new Promise((resolve) => {
      resolve({
        resolvedAddress: data["resolvedAddress"],
        datetime: current["datetime"],
        icon: current["icon"],
        currentConditions: {
          conditions: {
            title: "Conditions",
            content: current["conditions"],
          },
          temp: {
            title: "Temperature",
            content: current["temp"],
          },
          feelslike: {
            title: "Feels like",
            content: current["feelslike"],
          },
          cloudcover: {
            title: "Cloud cover",
            content: current["cloudcover"],
          },
          humidity: {
            title: "Humidity",
            content: current["humidity"],
          },
          visibility: {
            title: "Visibility",
            content: current["visibility"],
          },
          windspeed: {
            title: "Wind speed",
            content: current["windspeed"],
          },
          snow: {
            title: "Snow",
            content: current["snow"],
          },
        },
      });
    });
  }

  async function search(value) {
    try {
      const data = await getWeatherData(value);
      return await proccessData(data);
    } catch (error) {
      new Error(`Error status: ${error}`);
    }
    // Same as
    // getWeatherData(searchValue).then(proccessData).then(console.log);
  }

  return {
    search,
  };
})(document);
