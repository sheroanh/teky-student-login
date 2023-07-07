let loadingWrapper = document.getElementById("loading-wrapper");

async function sendMessage(message, data = null, callback = null) {
  await chrome.runtime.sendMessage(
    { message: message, data: data },
    async function (response) {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
        setTimeout(async () => {
          await sendMessage(message, data, callback);
        }, 1000);
      }
      callback(response);
    }
  );
}

function sendNotification(title, message, iconUrl = "./icons/icon.png") {
  chrome.notifications.create({
    type: "basic",
    iconUrl: iconUrl,
    title: title,
    message: message,
    priority: 1,
  });
}

async function checkLogOut() {
  sendMessage("getLogout", null, function (response) {
    if (response?.data) document.getElementById("logout").checked = true;
    else document.getElementById("logout").checked = false;
  });
}

async function checkRedirectPath() {
  sendMessage("getRedirectPath", null, function (response) {
    document.getElementById("redirect-path").value = response
      ? response?.data || 0
      : 0;
  });
}

async function checkAutoRedirectAfterLogin() {
  sendMessage("getAutoRedirectAfterLogin", null, function (response) {
    document.getElementById("auto-redirect-after-login").checked =
      response?.data;
    document.getElementById("redirect-path").disabled = !response?.data;
  });
}

document.getElementById("btn-qr-login").addEventListener("click", () => {
  sendMessage("actionQrLogin", null, function (response) {});
});

document.getElementById("logout").addEventListener("change", function () {
  sendMessage("setLogout", this.checked, function (response) {
    sendNotification(
      "TEKY Student Login",
      response?.message || "Có lỗi xảy ra"
    );
  });
});

document
  .getElementById("auto-redirect-after-login")
  .addEventListener("change", function () {
    sendMessage("setAutoRedirectAfterLogin", this.checked, function (response) {
      sendNotification(
        "TEKY Student Login",
        response?.message || "Có lỗi xảy ra"
      );
    });
    document.getElementById("redirect-path").disabled = !this.checked;
  });

document
  .getElementById("redirect-path")
  .addEventListener("change", function () {
    sendMessage("setRedirectPath", this.value, function (response) {
      sendNotification(
        "TEKY Student Login",
        response?.message || "Có lỗi xảy ra"
      );
    });
  });

const loadOptions = async () => {
  await chrome.runtime.connect({ name: "popup" });
  await checkLogOut();
  await checkAutoRedirectAfterLogin();
  await checkRedirectPath();
};

// function setLoading(open = false) {
//   if (open) loadingWrapper.style.display = "block";
//   loadingWrapper.style.display = "block";
//   return;
// }

document.addEventListener("DOMContentLoaded", function (event) {
  loadOptions();
});
