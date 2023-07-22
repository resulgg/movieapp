import { getJSON } from "../helpers.js";
import { API_KEY, IMAGE_BASE } from "../config.js";
import { bookmarked } from "./bookmark.js";
import {
    bgOverlay,
    detailClose,
    detailPage,
  } from "../components/detailpage.js";
  import { getMovies } from "./discover.js";
  import { getById } from "../components/detailpage.js";

const searchInput = document.querySelector(".search-input");
const searchEvent = document.querySelector(".search-wrapper");
const searchIcon = document.querySelector(".search-icon");
const heroContainer = document.querySelector(".hero-wrapper-main");
const movieDiscover = document.querySelector(".movie-discover");
const SearchTitle = document.querySelector(".movie-section-header-search");
const movieContainerSearch = document.querySelector(".movies-container-search");
const AllSearchResult = document.querySelectorAll(".movies-container-search");
const closeArrow = document.querySelector(".left-arrow-search");
const movieContainer = document.querySelector(".movies-container");
const bookMarkContainer = document.querySelector(".movie-discover-bookmark");
const movieDiscoverSearch = document.querySelector(".movie-discover-search");

export const getSearch = async function (query) {
  const data = await getJSON(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`
  );

  heroContainer.classList.add("hider");
  movieDiscover.classList.add("hider");
  closeArrow.classList.remove("hider");
  bookMarkContainer.classList.add("hider");
  movieDiscoverSearch.classList.remove("hider");

  const userQuery = searchInput.value.trim();
  SearchTitle.textContent = `Search results for "${userQuery}"`;
    movieContainerSearch.innerHTML="";

  const allData = data.results;
  allData.map((data) => {
    const { title, poster_path, vote_average, id } = data;
    if(Array.from(bookmarked).some(od => od == id)) return;
    let html = "";

    html += `
           <div class="movie-card" data-id="${id}">
             <img src="${IMAGE_BASE}${poster_path} " alt="${title}" class="movie-cover">
             <h1 class="movie-title">${title}</h1>
             <span class="movie-rating">${vote_average.toFixed(1)}</span>
             <span class="favorite-movie"><i class="fa-solid fa-bookmark"></i></span>
           </div>
       `;
    movieContainerSearch.insertAdjacentHTML("beforeend", html);
    searchInput.value = "";
  });
};


searchEvent.addEventListener("submit", (e) => {
    e.preventDefault();
    if(searchInput.value.trim() == "") return;
    const query = searchInput.value.trim();
    getSearch(query);
  });
  searchIcon.addEventListener("click", () => {

    if(searchInput.value.trim() == "") return;
    const query = searchInput.value.trim();
    getSearch(query);
  });

 export const closeSearchBtn = function(){
    closeArrow.addEventListener("click",() => {
        heroContainer.classList.remove("hider");
        movieDiscover.classList.remove("hider");
        movieContainerSearch.classList.add("hider");
        SearchTitle.classList.add("hider");
        closeArrow.classList.add("hider");
        movieContainerSearch.innerHTML="";
      })
  }