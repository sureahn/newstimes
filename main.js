const API_KEY = `51e42bfd149e42b09848c52a9e31b23e`;
let newsList = [];

let url = new URL( //전역변수로 선언해서 다른 함수에서도 사용할 수 있게
  `https://newstimes-min.netlify.app/top-headlines?country=us&ㄴ&apiKey=${API_KEY}`
);

let menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getLatestNewsByCategory(event))
);

const getNews = async () => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    if (response.status === 200) {
      // 여기서 수정
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = () => {
  url = new URL(
    //`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    `https://newstimes-min.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
  );
  getNews();
};

const getLatestNewsByCategory = (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    `https://newstimes-min.netlify.app/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );
  getNews();
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

const searchNewsByKeyword = () => {
  const keyword = document.getElementById("search-input").value;
  // if (!keyword) {
  //   alert("검색어를 입력하세요.");
  //   return;
  // }

  url = new URL(
    // `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEY}`
    `https://newstimes-min.netlify.app/everything?q=${keyword}&country=kr&apiKey=${API_KEY}`
  );
  getNews();
};

const imgError = (image) => {
  image.onerror = null; // 이미지 에러 핸들러를 중복 호출하지 않도록 이벤트 리스너를 제거합니다.
  image.src =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU";
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
            <div class="col-lg-8 d-flex row">
              <div class="news-header">
                <h2 id="news-title">${news.title}</h2>
                <p id="news-content">${content}</p> 
              </div>
              <div class="news-footer d-flex justify-content-between">
                <div id="news-source">${news.source.name}</div>
                <div id="news-date">${news.publishedAt}</div> 
              </div>
            </div>
        </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML; // news-board에 붙임
};

// side menubar
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const pagenationRender = () => {
  //total result
  //page
  //pagesize
  //groupsize
  //pagegroup
  //lastpage
  //firstpage
};

getLatestNews();
