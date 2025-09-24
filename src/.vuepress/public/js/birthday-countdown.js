// 通用生日倒计时功能 + 动态主题切换（基于CSV名单）
(function() {
const CSV_URL = '/data/birthday.csv';
let OVERRIDE = null; // { name?: string, month?: number, day?: number }

// 可选：手动覆盖今天是谁生日（优先级最高），格式：'姓名1,姓名2'
const MANUAL_TODAY_OVERRIDE = '';

// 解析CSV为 { name, month, day }
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  const out = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    // 兼容逗号内无引号情况：姓名,YYYY.MM.DD
    const parts = line.split(',');
    if (parts.length < 2) continue;
    const name = parts[0].trim();
    const date = parts[1].trim();
    const m = date.match(/^(\d{4})[./-](\d{2})[./-](\d{2})$/);
    if (!m) continue;
    const month = parseInt(m[2], 10);
    const day = parseInt(m[3], 10);
    out.push({name, month, day});
  }
  return out;
}

// 给定今天，计算下一个即将到来的生日（含今天）
function getNextBirthday(today, entries) {
  const year = today.getFullYear();
  let best = null;
  let bestTime = Infinity;

  for (const e of entries) {
    // 今年的生日
    let target = new Date(year, e.month - 1, e.day, 0, 0, 0, 0);
    // 若今年已过，取明年
    if (target.getTime() < today.getTime()) {
      target = new Date(year + 1, e.month - 1, e.day, 0, 0, 0, 0);
    }
    const diff = target.getTime() - today.getTime();
    if (diff < bestTime) {
      bestTime = diff;
      best = {...e, target};
    }
  }
  return best;  // { name, month, day, target }
}

// 检查今天是谁过生日（支持多人）
function getTodayBirthdays(today, entries) {
  const md = `${today.getMonth() + 1}-${today.getDate()}`;
  const list = entries
                   .filter(
                       e =>
                           (e.month === today.getMonth() + 1 &&
                            e.day === today.getDate()))
                   .map(e => e.name);
  if (MANUAL_TODAY_OVERRIDE.trim()) {
    return MANUAL_TODAY_OVERRIDE.split(',').map(s => s.trim()).filter(Boolean);
  }
  return list;
}
// 读取页面上的专属参数（如果有）
function readOverride() {
  const el = document.getElementById('countdown-container');
  if (!el) return;
  const name = (el.getAttribute('data-name') || '').trim();
  const monthAttr = el.getAttribute('data-month');
  const dayAttr = el.getAttribute('data-day');
  if (monthAttr != null && dayAttr != null) {
    const m = parseInt(monthAttr, 10);
    const d = parseInt(dayAttr, 10);
    if (!Number.isNaN(m) && !Number.isNaN(d) && m > 0 && d > 0) {
      OVERRIDE = { name: name || '同学', month: m, day: d };
      return;
    }
  }
  if (name) {
    OVERRIDE = { name };
  }
}


// 渲染逻辑（与现有DOM结构兼容）
function renderCountdown(target, now) {
  const distance = target.getTime() - now.getTime();
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours =
      Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const displayEl = document.getElementById('countdown-display');
  const celebrationEl = document.getElementById('birthday-celebration');

  if (daysEl) daysEl.textContent = String(Math.max(0, days));
  if (hoursEl) hoursEl.textContent = String(Math.max(0, hours));
  if (minutesEl) minutesEl.textContent = String(Math.max(0, minutes));
  if (secondsEl) secondsEl.textContent = String(Math.max(0, seconds));

  if (displayEl) displayEl.style.display = distance > 0 ? 'flex' : 'none';
  if (celebrationEl)
    celebrationEl.style.display = distance <= 0 ? 'block' : 'none';
}

function setTheme(isBirthday, names = []) {
  const body = document.body;
  const normalContent = document.getElementById('normal-content');
  const birthdayContent = document.getElementById('birthday-content');
  const messageEl = document.getElementById('countdown-message');
  const titleEl = document.getElementById('countdown-title');
  const celebrationTextEl =
      document.getElementById('birthday-celebration-text');

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  if (isBirthday) {
    body.classList.add('birthday-mode');
    if (normalContent) normalContent.style.display = 'none';
    if (birthdayContent) birthdayContent.style.display = 'block';
    if (messageEl)
      messageEl.textContent = `今天是${names.join('、')}的生日！🎂`;
    if (titleEl)
      titleEl.textContent = `🎂 今天是 ${names.join('、')} 的生日 🎂`;
    if (celebrationTextEl)
      celebrationTextEl.textContent = `🎉 生日快乐！${names.join('、')}！🎉`;
    document.title = '🎂 生日快乐！- THU自43';
    if (metaThemeColor) metaThemeColor.content = '#ff6b9d';
    addBirthdayBanner(names);
  } else {
    body.classList.remove('birthday-mode');
    if (normalContent) normalContent.style.display = 'block';
    if (birthdayContent) birthdayContent.style.display = 'none';
    if (messageEl) messageEl.textContent = '距离下一个生日还有：';
    if (titleEl) titleEl.textContent = '🎂 生日倒计时';
    document.title = 'THU自43的温馨博客';
    if (metaThemeColor) metaThemeColor.content = '#3498db';
  }
}

function addBirthdayBanner(names) {
  if (document.querySelector('.birthday-banner')) return;
  const banner = document.createElement('div');
  banner.className = 'birthday-banner';
  const who = names.length ? names.join('、') : '同学';
  banner.innerHTML = `🎉 今天是${who}的生日！让我们一起庆祝吧！🎂`;
  document.body.appendChild(banner);
  setTimeout(() => {
    banner.style.transform = 'translateY(-100%)';
    setTimeout(() => banner.remove(), 500);
  }, 5000);
}

// 主流程：加载CSV -> 驱动UI
let entries = [];
let nextInfo = null;  // { name, month, day, target }

async function loadData() {
  try {
    // 先读取页面级专属参数
    readOverride();
    const res = await fetch(CSV_URL, {cache: 'no-cache'});
    const text = await res.text();
    entries = parseCSV(text);
    // 应用专属覆盖：
    if (OVERRIDE) {
      if (OVERRIDE.month != null && OVERRIDE.day != null) {
        entries = [{ name: OVERRIDE.name || '同学', month: OVERRIDE.month, day: OVERRIDE.day }];
      } else if (OVERRIDE.name) {
        const t = entries.find(e => e.name === OVERRIDE.name);
        if (t) entries = [t];
      }
    }
    tick();
    setInterval(tick, 1000);
  } catch (e) {
    console.error('加载生日CSV失败: ', e);
    // CSV 加载失败时的回退：若提供了专属且包含月日，则仍可工作
    readOverride();
    if (OVERRIDE && OVERRIDE.month != null && OVERRIDE.day != null) {
      entries = [{ name: OVERRIDE.name || '同学', month: OVERRIDE.month, day: OVERRIDE.day }];
      tick();
      setInterval(tick, 1000);
    }
  }
}

function tick() {
  if (!entries.length) return;
  const now = new Date();
  const todayBirthdays = getTodayBirthdays(now, entries);

  if (todayBirthdays.length) {
    // 今天有生日：切到生日模式
    setTheme(true, todayBirthdays);
    // 目标设定为今天 23:59:59 结束当天庆祝，用于隐藏倒计时
    const endOfDay = new Date(
        now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    renderCountdown(endOfDay, now);  // 倒计时面板会隐藏，显示庆祝
    return;
  }

  // 否则显示下一位生日的倒计时
  if (!nextInfo || now.getTime() > nextInfo.target.getTime()) {
    nextInfo = getNextBirthday(now, entries);
  }
  if (nextInfo) {
    setTheme(false);
    renderCountdown(nextInfo.target, now);
    // 同时在提示文字中标出是谁
    const messageEl = document.getElementById('countdown-message');
    if (messageEl) {
      messageEl.textContent = `距离 ${nextInfo.name} 的生日还有：`;
    }
    const titleEl = document.getElementById('countdown-title');
    if (titleEl) {
      titleEl.textContent = `🎂 ${nextInfo.name} 生日倒计时 🎂`;
    }
  }
}

// 启动
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadData);
} else {
  loadData();
}
window.addEventListener('load', tick);
})();
