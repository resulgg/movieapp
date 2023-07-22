import { getJSON } from "../helpers.js";
import { API_KEY} from "../config.js";

const AllMovie = document.querySelectorAll(".movies-container");
export const bgOverlay = document.querySelector(".background-overlay");
export const detailClose = document.querySelector(".detail-main");
export const detailPage = document.querySelector(".detail-main");


const IMAGE_BASE = "https://image.tmdb.org/t/p/w1280";


export const getById = async function(filmid){
    const data = await getJSON(`https://api.themoviedb.org/3/movie/${filmid}?api_key=${API_KEY}`)
    const allData = data;
   
    const { title, vote_average,backdrop_path,poster_path,runtime,release_date,budget,overview,genres} = data;
    
    let html = `
    <div class="detail-wrapper ">
    <img src="${IMAGE_BASE}${backdrop_path || poster_path}" alt="${title}" class="detail-poster">
    <div class="detail-info-wrapper">
      <div class="general-info">
        <span class="detail-vote-average"><i class="fa-solid fa-star detail-icon"></i> ${vote_average.toFixed(1)}</span>
        <span class="detail-duration"><i class="fa-solid fa-clock-rotate-left detail-icon"></i> ${runtime}m</span>
        <span class="detail-relase-date"><i class="fa-solid fa-calendar-days detail-icon"></i> ${release_date.split("-").reverse().join("-")}</span>
        <span class="budget"><i class="fa-solid fa-comment-dollar detail-icon"></i> ${budget ==  0 ? "👀" : budget.toLocaleString("en-US")}</span>
      </div>
      <div class="detail-info-main-wrapper">
        <h1 class="detail-title">${title}</h1>
        <p class="detail-overview">${overview}</p>
        <span class="detail-genres"><i class="fa-solid fa-folder-open detail-icon"></i> Genres : ${genres.map(genre => genre.name).join(", ")}</span>
      </div>
    </div>
  <i class="fa-solid fa-xmark"></i>
  </div>
       `;
       detailPage.innerHTML = html;
}