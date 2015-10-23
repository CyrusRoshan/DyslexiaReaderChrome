function declareVariables(){
	chrome.storage.sync.get(function(data) {
		window.status = "";
		window.domain = "";
		window.dataStorage = {};
		window.enabled = "";
		window.fontFamilyVal = "Courier";
		window.fontSizeVal = "18pt";
		window.backgroundColorVal = "#fdfcfd";
		window.lineHeightVal = "1.5";
		window.colorVal = "#000000";
		window.forceInjectChecked = false;
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
}

function partA(){
	dataStorage["fontFamilyVal"] = $("#fontFamily").val();
	dataStorage["fontSizeVal"] = $("#fontSize").val();
	dataStorage["backgroundColorVal"] = $("#backgroundColor").val();
	dataStorage["lineHeightVal"] = $("#lineHeight").val();
	dataStorage["colorVal"] = $("#color").val();
	dataStorage["forceInject"] = document.getElementById("forceInject").checked;
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
	declareVariables();
});
