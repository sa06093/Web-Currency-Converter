//팝업 창이 완전히 로드되었을 때 발생
document.addEventListener('DOMContentLoaded', function () {
  // chrome.storage.sync.get을 사용하여 'extensionEnabled' 값을 가져음
  chrome.storage.sync.get('extensionEnabled', (data) => {
    // extensionEnabled의 값이 false가 아니면, 체크되었다는 것
    document.getElementById('toggleExtension').checked = (data.extensionEnabled !== false);
  });

  // 토글 버튼 상태가 변경될 때 이벤트 실행
  document.getElementById('toggleExtension').addEventListener('change', function () {
    // 백그라운드 스크립트에 메시지를 보내서 toggle 하는데 사용함
    chrome.runtime.sendMessage({ toggleExtension: true });
    // 현재 활성화된 탭을 찾음
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // 활성화된 탭을 새로고침
      chrome.tabs.reload(tabs[0].id);
    });
  });
});