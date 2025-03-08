//Declare Global Variables
globalThis.status = "";
globalThis.domain = "";
globalThis.dataStorage = {};
globalThis.enabled = "";
globalThis.currentStatus = "";
globalThis.fontFamilyVal = "";
globalThis.fontSizeVal = "";
globalThis.backgroundColorVal = "";
globalThis.lineHeightVal = "";
globalThis.colorVal = "";
globalThis.forceInjectChecked = false;
globalThis.iconColorChecked = false;

function sync(){
	chrome.storage.sync.set(dataStorage);
}

chrome.storage.sync.get(function(data) {
	dataStorage = data;
	globalThis.dataStorage = data;
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
	getSelected(function (tabs) {
		globalThis.ran = false;
		var url = tabs.url;
		var split = url.split("/");
		globalThis.domain = split[1] + split[2];
		second();
	});
}
//above code finds the domain name of the website



function second() {
	chrome.storage.sync.get(function(data) {
		dataStorage = data;
		globalThis.dataStorage = data;
		globalThis.fontFamilyVal = dataStorage["fontFamilyVal"];
		globalThis.fontSizeVal = dataStorage["fontSizeVal"];
		globalThis.backgroundColorVal = dataStorage["backgroundColorVal"];
		globalThis.lineHeightVal = dataStorage["lineHeightVal"];
		globalThis.colorVal = dataStorage["colorVal"];
		globalThis.forceInjectChecked = dataStorage["forceInject"];
		globalThis.iconColorChecked = dataStorage["iconColor"];
		third();
	});
}
//the above code imports dataStorage, so values are saved
//through sessions and browsers (assuming user syncs chrome)

function third() {
	sync();
	globalThis.dataStorage["currentStatus"] = dataStorage["currentStatus"];
	globalThis.dataStorage[domain] = dataStorage[domain];
	globalThis.currentStatus = dataStorage["currentStatus"];


	globalThis.enabled = currentStatus;
	if (globalThis.dataStorage[domain] == "Disabled") {
		status = "Disabled";
	}
	else if (globalThis.dataStorage[domain] == "Enabled") {
		status = "Enabled";
	}
	else {
		status = "Neither";
	}

	if (globalThis.dataStorage["currentStatus"] === true || globalThis.dataStorage["currentStatus"] === false) {
		enabled = globalThis.dataStorage["currentStatus"];
	}
	else {
		enabled = false;
	}
	fourth();
}
//above code basically sets "enabled" so cssInject or cssRemove work

function fourth(){
  getSelected(tab => {
    if (status == "Enabled" || (enabled === true && status != "Disabled")){
      chrome.action.setIcon({path: "/images/enabled.png"});
      cssInject(tab.id);
    }
    else {
      chrome.action.setIcon({path: "/images/disabled.png"});
      cssRemove(tab.id);
    }
  })
}
//above code calls functions responsible for changing styling

chrome.runtime.onMessage.addListener(function(message) {
  first();
});

chrome.tabs.onUpdated.addListener(function() {
	first();
});


chrome.tabs.onActivated.addListener(function() {

	first();
});

chrome.storage.sync.get(function(data) {
	dataStorage = data;
	globalThis.dataStorage = data;
	globalThis.fontFamilyVal = dataStorage["fontFamilyVal"];
	globalThis.fontSizeVal = dataStorage["fontSizeVal"];
	globalThis.backgroundColorVal = dataStorage["backgroundColorVal"];
	globalThis.lineHeightVal = dataStorage["lineHeightVal"];
	globalThis.colorVal = dataStorage["colorVal"];
	globalThis.forceInjectChecked = dataStorage["forceInject"];
	globalThis.iconColorChecked = dataStorage["iconColor"];
	if (globalThis.forceInjectChecked === true){
		globalThis.force = " !important";
	}
	else{
		globalThis.force = "";
	}
});


function cssInject(tabId){
	chrome.scripting.executeScript({
    target: {
      tabId,
      allFrames: true,
    },
		func: (params) => {
      var injectedStyle = document.createElement("style");
      injectedStyle.type = "text/css";
      injectedStyle.className = "injectedStyle";
      injectedStyle.innerHTML = `* {
        font-family: ${params.fontFamilyVal} ${params.force};
        font-size: ${params.fontSizeVal} ${params.force};
        background-color: ${params.backgroundColorVal} ${params.force};
        line-height: ${params.lineHeightVal} ${params.force};
        color: ${params.colorVal} ${params.force}; 
      }`
      document.head.appendChild(injectedStyle);
    },
    args: [{
      fontFamilyVal,
      force,
      fontSizeVal,
      backgroundColorVal,
      lineHeightVal,
      colorVal
    }]
	});
	//applies these css changes to every element currently on the page.
}

function cssRemove(tabId){
	chrome.scripting.executeScript({
    target: {
      tabId,
      allFrames: true,
    },
		func: () => {
		  var injected = document.getElementsByClassName("injectedStyle");
		  while(injected[0]) {
			  document.head.removeChild(injected[0]);
		  }
    }
	});
}


async function getSelected(callback) {
  let queryOptions = { active: true, lastFocusedWindow: true };
  chrome.tabs.query(queryOptions).then((tabs) => {
    callback(tabs[0]);
  });
}
