import { getByBookmarked } from "./components/bookmark.js";
import { getJSON } from "./helpers.js";
import { API_KEY, IMAGE_BASE } from "./config.js";
import { getMovies,pageCount} from "./components/discover.js";
import { getById } from "./components/detailpage.js";
import { coverMovie } from "./components/cover.js";
import { getSearch,closeSearchBtn } from "./components/search.js";

coverMovie();
getMovies();
closeSearchBtn();

