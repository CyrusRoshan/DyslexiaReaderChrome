//Declare Global Variables
window.status = "";
window.domain = "";
window.dataStorage = {};
window.enabled = "";
window.currentStatus = "";
window.fontFamilyVal = "Courier";
window.fontSizeVal = "18pt";
window.backgroundColorVal = "#fbfbfb";
window.lineHeightVal = "1.5";
window.forceInjectChecked = false;
window.iconColorChecked = false;
chrome.tabs.getSelected(null, function(tab){
	var id=tab.id;
	window.ran[id]=false;
});
window.ran = false;
window.timeup = true;
window.queued = false;

document.addEventListener('DOMContentLoaded', function () {
	//$(".questionContainer").hide();
	urlChecker();
	saveAndLog();
});
