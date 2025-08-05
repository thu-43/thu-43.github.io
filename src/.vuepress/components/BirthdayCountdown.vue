<template>
  <div class="birthday-countdown">
    <div class="countdown-header">
      <h2>🎂 李锦生日倒计时 🎂</h2>
    </div>
    <div class="countdown-display" v-if="!isBirthday">
      <div class="time-unit">
        <span class="time-number">{{ days }}</span>
        <span class="time-label">天</span>
      </div>
      <div class="time-unit">
        <span class="time-number">{{ hours }}</span>
        <span class="time-label">时</span>
      </div>
      <div class="time-unit">
        <span class="time-number">{{ minutes }}</span>
        <span class="time-label">分</span>
      </div>
      <div class="time-unit">
        <span class="time-number">{{ seconds }}</span>
        <span class="time-label">秒</span>
      </div>
    </div>
    <div class="birthday-celebration" v-else>
      <h2 class="celebration-text">🎉 生日快乐！李锦同学！🎉</h2>
      <div class="fireworks">🎆🎇✨🎊</div>
    </div>
    <div class="countdown-message">
      <p v-if="!isBirthday">距离李锦同学的生日还有：</p>
      <p v-else>今天是李锦同学的生日！🎂</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BirthdayCountdown',
  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isBirthday: false,
      targetDate: new Date('2025-08-06T00:00:00').getTime(),
      timer: null
    }
  },
  mounted() {
    this.updateCountdown();
    this.timer = setInterval(this.updateCountdown, 1000);
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    updateCountdown() {
      const now = new Date().getTime();
      const distance = this.targetDate - now;
      
      if (distance > 0) {
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.isBirthday = false;
      } else {
        // 生日当天显示庆祝效果
        this.isBirthday = true;
        if (this.timer) {
          clearInterval(this.timer);
        }
      }
    }
  }
}
</script>

<style scoped>
.birthday-countdown {
  background: linear-gradient(135deg, #ff6b9d 0%, #ffa726 50%, #e91e63 100%);
  color: white;
  text-align: center;
  padding: 20px;
  margin: 20px 0;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(255, 107, 157, 0.4);
  position: relative;
  overflow: hidden;
}

.birthday-countdown::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
  animation: shine 3s infinite;
  pointer-events: none;
}

@keyframes shine {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

.countdown-header h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from { text-shadow: 2px 2px 4px rgba(0,0,0,0.3), 0 0 10px rgba(255,255,255,0.3); }
  to { text-shadow: 2px 2px 4px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.6); }
}

.countdown-display {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.time-unit {
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 15px 20px;
  min-width: 80px;
  border: 1px solid rgba(255,255,255,0.3);
  transition: transform 0.3s ease;
}

.time-unit:hover {
  transform: translateY(-5px);
  background: rgba(255,255,255,0.3);
}

.time-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
  animation: pulse 1s ease-in-out infinite;
}

.time-label {
  display: block;
  font-size: 0.9rem;
  margin-top: 5px;
  opacity: 0.9;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.birthday-celebration {
  padding: 20px 0;
}

.celebration-text {
  font-size: 2.2rem;
  margin-bottom: 20px;
  animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.fireworks {
  font-size: 3rem;
  animation: sparkle 1.5s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
}

.countdown-message {
  margin-top: 15px;
  font-size: 1.1rem;
  opacity: 0.95;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .birthday-countdown {
    padding: 15px;
    margin: 15px 0;
  }
  
  .countdown-header h2 {
    font-size: 1.4rem;
  }
  
  .countdown-display {
    gap: 10px;
  }
  
  .time-unit {
    padding: 10px 15px;
    min-width: 60px;
  }
  
  .time-number {
    font-size: 1.5rem;
  }
  
  .time-label {
    font-size: 0.8rem;
  }
  
  .celebration-text {
    font-size: 1.6rem;
  }
  
  .fireworks {
    font-size: 2rem;
  }
}

/* 小屏幕时垂直排列 */
@media (max-width: 480px) {
  .countdown-display {
    flex-direction: column;
    align-items: center;
  }
  
  .time-unit {
    margin-bottom: 10px;
  }
}
</style>
