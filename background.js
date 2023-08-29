let currentTabId;
let linkedinTabId;
let previousTab;
let previousUnreadMails = 0;

function onError(e) {
    console.log("***Error: " + e);
};

function setButtonIcon(imageURL) {
    try {
        browser.browserAction.setIcon({ path: imageURL });
    } catch (e) {
        onError(e);
    }
};

function createTab() {
    browser.tabs.create(
        {
            url: "https://linkedin.com",
            pinned: false,
            active: true
        }
    )
};

function handleSearch(linkedinTabs) {
    //console.log("currentTabId: " + currentTabId);
    if (linkedinTabs.length > 0) {
        //console.log("there is a linkedin tab");
        linkedinTabId = linkedinTabs[0].id;
        if (linkedinTabId === currentTabId) {
            //console.log("I'm in the linkedin tab");
            browser.tabs.update(previousTab, { active: true, });
        } else {
            //console.log("I'm NOT in the linkedin tab");
            previousTab = currentTabId;
            browser.tabs.update(linkedinTabId, { active: true, });
        }
        setButtonIcon(linkedinTabs[0].favIconUrl);
    } else {
        //console.log("there is NO linkedin tab");
        previousTab = currentTabId;
        createTab();
    }
};

function handleClick(tab) {
    //console.log("*********Button clicked*********");
    currentTabId = tab.id;
    var querying = browser.tabs.query({ url: "*://*linkedin.com/*" });
    querying.then(handleSearch, onError);
};

browser.browserAction.onClicked.addListener(handleClick);
