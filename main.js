const API_KEY = `51e42bfd149e42b09848c52a9e31b23e`;
let newsList = [];

let url = new URL( //전역변수로 선언해서 다른 함수에서도 사용할 수 있게
  `https://newstimes-min.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`
);

let menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getLatestNewsByCategory(event))
);

let totalResults = 0;
let page = 1;
const pageSize = 5; //잘 변하지 않음
const groupSize = 5; //잘 변하지 않음

const getNews = async () => {
  try {
    url.searchParams.set("page", page); // &page = page
    url.searchParams.set("pageSize", pageSize);
    //url 호출 전에 두개 값 세팅 후 콜
    let response = await fetch(url);
    let data = await response.json();
    if (response.status === 200) {
      // 여기서 수정
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
    // page = 0;
    // totalPage = 0;
    // paginationRender();
  }
};

const getLatestNews = () => {
  url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
    `https://newstimes-min.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`
  );
  getNews();
};

const getLatestNewsByCategory = (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
    `https://newstimes-min.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
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
    // `https://newsapi.org/v2/everything?country=kr&q=${keyword}&apiKey=${API_KEY}`
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
      // const image = news.urlToImage
      //   ? news.urlToImage
      //   : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png?20210219185637";
      const content = news.description ? news.description : "No content";
      const source = news.source ? news.source.name : "No source";

      return ` 
        <div class="row news row-gap-3">
            <div class="col-lg-4">
                <img class="news-img" src=${
                  news.urlToImage ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                } / >
            </div>
            <div class="col-lg-8 d-flex row">
              <div class="news-header">
                <h2 id="news-title">${news.title}</h2>
                <p id="news-content">${content}</p> 
              </div>
              <div class="news-footer d-flex justify-content-between align-items-end">
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

const paginationRender = () => {
  //total result
  //page
  //pagesize
  //groupsize
  //totalPages
  const totalPages = Math.ceil(totalResults / pageSize);
  //pagegroup
  const pageGroup = Math.ceil(page / groupSize); //ceil : 반올림

  //lastpage
  const lastPage = pageGroup * groupSize;
  //마지막 페이지 그룹이 그룹사이즈보다 작으면 lastpage = totalpage
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  //firstpage
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = `<li class="page-item" onclick="moveToPage(1)"><a class="page-link">&lt;&lt;</a></li>
  <li class="page-item" onclick="moveToPage(${
    page - 1
  })"><a class="page-link">&lt;</a></li>
  `;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>
    `;
  }

  paginationHTML += `<li class="page-item" onclick="moveToPage(${
    page + 1
  })"><a class="page-link">&gt;</a></li>
  <li class="page-item" onclick="moveToPage(${totalPages})"><a class="page-link">&gt;&gt;</a></li>
  `;

  // if (firstPage >= 6) {
  //   paginationHTML = `<li class="page-item" onclick="moveToPage(1)">
  //                       <a class="page-link" href='#js-bottom'>&lt;&lt;</a>
  //                     </li>
  //                     <li class="page-item" onclick="moveToPage(${page - 1})">
  //                       <a class="page-link" href='#js-bottom'>&lt;</a>
  //                     </li>`;
  // }
  // for (let i = firstPage; i <= lastPage; i++) {
  //   paginationHTML += `<li class="page-item ${i == page ? "active" : ""}" >
  //                       <a class="page-link" href='#js-bottom' onclick="moveToPage(${i})" >${i}</a>
  //                      </li>`;
  // }

  // if (lastPage < totalPages) {
  //   paginationHTML += `<li class="page-item" onclick="moveToPage(${page + 1})">
  //                       <a  class="page-link" href='#js-program-detail-bottom'>&gt;</a>
  //                      </li>
  //                      <li class="page-item" onclick="moveToPage(${totalPages})">
  //                       <a class="page-link" href='#js-bottom'>&gt;&gt;</a>
  //                      </li>`;
  // }

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  console.log("moveToPage", pageNum);
  page = pageNum;
  getNews();
};

getLatestNews();
