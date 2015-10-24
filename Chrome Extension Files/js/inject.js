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
	if (window.forceInjectChecked === true){
		window.force = " !important";
	}
	else{
		window.force = "";
	}
});


function cssInject(){
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
		'var injected = document.getElementsByClassName("injectedStyle");'+
		'while(injected[0]) {'+
			'document.head.removeChild(injected[0]);'+
		'}'
	});
}
