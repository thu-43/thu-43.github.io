<template>
  <div class="birthday-countdown">
    <div class="countdown-header">
      <h2 v-if="!isBirthday">🎂 {{ nextName }} 生日倒计时 🎂</h2>
      <h2 v-else>🎂 今天是 {{ todayNamesText }} 的生日 🎂</h2>
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
      <h2 class="celebration-text">🎉 生日快乐！{{ todayNamesText }}！🎉</h2>
      <div class="fireworks">🎆🎇✨🎊</div>
    </div>
    <div class="countdown-message">
      <p v-if="!isBirthday">距离 {{ nextName }} 的生日还有：</p>
      <p v-else>今天是 {{ todayNamesText }} 的生日！🎂</p>
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
      targetDate: 0,
      timer: null,
      entries: [], // { name, month, day }
      nextName: '同学',
      todayNamesText: '同学'
    }
  },
  mounted() {
    this.loadCSV().then(() => {
      this.tick();
      this.timer = setInterval(this.tick, 1000);
    });
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    async loadCSV() {
      try {
        const res = await fetch('/data/birthday.csv', { cache: 'no-cache' });
        const text = await res.text();
        this.entries = this.parseCSV(text);
      } catch (e) {
        console.error('加载生日CSV失败: ', e);
        this.entries = [];
      }
    },
    parseCSV(text) {
      const lines = text.trim().split(/\r?\n/);
      const out = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(',');
        if (parts.length < 2) continue;
        const name = parts[0].trim();
        const date = parts[1].trim();
        const m = date.match(/^(\d{4})[./-](\d{2})[./-](\d{2})$/);
        if (!m) continue;
        const month = parseInt(m[2], 10);
        const day = parseInt(m[3], 10);
        out.push({ name, month, day });
      }
      return out;
    },
    getTodayNames(today, entries) {
      const m = today.getMonth() + 1;
      const d = today.getDate();
      return entries.filter(e => e.month === m && e.day === d).map(e => e.name);
    },
    getNextBirthday(today, entries) {
      const year = today.getFullYear();
      let best = null;
      let bestTime = Infinity;
      for (const e of entries) {
        let target = new Date(year, e.month - 1, e.day, 0, 0, 0, 0);
        if (target.getTime() < today.getTime()) {
          target = new Date(year + 1, e.month - 1, e.day, 0, 0, 0, 0);
        }
        const diff = target.getTime() - today.getTime();
        if (diff < bestTime) {
          bestTime = diff;
          best = { name: e.name, target };
        }
      }
      return best;
    },
    tick() {
      if (!this.entries.length) return;
      const now = new Date();
      const todays = this.getTodayNames(now, this.entries);
      if (todays.length) {
        this.isBirthday = true;
        this.todayNamesText = todays.join('、');
        // 倒计时到当天结束，仅用于隐藏数字显示
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        this.targetDate = endOfDay.getTime();
      } else {
        const next = this.getNextBirthday(now, this.entries);
        if (next) {
          this.isBirthday = false;
          this.nextName = next.name;
          this.targetDate = next.target.getTime();
        }
      }
      this.updateCountdown();
    },
    updateCountdown() {
      if (!this.targetDate) return;
      const now = Date.now();
      const distance = this.targetDate - now;
      
      if (distance > 0) {
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      } else {
        // 到达目标点后，下一轮tick会重算状态
        this.days = 0; this.hours = 0; this.minutes = 0; this.seconds = 0;
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
