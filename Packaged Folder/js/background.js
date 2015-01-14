function continuedStorage(){
  chrome.storage.local.set({'value': enabled}, function() {
    chrome.storage.local.get("value", function(data) {
      console.log("data", data);
    });
  });
}



function firstStorage(){

chrome.storage.local.get("enabled", function(data) {
      console.log("data", data);
      if (data === 'undefined')
      {
        enabled = false;
        continuedStorage();
      }
    });
}