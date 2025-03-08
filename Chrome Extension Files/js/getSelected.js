function getSelected(callback) {
  let queryOptions = { active: true, lastFocusedWindow: true };
  chrome.tabs.query(queryOptions).then((tabs) => {
    callback(tabs[0]);
  });
}
