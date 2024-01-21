let extensionEnabled = false; // 초기 상태를 비활성화로 설정

// 확장 프로그램이 설치/업데이트될 때
chrome.runtime.onInstalled.addListener(() => {
  // 초기 확장 프로그램을 비활성화 시켜놓음
  chrome.storage.sync.set({ extensionEnabled: false });
});

// toggleExtension이 true일 때마다 extensionEnabled 변수의 상태를 반전시키고, 변경된 상태를 chrome.storage.sync.set을 사용하여 저장합니다.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.toggleExtension) {
    extensionEnabled = !extensionEnabled; // 토글 상태 반전
    chrome.storage.sync.set({ extensionEnabled });
  }
});

// 확장 프로그램이 초기화될 때 
chrome.runtime.onStartup.addListener(() => {
  // 저장된 extensionEnabled 값을 가져옴
  chrome.storage.sync.get('extensionEnabled', (data) => {
    // 이 값을 기반으로 extensionEnabled 변수를 설정
    extensionEnabled = data.extensionEnabled !== false;
  });
});