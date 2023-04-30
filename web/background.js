chrome.tabs.onCreated.addListener(function (tab) {
  console.log("Tab created:", tab.url);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    console.log("Tab updated:", tab.url);
  }
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
  console.log("Tab removed:", removeInfo.url);
});

// https://cdn.jsdelivr.net/npm/readability-js@1.0.7/src/readability.min.js

chrome.tabs.query({}, function (tabs) {
  const functionToExecute = () => {
    //const text = document.body.innerText;

    const mainTextElements = document.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6"
    );
    const mainText = Array.from(mainTextElements)
      .map((element) => element.textContent)
      .join("\n");

    const chunks = mainText.split(/\n{2,}|\r{2,}|\r\n{2,}/);
    let largestChunk = "";

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i].trim();
      if (chunk.length > largestChunk.length) {
        largestChunk = chunk;
      }
    }

    return largestChunk;
  };
  for (var i = 0; i < tabs.length; i++) {
    chrome.scripting
      .executeScript({
        target: { tabId: tabs[i].id },
        function: functionToExecute,
      })
      .then((results) => {
        console.log(results[0].result);
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

/*
chrome.tabs.onActivated.addListener(moveToFirstPosition);

async function moveToFirstPosition(activeInfo) {
  try {
    await chrome.tabs.move(activeInfo.tabId, { index: 0 });
    console.log("Success.");
  } catch (error) {
    if (
      error ==
      "Error: Tabs cannot be edited right now (user may be dragging a tab)."
    ) {
      setTimeout(() => moveToFirstPosition(activeInfo), 50);
    } else {
      console.error(error);
    }
  }
}
*/

// Listen for messages from the content script

// background.js

/*
// Get the current active tab
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  // Inject the content script into the tab
  const functionToExecute = () => {
    return document.body.innerText;
  };
  chrome.scripting.executeScript(
    {
      target: { tabId: tabs[0].id },
      function: functionToExecute,
    },
    (res) => {
      console.log(res);
    }
  );
});
*/
