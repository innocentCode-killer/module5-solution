
(function (global) {

var dc = {};

// Define URLs
var homeHtmlUrl = "snippets/home-snippet.html";
var allCategoriesUrl =
  "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";

// Convenience functions
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  return string.replace(new RegExp(propToReplace, "g"), propValue);
};

// Choose random category from array
var chooseRandomCategory = function (categories) {
  var randomArrayIndex = Math.floor(Math.random() * categories.length);
  return categories[randomArrayIndex];
};

// On page load
document.addEventListener("DOMContentLoaded", function () {

  // STEP 1: Load all categories and call buildAndShowHomeHTML
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowHomeHTML,
    true);
});

// STEP 2–4: Build and show home HTML
function buildAndShowHomeHTML (categories) {

  // Load home snippet page
  $ajaxUtils.sendGetRequest(
    homeHtmlUrl,
    function (homeHtml) {

      // STEP 2: Choose a random category
      var chosenCategoryShortName = chooseRandomCategory(categories).short_name;

      // STEP 3: Replace {{randomCategoryShortName}} in the HTML snippet
      var homeHtmlToInsertIntoMainPage =
          insertProperty(homeHtml,
                         "randomCategoryShortName",
                         "'" + chosenCategoryShortName + "'");

      // STEP 4: Insert the final HTML into the main page
      insertHtml("#main-content", homeHtmlToInsertIntoMainPage);
    },
    false);
}

global.$dc = dc;

})(window);
