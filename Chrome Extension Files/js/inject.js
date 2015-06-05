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


function cssInject(){
  cssRemove();
  
  chrome.tabs.executeScript({
    code:
      'var injectedStyle = document.createElement("style");' +
      'injectedStyle.type = "text/css";' +
      'injectedStyle.className = "injectedStyle";' +
      'injectedStyle.innerHTML = "* { font-family: ' + window.fontFamilyVal + window.force + '; font-size: ' + window.fontSizeVal + window.force + '; background-color: ' + window.backgroundColorVal + window.force + '; line-height: ' + window.lineHeightVal + window.force + '; color: ' + window.colorVal + window.force + '; }";' +
      'document.head.appendChild(injectedStyle);'
  });
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
}