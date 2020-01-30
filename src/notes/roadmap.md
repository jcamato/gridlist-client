# Notes

## Week 1 (1/4)

### &#9745; Create React App

### &#9745; Fetch from TMDB

- **bugs**

  - &#9744; adjust equal spacing and responsive breakpoints
  - &#9744; hover starts outside card

### &#9745; Add sort buttons

### &#9745; Link to dynamic movie pages with router

## Week 2 (1/11)

### &#9745; Add Movie hover overlay

- decided to merge with MovieCard component to anchor to movie better
- **bugs**

  - &#9744; make overlay appear on left if it will get cut off screen to the right

### &#9745; Convert sort buttons to select menus

- store current selection
- update button display and icons

### &#9745; Add infinite scroll

- fix bug where page doesn't reset to initial state when useEffect triggers
- **bugs**

  - &#9744; combine both calls into one function once I know how to reset complex state to reset movies

## Week 3 (1/18)

### &#9745; Add Checkbox List Filter

- implemented with array and array methods
- changed to set for easier deletion/clearing
- fixed issue where couldn't click on Any to reset all

### &#9744; Add Filter Chips

- lift state up for filter components
- Add selection

## Main

- Update setFilters so it can add/remove parts of the string for different filter widgets

### &#9744; Add Slider Filter

### Set up GitHub Repo

## Week 4 (1/25)

### &#9744; Add Remaining Filters

### &#9744; Detail Page

### &#9744; Add TV, Videogames (IGDB)

### &#9744; Home Page

### &#9744; Roadmap

### &#9744; Bug submission

### &#9744; About, privacy policy, etc.

### &#9744; Server to hide API and push live

Topics:

- array complexity and stale state
  -my problem is async before looking at it
  -component did update -> previous props, prev state, current props, current state
  if filters changed, fetched again

  for state of what's click, i do only need ID. it would be better to send IDs through function to update chips
  would be benefit to only give me back IDs. The state doesn't need to know the name

  -async wasn't alwys gaurunteeing when i got it back

  move ids up to browse, pass down as prop.
  in useEffect it will give updated
  useEffect only called after update complete

  -lodash, deep cloning. passing by value. if you are setting state into array with complicated objects it is helpful to do deep clone of array, adjust it, and set that as new state.
  I'm doing a shallow clone, one key level.

- GetBoundingClientRect()?
- brainstorm data structure for combination of filter calls for each widget to add/remove?
