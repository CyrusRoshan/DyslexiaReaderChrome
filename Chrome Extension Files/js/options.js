function declareVariables(){
	chrome.storage.sync.get(function(data) {
		window.status = "";
		window.domain = "";
		window.dataStorage = {};
		window.enabled = "";
		window.fontFamilyVal = "Courier";
		window.fontSizeVal = "175%";
		window.backgroundColorVal = "#fdfcfd";
		window.lineHeightVal = "1.5";
		window.colorVal = "#000000";
		window.forceInjectChecked = false;
		window.iconColorChecked = false;
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
	$("#fontFamily").val(dataStorage["fontFamilyVal"]);
	$("#fontSize").val(dataStorage["fontSizeVal"]);
	$("#backgroundColor").val(dataStorage["backgroundColorVal"]);
	$("#lineHeight").val(dataStorage["lineHeightVal"]);
	$("#color").val(dataStorage["colorVal"]);
	if (dataStorage["forceInject"] === true){
		document.getElementById("forceInject").checked = true;
	}
	if (dataStorage["iconColor"] === true){
		document.getElementById("iconColor").checked = true;
	}
}

function partA(){
	dataStorage["fontFamilyVal"] = $("#fontFamily").val();
	dataStorage["fontSizeVal"] = $("#fontSize").val();
	dataStorage["backgroundColorVal"] = $("#backgroundColor").val();
	dataStorage["lineHeightVal"] = $("#lineHeight").val();
	dataStorage["colorVal"] = $("#color").val();
	dataStorage["forceInject"] = document.getElementById("forceInject").checked;
	dataStorage["iconColor"] = document.getElementById("iconColor").checked;
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
	document.getElementById("fontFamily").addEventListener("blur", saveOptions);
	document.getElementById("fontSize").addEventListener("blur", saveOptions);
	document.getElementById("backgroundColor").addEventListener("blur", saveOptions);
	document.getElementById("lineHeight").addEventListener("blur", saveOptions);
	document.getElementById("color").addEventListener("blur", saveOptions);
	document.getElementById("forceInject").addEventListener("click", saveOptions);
	document.getElementById("iconColor").addEventListener("click", saveOptions);
	declareVariables();
});


chrome.storage.sync.get(function(data) {
	dataStorage = data;
	window.dataStorage = data;
	displayData();
});


function resetPref(){
	dataStorage["fontFamilyVal"] = "Courier";
	dataStorage["fontSizeVal"] = "18pt";
	dataStorage["backgroundColorVal"] = "#fdfcfd";
	dataStorage["lineHeightVal"] = "1.5";
	dataStorage["colorVal"] = "#000000";
	dataStorage["enabled"] = true;
	dataStorage["forceInject"] = false;
	dataStorage["iconColor"] = false;
	dataStorage.firstRun = false;
	chrome.storage.sync.set(dataStorage);
	setValues();
};

function resetData(){
	for (var key in dataStorage) {
		if(dataStorage[key] == "Enabled" || dataStorage[key] == "Disabled"){
			delete dataStorage[key];
			chrome.storage.sync.remove(key);
		}
	}
	chrome.storage.sync.set(dataStorage);
	displayData();
}

function displayData(){
	var enabledSites = "";
	var disabledSites = "";
	for (var key in dataStorage) {
		if(dataStorage[key] == "Enabled"){
			enabledSites += key + ", ";
		};
		if(dataStorage[key] == "Disabled"){
			disabledSites += key + ", ";
		}
	}

	enabledSites = "<strong>Always enabled on: </strong>" + enabledSites.slice(0,-2);
	disabledSites = "<strong>Always disabled on: </strong>" + disabledSites.slice(0,-2);

	if(enabledSites == "<strong>Always enabled on: </strong>" || enabledSites == ""){
		enabledSites = "No always-enabled websites";
	}
	if(disabledSites == "<strong>Always disabled on: </strong>" || disabledSites == ""){
		disabledSites = "No always-disabled websites";
	}

	$("#enabledSites").html(enabledSites);
	$("#disabledSites").html(disabledSites);
}

$(document).ready(function(){
	document.getElementById('resetPref').addEventListener('click', resetPref);
	document.getElementById('resetData').addEventListener('click', resetData);

	var fontSizeInputEl = document.querySelector('#fontSize');
	var fontSizeDisplayEl = document.querySelector('#fontSizeDisplay');

	fontSizeDisplayEl.innerText = fontSizeInputEl.value + '%';
	fontSizeInputEl.oninput = function() {
		fontSizeDisplayEl.innerText = fontSizeInputEl.value + '%';
	}
});
