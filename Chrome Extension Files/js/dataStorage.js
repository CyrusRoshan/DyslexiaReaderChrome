function clearDomainValues(){
	chrome.storage.sync.clear();
	//Removes all values from chrome storage sync.
}

function saveDomainValues(domain, status) {
	dataStorage["currentStatus"] = window.currentStatus;
	dataStorage[domain] = status;
	dataStorage["enabled"] = enabled;
	if (status == "Disabled" || status == "Enabled") {
		chrome.storage.sync.set(dataStorage);
	}
	else {
		delete dataStorage[domain];
		chrome.storage.sync.set(dataStorage);
	}
	//saves the value to sync if the value for the current domain is "disabled"
	//otherwise it just removes the value to save sync.storage space since it defaults to "enabled"

  chrome.runtime.sendMessage("update");
}

function saveAndLog(domain, status) {
	dataStorage["currentStatus"] = currentStatus;
	dataStorage[domain] = status;
	if (status == "Disabled" || status == "Enabled") {
		chrome.storage.sync.set(dataStorage, function(){
			loadDomainValues();
		});
	}
	else {
		delete dataStorage[domain];
    console.error('DOMAIN', domain)
		chrome.storage.sync.remove(domain, function(){
			loadDomainValues();
		});
	}
	//basically the same thing as saveDomainValues but also calls loadDomainValues
	//because async functions have to be kept in line
}


function loadDomainValues() {
	chrome.storage.sync.get(function(data) {
		dataStorage = data;
		window.dataStorage = data;
		configureDomainValues();
	});
	//gets the values from chrome's sync storage

}

function configureDomainValues() {
	dataStorage["currentStatus"] = window.dataStorage["currentStatus"];
	dataStorage[domain] = window.dataStorage[domain];

	currentStatus = dataStorage["currentStatus"];


	enabled = currentStatus;
	if (window.dataStorage[domain] == "Disabled") {
		status = "Disabled";
	}
	else if (window.dataStorage[domain] == "Enabled") {
		status = "Enabled";
	}
	else {
		status = "Neither";
	}

	if (window.dataStorage["currentStatus"] === true || window.dataStorage["currentStatus"] === false) {
		enabled = window.dataStorage["currentStatus"];
	}
	else {
		enabled = false;
		window.dataStorage["currentStatus"] = false;
	}
	checkStatus();
	//gets individual values from chrome's sync storage (which was saved as dataStorage earlier)
	//then it sets variable values based on dataStorage's values and calls checkStatus to
	//set them visually and call the needed function from inject.js
}


function saveDomain(status, saveDomainValues){

	getSelected(function (tabs) {
		var url = tabs.url;
		var split = url.split("/");
		domain = split[1] + split[2];
		window.status = status;
		window.domain = domain;

    console.log('URL', url, tabs)
		saveAndLog(domain, status);
	});
	//saves the current domain and its value (enabled/disabled)
	//then passes those values to saveAndLog
}

