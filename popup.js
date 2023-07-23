var logins;

chrome.storage.local.get(["logins"])
.then(result => {
    if (result.logins == undefined) {
        chrome.storage.local.set({ logins: [] });
        return;
    }

    logins = result.logins;

    for (let i = 0; i < logins.length; i++) {
        document.getElementById("saved-logins").innerHTML += 
        `<div class="login-block">
            <div class="lb-details">
                <h4 class="lb-title">${logins[i].title}</h4>
                <p class="lb-email">${logins[i].email}</p>
                <p class="lb-password">**********</p>
            </div>
            <button class="lb-copy" id="copy-${i}"><img src="copy-regular.svg" /></button>
        </div>`

        document.getElementById(`copy-${i}`).onclick = function() {
            navigator.clipboard.writeText(logins[i].password);
        };
    }
});