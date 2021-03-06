// Images
export const basePImageURL = "http://image.tmdb.org/t/p/w342";
export const baseBDImageURL = "http://image.tmdb.org/t/p/w780";
export const baseIGDBposterURL =
  "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/";
export const baseIGDBcoverURL =
  "https://images.igdb.com/igdb/image/upload/t_720p/";
export const baseIGDBbackdropURL =
  "https://images.igdb.com/igdb/image/upload/t_1080p/";

export const youtubeURL = "https://www.youtube.com/embed/";

export const mediaOptions = [
  {
    link: "/movies",
    icon: "theaters",
    display: "Movies",
  },
  {
    link: "/tv",
    icon: "tv",
    display: "TV",
  },
  {
    link: "/games",
    icon: "games",
    display: "Games",
  },
];

// Select Menus
export const viewOptions = [
  { value: "grid", icon: "view_module", display: "Grid" },
  { value: "list", icon: "list", display: "List" },
];

export const sortOptions = [
  { default: false, value: "score", icon: "star", display: "Score" },
  {
    default: false,
    value: "release",
    icon: "date_range",
    display: "Release",
  },
  {
    default: true,
    value: "popularity",
    icon: "whatshot",
    display: "Popularity",
  },
  {
    default: false,
    value: "revenue",
    icon: "attach_money",
    display: "Revenue",
  },
  {
    default: false,
    value: "budget",
    icon: "attach_money",
    display: "Budget",
  },
];

export const orderOptions = [
  {
    default: true,
    value: "desc",
    icon: "keyboard_arrow_down",
    display: "Descending",
  },
  {
    default: false,
    value: "asc",
    icon: "keyboard_arrow_up",
    display: "Ascending",
  },
];

// Category Menus
export const movieCategoryOptions = [
  { value: 0, text: "all", icon: "select_all", display: "All" },
  { value: 1, text: "want", icon: "schedule", display: "Want to Watch" },
  { value: 3, text: "done", icon: "done", display: "Watched" },
];

// FIX: fetch from GET /genre/movie/list regularly from server
export const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

// Filters
export const sortConfig = {
  sort: {
    currentValue: null,
    prepareValueForQuery: (value) => {
      if (!value) return null;
      else return value;
    },
    parseValueFromQuery: (query) => {
      /// make this common helper functione for get range from query
      if (query === "score" || query === "release" || query === "revenue") {
        return query;
      } else return null;
    },
  },
  order: {
    currentValue: null,
    prepareValueForQuery: (value) => {
      if (!value) return null;
      else return value;
    },
    parseValueFromQuery: (query) => {
      /// make this common helper functione for get range from query
      if (query === "asc") {
        return query;
      } else return null;
    },
  },
};

export const filterConfig = {
  score: {
    currentValue: null,
    // prepareValueForQuery takes whatever our value data structure is and turns it into a URL-safe string
    prepareValueForQuery: (value) => {
      if (!value) return null;
      else return `${value[0]}..${value[1]}`;
    },
    // i recommend renaming to parseValueFromQuery -> takes whatever was in the URL, and very safely tries to unwind to a value
    parseValueFromQuery: (query) => {
      /// make this common helper functione for get range from query
      const querySplit = query.split("..");
      if (querySplit.length === 2) {
        const min = parseInt(querySplit[0]);
        const max = parseInt(querySplit[1]);
        if (
          (min || min === 0) &&
          (max || max === 0) &&
          min <= max &&
          min >= 0 &&
          max <= 100
        ) {
          return [min, max];
        } else return null;
      }
    },
    prepareValueForChips: (value) => {
      if (!value) return null;
      else return `${value[0]}-${value[1]}`;
    },
  },
  // score_count: {
  //   currentValue: null,
  //   // prepareValueForQuery takes whatever our value data structure is and turns it into a URL-safe string
  //   prepareValueForQuery: (value) => {
  //     if (!value) return null;
  //     else return `${value[0]}..${value[1]}`;
  //   },
  //   // i recommend renaming to parseValueFromQuery -> takes whatever was in the URL, and very safely tries to unwind to a value
  //   parseValueFromQuery: (query) => {
  //     /// make this common helper functione for get range from query
  //     const querySplit = query.split("..");
  //     if (querySplit.length === 2) {
  //       const min = parseInt(querySplit[0]);
  //       const max = parseInt(querySplit[1]);
  //       if (
  //         (min || min === 0) &&
  //         (max || max === 0) &&
  //         min <= max &&
  //         min >= 0 &&
  //         max <= Number.MAX_VALUE
  //       ) {
  //         return [min, max];
  //       } else return null;
  //     }
  //   },
  //   prepareValueForChips: (value) => {
  //     if (!value) return null;
  //     else return `${value[0]}-${value[1]}`;
  //   },
  // },
  release: {
    currentValue: null,
    prepareValueForQuery: (value) => {
      if (!value) return null;
      else return `${value[0]}..${value[1]}`;
    },
    parseValueFromQuery: (query) => {
      const querySplit = query.split("..");
      return [parseInt(querySplit[0]), parseInt(querySplit[1])];
    },
    prepareValueForChips: (value) => {
      if (!value) return null;
      else return `${value[0]}-${value[1]}`;
    },
  },
  genre: {
    currentValue: null,
    prepareValueForQuery: (value) => {
      if (!value) return null;
      else return value.join(",");
    },
    parseValueFromQuery: (query) => {
      // console.log("query split: ", query.split(","));
      return query.split(",");
    },
    prepareValueForChips: (value) => {
      if (!value) return null;
      else return value.join(", ");
    },
  },
  runtime: {
    currentValue: null,
    prepareValueForQuery: (value) => {
      if (!value) return null;
      else return `${value[0]}..${value[1]}`;
    },
    parseValueFromQuery: (query) => {
      const querySplit = query.split("..");
      return [parseInt(querySplit[0]), parseInt(querySplit[1])];
    },
    prepareValueForChips: (value) => {
      if (!value) return null;
      else return `${value[0]}-${value[1]} minutes`;
    },
  },
};

export const filterConfigTest = {
  libcat: {
    display: "Library Category",
    currentValue: null,
    prepareValueForQuery: (value) => {
      if (!value) return null;
      else return value;
    },
    parseValueFromQuery: (query) => {
      return parseInt(query);
    },
    prepareValueForChips: (value) => {
      if (!value) return null;
      else return value;
    },
  },
  score: {
    currentValue: null,
    // prepareValueForQuery takes whatever our value data structure is and turns it into a URL-safe string
    prepareValueForQuery: (value) => {
      if (!value) return null;
      else return `${value[0]}..${value[1]}`;
    },
    // i recommend renaming to parseValueFromQuery -> takes whatever was in the URL, and very safely tries to unwind to a value
    parseValueFromQuery: (query) => {
      /// make this common helper functione for get range from query
      const querySplit = query.split("..");
      if (querySplit.length === 2) {
        const min = parseInt(querySplit[0]);
        const max = parseInt(querySplit[1]);
        if (
          (min || min === 0) &&
          (max || max === 0) &&
          min <= max &&
          min >= 0 &&
          max <= 100
        ) {
          return [min, max];
        } else return null;
      }
    },
    prepareValueForChips: (value) => {
      if (!value) return null;
      else return `${value[0]}-${value[1]}`;
    },
  },
  release: {
    currentValue: null,
    prepareValueForQuery: (value) => {
      if (!value) return null;
      else return `${value[0]}..${value[1]}`;
    },
    parseValueFromQuery: (query) => {
      const querySplit = query.split("..");
      return [parseInt(querySplit[0]), parseInt(querySplit[1])];
    },
    prepareValueForChips: (value) => {
      if (!value) return null;
      else return `${value[0]}-${value[1]}`;
    },
  },
  genre: {
    currentValue: null,
    prepareValueForQuery: (value) => {
      if (!value) return null;
      else return value.join(",");
    },
    parseValueFromQuery: (query) => {
      // console.log("query split: ", query.split(","));
      return query.split(",");
    },
    prepareValueForChips: (value) => {
      if (!value) return null;
      else return value.join(", ");
    },
  },
  runtime: {
    currentValue: null,
    prepareValueForQuery: (value) => {
      if (!value) return null;
      else return `${value[0]}..${value[1]}`;
    },
    parseValueFromQuery: (query) => {
      const querySplit = query.split("..");
      return [parseInt(querySplit[0]), parseInt(querySplit[1])];
    },
    prepareValueForChips: (value) => {
      if (!value) return null;
      else return `${value[0]}-${value[1]} minutes`;
    },
  },
};

export const libmoviecat = [
  { id: 1, name: "Want to Watch" },
  { id: 3, name: "Watched" },
];
