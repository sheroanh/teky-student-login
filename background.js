let urlQrLogin = "https://teky.edu.vn/qr-login";
let urlBasicLogin = "https://teky.edu.vn/login";
let urlClass = "https://teky.edu.vn/lop-hoc/";
let urlMyProject = "https://teky.edu.vn/du-an-cua-em/";
let urlExercise = "https://teky.edu.vn/luyen-tap/";
let url = "https://teky.edu.vn/";

let urlRedirectPath = {
  0: urlClass,
  1: urlMyProject,
  2: urlExercise,
  3: urlClass,
};

let logout = true;
let autoRedirectAfterLogin = false;
let selectedRedirectPath = 0;

function sendNotification(title, message, iconUrl = "./icons/icon.png") {
  chrome.notifications.create({
    type: "basic",
    iconUrl: iconUrl,
    title: title,
    message: message,
    priority: 1,
  });
}

function redirect(url = urlQrLogin) {
  chrome.tabs.update({ url: url });
}

function onError(error) {
  console.log(`Lỗi: ${error}`);
}

function afterLogin(tabId, info, tab) {
  if (tab.url.match("teky.edu.vn/lop-hoc/") && info.status === "loading") {
    redirect(urlRedirectPath[selectedRedirectPath]);
    chrome.tabs.onUpdated.removeListener(afterLogin);
    return;
  }
}

async function removeCookie() {
  if (logout)
    chrome.cookies.getAll({ url: url }).then(function (cookies) {
      return Promise.all(
        cookies.map(function (cookie) {
          return chrome.cookies.remove({ url: url, name: cookie.name });
        })
      );
    });
}

chrome.action.onClicked.addListener();
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  switch (request.message) {
    case "actionQrLogin":
      await removeCookie();
      redirect(urlQrLogin);
      sendResponse({ data: "", message: "success" });
      if (autoRedirectAfterLogin) chrome.tabs.onUpdated.addListener(afterLogin);
      break;
    case "getLogout":
      sendResponse({ data: logout, message: "success" });
      break;
    case "setLogout":
      logout = request.data || false;
      sendResponse({
        data: logout,
        message: logout
          ? "Đã bật tự động đăng xuất"
          : "Đã tắt tự động đăng xuất",
      });
      break;
    case "getAutoRedirectAfterLogin":
      sendResponse({ data: autoRedirectAfterLogin, message: "success" });
      break;
    case "setAutoRedirectAfterLogin":
      autoRedirectAfterLogin = request.data || false;
      sendResponse({
        data: autoRedirectAfterLogin,
        message: autoRedirectAfterLogin
          ? "Đã bật tự động chuyển hướng sau khi đăng nhập"
          : "Đã tắt tự động chuyển hướng sau khi đăng nhập",
      });
      break;
    case "getRedirectPath":
      sendResponse({ data: selectedRedirectPath, message: "success" });
      break;
    case "setRedirectPath":
      selectedRedirectPath = request.data || 0;
      sendResponse({
        data: selectedRedirectPath,
        message: "Đã cập nhật đường dẫn chuyển hướng",
      });
    default:
      break;
  }
});
