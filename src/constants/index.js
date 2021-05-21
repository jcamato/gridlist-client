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

// Select Menus
export const viewOptions = [
  { value: "grid", icon: "view_module", display: "Grid" },
  { value: "list", icon: "list", display: "List" },
];

export const sortOptions = [
  { value: "vote_average", icon: "star", display: "Score" },
  { value: "release_date", icon: "date_range", display: "Release Date" },
  { value: "popularity", icon: "whatshot", display: "Popularity" },
  { value: "original_title", icon: "sort_by_alpha", display: "Title" },
  { value: "revenue", icon: "attach_money", display: "Revenue" },
];

export const sortDirectionOptions = [
  { value: "desc", icon: "keyboard_arrow_down", display: "Descending" },
  { value: "asc", icon: "keyboard_arrow_up", display: "Ascending" },
];

// Category Menus
export const movieCategoryOptions = [
  { value: 0, text: "all", icon: "select_all", display: "All" },
  { value: 1, text: "want", icon: "schedule", display: "Want to Watch" },
  { value: 3, text: "done", icon: "done", display: "Watched" },
];

// FIX: fetch from GET /genre/movie/list every 24 hours from server
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
export const movieFilters = [
  {
    name: "Genre",
    query: "&with_genres",
    defaultValue: [],
    currentValue: [],
    prepareValueForQuery: (value) => {
      return value;
    },
  },
  {
    name: "Score GTE",
    query: "&vote_average.gte",
    defaultValue: 0,
    currentValue: 0,
    prepareValueForQuery: (value) => {
      return value / 10;
    },
  },
  {
    name: "Score LTE",
    query: "&vote_average.lte",
    defaultValue: 100,
    currentValue: 100,
    prepareValueForQuery: (value) => {
      return value / 10;
    },
  },
  {
    name: "Release GTE",
    query: "&primary_release_date.gte",
    defaultValue: 1896,
    currentValue: 1896,
    prepareValueForQuery: (value) => {
      return `${value}-01-01`;
    },
  },
  {
    name: "Release LTE",
    query: "&primary_release_date.lte",
    defaultValue: 2021,
    currentValue: 2021,
    prepareValueForQuery: (value) => {
      return `${value}-12-31`;
    },
  },
  {
    name: "Runtime GTE",
    query: "&with_runtime.gte",
    defaultValue: 0,
    currentValue: 0,
    prepareValueForQuery: (value) => {
      return value;
    },
  },
  {
    name: "Runtime LTE",
    query: "&with_runtime.lte",
    defaultValue: 240,
    currentValue: 240,
    prepareValueForQuery: (value) => {
      return value;
    },
  },
  {
    name: "Cast & Crew",
    query: "&with_people",
    defaultValue: [],
    currentValue: [],
    prepareValueForQuery: (value) => {
      return value;
    },
  },
];
