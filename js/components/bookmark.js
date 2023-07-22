import { getJSON } from "../helpers.js";
import { getById,detailClose,detailPage,bgOverlay} from "./detailpage.js";
import { API_KEY} from "../config.js";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w1280";

const AllMovie = document.querySelectorAll(".movies-container");

const AllBookMarked = document.querySelectorAll(".movies-container-bookmark");
const movieContainerBookmark = document.querySelector(".movies-container-bookmark");
const savedfilms = document.querySelector(".saved-movies");
const movieDiscover = document.querySelector(".movie-discover");
const heroContainer = document.querySelector(".hero-wrapper-main");
const closeArrow = document.querySelector(".left-arrow-bookmark");
const SearchTitle = document.querySelector(".movie-section-header-bookmark");
const movieBookMark = document.querySelector(".movie-discover-bookmark");
const AllSearchResult = document.querySelectorAll(".movies-container-search");
const movieContainerSearch = document.querySelector(".movies-container-search");
const removeSearch = document.querySelector(".movie-discover-search");

export const bookmarked = getBookmarkFromStore();

function addBookmarkToStore(bookmark){
    bookmarked.push(bookmark);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarked));
}
function getBookmarkFromStore(){
    let bookmarkedMovies;
    if(localStorage.getItem("bookmarks") ===  null){
      bookmarkedMovies = [];
    }else{
      bookmarkedMovies = JSON.parse(localStorage.getItem("bookmarks"));
    }
   return bookmarkedMovies;
}

function removeBookmarks(deletedid){
  const bookmarksFromLocal =  getBookmarkFromStore();
  const deletedMovieIndex = bookmarksFromLocal.findIndex(movieId => movieId === deletedid);
    
  if (deletedMovieIndex !== -1) {
    bookmarksFromLocal.splice(deletedMovieIndex, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksFromLocal));
}
if(bookmarksFromLocal.length == 0){
  heroContainer.classList.remove("hider");
  movieDiscover.classList.remove("hider");
  movieContainerBookmark.classList.add("hider");
  SearchTitle.classList.add("hider");
  closeArrow.classList.add("hider");
  movieContainerBookmark.innerHTML="";
}
}

savedfilms.addEventListener("click",() => {
  if(!removeSearch.classList.contains("hider")){
    heroContainer.classList.add("hider");
    movieDiscover.classList.add("hider");
    console.log("içermiyor")
    movieContainerBookmark.classList.remove("hider");
    movieBookMark.classList.remove("hider");
  }
  if(removeSearch.classList.contains("hider")){
    console.log("içeriyor")
    movieContainerBookmark.classList.add("hider");
    heroContainer.classList.remove("hider");
    movieDiscover.classList.remove("hider");
    movieBookMark.classList.add("hider");
  }
 
    removeSearch.classList.toggle("hider");

  
    closeArrow.classList.toggle("hider");
    SearchTitle.classList.toggle("hider");

    const bookmarksfromlocal = getBookmarkFromStore();

    if(bookmarked.length == 0){
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.margin = "5rem auto";
        // wrapper.style.marginTop =
        wrapper.style.flexDirection = "column";
        wrapper.style.alignItems = "center";
        wrapper.style.justifyContent = "center";
        const error = document.createElement("i");
        error.classList.add("fa-solid");
        error.classList.add("fa-film");
        error.style.marginBottom = "2rem";
        error.style.fontSize = "15rem";
        error.style.color = "#e4e4e4";
        const div = document.createElement("div");
        div.textContent = "first you have to add movies to favorites";
        div.style.fontSize = "2rem";
        div.style.color = "#e4e4e4";
        wrapper.appendChild(error);
        wrapper.appendChild(div);
        movieContainerBookmark.appendChild(wrapper);
    }

    bookmarksfromlocal.forEach(bookmark => {
      getByBookmarked(bookmark);
    })
    movieContainerBookmark.innerHTML="";
  })


detailClose.addEventListener("click",(e) => {
    if(e.target.classList.contains("fa-xmark")){
        bgOverlay.classList.add("hider");
         detailPage.classList.add("hider")
    }
});
bgOverlay.addEventListener("click",() => {
    bgOverlay.classList.add("hider");
    detailPage.classList.add("hider");
});


AllMovie.forEach(movie => {
    movie.addEventListener("click",(e) => {
      if(e.target.classList.contains("favorite-movie") || e.target.classList.contains("fa-bookmark")){
        e.target.closest(".movie-card").style.display = "none";
      }
      if(e.target.classList.contains("favorite-movie") || e.target.classList.contains("fa-bookmark") ){
          const favMovie = e.target.closest(".favorite-movie");
          favMovie.classList.add("bookmarked");
          const savedMovie = e.target.closest(".movie-card").dataset.id;
          addBookmarkToStore(savedMovie);
      }else{
        const eachFilm = e.target.closest(".movie-card");
        if(!eachFilm) return
        bgOverlay.classList.toggle("hider");
        detailPage.classList.toggle("hider");
        const movieId = eachFilm.dataset.id;
        getById(movieId);
      }
    })
})


AllSearchResult.forEach(movie => {
    movie.addEventListener("click",(e) => {
      if(e.target.classList.contains("favorite-movie") || e.target.classList.contains("fa-bookmark")){
        e.target.closest(".movie-card").style.display = "none";
      }
      if(e.target.classList.contains("favorite-movie") || e.target.classList.contains("fa-bookmark") ){
          const favMovie = e.target.closest(".favorite-movie");
          favMovie.classList.add("bookmarked");
          const savedMovie = e.target.closest(".movie-card").dataset.id;
          addBookmarkToStore(savedMovie);
      }else{
        const eachFilm = e.target.closest(".movie-card");
        if(!eachFilm) return
        bgOverlay.classList.toggle("hider");
        detailPage.classList.toggle("hider");
        const movieId = eachFilm.dataset.id;
        getById(movieId);
      }
    })
})


export const getByBookmarked= async function(filmid){
  
    const data = await getJSON(`https://api.themoviedb.org/3/movie/${filmid}?api_key=${API_KEY}`)    
      const { title, poster_path, vote_average,id } = data;

       let html = "";
       html += `
           <div class="movie-card" data-id="${id}">
             <img src="${IMAGE_BASE}${poster_path}" alt="${title}" class="movie-cover">
             <h1 class="movie-title">${title}</h1>
             <span class="movie-rating">${vote_average.toFixed(1)}</span>
             <span class="favorite-movie"><i class="fa-solid fa-trash"></i></span>
           </div>
       `;

       movieContainerBookmark.insertAdjacentHTML("beforeend", html);

}


AllBookMarked.forEach(movie => {
  movie.addEventListener("click",(e) => {
    if(e.target.classList.contains("favorite-movie") || e.target.classList.contains("fa-trash") ){
        const selectedMovie = e.target.closest(".movie-card");
        const deletedBookMark =selectedMovie.dataset.id;
        removeBookmarks(deletedBookMark);
        selectedMovie.remove();
    }else{
      const eachFilm = e.target.closest(".movie-card");
      if(!eachFilm) return
      bgOverlay.classList.toggle("hider");
      detailPage.classList.toggle("hider");
      const movieId = eachFilm.dataset.id;
      getById(movieId);
    }
  })
})


closeArrow.addEventListener("click",() => {
      heroContainer.classList.remove("hider");
      movieDiscover.classList.remove("hider");
      movieContainerBookmark.classList.add("hider");
      SearchTitle.classList.add("hider");
      closeArrow.classList.add("hider");
      movieContainerBookmark.innerHTML="";
})
