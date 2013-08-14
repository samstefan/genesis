//========================================================

// PROJECT SETUP

// INDEX:

//   1 - Site functionality
//   2 - JS to run indiscriminately on viewport size
//   3 - Media Queries

//========================================================



//========================================================
//   1 - Site functionality
//========================================================

var SiteTemplate = function () {

}

var siteTemplate = new SiteTemplate();


//========================================================
//   2 - JS to run indiscriminately of viewport size
//========================================================

$(window).load(function() {

});

//========================================================
//   3 - Media Queries
//========================================================

function setup_for_width(mql) {
  if (mql.matches) {
    console.log('The screen width is 1285px or wider.  Set up or change things appropriately.');

  } else {
    console.log('The screen width is less than 1285px.  Set up or change things appropriately.');

  }
}

var width_mql = window.matchMedia("(min-width: 1285px)");
// Add a listener for when the result changes
// And share the same code to set things up with our current state.
$(function(){
  width_mql.addListener(setup_for_width);
  setup_for_width(width_mql);
});