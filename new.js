document.getElementById('toggleExtension').addEventListener('change', function() {
    const shadow = document.getElementById('shadow');
    const popupContainer = document.getElementById('popup-container');

    // 스위치가 클릭되었을 때, display 속성을 변경
    shadow.style.display = this.checked ? 'block' : 'none';
    
    // popup-container의 height를 10px 높여줌
    popupContainer.style.height = this.checked ? '140px' : '60px';
  });