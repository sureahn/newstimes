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

const render = () => {
  let resultHTML = newsList
    .map((news) => {
      return `<div class="news row">
        <div class="col-lg-4">
            <img class="news-img"
                src="${
                  news.urlToImage ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                }" />
        </div>
        <div class="col-lg-8">
            <a class="title" target="_blank" href="${news.url}">${
        news.title
      }</a>
            <p>${
              news.description == null || news.description == ""
                ? "내용없음"
                : news.description.length > 200
                ? news.description.substring(0, 200) + "..."
                : news.description
            }</p>
            <div>${news.source.name || "no source"}  ${moment(
        news.publishedAt
      ).fromNow()}</div>
        </div>
    </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = resultHTML;

  const imgError = (image) => {
    image.onerror = null;
    image.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU";
  };

  const errorRender = (errorMessage) => {
    document.getElementById(
      "news-board"
    ).innerHTML = `<h3 class="text-center alert alert-danger mt-1">${message}</h3>`;
  };
};

// side menubar
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

getLatestNews();
