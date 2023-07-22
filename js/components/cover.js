import { getJSON } from "../helpers.js";
import { API_KEY } from "../config.js";
import {
  bgOverlay,
  detailClose,
  detailPage,
} from "../components/detailpage.js";
import { getMovies } from "./discover.js";
import { getById } from "../components/detailpage.js";
const coverContainer = document.querySelector(".hero");
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

const coverDb = [872585,157336];

let randomId = coverDb[Math.trunc(Math.random()* coverDb.length)];

export const coverMovie = async function () {
  const data = await getJSON(
    `https://api.themoviedb.org/3/movie/${randomId}?api_key=${API_KEY}`
  );

  const { title, backdrop_path, overview } = data;
  
  let html = `
       <div class="hero-details">
                <h2 class="hero-in-title">${title}</h2>
                <p class="hero-in-desc">${overview}</p>
         </div>
            <img src="${IMAGE_BASE}${backdrop_path}" alt="" class="hero-img">
    `;
  coverContainer.innerHTML = html;
};

detailClose.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-xmark")) {
    bgOverlay.classList.add("hider");
    detailPage.classList.add("hider");
  }
});
bgOverlay.addEventListener("click", () => {
  bgOverlay.classList.add("hider");
  detailPage.classList.add("hider");
});

coverContainer.addEventListener("click", () => {
  bgOverlay.classList.toggle("hider");
  detailPage.classList.toggle("hider");
  getById(randomId);
});
