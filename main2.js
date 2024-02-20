// const API_KEY = `51e42bfd149e42b09848c52a9e31b23e`;
// const getLatestNews = () => {
//     // const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
//     const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`); //URL (instance)
//     console.log("uuu",url);
// };

// getLatestNews();


console.log("Script is executing"); // Debugging statement
const API_KEY = `51e42bfd149e42b09848c52a9e31b23e`;

const getLatestNews = () => {
    console.log("Function getLatestNews is executing"); // Debugging statement
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
    print(url);
};

getLatestNews();
