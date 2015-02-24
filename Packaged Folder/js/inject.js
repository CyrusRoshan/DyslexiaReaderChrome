
function cssInject(){
  checkCss();
  chrome.tabs.executeScript({
    code:
      'var elements = document.getElementsByTagName("*");' +
      'for (var i=0; i < elements.length; i++) {' +
        '$(elements[i]).addClass( "injectHere" );' +
      '}'
  });
  window.ran = true;
  //applies these css changes to every element currently on the page.
}

function cssRemove(){
  checkCss();
    chrome.tabs.executeScript({
      code:
        'var elements = document.getElementsByTagName("*");' +
        'for (var i=0; i < elements.length; i++) {' +
          '$(elements[i]).removeClass( "injectHere" );' +
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
  chrome.tabs.executeScript({
    code:
      'var injectHere = document.getElementsByClassName("injectHere");'
  });


  if (fontFamilyChecked === true) {
    chrome.tabs.executeScript({
      code:
        'injectHere.style.fontFamily = "Courier";'
    });
  }
  else {
    chrome.tabs.executeScript({
      code:
        'injectHere.style.fontFamily = "";'
    });
  }

  if (fontSizeChecked === true) {
    chrome.tabs.executeScript({
      code:
        'injectHere.style.fontSize = "18pt";'
    });
  }
  else {
    chrome.tabs.executeScript({
      code:
        'injectHere.style.fontSize = "";'
    });
  }

  if (backgroundColorChecked === true) {
    chrome.tabs.executeScript({
      code:
        'injectHere.style.backgroundColor = "#fbfbfb";'
    });
  }
  else {
    chrome.tabs.executeScript({
      code:
        'injectHere.style.backgroundColor = "";'
    });
  }

  if (lineHeightChecked === true) {
    chrome.tabs.executeScript({
      code:
        'injectHere.style.lineHeight = "1.5";'
    });
  }
  else {
    chrome.tabs.executeScript({
      code:
        'injectHere.style.lineHeight = "";'
    });
  }
}
