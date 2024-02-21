const API_KEY = `51e42bfd149e42b09848c52a9e31b23e`;
let newsList = []; // 전역 변수로 선언
const getLatestNews = async () => {
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
  const url = new URL(
    `https://newstimes-min.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
  ); // URL (instance)

  const response = await fetch(url); // 데이터 받을 때까지 fetch() 기다려줌
  const data = await response.json();
  newsList = data.articles; // news는 다른 곳에서도 쓸 예정. 전역 변수로 선언 후 재할당
  render();
  console.log("sss", newsList);
};

const render = () => {
  // UI 그려줌
  const newsHTML = newsList
    .map((news) => {
      const image = news.urlToImage
        ? news.urlToImage
        : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png`";
      const content = news.description ? news.description : "No content";
      const source = news.source ? news.source.name : "No source";

      return ` 
        <div class="row news row-gap-3">
            <div class="col-lg-4">
                <img class="news-img-size" src=${news.urlToImage} alt="" style="width: 100%;"/>
            </div>
            <div class="col-lg-8">
                <h2 id="news-title">${news.title}</h2>
                <p id="news-content">${content}</p>
                <div class="">${news.source.name} / ${news.publishedAt}</div>
            </div>
        </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML; // news-board에 붙임
};

// sidemenubar
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};
const openSearchBox = () => {
  // 창의 너비가 768px 미만인 경우에만 실행
  if (window.innerWidth < 768) {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  }
};

// const openSearchBox = () => {
//   let inputArea = document.getElementById("input-area");
//   if (inputArea.style.display === "inline") {
//     inputArea.style.display = "none";
//   } else {
//     inputArea.style.display = "inline";
//   }
// };

getLatestNews();
