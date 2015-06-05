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
chrome.tabs.getSelected(null, function(tab){
  var id=tab.id;
  window.ran[id]=false;
});
window.ran = false;
window.timeup = true;
window.queued = false;
window.refresh = "200";
//Done>perfect I guess. I'm bad with asynchronous functions.


document.addEventListener('DOMContentLoaded', function () {
    $(".questionContainer").hide();
    urlChecker();
    saveAndLog();
});
