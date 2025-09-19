// 生日主题评论区增强脚本

document.addEventListener('DOMContentLoaded', function() {
  // 等待Giscus评论区加载完成
  const checkGiscus = setInterval(() => {
    const giscusFrame = document.querySelector('.giscus-frame');
    if (giscusFrame) {
      clearInterval(checkGiscus);
      initBirthdayCommentTheme();
    }
  }, 500);
});

function initBirthdayCommentTheme() {
  // 添加生日主题装饰
  addBirthdayDecorations();
  
  // 添加评论动画效果
  addCommentAnimations();
  
  // 添加生日彩蛋效果
  addBirthdayEasterEggs();
}

function addBirthdayDecorations() {
  // 为评论区添加飘落的表情符号动画
  const giscusContainer = document.querySelector('.giscus');
  if (giscusContainer) {
    // 创建飘落动画容器
    const decorationContainer = document.createElement('div');
    decorationContainer.className = 'birthday-decorations';
    decorationContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    `;
    
    // 添加飘落的生日表情符号
    const emojis = ['🎂', '🎉', '🎈', '✨', '🎁', '🌟', '💝', '🎊'];
    
    setInterval(() => {
      if (Math.random() < 0.3) { // 30% 概率生成新表情符号
        createFallingEmoji(decorationContainer, emojis);
      }
    }, 2000);
    
    giscusContainer.style.position = 'relative';
    giscusContainer.appendChild(decorationContainer);
  }
}

function createFallingEmoji(container, emojis) {
  const emoji = document.createElement('div');
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.cssText = `
    position: absolute;
    top: -20px;
    left: ${Math.random() * 100}%;
    font-size: ${Math.random() * 10 + 15}px;
    animation: birthday-fall ${Math.random() * 3 + 4}s linear forwards;
    opacity: ${Math.random() * 0.5 + 0.5};
  `;
  
  // 添加CSS动画
  if (!document.querySelector('#birthday-fall-animation')) {
    const style = document.createElement('style');
    style.id = 'birthday-fall-animation';
    style.textContent = `
      @keyframes birthday-fall {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(400px) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  container.appendChild(emoji);
  
  // 清理过期元素
  setTimeout(() => {
    if (emoji.parentNode) {
      emoji.parentNode.removeChild(emoji);
    }
  }, 7000);
}

function addCommentAnimations() {
  // 为新评论添加出现动画
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.classList.contains('gsc-comment')) {
          // 添加新评论的动画效果
          node.style.cssText += `
            animation: birthday-comment-appear 0.8s ease-out;
            transform-origin: center top;
          `;
          
          // 添加CSS动画
          if (!document.querySelector('#birthday-comment-animation')) {
            const style = document.createElement('style');
            style.id = 'birthday-comment-animation';
            style.textContent = `
              @keyframes birthday-comment-appear {
                0% {
                  opacity: 0;
                  transform: translateY(-20px) scale(0.9);
                }
                50% {
                  transform: translateY(-5px) scale(1.02);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
            `;
            document.head.appendChild(style);
          }
        }
      });
    });
  });
  
  const giscusFrame = document.querySelector('.giscus-frame');
  if (giscusFrame) {
    observer.observe(giscusFrame, {
      childList: true,
      subtree: true
    });
  }
}

function addBirthdayEasterEggs() {
  // 检测特定关键词并添加特效
  const birthdayKeywords = ['生日快乐', '祝福', '特拉', 'happy birthday', '🎂', '🎉'];
  
  const checkForKeywords = () => {
    const comments = document.querySelectorAll('.gsc-comment-content');
    comments.forEach(comment => {
      const text = comment.textContent.toLowerCase();
      const hasKeyword = birthdayKeywords.some(keyword => 
        text.includes(keyword.toLowerCase())
      );
      
      if (hasKeyword && !comment.classList.contains('birthday-enhanced')) {
        comment.classList.add('birthday-enhanced');
        
        // 添加特殊效果
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
          position: absolute;
          top: -10px;
          right: -10px;
          font-size: 16px;
          animation: birthday-sparkle 2s ease-in-out infinite;
          pointer-events: none;
        `;
        
        comment.style.position = 'relative';
        comment.appendChild(sparkle);
        
        // 添加CSS动画
        if (!document.querySelector('#birthday-sparkle-animation')) {
          const style = document.createElement('style');
          style.id = 'birthday-sparkle-animation';
          style.textContent = `
            @keyframes birthday-sparkle {
              0%, 100% { 
                transform: scale(1) rotate(0deg);
                opacity: 1;
              }
              50% { 
                transform: scale(1.2) rotate(180deg);
                opacity: 0.7;
              }
            }
          `;
          document.head.appendChild(style);
        }
      }
    });
  };
  
  // 定期检查新评论
  setInterval(checkForKeywords, 3000);
  checkForKeywords(); // 初始检查
}

// 添加鼠标悬停效果
document.addEventListener('mouseover', function(e) {
  if (e.target.closest('.gsc-comment')) {
    const comment = e.target.closest('.gsc-comment');
    if (!comment.querySelector('.hover-birthday-effect')) {
      const effect = document.createElement('div');
      effect.className = 'hover-birthday-effect';
      effect.innerHTML = '🎈';
      effect.style.cssText = `
        position: absolute;
        top: 5px;
        left: 5px;
        font-size: 12px;
        opacity: 0;
        animation: birthday-hover-effect 0.5s ease-out forwards;
        pointer-events: none;
      `;
      
      comment.style.position = 'relative';
      comment.appendChild(effect);
      
      // 添加CSS动画
      if (!document.querySelector('#birthday-hover-animation')) {
        const style = document.createElement('style');
        style.id = 'birthday-hover-animation';
        style.textContent = `
          @keyframes birthday-hover-effect {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `;
        document.head.appendChild(style);
      }
      
      setTimeout(() => {
        if (effect.parentNode) {
          effect.remove();
        }
      }, 2000);
    }
  }
});