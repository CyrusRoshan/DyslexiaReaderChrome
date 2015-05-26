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
