

function declareVariables(){
  chrome.storage.sync.get(function(data) {
    window.status = "";
    window.domain = "";
    window.refresh = "";
    window.dataStorage = {};
    window.enabled = "";
    window.fontFamilyChecked = true;
    window.fontSizeChecked = true;
    window.backgroundColorChecked = true;
    window.lineHeightChecked = true;
    dataStorage = data;
    window.dataStorage = data;

    setValues();
  });
}

function loadValues(){
  chrome.storage.sync.get(function(data){
    dataStorage = data;
    window.dataStorage = data;
    setValues();

  });
}

function setValues(){
  document.getElementById("fontFamily").checked = dataStorage["fontFamilyChecked"];
  document.getElementById("fontSize").checked = dataStorage["fontSizeChecked"];
  document.getElementById("backgroundColor").checked = dataStorage["backgroundColorChecked"];
  document.getElementById("lineHeight").checked = dataStorage["lineHeightChecked"];
  document.getElementById("refresh").value = dataStorage["refresh"];
  if (document.getElementById("refresh").value < 1){
    document.getElementById("refresh").value = 200;
    dataStorage["refresh"] = 200;
    chrome.storage.sync.set(dataStorage);
  }
}

function partA(){
  dataStorage["fontFamilyChecked"] = document.getElementById("fontFamily").checked;
  dataStorage["fontSizeChecked"] = document.getElementById("fontSize").checked;
  dataStorage["backgroundColorChecked"] = document.getElementById("backgroundColor").checked;
  dataStorage["lineHeightChecked"] = document.getElementById("lineHeight").checked;
  dataStorage["refresh"] = document.getElementById("refresh").value;
}

function partB(){
  chrome.storage.sync.set(dataStorage, function(){
    partA();
    loadValues();
  });
}

function saveOptions(){
  partA();
  partB();
}

document.addEventListener('DOMContentLoaded', function () {

  document.getElementById("fontFamily").addEventListener("click", saveOptions);
  document.getElementById("fontSize").addEventListener("click", saveOptions);
  document.getElementById("backgroundColor").addEventListener("click", saveOptions);
  document.getElementById("lineHeight").addEventListener("click", saveOptions);
  document.getElementById("refresh").addEventListener("keyup", saveOptions);
  declareVariables();
});