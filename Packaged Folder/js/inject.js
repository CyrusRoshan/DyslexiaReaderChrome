function cssInject(){
  checkCss();
  chrome.tabs.executeScript({
    code:
      'var elements = document.getElementsByTagName("*");' +
      'for (var i=0; i < elements.length; i++) {' +
        'elements[i].classList.add("' + classes + '");' +
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
          'elements[i].classList.remove("injectFfHere", "injectFsHere", "injectBcHere", "injectLhHere");' +
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
  window.classes = "";

  if (fontFamilyChecked === true){
    classes = "'injectFfHere'";
  }
  //get font family ready for injection

  if (fontSizeChecked === true){
    if (classes != ""){
      classes += ", 'injectFsHere'";
    }
    else {
      classes = "'injectFsHere'";
    }
  }
  //get font size ready

  if (backgroundColorChecked === true){
    if (classes != ""){
      classes += ", 'injectBcHere'";
    }
    else {
      classes = "'injectBcHere'";
    }
  }
  //get background color ready

  if (lineHeightChecked === true){
    if (classes != ""){
      classes += ", 'injectLhHere'";
    }
    classes = "'injectLhHere', ";
  }
  //get line height ready


}
