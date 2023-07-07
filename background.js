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

const data = {};

const getStorage = (key = null) =>
  chrome.storage.sync
    .get(key || ["logout", "autoRedirectAfterLogin", "selectedRedirectPath"])
    .then((items) => {
      console.log("Đã lấy dữ liệu", items);
      Object.assign(data, items);
    });

async function setStorage(
  object = {
    logout: true,
    autoRedirectAfterLogin: false,
    selectedRedirectPath: 0,
  }
) {
  console.log("Đang lưu dữ liệu: ", object);
  await chrome.storage.sync.set(object, () => {
    console.log("đã lưu ");
    return true;
  });
}

function redirect(url = urlQrLogin) {
  chrome.tabs.update({ url: url });
}

function afterLogin(tabId, info, tab) {
  if (tab.url.match("teky.edu.vn/lop-hoc/") && info.status === "loading") {
    getStorage().then(() => {
      redirect(urlRedirectPath[data.selectedRedirectPath]);
      chrome.tabs.onUpdated.removeListener(afterLogin);
    });

    return;
  }
}

async function removeCookie() {
  if (data.logout)
    chrome.cookies.getAll({ url: url }).then(function (cookies) {
      return Promise.all(
        cookies.map(function (cookie) {
          return chrome.cookies.remove({ url: url, name: cookie.name });
        })
      );
    });
}

async function handleRequest(request, sender, sendResponse) {
  switch (request.message) {
    case "actionQrLogin":
      await removeCookie();
      redirect(urlQrLogin);
      sendResponse({ data: "", message: "success" });
      if (data?.autoRedirectAfterLogin)
        chrome.tabs.onUpdated.addListener(afterLogin);
      break;
    case "getLogout":
      sendResponse({ data: data?.logout, message: "success" });
      break;
    case "setLogout":
      await setStorage({ ...data, logout: request?.data });
      getStorage().then(() =>
        sendResponse({
          data: data?.logout,
          message: data?.logout
            ? "Đã bật tự động đăng xuất"
            : "Đã tắt tự động đăng xuất",
        })
      );
      break;
    case "getAutoRedirectAfterLogin":
      sendResponse({
        data: data?.autoRedirectAfterLogin,
        message: "success",
      });
      break;
    case "setAutoRedirectAfterLogin":
      setStorage({
        ...data,
        autoRedirectAfterLogin: request?.data,
      });
      getStorage().then(() =>
        sendResponse({
          data: data?.autoRedirectAfterLogin,
          message: data?.autoRedirectAfterLogin
            ? "Đã bật tự động chuyển hướng sau khi đăng nhập"
            : "Đã tắt tự động chuyển hướng sau khi đăng nhập",
        })
      );
      break;
    case "getRedirectPath":
      sendResponse({ data: data?.selectedRedirectPath, message: "success" });
      break;
    case "setRedirectPath":
      setStorage({
        ...data,
        selectedRedirectPath: request?.data,
      });
      getStorage().then(() =>
        sendResponse({
          data: data?.selectedRedirectPath,
          message: "Đã cập nhật đường dẫn chuyển hướng",
        })
      );
    default:
      break;
  }
}

// chrome.action.onClicked.addListener(async function (tab) {
//   try {

//   } catch (error) {
//     console.log(error);
//     if (chrome.runtime.lastError) {
//       console.log(chrome.runtime.lastError.message);
//     }
//   }
// });

async function handleConnect(port) {
  console.log("Connected: " + port.name);
  if (port.name === "popup") {
    if (
      data == {} ||
      !data?.logout ||
      !data?.autoRedirectAfterLogin ||
      !data?.selectedRedirectPath
    )
      await setStorage();
    try {
      await getStorage();
    } catch (e) {
      console.log(e);
    }
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      handleRequest(request, sender, sendResponse);
      return true;
    });
    port.onDisconnect.addListener(function () {
      chrome.runtime.onMessage.removeListener(handleRequest);
      console.log("popup has been closed");
    });
  }
}

chrome.runtime.onInstalled.addListener(async function (details) {
  if (details.reason == "install") {
    chrome.storage.sync.clear().then(async () => {
      console.log("Đã xóa dữ liệu");
      await setStorage();
      chrome.runtime.onConnect.addListener(handleConnect);
    });
  } else if (details.reason == "update") {
    chrome.storage.sync.clear().then(async () => {
      console.log("Đã xóa dữ liệu");
      await setStorage();
      chrome.runtime.onConnect.addListener(handleConnect);
    });
  }
});
