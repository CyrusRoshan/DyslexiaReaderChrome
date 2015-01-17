
function cssInject(){
  chrome.tabs.executeScript({
    code: '$("*").css("font-family", "Courier", "important"); $("*").css("font-size", "18pt", "important"); $("*").css("background-color", "#fbfbfb", "important"); $("*").css("line-height", "1.5", "important")'
  });
}
function cssRemove(){
  chrome.tabs.executeScript({
    code: '$("*").css("font-family", ""); $("*").css("font-size", ""); $("*").css("background-color", ""); $("*").css("line-height", "")'
  });
}

/*
Font-family: Courier
Font-size :18pt
Column Width of 65 Characters (removed, doesn't look good on all pages)
Font Color: #0f0f0f
Background-color: #fbfbfb
Line-height: 1.5
*/


