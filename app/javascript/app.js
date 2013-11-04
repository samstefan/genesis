//=============================================================================

// Project Set up

// index:

//   1 - Site functionality
//   2 - JS to run indiscriminately on view port size
//   3 - Media Queries

//==============================================================================

//==============================================================================
//   1 - Site functionality
//==============================================================================

var app = function () {

}

var websiteName = new app()


//==============================================================================
//   2 - JS to run indiscriminately of view port size
//==============================================================================

$(window).load(function() {

})

//==============================================================================
//   3 - Media Queries
//==============================================================================

function setupForWidth(mql) {
  if (mql.matches) {
    console.log('The screen width is 1285px or wider.  Set up or change things appropriately.')

  } else {
    console.log('The screen width is less than 1285px.  Set up or change things appropriately.')

  }
}

var widthMql = window.matchMedia('(min-width: 1285px)')
// Add a listener for when the result changes
// And share the same code to set things up with our current state.
$(function(){
  widthMql.addListener(setupForWidth)
  setupForWidth(widthMql)
})