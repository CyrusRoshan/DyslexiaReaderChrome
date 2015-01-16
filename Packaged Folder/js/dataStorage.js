function clearDomainValues(){
  chrome.storage.sync.clear();
}

function saveDomainValues(domain, status) {

    currentStatus = window.currentStatus;
    dataStorage["currentStatus"] = currentStatus;
    dataStorage[domain] = status;
    if (status == "Enabled" || status == "Disabled") {
      chrome.storage.sync.set(dataStorage);
    }
    else if (status == "Neither") {
      delete dataStorage[domain];
      chrome.storage.sync.set(dataStorage);
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
  domain = window.domain;
  currentStatus = window.currentStatus;

  dataStorage["currentStatus"] = window.dataStorage["currentStatus"];
  dataStorage[domain] = window.dataStorage[domain];

  currentStatus = dataStorage["currentStatus"]

  console.log(dataStorage["currentStatus"]);
  console.log(currentStatus);

  console.log(dataStorage);
  console.log(dataStorage[domain]);

  enabled = currentStatus;

  if (window.dataStorage[domain] == "Enabled") {
      status = "Enabled";
      console.log("status = Enabled");
  }

  else if (window.dataStorage[domain] == "Disabled") {
      status = "Disabled";
      console.log("status = Disabled");
  }

  else if (window.dataStorage[domain] == "Neither") {
      status = "Neither";
      console.log("status = Neither");
  }

  if (window.dataStorage["currentStatus"] == true || window.dataStorage["currentStatus"] == false) {
    enabled = window.dataStorage["currentStatus"];
    console.log("enabled = currentStatus = " + currentStatus);
  }
  else {
      enabled = false;
      console.log(dataStorage);
      console.log(window.dataStorage);
      console.log(dataStorage[domain]);
      console.log(window.dataStorage[domain]);
      console.log("enabled = default = false;")
  }

  console.log("rightbeforecheckstatus");
  checkStatus();
}


function saveDomain(status){

    chrome.tabs.getSelected(function (tabs) {
      var url = tabs.url;
      var split = url.split("/");
      domain = split[0] + "//" + split[2];
      window.status = status;
      window.domain = domain;
      console.log(domain);
      console.log(status);
      saveDomainValues(domain, status);

    });
}

