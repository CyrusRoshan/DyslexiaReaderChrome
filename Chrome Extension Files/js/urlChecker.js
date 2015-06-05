function urlChecker(){
  chrome.tabs.getSelected(function (tabs) {
    var url = tabs.url;
    var split = url.split("/");
    window.domain = split[1] + split[2];
    loadDomainValues();
  });
}