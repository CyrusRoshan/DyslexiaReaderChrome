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
//Done>perfect I guess. I'm bad with asynchronous functions.

document.addEventListener('DOMContentLoaded', function () {
    $(".questionContainer").hide();
    urlChecker();
});
