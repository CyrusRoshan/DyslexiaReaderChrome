
function saveDomainValues(domain, status){
  //chrome.storage.sync.get(null, function (Items) {console.log(Items)}); can be used to check to see all stored values
  if (status == "Enabled"){

    chrome.storage.sync.set({"domain": domain}, {"status": status});
  }
  if (status == "Disabled"){
    chrome.storage.sync.set({"domain": domain}, {"status": status});
  }
  if (status == "Neither"){
    chrome.storage.sync.remove("domain", "status");
  }

}
function saveDomain(status){

    chrome.tabs.getSelected(function (tabs) {
      var url = tabs.url;
      var split = url.split("/");
      var domain = split[0] + "//" + split[2];

      var value = {
        domain: domain,
        status: status
      };
      console.log(value);
      saveDomainValues(domain, status);

    });
}

