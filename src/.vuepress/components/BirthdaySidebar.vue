<template>
  <div class="birthday-sidebar">
    <div class="birthday-quick-links">
      <h4>🎂 生日特辑</h4>
      <ul>
        <li><a href="/人物/2025-08-06-lj.html">🎉 李锦生日专页</a></li>
        <li><a href="/人物/2025-08-06-lj.html#🎤-同学们的温暖祝福">💌 同学祝福</a></li>
        <li><a href="/班级生活/">📸 班级回忆</a></li>
        <li><a href="/人物/">👥 班级成员</a></li>
      </ul>
    </div>
    
    <div class="birthday-quote">
      <blockquote>
        "生日不是你出生的那一天，而是你开始真正生活的那一天。"
        <footer>— 生日的意义</footer>
      </blockquote>
    </div>
    
    <div class="birthday-wishes-box">
      <h4>💝 快速祝福</h4>
      <div class="wish-buttons">
        <button class="wish-btn" @click="sendWish('生日快乐！')">🎂 生日快乐</button>
        <button class="wish-btn" @click="sendWish('身体健康！')">💪 身体健康</button>
        <button class="wish-btn" @click="sendWish('学业进步！')">📚 学业进步</button>
        <button class="wish-btn" @click="sendWish('前程似锦！')">✨ 前程似锦</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BirthdaySidebar',
  methods: {
    sendWish(wish) {
      // 创建祝福弹窗效果
      this.showWishAnimation(wish);
    },
    showWishAnimation(wish) {
      // 创建祝福动画元素
      const wishElement = document.createElement('div');
      wishElement.textContent = wish;
      wishElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b9d, #ffa726);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: wishPop 2s ease-out forwards;
      `;
      
      // 添加CSS动画
      const style = document.createElement('style');
      style.textContent = `
        @keyframes wishPop {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
      document.body.appendChild(wishElement);
      
      // 2秒后移除元素
      setTimeout(() => {
        document.body.removeChild(wishElement);
        document.head.removeChild(style);
      }, 2000);
    }
  }
}
</script>

<style scoped>
.birthday-sidebar {
  background: linear-gradient(135deg, 
    rgba(255, 182, 193, 0.05) 0%,
    rgba(255, 192, 203, 0.1) 100%
  );
  padding: 20px;
  border-radius: 15px;
  margin: 20px 0;
  border-left: 4px solid #ff6b9d;
}

.birthday-quick-links h4 {
  color: #d81b60;
  font-size: 1.1rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.birthday-quick-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.birthday-quick-links li {
  margin-bottom: 8px;
}

.birthday-quick-links a {
  color: #ff6b9d;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 5px 10px;
  border-radius: 8px;
  display: block;
  transition: all 0.3s ease;
}

.birthday-quick-links a:hover {
  background: rgba(255, 107, 157, 0.1);
  transform: translateX(5px);
}

.birthday-quote {
  margin: 20px 0;
  padding: 15px;
  background: rgba(255, 107, 157, 0.05);
  border-radius: 10px;
}

.birthday-quote blockquote {
  margin: 0;
  font-style: italic;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
}

.birthday-quote footer {
  text-align: right;
  margin-top: 10px;
  font-size: 0.8rem;
  color: #ff6b9d;
}

.birthday-wishes-box h4 {
  color: #d81b60;
  font-size: 1.1rem;
  margin-bottom: 15px;
}

.wish-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.wish-btn {
  background: linear-gradient(45deg, rgba(255, 107, 157, 0.1), rgba(255, 167, 38, 0.1));
  border: 1px solid rgba(255, 107, 157, 0.3);
  color: #d81b60;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.wish-btn:hover {
  background: linear-gradient(45deg, rgba(255, 107, 157, 0.2), rgba(255, 167, 38, 0.2));
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
}

.wish-btn:active {
  transform: translateY(0);
  animation: wishButtonPulse 0.3s ease;
}

@keyframes wishButtonPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .birthday-sidebar {
    padding: 15px;
    margin: 15px 0;
  }
  
  .birthday-quick-links h4,
  .birthday-wishes-box h4 {
    font-size: 1rem;
  }
  
  .wish-buttons {
    grid-template-columns: 1fr;
  }
  
  .wish-btn {
    padding: 10px;
    font-size: 0.9rem;
  }
}
</style>
