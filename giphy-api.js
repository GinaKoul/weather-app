const GiphyAPI = (function () {
  const key = "rwumCAtck97WphwKtudLV6GvEiyPqd26";

  async function get(value) {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${value}`
      );
      const responseData = await response.json();
      const data = responseData.data;
      if (Object.keys(data).length === 0) return;
      return data.images.original.url;
    } catch (error) {
      new Error(`Error status: ${error}`);
    }
  }

  return {
    get,
  };
})();
