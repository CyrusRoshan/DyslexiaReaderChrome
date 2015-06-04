chrome.storage.sync.get(function(data) {
  dataStorage = data;
  window.dataStorage = data;
  window.fontFamilyVal = dataStorage["fontFamilyVal"];
  window.fontSizeVal = dataStorage["fontSizeVal"];
  window.backgroundColorVal = dataStorage["backgroundColorVal"];
  window.lineHeightVal = dataStorage["lineHeightVal"];
  window.colorVal = dataStorage["colorVal"];
  window.forceInjectChecked = dataStorage["forceInject"];
  window.refresh = dataStorage["refresh"];
  if (window.forceInjectChecked === true){
    window.force = " !important";
  }
  else{
    window.force = "";
  }
});

/*if (window.fontFamilyVal === "" || window.fontFamilyVal == " "){
  window.fontFamilyVal = "Courier";
}
if (window.fontSizeVal === "" || window.fontSizeVal == " "){
  window.fontSizeVal = "18pt";
}
if (window.backgroundColorVal === "" || window.backgroundColorVal == " "){
  window.backgroundColorVal = "#fbfbfb";
}
if (window.lineHeightVal === "" || window.lineHeightVal == " "){
  window.lineHeightVal = "1.5";
}

//above commented code is only useful if you want styling to be default if left blank on the options page
*/

function cssInject(){
  cssRemove();
  
  chrome.tabs.executeScript({
    code:
      /*'function partOne(){' +
        'document.head.removeChild(document.getElementById("injectedStyle"));' +
        'partTwo();' +
      '}' +
      */
     // 'function partTwo(){' +
        'var injectedStyle = document.createElement("style");' +
        'injectedStyle.type = "text/css";' +
        'injectedStyle.className = "injectedStyle";' +
        'injectedStyle.innerHTML = "* { font-family: ' + window.fontFamilyVal + window.force + '; font-size: ' + window.fontSizeVal + window.force + '; background-color: ' + window.backgroundColorVal + window.force + '; line-height: ' + window.lineHeightVal + window.force + '; color: ' + window.colorVal + window.force + '; }";' +
        'document.head.appendChild(injectedStyle);' //+
      //'}' +
      //'partTwo();'
      
  });
  /*checkCss();
  chrome.tabs.executeScript({
    code:
      'var elements = document.getElementsByTagName("*");' +
      'for (var i=0; i < elements.length; i++) {' +
        'elements[i].classList.add(' + classes + ');' +
      '}'
  });
  window.ran = true;
  */
  //applies these css changes to every element currently on the page.
}

function cssRemove(){
  chrome.tabs.executeScript({
      code:
        'var elements = document.getElementsByClassName("injectedStyle");' +
        'for (var i=0; i < elements.length; i++) {' +
          'document.head.removeChild(elements[i]);' +
        '}'
  });
  /*
  checkCss();
    chrome.tabs.executeScript({
      code:
        'var elements = document.getElementsByTagName("*");' +
        'for (var i=0; i < elements.length; i++) {' +
          'elements[i].classList.remove("injectFfHere", "injectFsHere", "injectBcHere", "injectLhHere");' +
        '}'
    });
  */
  //removes the values from the elements
  //some webpages have inline styling, and this will mess with pages since it removes the inline styling.
  //to counteract this, the inline styling is only removed if the inline styling on an element contains "!important"
}

function checkCss(){
/*  window.fontFamilyChecked = window.dataStorage["fontFamilyChecked"];
  window.fontSizeChecked = window.dataStorage["fontSizeChecked"];
  window.backgroundColorChecked = window.dataStorage["backgroundColorChecked"];
  window.lineHeightChecked = window.dataStorage["lineHeightChecked"];
  window.classes = "";

  if (fontFamilyChecked === true){
    classes = "\"injectFfHere\"";
  }
  //get font family ready for injection

  if (fontSizeChecked === true){
    if (classes !== ""){
      classes += ", \"injectFsHere\"";
    }
    else {
      classes = "\"injectFsHere\"";
    }
  }
  //get font size ready

  if (backgroundColorChecked === true){
    if (classes !== ""){
      classes += ", \"injectBcHere\"";
    }
    else {
      classes = "\"injectBcHere\"";
    }
  }
  //get background color ready

  if (lineHeightChecked === true){
    if (classes !== ""){
      classes += ", \"injectLhHere\"";
    }
    else {
      classes = "\"injectLhHere\"";
    }
  }
  //get line height ready

*/
//commented out all of this because we can just use "*{" in css to achieve this
}
