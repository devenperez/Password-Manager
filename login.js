chrome.storage.local.get(["logins"])
.then(result => {
    if (result.logins == undefined) {
        document.getElementById("header-text").innerText = "Create a password"
    } else {
        document.getElementById("header-text").innerText = "Welcome back!"
    }
});


document.getElementById("enter").onclick = () => { 
    chrome.storage.session.set({ unlockKey: document.getElementById("password").value });
    document.location.href = "popup.html"; 
};