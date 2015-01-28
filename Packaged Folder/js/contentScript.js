function subtreeModified(){
  chrome.runtime.sendMessage({modified: "true"});
}

document.addEventListener("DOMSubtreeModified", subtreeModified, false);
