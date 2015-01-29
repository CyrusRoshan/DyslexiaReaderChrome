
function cssInject(){

  fontFamilyChecked = window.dataStorage["fontFamilyChecked"];
  fontSizeChecked = window.dataStorage["fontSizeChecked"];
  backgroundColorChecked = window.dataStorage["backgroundColorChecked"];
  lineHeightChecked = window.dataStorage["lineHeightChecked"];

  var style = "";
  if (fontFamilyChecked === true) {
    style += "font-family: Courier !important;"
  };
  if (fontSizeChecked === true) {
    style += "font-size: 18pt !important;"
  };
  if (backgroundColorChecked === true) {
    style += "backgrond-color: #fbfbfb !important;"
  };
  if (lineHeightChecked === true) {
    style += "line-height: 1.5 !important;"
  };
  //this section seems pretty efficient. No need to load jquery on tab load now.
  //basically just adds text to the style variable based on the checkboxes in the options page

  chrome.tabs.executeScript({
    code:
      'var elements = document.getElementsByTagName("*");' +
      'for (var i=0; i < elements.length; i++) {' +
        'elements[i].setAttribute("style", "' + style + '");' +
      '}'
  });
  window.ran = true;
  //applys these css changes to every element currently on the page.
}

function cssRemove(){
  if(window.ran === true){
    chrome.tabs.executeScript({
      code:
        'var elements = document.getElementsByTagName("*");' +
        'for (var i=0; i < elements.length; i++) {' +
          'elements[i].setAttribute("style", "");' +
        '}'
    });
    window.ran = false;
  }
  //removes the values from the elements
}



















/*
Font-family: Courier
Font-size :18pt
Column Width of 65 Characters (removed, doesn't look good on all pages)
Font Color: #0f0f0f
Background-color: #fbfbfb
Line-height: 1.5
*/


