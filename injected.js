
function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getThreeDotsAt(index) {
  return `/html/body/div[1]/div[3]/div/div/div[2]/div/main/div/div[3]/div/div/div/div[2]/div[2]/div[3]/div/div/div/div/div/div[2]/div[2]/div[${index}]/div/a/div/div[4]/div/div/div/button`;
}
function listPathAt(index) {
  return `/html/body/div[1]/div[3]/div/div/div[2]/div/main/div/div[3]/div/div/div/div[2]/div[2]/div[3]/div/div/div/div/div/div[2]/div[2]/div[${index}]/div`;
}

var threeDotsPopup = "/html/body/div[6]/div/div/div/div/div[1]/div/div/div/div/div/div";
// var closeExportPopupPath = "/html/body/div[4]/div/div/div/div/div/div[8]/button";
var exportPopupWindowsPath = "/html/body/div[4]/div/div/div/div/div";
// var startExportButtonPath = "/html/body/div[4]/div/div/div/div/div/div[7]/div[2]/button";

function exportAt(index)
{
  console.log(`Preparing for export index: ${index}`);
  let threeDotsButton = getElementByXpath(getThreeDotsAt(index));
  if (!threeDotsButton)
    return;
  threeDotsButton.click();
  setTimeout(() => {
    let popup = getElementByXpath(threeDotsPopup);
    let exportButton = popup.children[popup.childElementCount - 4].firstChild;
    exportButton.click();
    setTimeout(() => {
      let exportPopupWindow = getElementByXpath(exportPopupWindowsPath);
      let startExportButton = exportPopupWindow.children[exportPopupWindow.childElementCount - 2].lastChild.firstChild;
      let label = startExportButton.firstChild.firstChild;
      label.innerText = "Exporting in 3...";
      setTimeout(() => {
        if (label === null || label.offsetParent === null) // Checks if it is visible.
          return;
        label.innerText = "Exporting in 2...";
        setTimeout(() => {
          if (label === null || label.offsetParent === null) // Checks if it is visible.
            return;
          label.innerText = "Exporting in 1...";
          setTimeout(() => {
            if (label === null || label.offsetParent === null) // Checks if it is visible.
              return;
            console.log(`Exporting ${index}!`);
            label.innerText = "Exporting!";
            // startExportButton.click();
            setTimeout(() => {
              let closeButton = exportPopupWindow.lastChild.firstChild;
              closeButton.click();
            }, 100);
          }, 320);
        }, 320);
      }, 320);
    }, 20);
  }, 20);
}

var makeElem = (parent, elemName, callback) => {
  const elem = document.createElement(elemName);
  callback(elem);
  parent.appendChild(elem);
  return elem;
};

function addExportButtons() {
  let i = 1;
  while (true) {
    let index = i;
    i++;
    let list = getElementByXpath(listPathAt(index));
    if (!list)
      break;
    makeElem(list, "button", button => {
      button.innerText = "^ Start Export ^";
      // button.style.fontSize = 20;
      button.addEventListener('click', e => {
        setTimeout(() => {
          exportAt(index);
        }, 100); // Delay so the previous three dot popup menu can disappear if it is currently visible.
        e.stopPropagation();
      });
    });
  }

  // let threeDotsButton = getElementByXpath(getThreeDotsAt(2));
  // threeDotsButton.click();
  // setTimeout(() => {
  //   // let popup = getElementByXpath(threeDotsPopup);
  //   // let popup = document.querySelector("body > div.ScReactModalBase-sc-26ijes-0.fPaaXr.tw-dialog-layer > div > div > div > div > div.ScBalloonWrapper-sc-14jr088-0.eEhNFm.InjectLayout-sc-1i43xsx-0.jKAcCJ.tw-balloon > div > div > div > div > div > div");
  //   // let exportButton = popup.children[popup.childElementCount - 4];
  //   let exportButton = getElementByXpath(threeDotsPopup);
  //   if (!exportButton)
  //     exportButton = getElementByXpath(threeDotsPopupAlt);
  //   exportButton.click();
  // }, 10);
  // // let popup = null;
  // // while (popup === null)
  // // {
  // //   sleep(100);
  // //   popup = getElementByXpath(threeDotsPopup);
  // // }
}

addExportButtons();
