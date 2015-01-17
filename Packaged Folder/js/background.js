//Declare Global Variables
window.status = "";
window.domain = "";
window.dataStorage = {};
window.enabled = "";
window.currentStatus = "";
window.path = chrome.extension.getURL('css/inject.css');

//Done>perfect I guess. I'm bad with asynchronous functions.

document.addEventListener('DOMContentLoaded', function () {
    $(".questionContainer").hide();
    urlChecker();
});
