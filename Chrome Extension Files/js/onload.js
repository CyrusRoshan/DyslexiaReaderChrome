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

document.addEventListener('DOMContentLoaded', function () {
	//$(".questionContainer").hide();
	urlChecker();
	saveAndLog();
});
