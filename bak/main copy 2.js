const API_KEY = `51e42bfd149e42b09848c52a9e31b23e`;
let newsList = []; // 전역 변수로 선언
const menus = document.querySelectorAll(".menus button"); //카테고리 불러오기
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getLatestNewsByCategory(event))
);

const getLatestNews = async () => {
  //뉴스 가져오기
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  // const url = new URL(
  //   `https://newstimes-min.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
  // ); // URL (instance)

  const response = await fetch(url); // 데이터 받을 때까지 fetch() 기다려줌
  const data = await response.json();
  newsList = data.articles; // news는 다른 곳에서도 쓸 예정. 전역 변수로 선언 후 재할당
  render();
  console.log("sss", newsList);
};

const getLatestNewsByCategory = async (event) => {
  //카테고리별 뉴스 가져오기
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("ddd", data);
  newsList = data.articles;
  render();
};

const searchNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  if (!keyword) {
    alert("검색어를 입력하세요.");
    return;
  }

  const url = new URL(
    `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();

  if (data.articles.length === 0) {
    alert("검색 결과가 없습니다.");
    return;
  }

  newsList = data.articles;
  render();
};

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", searchNewsByKeyword);

const imgError = (image) => {
  image.onerror = null; // 이미지 에러 핸들러를 중복 호출하지 않도록 이벤트 리스너를 제거합니다.
  image.src =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU";
};

const render = () => {
  const newsHTML = newsList
    .map((news) => {
      const image = news.urlToImage
        ? news.urlToImage
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"; // 대체 이미지 URL
      const content = news.description ? news.description : "No content";
      const source = news.source ? news.source.name : "No source";

      return `
        <div class="row news row-gap-3">
            <div class="col-lg-4">
                <img class="news-img-size" src="${image}" alt="News Image" style="width: 100%;" onerror="imgError(this)">
            </div>
            <div class="col-lg-8">
                <h2 id="news-title">${news.title}</h2>
                <p id="news-content">${content}</p>
                <div class="">${source} / ${moment(
        news.publishedAt
      ).fromNow()}</div>
            </div>
        </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
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

getLatestNews();
