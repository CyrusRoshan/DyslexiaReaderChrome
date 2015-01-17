
function saveDomainDisabled(){
  saveDomain("Disabled");
}

function saveDomainNeither(){
  saveDomain("Neither");
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("Disabled").addEventListener("click", saveDomainDisabled);
  document.getElementById("Neither").addEventListener("click", saveDomainNeither);
});
