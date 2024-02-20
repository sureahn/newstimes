const API_KEY = `51e42bfd149e42b09848c52a9e31b23e`;
let news = []; //전역변수로 선언
const getLatestNews = async () => {
    // const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`); //URL (instance)

    const response = await fetch(url); //데이터 받을때까지 fetch() 기다려줌
    const data = await response.json();
    news = data.articles; //news는 다른곳에서도 쓸 예정. 전역변수로 선언 후 재할당
    console.log("sss", news);
};

getLatestNews();