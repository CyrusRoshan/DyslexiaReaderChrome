function clearDomainValues(){
  chrome.storage.sync.clear();
}

function saveDomainValues(domain, status) {

    currentStatus = window.currentStatus;
    dataStorage["currentStatus"] = currentStatus;
    dataStorage[domain] = status;
    if (status == "Disabled") {
      chrome.storage.sync.set(dataStorage);
    }
    else {
      delete dataStorage[domain];
      chrome.storage.sync.set(dataStorage);
    }
}

function saveAndLog(domain, status) {

    currentStatus = window.currentStatus;
    dataStorage["currentStatus"] = currentStatus;
    dataStorage[domain] = status;
    if (status == "Disabled") {
      chrome.storage.sync.set(dataStorage, function(){
        loadDomainValues();
      });
    }
    else {
      delete dataStorage[domain];
      chrome.storage.sync.remove(domain, function(){
        loadDomainValues();
      });
    }
}


function loadDomainValues() {
    chrome.storage.sync.get(function(data) {
      dataStorage = data;
      window.dataStorage = data;
      configureDomainValues();
    });

}

function configureDomainValues() {
  dataStorage = window.dataStorage;
  domain = window.domain;
  currentStatus = window.currentStatus;

  dataStorage["currentStatus"] = window.dataStorage["currentStatus"];
  dataStorage[domain] = window.dataStorage[domain];

  currentStatus = dataStorage["currentStatus"]


  enabled = currentStatus;

  if (window.dataStorage[domain] == "Disabled") {
      status = "Disabled";
  }

  else {
      status = "Neither";
  }

  if (window.dataStorage["currentStatus"] == true || window.dataStorage["currentStatus"] == false) {
    enabled = window.dataStorage["currentStatus"];
  }
  else {
      enabled = false;
  }
  checkStatus();
}


function saveDomain(status, saveDomainValues){

    chrome.tabs.getSelected(function (tabs) {
      var url = tabs.url;
      var split = url.split("/");
      domain = split[1] + split[2];
      window.status = status;
      window.domain = domain;
      saveAndLog(domain, status);
    });
}

