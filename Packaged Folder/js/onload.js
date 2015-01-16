//Declare Global Variables
window.status = "";
window.domain = "";
window.dataStorage = {};
window.enabled = "";
window.currentStatus = "";

//Done>perfect I guess. I'm bad with asynchronous functions.

document.addEventListener('DOMContentLoaded', function () {
    $(".questionContainer").hide();
    urlChecker();

});
