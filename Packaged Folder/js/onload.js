function onload(){
  firstStorage();
  checkStatus();

}
chrome.tabs.getSelected(function (tabs) {
  var url = tabs.url;
  var split = url.split("/");
  window.domain = split[0] + "//" + split[2];
});
window.onload = onload;