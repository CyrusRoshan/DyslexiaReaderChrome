function declareVariables(){
  window.status = "";
  window.domain = "";
  window.dataStorage = {};
  window.enabled = "";
  window.currentStatus = "";
  window.fontFamilyChecked = true;
  window.fontSizeChecked = true;
  window.backgroundColorChecked = true;
  window.lineHeightChecked = true;
  loadValues();
}

function loadValues(){
  chrome.storage.sync.get(function(data) {
    dataStorage = data;
    window.dataStorage = data;
  });
  saveValues();
}

function saveValues(){
  document.getElementById("fontFamily").checked = dataStorage["fontFamilyChecked"];
  document.getElementById("fontSize").checked = dataStorage["fontSizeChecked"];
  document.getElementById("backgroundColor").checked = dataStorage["backgroundColorChecked"];
  document.getElementById("lineHeight").checked = dataStorage["lineHeightChecked"];
  document.getElementById("refresh").value = dataStorage["refresh"];
}

function saveOptions(){
  dataStorage["fontFamilyChecked"] = document.getElementById("fontFamily").checked;
  dataStorage["fontSizeChecked"] = document.getElementById("fontSize").checked;
  dataStorage["backgroundColorChecked"] = document.getElementById("backgroundColor").checked;
  dataStorage["lineHeightChecked"] = document.getElementById("lineHeight").checked;
  dataStorage["refresh"] = document.getElementById("refresh").value;

  dataStorage["currentStatus"] = currentStatus;
  dataStorage[domain] = status;
  chrome.storage.sync.set(dataStorage, function(){
    loadDomainValues();
  });
}


document.addEventListener('DOMContentLoaded', function () {
  declareVariables();



  document.getElementById("fontFamily").addEventListener("click", fontFamily);
  document.getElementById("fontSize").addEventListener("click", fontSize);
  document.getElementById("backgroundColor").addEventListener("click", backgroundColor);
  document.getElementById("lineHeight").addEventListener("click", lineHeight);
  document.getElementById("refresh").addEventListener("keydown", refresh);

});
