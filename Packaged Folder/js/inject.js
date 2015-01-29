
function cssInject(){
  checkCss();
  chrome.tabs.executeScript({
    code:
      'var elements = document.getElementsByTagName("*");' +
      'for (var i=0; i < elements.length; i++) {' +
        'elements[i].setAttribute("style", "' + style + '");' +
      '}'
  });
  window.ran = true;
  //applies these css changes to every element currently on the page.
}

function cssRemove(){
  checkCss();
    chrome.tabs.executeScript({
      code:
        'var html = document.getElementsByTagName("html")[0];' +
        'var htmlCss = html.style.cssText;' +
        'if (htmlCss.indexOf("!important") > -1){' +
          'var elements = document.getElementsByTagName("*");' +
          'for (var i=0; i < elements.length; i++) {' +
            'elements[i].setAttribute("style", "");' +
          '}' +
        '}'
    });
  //removes the values from the elements
  //some webpages have inline styling, and this will mess with pages since it removes the inline styling.
  //to counteract this, the inline styling is only removed if the inline styling on an element contains "!important"
}

function checkCss(){
  window.fontFamilyChecked = window.dataStorage["fontFamilyChecked"];
  window.fontSizeChecked = window.dataStorage["fontSizeChecked"];
  window.backgroundColorChecked = window.dataStorage["backgroundColorChecked"];
  window.lineHeightChecked = window.dataStorage["lineHeightChecked"];
  window.style = "";
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
}