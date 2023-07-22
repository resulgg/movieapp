import { getJSON } from "../helpers.js";
import { API_KEY, IMAGE_BASE } from "../config.js";
import { bookmarked } from "./bookmark.js";

const movieContainer = document.querySelector(".movies-container");
const closeArrow = document.querySelector(".fa-arrow-left");
const closeArrowBook = document.querySelector(".left-arrow-bookmark");
const SearchTitleBook = document.querySelector(".movie-section-header-bookmark");
const movieContainerBookmark = document.querySelector(".movies-container-bookmark");
const movieBookMark = document.querySelector(".movie-discover-bookmark");
closeArrow.classList.add("hider");
closeArrowBook.classList.add("hider");
SearchTitleBook.classList.add("hider");
movieContainerBookmark.classList.add("hider");


export let pageCount = 1;
export const getMovies = async function () {
  const data = await getJSON(
    `https://api.themoviedb.org/3/movie/popular?page=${pageCount}&api_key=${API_KEY}`
  );
  const allData = data.results;
  allData.map((data) => {
     const { title, poster_path, vote_average,backdrop_path,id } = data;
    if(Array.from(bookmarked).some(od => od == id)) return;
     let html = "";
     html += `
         <div class="movie-card" data-id="${id}">
           <img src="${IMAGE_BASE}${poster_path}" alt="${title}" class="movie-cover">
           <h1 class="movie-title">${title}</h1>
           <span class="movie-rating">${vote_average.toFixed(1)}</span>
           <span class="favorite-movie"><i class="fa-solid fa-bookmark"></i></span>
         </div>
     `;
     movieContainer.insertAdjacentHTML("beforeend", html);
   });
};


window.addEventListener("scroll", () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight + 450 >= scrollHeight) {
        setTimeout(() => {
        pageCount++;
       getMovies();
      }, 1);
    }
  });

  
