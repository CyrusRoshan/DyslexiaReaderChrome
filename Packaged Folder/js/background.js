//Declare Global Variables
window.status = "";
window.domain = "";
window.dataStorage = {};
window.enabled = "";
window.currentStatus = "";
window.fontFamilyChecked = true;
window.fontSizeChecked = true;
window.backgroundColorChecked = true;
window.lineHeightChecked = true;
window.ran = false;
window.timeup = true;
window.queued = false;
window.refresh = "200";

//Done>perfect I guess. I'm bad with asynchronous functions.
//the following functions are basically the same as the functions for popup.html
//except there wasn't a need to import all of the other scripts if we're only
//going to read the values.

function first(){
  chrome.tabs.getSelected(function (tabs) {
    window.ran = false;
    var url = tabs.url;
    var split = url.split("/");
    window.domain = split[1] + split[2];
    second();
  });
}

  var elements = document.getElementsByTagName("*");
  for (var i=0; i < elements.length; i++) {
    elements[i].setAttribute("style", "' + style + '");
  }

function second() {
    chrome.storage.sync.get(function(data) {
      dataStorage = data;
      window.dataStorage = data;
      third();
    });

}

function third() {
  dataStorage = window.dataStorage;
  domain = window.domain;
  currentStatus = window.currentStatus;

  dataStorage["currentStatus"] = window.dataStorage["currentStatus"];
  dataStorage[domain] = window.dataStorage[domain];

  currentStatus = dataStorage["currentStatus"]


  enabled = currentStatus;

  if (window.dataStorage[domain] == "Disabled") {
      status = "Disabled";
  }

  else {
      status = "Neither";
  }

  if (window.dataStorage["currentStatus"] == true || window.dataStorage["currentStatus"] == false) {
    enabled = window.dataStorage["currentStatus"];
  }
  else {
      enabled = false;
  }
  fourth();
}

function fourth(){
  if (enabled === true && status != "Disabled"){
    cssInject();
  }
  else {
    cssRemove();
  }
}


chrome.runtime.onMessage.addListener(function(message) {
  if (message.modified === true && window.timeup === true) {
      window.timeup = false;
      setTimeout(function(){window.timeup = true},window.refresh);
      third();
  }
  else if(window.queued === false) {
    window.queued = true;
    setTimeout(third(),window.refresh);
    setTimeout(function(){window.queued = true},window.refresh);
  }
});

chrome.tabs.onUpdated.addListener(function() {
  first();
});

chrome.tabs.onActivated.addListener(function() {
  first();
});



