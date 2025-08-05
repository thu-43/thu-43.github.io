<template>
  <div class="birthday-wishes-container">
    <!-- 生日祝福横幅 -->
    <div class="birthday-banner" v-if="showBanner">
      <span class="birthday-text">🎉 今天是李锦同学的生日！🎂</span>
      <button @click="hideBanner" class="close-btn">×</button>
    </div>
    
    <!-- 飘落的表情符号 -->
    <div class="emoji-rain">
      <div 
        v-for="emoji in emojis" 
        :key="emoji.id"
        class="falling-emoji"
        :style="emoji.style"
      >
        {{ emoji.symbol }}
      </div>
    </div>
    
    <!-- 生日倒计时或庆祝 -->
    <div class="birthday-celebration" v-if="isBirthday">
      <h2 class="celebration-title">🎊 生日快乐！李锦同学！🎊</h2>
      <div class="birthday-cake">
        <div class="cake-base">🎂</div>
        <div class="candles">
          <span v-for="n in 19" :key="n" class="candle">🕯️</span>
        </div>
      </div>
      <p class="birthday-message">
        愿你在新的一岁里健康快乐，学业进步，前程似锦！✨
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BirthdayWishes',
  data() {
    return {
      showBanner: true,
      isBirthday: this.checkIfBirthday(),
      emojis: [],
      emojiSymbols: ['🎂', '🎈', '🎉', '🎁', '✨', '🌟', '🎊', '🎀', '🍰', '🧁']
    }
  },
  mounted() {
    this.createEmojiRain();
    // 每10秒创建新的表情雨
    setInterval(this.createEmojiRain, 10000);
  },
  methods: {
    checkIfBirthday() {
      const today = new Date();
      const month = today.getMonth() + 1; // 7月
      const day = today.getDate(); // 24日
      return month === 7 && day === 24;
    },
    hideBanner() {
      this.showBanner = false;
    },
    createEmojiRain() {
      // 创建20个随机飘落的表情符号
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const emoji = {
            id: Date.now() + Math.random(),
            symbol: this.emojiSymbols[Math.floor(Math.random() * this.emojiSymbols.length)],
            style: {
              left: Math.random() * 100 + 'vw',
              animationDelay: Math.random() * 2 + 's',
              animationDuration: (Math.random() * 3 + 4) + 's'
            }
          };
          this.emojis.push(emoji);
          
          // 5秒后移除这个表情符号
          setTimeout(() => {
            this.emojis = this.emojis.filter(e => e.id !== emoji.id);
          }, 7000);
        }, i * 200);
      }
    }
  }
}
</script>

<style scoped>
.birthday-wishes-container {
  position: relative;
  overflow: hidden;
}

.birthday-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(90deg, #ff6b9d, #ffa726, #e91e63, #ff6b9d);
  background-size: 200% 100%;
  animation: gradient-shift 3s ease-in-out infinite;
  color: white;
  text-align: center;
  padding: 12px;
  font-weight: bold;
  z-index: 1001;
  box-shadow: 0 2px 15px rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.birthday-text {
  animation: bounce-birthday 2s ease-in-out infinite;
}

.close-btn {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
}

.close-btn:hover {
  background: rgba(255,255,255,0.3);
}

.emoji-rain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1000;
}

.falling-emoji {
  position: absolute;
  top: -50px;
  font-size: 24px;
  animation: fall-and-sway linear forwards;
}

@keyframes fall-and-sway {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

.birthday-celebration {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, 
    rgba(255, 182, 193, 0.1) 0%,
    rgba(255, 192, 203, 0.2) 50%,
    rgba(255, 182, 193, 0.1) 100%
  );
  border-radius: 20px;
  margin: 20px;
  box-shadow: 0 10px 30px rgba(255, 107, 157, 0.2);
}

.celebration-title {
  font-size: 2.5rem;
  background: linear-gradient(45deg, #ff6b9d, #ffa726, #e91e63);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 3s ease-in-out infinite, bounce-birthday 2s ease-in-out infinite;
  margin-bottom: 30px;
}

.birthday-cake {
  font-size: 4rem;
  margin: 30px 0;
  position: relative;
}

.cake-base {
  animation: bounce-birthday 2s ease-in-out infinite;
}

.candles {
  font-size: 1rem;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
}

.candle {
  animation: flicker 1s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.1s);
}

.candle:nth-child(1) { --i: 1; }
.candle:nth-child(2) { --i: 2; }
.candle:nth-child(3) { --i: 3; }
.candle:nth-child(4) { --i: 4; }
.candle:nth-child(5) { --i: 5; }
.candle:nth-child(6) { --i: 6; }
.candle:nth-child(7) { --i: 7; }
.candle:nth-child(8) { --i: 8; }
.candle:nth-child(9) { --i: 9; }
.candle:nth-child(10) { --i: 10; }

@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.birthday-message {
  font-size: 1.2rem;
  color: #d81b60;
  font-weight: 600;
  line-height: 1.6;
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes bounce-birthday {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-glow {
  0%, 100% { text-shadow: 0 0 10px rgba(216, 27, 96, 0.3); }
  50% { text-shadow: 0 0 20px rgba(216, 27, 96, 0.6); }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .celebration-title {
    font-size: 1.8rem;
  }
  
  .birthday-cake {
    font-size: 3rem;
  }
  
  .birthday-message {
    font-size: 1rem;
  }
  
  .birthday-banner {
    padding: 10px;
    font-size: 14px;
  }
  
  .falling-emoji {
    font-size: 18px;
  }
}
</style>
