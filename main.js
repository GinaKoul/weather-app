(function (doc) {
  let mainContent;
  let searchField;
  let searchButton;

  function createDataSection(data) {
    const articleSection = doc.createElement("section");
    const title = doc.createElement("h3");
    title.textContent = data["title"];
    const content = doc.createElement("p");
    content.textContent = data["content"];
    articleSection.append(title, content);
    return articleSection;
  }

  function createDateTimeEl(data) {
    const today = new Date();
    const dateTime = doc.createElement("p");
    dateTime.classList.add("date-time");

    const date = doc.createElement("span");
    date.textContent = `${today.getDay()} ${today.toLocaleString("default", {
      month: "long",
    })} ${today.getFullYear()}`;

    const time = doc.createElement("time");
    const [hours, minutes] = data.split(":");
    time.textContent = ` ${hours}:${minutes}`;
    time.setAttribute(
      "datetime",
      `${today.getFullYear()}-${
        today.getMonth
      }-${today.getDay()} ${hours}:${minutes}`
    );

    dateTime.append(date, time);
    return dateTime;
  }

  async function renderData(data) {
    mainContent.textContent = "";

    const title = doc.createElement("h2");
    title.textContent = data["resolvedAddress"];

    const dateTime = createDateTimeEl(data["datetime"]);

    const currentConditions = data["currentConditions"];
    const details = doc.createElement("div");
    details.classList.add("details");

    for (let key in currentConditions) {
      details.append(createDataSection(currentConditions[key]));
    }

    mainContent.append(title, dateTime, details);

    const gif = document.createElement("img");
    gif.setAttribute("src", await GiphyAPI.get(data["icon"]));
    mainContent.append(gif);
  }

  async function handleSearch() {
    try {
      const searchValue = searchField.value;
      if (!searchValue) return;
      const newData = await WeatherAPI.search(searchValue);
      renderData(newData);
    } catch (error) {
      new Error(`Error status: ${error}`);
    }
  }

  function cacheDom() {
    mainContent = doc.querySelector("#content");
    searchField = doc.querySelector("#weatherSearch");
    searchButton = doc.querySelector("#getWeather");
  }

  function bindEvents() {
    searchButton.addEventListener("click", handleSearch);
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
