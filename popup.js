
function getCurrentTab(callback) {
  let queryOptions = { active: true, lastFocusedWindow: true };
  chrome.tabs.query(queryOptions, ([tab]) => {
    if (chrome.runtime.lastError)
    console.error(chrome.runtime.lastError);
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    callback(tab);
  });
}

function injectTheScript() {
  getCurrentTab(tab => {
    chrome.scripting.executeScript({
      files: ["injected.js"],
      target: {tabId: tab.id},
    });
  });
}
document.getElementById("mainAddButton").addEventListener("click", injectTheScript);
