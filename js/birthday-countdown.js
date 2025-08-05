// 生日倒计时功能 + 动态主题切换
(function() {
  function updateCountdown() {
    const targetDate = new Date('2025-08-06T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    const countdownContainer = document.getElementById('countdown-container');
    const normalContent = document.getElementById('normal-content');
    const birthdayContent = document.getElementById('birthday-content');
    const body = document.body;
    
    if (distance > 0) {
      // 生日前：显示正常版本+倒计时
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      const daysEl = document.getElementById('days');
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');
      const displayEl = document.getElementById('countdown-display');
      const celebrationEl = document.getElementById('birthday-celebration');
      const messageEl = document.getElementById('countdown-message');
      
      if (daysEl) daysEl.textContent = days;
      if (hoursEl) hoursEl.textContent = hours;
      if (minutesEl) minutesEl.textContent = minutes;
      if (secondsEl) secondsEl.textContent = seconds;
      
      if (displayEl) displayEl.style.display = 'flex';
      if (celebrationEl) celebrationEl.style.display = 'none';
      if (messageEl) messageEl.textContent = '距离李锦同学的生日还有：';
      
      // 显示正常内容，隐藏生日内容
      if (normalContent) normalContent.style.display = 'block';
      if (birthdayContent) birthdayContent.style.display = 'none';
      
      // 移除生日主题CSS类
      body.classList.remove('birthday-mode');
      
      // 更新页面标题为正常版本
      document.title = 'THU自43的温馨博客';
      
      // 更新网站图标颜色为正常版本
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.content = '#3498db';
      }
      
    } else {
      // 生日当天及之后：显示生日主题版本
      const displayEl = document.getElementById('countdown-display');
      const celebrationEl = document.getElementById('birthday-celebration');
      const messageEl = document.getElementById('countdown-message');
      
      if (displayEl) displayEl.style.display = 'none';
      if (celebrationEl) celebrationEl.style.display = 'block';
      if (messageEl) messageEl.textContent = '今天是李锦同学的生日！🎂';
      
      // 隐藏正常内容，显示生日内容
      if (normalContent) normalContent.style.display = 'none';
      if (birthdayContent) birthdayContent.style.display = 'block';
      
      // 添加生日主题CSS类
      body.classList.add('birthday-mode');
      
      // 更新页面标题为生日版本
      document.title = '🎂 李锦生日快乐！- THU自43';
      
      // 更新网站图标颜色为生日版本
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.content = '#ff6b9d';
      }
      
      // 添加生日横幅（如果还没有的话）
      addBirthdayBanner();
    }
  }

  // 添加生日祝福横幅
  function addBirthdayBanner() {
    if (!document.querySelector('.birthday-banner')) {
      const banner = document.createElement('div');
      banner.className = 'birthday-banner';
      banner.innerHTML = '🎉 今天是李锦同学的生日！让我们一起庆祝吧！🎂';
      document.body.appendChild(banner);
      
      // 5秒后自动隐藏横幅
      setTimeout(() => {
        banner.style.transform = 'translateY(-100%)';
        setTimeout(() => {
          if (banner.parentNode) {
            banner.parentNode.removeChild(banner);
          }
        }, 500);
      }, 5000);
    }
  }

  // 页面加载完成后开始倒计时
  function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // 兼容多种加载状态
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountdown);
  } else {
    initCountdown();
  }
  
  // 确保Vue组件加载后也能执行
  window.addEventListener('load', initCountdown);
})();
