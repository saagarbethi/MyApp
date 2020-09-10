// Dom7
debugger;
var $$ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
  root: '#app',
  theme: theme,
  routes: routes,
  cache : true,
  pushState : true,
  view:{
stackPages: true,
}
  
});
var libraryView = app.views.create(".view-main", {
domCache: true,
stackPages: true
});
