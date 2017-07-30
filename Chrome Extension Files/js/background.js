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
window.iconColorChecked = false;
chrome.tabs.getSelected(null, function(tab){
	var id=tab.id;
	window.ran[id]=false;
});
window.ran = false;
window.timeup = true;
window.queued = false;

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
		dataStorage["forceInject"] = false;
		dataStorage["iconColor"] = false;
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
		window.iconColorChecked = dataStorage["iconColor"];
		third();
	});
}
//the above code imports dataStorage, so values are saved
//through sessions and browsers (assuming user syncs chrome)

function third() {
	sync();
	window.dataStorage["currentStatus"] = dataStorage["currentStatus"];
	window.dataStorage[domain] = dataStorage[domain];
	window.currentStatus = dataStorage["currentStatus"];


	window.enabled = currentStatus;
	if (window.dataStorage[domain] == "Disabled") {
		status = "Disabled";
	}
	else if (window.dataStorage[domain] == "Enabled") {
		status = "Enabled";
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
	if (status == "Enabled" || (enabled === true && status != "Disabled")){
		//Drc_inject.injectStyle(Model.defaults);
    //chrome.tabs.executeScript(null, {file: 'js/Model.js'});
    chrome.tabs.executeScript(null, {file: 'js/Drc_inject.js'});
    //chrome.tabs.executeScript({code: 'Drc_inject.mark(Model.defaults, document.body);'})
	}
	else {
		cssRemove();
	}
}
//above code calls functions responsible for changing styling

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log("Handling a message: ", message);
  if (message.ocr !== undefined) {
    console.log("Got an OCR request: ", message.ocr);
    var toDataUrl = function(url, callback){
      var xhr = new XMLHttpRequest();
      xhr.open('get', url);
      xhr.responseType = 'blob';
      xhr.onload = function(){
        var fr = new FileReader();
        fr.onload = function(){
          callback(this.result);
        };
      fr.readAsDataURL(xhr.response); // async call
      };
      xhr.send();
    };
    toDataUrl(message.ocr.url, function(data) {
      var img = document.createElement('img');
      img.src = data;
      img.width = message.ocr.width;
      img.height = message.ocr.height;
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      console.log("About to call OCR...");
      Ocr.ocr(
        ctx.getImageData(0, 0, img.width, img.height),
        message.ocr.url,
        (x) => {
          console.log("Bg script is sending a response: ", x);
          try {
            sendResponse(x);
          } catch (exn) {
            console.log("Exception: ", exn);
          }
        });
      return true;
    });
    return true;
  }
	if (message.modified === true && window.timeup === true) {
		window.timeup = false;
		window.timeup = true;
		third();
	}
	else if(window.queued === false) {
		window.queued = true;
		third();
		window.queued = true;
	}
});

chrome.tabs.onUpdated.addListener(function() {
	first();
});


chrome.tabs.onActivated.addListener(function() {

	first();
});
