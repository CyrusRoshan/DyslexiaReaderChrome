//Declare Global Variables
window.status = "";
window.domain = "";
window.dataStorage = {};
window.enabled = "";
window.currentStatus = "";
window.fontFamilyVal = "";
window.fontSizeVal = "";
window.backgroundColorVal = "";
window.lineHeightVal = "";
window.colorVal = "";
window.forceInjectChecked = false;
chrome.tabs.getSelected(null, function(tab){
  var id=tab.id;
  window.ran[id]=false;
});
window.ran = false;
window.timeup = true;
window.queued = false;
window.refresh = "200";

function sync(){
  chrome.storage.sync.set(dataStorage);
}

chrome.storage.sync.get(function(data) {
      dataStorage = data;
      window.dataStorage = data;
      if (dataStorage.firstRun !== false){
        dataStorage["fontFamilyVal"] = "Courier";
        dataStorage["fontSizeVal"] = "18pt";
        dataStorage["backgroundColorVal"] = "#fdfcfd";
        dataStorage["lineHeightVal"] = "1.5";
        dataStorage["colorVal"] = "#000000";
        dataStorage["enabled"] = true;
        dataStorage["forceInject"] = true;
        dataStorage["refresh"] = 200;
        dataStorage.firstRun = false;
        sync();
      }
    });

//Done>perfect I guess. I'm bad with asynchronous functions.
//This code makes a few other js files redundant and unused,
//since with the update, the background page does all of the
//work, so the popup page only changes "enabled"

function first(){
  chrome.tabs.getSelected(function (tabs) {
    window.ran = false;
    var url = tabs.url;
    var split = url.split("/");
    window.domain = split[1] + split[2];
    second();
  });
}
//above code finds the domain name of the website



function second() {
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
      third();
    });
}
//the above code imports dataStorage, so values are saved
//through sessions and browsers (assuming user syncs chrome)

function third() {
  sync();
  window.refresh = dataStorage["refresh"];
  window.dataStorage["currentStatus"] = dataStorage["currentStatus"];
  window.dataStorage[domain] = dataStorage[domain];
  window.currentStatus = dataStorage["currentStatus"];


  window.enabled = currentStatus;
  if (window.refresh < 1){
    window.refresh = 200;
    dataStorage["refresh"] = 200;
    chrome.storage.sync.set(dataStorage);
  }
  if (window.dataStorage[domain] == "Disabled") {
      status = "Disabled";
  }

  else {
      status = "Neither";
  }

  if (window.dataStorage["currentStatus"] === true || window.dataStorage["currentStatus"] === false) {
    enabled = window.dataStorage["currentStatus"];
  }
  else {
      enabled = false;
  }
  fourth();
}
//above code basically sets "enabled" so cssInject or cssRemove work

function fourth(){
  if (enabled === true && status != "Disabled"){
    cssInject();
  }
  else {
    cssRemove();
  }
}
//above code calls functions responsible for changing styling

chrome.runtime.onMessage.addListener(function(message) {
  if (message.modified === true && window.timeup === true) {
      window.timeup = false;
      setTimeout(function(){window.timeup = true;},window.refresh);
      third();
  }
  else if(window.queued === false) {
    window.queued = true;
    setTimeout(third(),window.refresh);
    setTimeout(function(){window.queued = true;},window.refresh);
  }
});

chrome.tabs.onUpdated.addListener(function() {
  first();
});

chrome.tabs.onActivated.addListener(function() {
  first();
});

