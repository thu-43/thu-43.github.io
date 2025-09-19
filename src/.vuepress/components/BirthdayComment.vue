<template>
  <div class="birthday-comment-wrapper">
    <!-- 生日主题评论区标题 -->
    <div class="birthday-comment-header">
      <div class="header-content">
        <h2 class="header-title">
          <span class="emoji-left">🎂</span>
          {{ title || '留下你的生日祝福' }}
          <span class="emoji-right">🎉</span>
        </h2>
        <p class="header-subtitle">
          {{ subtitle || '在这个特别的日子里，让我们一起送上最温暖的祝福' }}
        </p>
      </div>
      
      <!-- 装饰性元素 -->
      <div class="decoration-elements">
        <div class="floating-emoji" v-for="(emoji, index) in decorationEmojis" :key="index">
          {{ emoji }}
        </div>
      </div>
    </div>
    
    <!-- 评论统计 -->
    <div class="comment-stats" v-if="showStats">
      <div class="stat-item">
        <span class="stat-icon">💝</span>
        <span class="stat-text">{{ commentCount || 0 }} 条祝福</span>
      </div>
      <div class="stat-item">
        <span class="stat-icon">❤️</span>
        <span class="stat-text">满满的爱意</span>
      </div>
    </div>
    
    <!-- 评论区容器 -->
    <div class="birthday-giscus-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Props {
  title?: string;
  subtitle?: string;
  showStats?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '💝 留下你的生日祝福吧 💝',
  subtitle: '🎂 在这个特别的日子里，让我们一起为寿星送上最温暖的祝福 🎉',
  showStats: true
});

const commentCount = ref(0);
const decorationEmojis = ['🎈', '✨', '🌟', '💫', '🎊', '🎁'];

onMounted(() => {
  // 监听评论数量变化
  const observer = new MutationObserver(() => {
    updateCommentCount();
  });
  
  // 等待Giscus加载
  const checkGiscus = setInterval(() => {
    const giscusFrame = document.querySelector('.giscus-frame');
    if (giscusFrame) {
      clearInterval(checkGiscus);
      observer.observe(giscusFrame, {
        childList: true,
        subtree: true
      });
      updateCommentCount();
    }
  }, 500);
});

function updateCommentCount() {
  const comments = document.querySelectorAll('.gsc-comment');
  commentCount.value = comments.length;
}
</script>

<style scoped>
.birthday-comment-wrapper {
  margin: 30px 0;
}

.birthday-comment-header {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fd79a8 100%);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(255, 154, 158, 0.3);
}

.birthday-comment-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: header-shine 4s infinite;
  pointer-events: none;
}

@keyframes header-shine {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

.header-content {
  position: relative;
  z-index: 2;
}

.header-title {
  color: white;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 15px 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  animation: title-glow 2s ease-in-out infinite alternate;
}

@keyframes title-glow {
  from { text-shadow: 2px 2px 4px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.5); }
  to { text-shadow: 2px 2px 4px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.8); }
}

.emoji-left, .emoji-right {
  display: inline-block;
  animation: emoji-bounce 2s ease-in-out infinite;
  margin: 0 10px;
}

.emoji-right {
  animation-delay: 0.5s;
}

@keyframes emoji-bounce {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-8px) scale(1.1); }
}

.header-subtitle {
  color: rgba(255,255,255,0.95);
  font-size: 1.1rem;
  margin: 0;
  font-style: italic;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.decoration-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-emoji {
  position: absolute;
  font-size: 1.2rem;
  animation: float-around 6s ease-in-out infinite;
  opacity: 0.7;
}

.floating-emoji:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
.floating-emoji:nth-child(2) { top: 20%; right: 15%; animation-delay: 1s; }
.floating-emoji:nth-child(3) { bottom: 20%; left: 20%; animation-delay: 2s; }
.floating-emoji:nth-child(4) { bottom: 10%; right: 10%; animation-delay: 3s; }
.floating-emoji:nth-child(5) { top: 50%; left: 5%; animation-delay: 4s; }
.floating-emoji:nth-child(6) { top: 60%; right: 5%; animation-delay: 5s; }

@keyframes float-around {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-15px) rotate(90deg); }
  50% { transform: translateY(-10px) rotate(180deg); }
  75% { transform: translateY(-20px) rotate(270deg); }
}

.comment-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.stat-item {
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #fd79a8;
  border-radius: 25px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 5px 15px rgba(253, 121, 168, 0.2);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(253, 121, 168, 0.3);
  background: rgba(255, 255, 255, 1);
}

.stat-icon {
  font-size: 1.2rem;
  animation: stat-pulse 2s ease-in-out infinite;
}

@keyframes stat-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.stat-text {
  font-weight: bold;
  color: #e84393;
  font-size: 0.95rem;
}

.birthday-giscus-container {
  position: relative;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .birthday-comment-header {
    padding: 20px;
  }
  
  .header-title {
    font-size: 1.5rem;
  }
  
  .header-subtitle {
    font-size: 1rem;
  }
  
  .comment-stats {
    gap: 15px;
  }
  
  .stat-item {
    padding: 8px 15px;
  }
  
  .floating-emoji {
    font-size: 1rem;
  }
}
</style>