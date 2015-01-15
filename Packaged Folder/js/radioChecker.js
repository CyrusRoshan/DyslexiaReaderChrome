function saveDomainEnabled(){
  saveDomain("Enabled");
}

function saveDomainDisabled(){
  saveDomain("Disabled");
}

function saveDomainNeither(){
  saveDomain("Neither");
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("Enabled").addEventListener("click", saveDomainEnabled);
  document.getElementById("Disabled").addEventListener("click", saveDomainDisabled);
  document.getElementById("Neither").addEventListener("click", saveDomainNeither);
});
