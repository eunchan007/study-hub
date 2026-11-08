(() => {
  'use strict';

  const KEYS = {
    sessions: 'shh_sessions_v1',
    activities: 'shh_activities_v1',
    exams: 'shh_exams_v1',
    examSeeded: 'shh_exam_legacy_seeded_v1',
    goal: 'shh_daily_goal_v1',
    timer: 'shh_focus_timer_v1',
    practiceSubject: 'shh_practice_subject_v1',
    practiceLevel: 'shh_practice_level_v1'
  };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const SVG = {
    home: '<path d="m3 10 9-7 9 7v10a1.8 1.8 0 0 1-1.8 1.8H5A2 2 0 0 1 3 20V10Z"/><path d="M9 21v-7h6v7"/>',
    timer: '<circle cx="12" cy="13" r="8.5"/><path d="M12 8v5l3.2 2M9 2h6M12 4v1.5"/>',
    exam: '<rect x="4" y="4.5" width="16" height="17" rx="3"/><path d="M8 2.5v4M16 2.5v4M4 9h16M8 14l2.2 2.2L16.5 11"/>',
    school: '<path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M6.5 11v5.1c3.5 2.7 7.5 2.7 11 0V11M21 9v6"/>',
    academy: '<path d="m3 9 9-5 9 5M4 10v8M8 10v8M12 10v8M16 10v8M20 10v8M3 19h18M2 22h20"/><path d="M12 4v3"/>',
    quiz: '<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h2M14 12h2M8 16h2M14 16h2"/>',
    fun: '<path d="M8.5 9h7a5 5 0 0 1 4.8 6.4l-.6 2a2 2 0 0 1-3.1 1l-2.4-1.7h-4.4l-2.4 1.7a2 2 0 0 1-3.1-1l-.6-2A5 5 0 0 1 8.5 9Z"/><path d="M8 12v4M6 14h4M16.5 13h.01M18.5 15h.01"/>',
    records: '<path d="M5 4h14a2 2 0 0 1 2 2v14H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M7 4v16M11 9h6M11 13h6M11 17h4"/>',
    more: '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h8M8 10h6"/>',
    language: '<path d="M3 5h11M8.5 3v2M10.5 14l-4.4-4.4M4.7 14.7 11 8.4M13.5 20l3.1-8.5 3.1 8.5M14.7 17h3.8"/>',
    music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    camera: '<rect x="3" y="6" width="18" height="14" rx="3"/><circle cx="12" cy="13" r="3.5"/><path d="m8 6 1.3-2h5.4L16 6"/>',
    award: '<circle cx="12" cy="8" r="5"/><path d="m8.5 12-1 9 4.5-2.5 4.5 2.5-1-9"/><path d="m10 8 1.3 1.3L14.5 6"/>',
    spark: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
    notes: '<path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M8 12h8M8 16h8"/>',
    history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3.5 2"/>',
    calendar: '<rect x="4" y="5" width="16" height="16" rx="2.5"/><path d="M8 3v4M16 3v4M4 10h16M8 14h2M14 14h2M8 17h2"/>',
    command: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    briefing: '<path d="M4 5h16v12H8l-4 4V5Z"/><path d="M8 9h8M8 13h5"/>',
    screen: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    print: '<path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v7H7zM17 11h.01"/>',
    archive: '<path d="M3 4h18v4H3zM5 8v12h14V8M10 12h4"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
    phone: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10 5h4M11 18.5h2"/>',
    moon: '<path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.7 8.7 0 1 0 20.5 15.2Z"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.6 2.6 0 1 1 4.5 1.8c-1.3 1.1-2 1.4-2 3.2M12 17.5h.01"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.6-1.4-2.4L5.3 15a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.7-1L9 7.3h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1-.1 2Z"/>',
    check: '<path d="m5 12 4.2 4.2L19 6.5"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    quest: '<path d="M12 3 4 6v5c0 5 3.3 8.3 8 10 4.7-1.7 8-5 8-10V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
    delete: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    plus: '<path d="M12 5v14M5 12h14" />'
  };
  const icon = (name, cls = 'shh-icon') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${SVG[name] || SVG.spark}</svg>`;
  const load = (key, fallback) => { try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch { return fallback; } };
  const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
  const todayKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  const dateFromKey = (key) => { const [y,m,d] = String(key || '').split('-').map(Number); return y && m && d ? new Date(y,m-1,d) : null; };
  const fmtDate = (date) => new Intl.DateTimeFormat('ko-KR',{month:'long',day:'numeric',weekday:'short'}).format(date);
  const fmtTime = (stamp) => new Intl.DateTimeFormat('ko-KR',{hour:'2-digit',minute:'2-digit'}).format(new Date(stamp));
  const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const getSessions = () => { const v = load(KEYS.sessions, []); return Array.isArray(v) ? v : []; };
  const getActivities = () => { const v = load(KEYS.activities, []); return Array.isArray(v) ? v : []; };
  const getGoal = () => { const n = Number(localStorage.getItem(KEYS.goal)); return Number.isFinite(n) && n >= 15 ? Math.min(600,n) : 90; };
  const getExams = () => {
    const stored = localStorage.getItem(KEYS.exams);
    if (stored !== null) {
      try {
        const value = JSON.parse(stored);
        if (!Array.isArray(value)) return [];
        if (value.length || localStorage.getItem(KEYS.examSeeded) === '1') return value;
      } catch { return []; }
    }
    const legacyDate = localStorage.getItem('sh_m_exam') || '';
    if (legacyDate && /^\d{4}-\d{2}-\d{2}$/.test(legacyDate) && localStorage.getItem(KEYS.examSeeded) !== '1') {
      try { localStorage.setItem(KEYS.examSeeded,'1'); } catch {}
      const seeded = [{id:'legacy-exam-'+legacyDate,title:'정기고사',subject:'전체 과목',date:legacyDate,createdAt:Date.now(),legacy:true}];
      save(KEYS.exams,seeded);
      return seeded;
    }
    return [];
  };

  const pushActivity = (type,title,subject='학습') => {
    const a = getActivities();
    a.push({id:`a-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,type,title,subject,date:todayKey(),createdAt:Date.now()});
    save(KEYS.activities,a.slice(-400));
    renderDashboard();
  };
  window.shhLogActivity = (type,title,subject='학습') => pushActivity(type,title,subject);
  const minutesOf = (seconds) => Math.floor(Math.max(0,Number(seconds)||0)/60);
  const dayTotalSeconds = (key) => getSessions().filter(x=>x.date===key).reduce((sum,x)=>sum+(Number(x.seconds)||0),0);
  const totalTodaySeconds = () => {
    const base = dayTotalSeconds(todayKey());
    const s = load(KEYS.timer,null);
    if (s && s.date===todayKey()) {
      const left = s.status==='running' ? Math.max(0,s.deadline-Date.now()) : Math.max(0,s.remainingMs||0);
      return base + Math.max(0,(s.durationMs||0)-left)/1000;
    }
    return base;
  };
  const upcomingExams = () => getExams().filter(x=>x.date && x.date>=todayKey()).sort((a,b)=>a.date.localeCompare(b.date));
  const daysAway = (key) => { const target=dateFromKey(key), now=dateFromKey(todayKey()); return target&&now ? Math.round((target-now)/86400000) : null; };

  function patchBrand() {
    const header = $('body > header');
    if (!header) return;
    const group = header.querySelector('.flex.items-center.gap-2');
    if (group && !$('#shh-brand-mark')) {
      const oldMark = group.querySelector('svg');
      const mark = document.createElement('img');
      mark.id = 'shh-brand-mark'; mark.src = '/assets/studyhub-mark.svg'; mark.alt = '';
      if (oldMark) oldMark.replaceWith(mark); else group.prepend(mark);
      const title = group.querySelector('h1');
      if (title) { title.textContent='Study Hub'; title.setAttribute('aria-label','Study Hub 학습 공간'); }
    }
    const meta = $('meta[name="theme-color"]'); if (meta) meta.content='#FAF8F5';
    if (!$('link[rel="manifest"]')) { const l=document.createElement('link'); l.rel='manifest'; l.href='/site.webmanifest'; document.head.append(l); }
    if (!$('link[rel="apple-touch-icon"]')) { const l=document.createElement('link'); l.rel='apple-touch-icon'; l.href='/assets/studyhub-mark.svg'; document.head.append(l); }
  }

  function getGreetingName() {
    try {
      const name=String(localStorage.getItem('sh_user_name')||'').trim();
      return name&&!['학생','김세진'].includes(name)?name:'';
    } catch { return ''; }
  }

  function renderHomeGreeting() {
    const title=$('#shh-greeting');if(!title)return;
    const name=getGreetingName();
    const first=name?`${name}님, 반가워요.`:'오늘의 작은 집중이';
    const second=name?'오늘도 차근히 시작해요.':'내일의 실력이 돼요.';
    title.replaceChildren(document.createTextNode(first),document.createElement('br'),document.createTextNode(second));
  }

  function renderBgmShortcut() {
    const button=$('#shh-bgm-toggle');if(!button)return;
    const state=window.v24Bgm?.state?.()||{},on=!!state.on;
    button.textContent=on?'끄기':'켜기';
    button.setAttribute('aria-pressed',String(on));
    button.setAttribute('aria-label',`홈 배경음악 ${on?'끄기':'켜기'}`);
    const status=$('#shh-bgm-state');if(status)status.textContent=on?'배경음악이 켜져 있어요.':'배경음악이 꺼져 있어요.';
    const volume=$('#shh-bgm-volume');if(volume&&document.activeElement!==volume)volume.value=String(Math.round((Number(state.vol)||0)*100));
    const output=$('#shh-bgm-volume-label');if(output)output.textContent=`${Math.round((Number(state.vol)||0)*100)}%`;
  }

  function dashboardMarkup() {
    return `<div id="shh-student-dashboard" class="shh-page">
      <section class="shh-hero" aria-labelledby="shh-greeting">
        <div class="shh-hero-row"><div><span class="shh-eyebrow">TODAY · ${escapeHtml(fmtDate(new Date()))}</span><h2 id="shh-greeting">오늘의 작은 집중이<br>내일의 실력이 돼요.</h2><p>한 번에 다 하지 않아도 괜찮아요. 지금 시작하는 한 세션이 오늘의 흐름을 만듭니다.</p></div><div class="shh-hero-mark">${icon('book')}</div></div>
        <div class="shh-hero-bottom"><div class="shh-progress-copy"><span>오늘 목표 · <span id="shh-goal-label">90</span>분</span><strong><span id="shh-today-minutes">0</span>분 <small style="font-size:13px;font-weight:650;color:rgba(255,255,255,.78)">집중했어요</small></strong><div class="shh-progress-rail"><i id="shh-goal-progress"></i></div></div><div style="display:flex;gap:8px;align-items:center"><button class="shh-button" type="button" data-shh-action="focus">${icon('timer')} 집중 시작</button><button class="shh-button" type="button" style="background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.28)" data-shh-action="goal-minus" aria-label="오늘 목표 15분 줄이기">−</button><button class="shh-button" type="button" style="background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.28)" data-shh-action="goal-plus" aria-label="오늘 목표 15분 늘리기">+</button></div></div>
      </section>
      <section class="shh-home-priorities" aria-labelledby="shh-home-priorities-title"><div class="shh-priority-head"><div><span class="shh-eyebrow">UP NEXT</span><h3 id="shh-home-priorities-title">시험기간 · 중요 알림</h3></div><button class="shh-link-button" type="button" data-shh-action="exam">시험 일정 ${icon('arrow')}</button></div><div id="shh-home-exam-period"></div><div id="shh-home-important-list" class="shh-important-list" aria-live="polite"></div></section>
      <section class="shh-home-audio" aria-label="홈 배경음악 제어"><span class="shh-home-audio-icon">${icon('music')}</span><div class="shh-home-audio-copy"><strong>공부 배경음악</strong><small id="shh-bgm-state" aria-live="polite">배경음악이 꺼져 있어요.</small></div><button id="shh-bgm-toggle" class="shh-home-audio-toggle" type="button" data-shh-action="bgm-toggle" aria-pressed="false">켜기</button><label class="shh-home-audio-volume" for="shh-bgm-volume"><input id="shh-bgm-volume" type="range" min="0" max="100" step="5" value="40" aria-label="홈 배경음악 볼륨"><output id="shh-bgm-volume-label" for="shh-bgm-volume">40%</output></label><button class="shh-home-audio-player" type="button" data-shh-action="music">음악 플레이어 ${icon('arrow')}</button></section>
      <div class="shh-stats" aria-label="오늘 학습 요약"><div class="shh-stat"><div class="shh-stat-icon">${icon('clock')}</div><div><small>오늘 집중 시간</small><strong id="shh-stat-time">0분</strong></div></div><div class="shh-stat"><div class="shh-stat-icon">${icon('exam')}</div><div><small>다가오는 시험</small><strong id="shh-stat-exams">0개</strong></div></div><div class="shh-stat"><div class="shh-stat-icon">${icon('award')}</div><div><small>완료한 집중 세션</small><strong id="shh-stat-sessions">0회</strong></div></div></div>
      <section><div class="shh-section-line"><h3>바로 시작하기</h3><button class="shh-link-button" data-shh-action="records">학습 기록 보기 ${icon('arrow')}</button></div><div class="shh-quick-grid">
        <button class="shh-quick-card" type="button" data-shh-action="focus"><span class="shh-action-icon">${icon('timer')}</span><span><strong>집중 타이머</strong><small>과목을 고르고 한 세션 시작</small></span></button>
        <button class="shh-quick-card" type="button" data-shh-action="practice"><span class="shh-action-icon">${icon('quiz')}</span><span><strong>문제 풀이</strong><small>과목·난이도를 골라 5문제 도전</small></span></button>
        <button class="shh-quick-card" type="button" data-shh-action="study-ai"><span class="shh-action-icon">${icon('book')}</span><span><strong>학습 도우미</strong><small>내 자료로 카드·퀴즈·대화</small></span></button>
        <button class="shh-quick-card" type="button" data-shh-action="language" data-shh-language-open="1"><span class="shh-action-icon">${icon('language')}</span><span><strong>언어 학습실</strong><small>단어 복습·문법·작문 연습</small></span></button>
        <button class="shh-quick-card" type="button" data-shh-action="exam"><span class="shh-action-icon">${icon('exam')}</span><span><strong>시험 일정</strong><small>다가오는 시험과 준비 상태</small></span></button>
        <button class="shh-quick-card" type="button" data-shh-action="academy"><span class="shh-action-icon">${icon('school')}</span><span><strong>학원 센터</strong><small>수업·출결·과제 한곳에서</small></span></button>
        <button class="shh-quick-card" type="button" data-shh-action="school"><span class="shh-action-icon">${icon('school')}</span><span><strong>학교 생활</strong><small>급식·시간표·학교 학습 도구</small></span></button>
        <button class="shh-quick-card" type="button" data-shh-action="wrong"><span class="shh-action-icon">${icon('notes')}</span><span><strong>오답 복습</strong><small>저장한 오답을 다시 확인</small></span></button>
        <button class="shh-quick-card" type="button" data-shh-action="fun"><span class="shh-action-icon">${icon('fun')}</span><span><strong>펀허브</strong><small>퀴즈와 RPG로 학습 이어가기</small></span></button>
      </div></section>
      <div class="shh-home-columns"><section class="shh-surface"><div class="shh-section-line" style="margin:0"><h3>이번 주 집중 흐름</h3><button class="shh-link-button" data-shh-action="records">기록 전체 보기 ${icon('arrow')}</button></div><div id="shh-week-grid" class="shh-week-grid"></div></section><section class="shh-surface"><div class="shh-section-line" style="margin:0"><h3>오늘의 문제 풀이</h3><button class="shh-link-button" data-shh-action="practice">문제 화면 보기 ${icon('arrow')}</button></div><div id="shh-home-practice" style="margin-top:12px"></div></section></div>
      <section class="shh-surface"><div class="shh-section-line" style="margin:0"><h3>최근 학습 기록</h3><button class="shh-link-button" data-shh-action="records">모두 보기 ${icon('arrow')}</button></div><div id="shh-home-recent" class="shh-record-list" style="margin-top:8px"></div></section>
      <details id="shh-legacy-home"><summary>기존 학습 도구 더 보기</summary><div id="shh-legacy-home-inner"></div></details>
    </div>`;
  }

  function pageMarkup() {
    return {
      exam: `<div class="shh-page" id="shh-exam-page"><div class="shh-page-head"><div><span class="shh-eyebrow">PLAN YOUR NEXT WIN</span><h2>시험 일정</h2><p class="shh-subtitle">시험 날짜와 과목을 적어 두고, 차근차근 준비해요.</p></div><span class="shh-action-icon" aria-hidden="true" style="width:50px;height:50px;border-radius:16px">${icon('exam')}</span></div><section class="shh-surface"><h3>새 시험 추가</h3><form id="shh-exam-form" class="shh-exam-form"><div class="shh-field"><label for="shh-exam-title">시험 이름</label><input id="shh-exam-title" name="title" maxlength="70" placeholder="예: 2학기 중간고사" required></div><div class="shh-field"><label for="shh-exam-subject">과목</label><select id="shh-exam-subject" name="subject"><option>전체 과목</option><option>국어</option><option>수학</option><option>영어</option><option>과학</option><option>사회</option><option>역사</option><option>기타</option></select></div><div class="shh-field"><label for="shh-exam-date">시험 날짜</label><input id="shh-exam-date" name="date" type="date" required></div><button class="shh-button" type="submit">${icon('plus')} 일정 저장</button></form></section><section class="shh-surface"><div class="shh-section-line" style="margin:0"><h3>예정된 시험</h3><span class="shh-subtitle" id="shh-exam-count" style="margin:0"></span></div><div id="shh-exam-list" class="shh-exam-list"></div></section><section class="shh-surface"><div class="shh-section-line" style="margin:0"><div><h3>시험 준비 도구</h3><p class="shh-subtitle">기존 시험 계획·범위·추천 문제 화면을 이어서 사용할 수 있어요.</p></div></div><button type="button" class="shh-button secondary" data-shh-action="legacy-exam">${icon('book')} 시험 준비 도구 열기</button></section></div>`,
      records: `<div class="shh-page" id="shh-records-page"><div class="shh-page-head"><div><span class="shh-eyebrow">A LITTLE PROGRESS, EVERY DAY</span><h2>학습 기록</h2><p class="shh-subtitle">과목과 날짜별 집중 시간, 학원 활동을 한눈에 확인해요.</p></div><span class="shh-action-icon" style="width:50px;height:50px;border-radius:16px">${icon('records')}</span></div><section class="shh-surface"><div class="shh-record-toolbar"><div><div class="shh-field"><label for="shh-record-range">기간</label><select id="shh-record-range" class="shh-filter"><option value="7">최근 7일</option><option value="30">최근 30일</option><option value="all">전체</option></select></div><div class="shh-field"><label for="shh-record-search">과목·활동 찾기</label><input id="shh-record-search" class="shh-filter" type="search" placeholder="예: 수학"></div></div><div style="display:flex;gap:9px;align-items:center;flex-wrap:wrap"><div class="shh-record-total"><strong id="shh-record-total">0</strong><span>분 집중</span></div><button class="shh-button ghost small" type="button" data-shh-action="export-records">${icon('archive')} CSV 저장</button></div></div><div id="shh-records-list" class="shh-record-list"></div></section><section class="shh-surface"><div class="shh-section-line" style="margin:0"><div><h3>인증 사진 보관함</h3><p class="shh-subtitle">카메라를 켰을 때 촬영한 사진은 별도 기기 저장소에 보관돼요.</p></div><button class="shh-button danger small" type="button" data-shh-action="delete-all-photos">${icon('delete')} 전체 삭제</button></div><div id="shh-record-gallery" class="shh-gallery"></div><p class="shh-privacy-note">사진은 이 브라우저의 IndexedDB에만 저장되며 서버로 전송되지 않습니다. 브라우저 데이터 삭제 시 함께 지워질 수 있어요.</p></section></div>`,
      academy: `<div class="shh-page" id="shh-academy-page"><div class="shh-page-head"><div><span class="shh-eyebrow">YOUR CLASS, YOUR PACE</span><h2>학생 학원 센터</h2><p class="shh-subtitle">수업, 출결과 과제를 관리하고 집중 타이머와 시험 준비로 이어가요.</p></div><span class="shh-action-icon" style="width:50px;height:50px;border-radius:16px">${icon('school')}</span></div><section class="shh-stats"><div class="shh-stat"><span class="shh-stat-icon">${icon('book')}</span><div><small>등록 수업</small><strong id="shh-ac-class-summary">아직 없음</strong></div></div><div class="shh-stat"><span class="shh-stat-icon">${icon('check')}</span><div><small>오늘 출결</small><strong id="shh-ac-att-summary">미기록</strong></div></div><div class="shh-stat"><span class="shh-stat-icon">${icon('notes')}</span><div><small>현재 과제</small><strong id="shh-ac-work-summary">아직 없음</strong></div></div></section><section class="shh-surface"><div class="shh-section-line" style="margin:0"><div><h3>수업·과제 관리</h3><p class="shh-subtitle">학원 기록을 추가하거나 오늘 출석을 남겨 보세요.</p></div></div><button class="shh-button" type="button" data-shh-action="academy-modal">${icon('school')} 학원 기록 열기</button><div class="shh-academy-shortcuts"><button class="shh-button secondary" type="button" data-shh-action="focus">${icon('timer')} 공부 시작</button><button class="shh-button secondary" type="button" data-shh-action="exam">${icon('exam')} 시험 일정</button><button class="shh-button secondary" type="button" data-shh-action="records">${icon('records')} 학습 기록</button></div></section><section class="shh-surface"><div class="shh-section-line" style="margin:0"><h3>학원 활동 기록</h3></div><div id="shh-ac-activities" class="shh-record-list" style="margin-top:8px"></div></section></div>`,
      fun: `<div class="shh-page" id="shh-fun-page"><div class="shh-page-head"><div><span class="shh-eyebrow">LEARN · PLAY · GROW</span><h2>펀허브</h2><p class="shh-subtitle">공부하면서 쌓은 집중력으로 퀴즈와 RPG 학습 도전을 즐겨요.</p></div><span class="shh-action-icon" style="width:50px;height:50px;border-radius:16px;color:#ca705b;background:#fff0ed">${icon('fun')}</span></div><section class="shh-surface"><div class="shh-section-line" style="margin:0"><div><h3>공부한 만큼 성장하는 플레이</h3><p class="shh-subtitle">게임은 학습 도구의 하나예요. 짧게 즐기고 다시 집중할 수 있게 연결했어요.</p></div></div><div class="shh-hub-grid" style="margin-top:14px"><button class="shh-hub-tile" type="button" data-shh-action="rpg"><span class="shh-action-icon" style="color:#7160c9;background:#efecff">${icon('quest')}</span><span><h3>스터디 RPG 퀘스트</h3><p>기존 RPG 모험과 학습 보상을 계속해요. 모든 RPG 진입은 이제 펀허브에서 모았어요.</p></span></button><button class="shh-hub-tile" type="button" data-shh-action="quiz"><span class="shh-action-icon" style="color:#bd7850;background:#fff0df">${icon('spark')}</span><span><h3>오늘의 5분 챌린지</h3><p>짧은 문제 풀이로 오늘의 학습을 가볍게 이어가요.</p></span></button><button class="shh-hub-tile" type="button" data-shh-action="fun-panel"><span class="shh-action-icon" style="color:#368d75;background:#e4f8ef">${icon('star')}</span><span><h3>함께 공부하기</h3><p>기존 FunStudy 공간과 함께하는 기능을 열어요.</p></span></button><button class="shh-hub-tile" type="button" data-shh-action="music"><span class="shh-action-icon" style="color:#7b69be;background:#f2edff">${icon('music')}</span><span><h3>집중 음악</h3><p>학습 음악을 재생하며 나만의 공부 분위기를 만들어요.</p></span></button></div></section><section class="shh-surface"><div class="shh-section-line" style="margin:0"><h3>오늘의 집중</h3><button class="shh-link-button" data-shh-action="focus">타이머 열기 ${icon('arrow')}</button></div><p class="shh-subtitle">오늘 쌓은 집중 시간 <strong id="shh-fun-today">0분</strong> · 공부 기록은 펀허브의 성장 동선과 연결돼요.</p></section></div>`
    };
  }

  function practiceMarkup() {
    return `<div class="shh-page" id="shh-practice-page">
      <div class="shh-page-head"><div><span class="shh-eyebrow">PRACTICE · LEARN · IMPROVE</span><h2>문제풀이</h2><p class="shh-subtitle">과목과 난이도를 고르고, 기존 문제은행으로 5문제 한 세트를 풀어요.</p><div class="shh-practice-grade">현재 학년 · <strong id="shh-practice-grade">학년 정보를 불러오는 중</strong></div></div><span class="shh-action-icon" style="width:50px;height:50px;border-radius:16px">${icon('quiz')}</span></div>
      <section class="shh-surface shh-practice-exam">
        <div class="shh-section-line" style="margin:0"><div><h3>다가오는 시험</h3><p class="shh-subtitle">시험 일정과 홈의 D-day, 기존 스마트 플래너를 함께 사용해요.</p></div><button class="shh-button secondary small" type="button" data-shh-action="planner">${icon('history')} 스마트 플래너</button></div>
        <div id="shh-practice-exam-card" class="shh-practice-exam-card" aria-live="polite"></div>
      </section>
      <section class="shh-surface">
        <div class="shh-section-line" style="margin:0"><div><h3>나의 학습 통계</h3><p class="shh-subtitle">기존 5분 챌린지에 저장된 기록을 기준으로 보여줘요.</p></div></div>
        <div class="shh-practice-stats"><div class="shh-stat"><span class="shh-stat-icon">${icon('spark')}</span><div><small>오늘의 XP</small><strong id="shh-practice-xp">0 / 50 XP</strong></div></div><div class="shh-stat"><span class="shh-stat-icon">${icon('records')}</span><div><small>누적 XP</small><strong id="shh-practice-total-xp">0 XP</strong></div></div><div class="shh-stat"><span class="shh-stat-icon">${icon('history')}</span><div><small>연속 챌린지</small><strong id="shh-practice-streak">0일</strong></div></div><div class="shh-stat"><span class="shh-stat-icon">${icon('calendar')}</span><div><small>최근 7일 챌린지</small><strong id="shh-practice-active-days">0일</strong></div></div><div class="shh-stat"><span class="shh-stat-icon">${icon('notes')}</span><div><small>저장된 오답</small><strong id="shh-practice-wrong">0개</strong></div></div></div>
      </section>
      <section class="shh-practice-layout"><section class="shh-surface"><div class="shh-section-line" style="margin:0"><div><h3>오늘의 문제 세트</h3><p class="shh-subtitle">기존 5분 챌린지와 같은 문제·기록을 사용해요.</p></div><span class="shh-practice-count">5문제</span></div><div class="shh-practice-controls"><div class="shh-field"><label for="shh-practice-subject">과목</label><select id="shh-practice-subject"><option>국어</option><option>수학</option><option>영어</option><option>과학</option><option>사회</option></select></div><div class="shh-field"><span class="shh-field-label">난이도</span><div class="shh-practice-levels"><button class="shh-practice-level" type="button" data-shh-action="practice-level" data-level="1">기초</button><button class="shh-practice-level" type="button" data-shh-action="practice-level" data-level="2">기본</button><button class="shh-practice-level" type="button" data-shh-action="practice-level" data-level="3">심화</button><button class="shh-practice-level" type="button" data-shh-action="practice-level" data-level="4">실전</button></div></div><button class="shh-button shh-practice-start" type="button" data-shh-action="practice-start">${icon('quiz')} 5문제 시작</button></div><div class="shh-practice-progress"><div class="shh-section-line" style="margin:0"><strong>오늘의 목표</strong><span id="shh-practice-xp-caption">0 / 50 XP</span></div><div class="shh-progress-rail"><i id="shh-practice-xp-bar"></i></div><small>정답을 맞히면 기존 챌린지 기록에 XP가 추가돼요.</small></div></section><section class="shh-surface shh-practice-guide"><span class="shh-action-icon">${icon('target')}</span><h3>작게 풀고, 확실히 익혀요</h3><p class="shh-subtitle">난이도와 과목은 언제든 바꿀 수 있어요. 틀린 문제는 기존 오답 노트에 저장됩니다.</p><button class="shh-button secondary" type="button" data-shh-action="wrong">${icon('notes')} 전체 오답 노트 열기</button></section></section>
      <section class="shh-surface shh-practice-wrongbook"><div class="shh-section-line" style="margin:0"><div><h3>오답 노트</h3><p class="shh-subtitle">최근에 틀린 문제와 정답·해설을 바로 확인해요.</p></div><button class="shh-button secondary small" type="button" data-shh-action="wrong">전체 오답 노트 ${icon('arrow')}</button></div><div id="shh-practice-wrong-subjects" class="shh-practice-wrong-subjects" aria-label="오답 과목별 분포"></div><div id="shh-practice-wrong-list" class="shh-practice-wrong-list" aria-live="polite"></div></section>
      <section class="shh-surface"><div class="shh-section-line" style="margin:0"><div><h3>다른 학습 공간</h3><p class="shh-subtitle">문제 풀이에서 학교·학원 학습으로 이어가요.</p></div></div><div class="shh-practice-links"><button class="shh-button secondary" type="button" data-shh-action="school">${icon('school')} 학교 허브</button><button class="shh-button secondary" type="button" data-shh-action="academy">${icon('academy')} 학원 센터</button><button class="shh-button secondary" type="button" data-shh-action="exam">${icon('exam')} 시험 일정</button></div></section>
    </div>`;
  }

  function addMainView(name,markup) {
    const main=$('main'); if(!main) return null;
    let section=$(`#view-${name}`);
    if(!section){section=document.createElement('section');section.id=`view-${name}`;section.className='hidden tab-anim';main.append(section);}
    section.innerHTML=markup;
    return section;
  }

  function mountDashboard() {
    const home=$('#view-home'); if(!home || $('#shh-student-dashboard')) return;
    const legacyNodes=[...home.childNodes];
    home.insertAdjacentHTML('afterbegin',dashboardMarkup());
    const inner=$('#shh-legacy-home-inner',home);
    legacyNodes.forEach(child=>inner?.appendChild(child));
  }

  function mountFunRpg() {
    const card=$('#v19-home'),page=$('#shh-fun-page');
    if(!card||!page)return;
    let slot=$('#shh-fun-rpg-slot',page);
    if(!slot){slot=document.createElement('section');slot.id='shh-fun-rpg-slot';slot.className='shh-fun-rpg-slot';const head=$('.shh-page-head',page);if(head)head.after(slot);else page.prepend(slot);}
    if(card.parentElement!==slot){
      card.classList.add('shh-fun-rpg-card');
      slot.replaceChildren(card);
    }
    $('[data-shh-action="rpg"]',page)?.remove();
  }

  function mountNavigation() {
    if ($('#sh-student-nav')) return;
    const nav=document.createElement('nav'); nav.id='sh-student-nav'; nav.setAttribute('aria-label','주요 학습 메뉴');
    const items=[['school','학교'],['academy','학원'],['exam','시험'],['home','홈'],['pomo','공부'],['music','음악'],['more','더보기']];
    nav.innerHTML=items.map(([key,label])=>`<button class="shh-nav-item" type="button" data-shh-tab="${key}" id="shh-nav-${key}" aria-label="${label}">${icon(key==='pomo'?'timer':key)}<span class="shh-nav-label">${label}</span></button>`).join('');
    document.body.appendChild(nav);
    nav.addEventListener('click',(event)=>{
      const button=event.target.closest('[data-shh-tab]'); if(!button) return;
      event.preventDefault(); const key=button.dataset.shhTab; setActiveNav(key);
      if(key==='more') { $('#nav-more')?.click(); return; }
      if(key==='school') { if(window.openSchoolTab)window.openSchoolTab();else window.switchTab?.('school'); return; }
      window.switchTab?.(key);
      if(key==='academy') renderAcademyPage();
      if(key==='exam') renderExams();
      if(key==='records') renderRecords();
      if(key==='fun') renderDashboard();
      if(key==='pomo') renderFocus();
    });
    if(window.switchTab && !window.switchTab.__shhWrapped) {
      const original=window.switchTab;
      const customTabs=['home','school','pomo','exam','academy','records','fun','practice'];
      const wrapped=function(tab,...args){
        const isCustom=customTabs.includes(tab);
        const result=original.call(this,isCustom?'home':tab,...args);
        if(isCustom){
          const main=$('main'),target=$(`#view-${tab}`);
          main?.querySelectorAll(':scope > [id^="view-"]').forEach(node=>node.classList.add('hidden'));
          target?.classList.remove('hidden');
        }
        setActiveNav(tab==='practice'?'home':items.some(x=>x[0]===tab)?tab:null);
        if(tab==='home')renderDashboard();
        if(tab==='academy')renderAcademyPage();
        if(tab==='exam')renderExams();
        if(tab==='records')renderRecords();
        if(tab==='pomo')renderFocus();
        if(tab==='fun')renderDashboard();
        if(tab==='practice')renderPractice();
        return result;
      };
      wrapped.__shhWrapped=true; window.switchTab=wrapped;
    }
    setActiveNav('home');
  }
  function setActiveNav(key) { $$('.shh-nav-item').forEach(b=>{if(b.dataset.shhTab===key)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');}); }

  function ensureFocusPanel() {
    const view=$('#view-pomo'); if(!view || $('#shh-focus-panel')) return;
    const panel=document.createElement('section'); panel.id='shh-focus-panel'; panel.className='shh-page';
    panel.innerHTML=`<div class="shh-page-head"><div><span class="shh-eyebrow">FOCUS SESSION</span><h2>집중 타이머</h2><p class="shh-subtitle">과목을 고르고 나만의 집중 시간을 쌓아 보세요.</p></div><span class="shh-action-icon" style="width:50px;height:50px;border-radius:16px">${icon('timer')}</span></div><div class="shh-focus-grid"><section class="shh-surface"><div class="shh-focus-settings"><div class="shh-field"><label for="shh-focus-subject">공부할 과목</label><select id="shh-focus-subject"></select></div><div class="shh-field"><label for="shh-focus-duration">집중 시간</label><select id="shh-focus-duration"><option value="15">15분</option><option value="25" selected>25분</option><option value="45">45분</option><option value="60">60분</option></select></div></div><div class="shh-timer-face"><div class="shh-timer-digits" id="shh-timer-digits" role="timer" aria-live="off">25:00</div><div class="shh-timer-caption" id="shh-timer-caption">준비되면 시작을 눌러 주세요</div><div class="shh-timer-actions"><button class="shh-button" type="button" data-shh-action="timer-start">${icon('timer')} 시작</button><button class="shh-button secondary" type="button" data-shh-action="timer-pause" style="display:none">일시정지</button><button class="shh-button ghost" type="button" data-shh-action="timer-stop" style="display:none">세션 종료</button></div><div class="shh-focus-state" id="shh-focus-state">기록은 이 브라우저에 저장돼요.</div></div><div class="shh-section-line" style="margin:5px 0 0"><h3 style="font-size:13px">오늘의 과목별 집중 기록</h3><span class="shh-subtitle" id="shh-focus-total" style="margin:0">0분</span></div><div id="shh-subject-totals" class="shh-record-list"></div></section><section class="shh-camera-card"><div class="shh-camera-head"><span class="shh-action-icon">${icon('camera')}</span><div><h3>선택형 카메라 기록</h3><p class="shh-subtitle" style="margin-top:3px">원할 때만 직접 켜고 끌 수 있어요.</p></div></div><label class="shh-camera-consent"><input id="shh-camera-consent" type="checkbox"><span>집중 세션 중 카메라를 켜고, 세션 시작 시와 5분마다 인증 사진을 이 기기에 저장하는 것에 동의합니다. 카메라가 켜져 있을 때 미리보기를 표시합니다.</span></label><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="shh-button secondary small" type="button" data-shh-action="camera-start">${icon('camera')} 카메라 켜기</button><button class="shh-button ghost small" type="button" data-shh-action="camera-stop" style="display:none">카메라 끄기</button><button class="shh-button ghost small" type="button" data-shh-action="capture-now" disabled>인증 사진 촬영</button></div><div class="shh-camera-preview" id="shh-camera-preview"><video id="shh-camera-video" autoplay muted playsinline aria-label="켜져 있는 카메라 미리보기"></video></div><div class="shh-camera-status" id="shh-camera-status" aria-live="polite">카메라는 꺼져 있어요. 동의 후 직접 켜 주세요.</div><p class="shh-privacy-note">사진은 서버에 업로드되지 않고 이 브라우저의 별도 IndexedDB 보관함에만 저장됩니다. 앱 화면을 벗어나면 카메라를 끄고, 백그라운드에서는 사진을 촬영하지 않아요. 사진은 휴대폰의 다른 앱 사용 여부를 판별하지 않으며, 화면 이탈 기록과 함께 참고용으로만 사용하세요.</p></section></div><section class="shh-surface"><div class="shh-section-line" style="margin:0"><div><h3>인증 사진 보관함</h3><p class="shh-subtitle">이 기기에 저장된 사진만 표시됩니다.</p></div><button class="shh-button danger small" type="button" data-shh-action="delete-all-photos">${icon('delete')} 전체 삭제</button></div><div id="shh-focus-gallery" class="shh-gallery"></div></section><section id="shh-legacy-timer-wrap"></section></section>`;
    const legacy=[...view.childNodes];
    view.insertBefore(panel,view.firstChild);
    const details=document.createElement('details'); details.id='shh-legacy-timer'; details.innerHTML='<summary>기존 과목 누적 타이머와 기기 사용 기록</summary><div id="shh-legacy-timer-inner"></div>';
    const inner=$('#shh-legacy-timer-inner',details);
    legacy.forEach(n=>inner.appendChild(n));
    $('#shh-legacy-timer-wrap',panel).appendChild(details);
    populateSubjectSelect();
  }

  function populateSubjectSelect() {
    const select=$('#shh-focus-subject'); if(!select) return;
    const old=$('#timer-subject-select');
    const choices=old ? [...old.options].map(o=>({value:o.value,label:o.textContent.trim()})).filter(o=>o.value && o.label) : [];
    const fallback=['국어','수학','영어','과학','사회','역사','기타'].map(x=>({value:x,label:x}));
    const list=choices.length?choices:fallback;
    select.innerHTML=list.map(o=>`<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('');
  }

  function renderImportantAlerts() {
    const period=$('#shh-home-exam-period'),list=$('#shh-home-important-list');
    if(!period||!list)return;
    const next=upcomingExams().find(item=>daysAway(item.date)!==null);
    if(next){
      const days=daysAway(next.date),label=days===0?'오늘 시험':days===1?'D-1':`D-${days}`;
      period.innerHTML=`<div class="shh-exam-focus ${days<=7?'soon':''}"><div class="shh-exam-focus-copy"><span>시험기간 알림</span><strong>${escapeHtml(next.title||'예정된 시험')}</strong><small>${escapeHtml(next.subject||'전체 과목')} · ${escapeHtml(fmtDate(dateFromKey(next.date)||new Date()))}</small></div><span class="shh-exam-dday">${escapeHtml(label)}</span><button class="shh-button secondary small" type="button" data-shh-action="exam">준비하기 ${icon('arrow')}</button></div>`;
    }else{
      period.innerHTML=`<div class="shh-exam-focus empty"><div class="shh-exam-focus-copy"><span>시험 일정</span><strong>등록된 시험 일정이 없어요</strong><small>시험 날짜를 추가하면 이곳에서 남은 기간을 확인할 수 있어요.</small></div><button class="shh-button secondary small" type="button" data-shh-action="exam">시험 등록 ${icon('arrow')}</button></div>`;
    }
    const data=load('sh_v21_academy',{}),assignments=Array.isArray(data?.assignments)?data.assignments:[];
    const alerts=assignments.filter(item=>!item.done).map(item=>{
      const due=String(item.due||item.deadline||item.date||'').slice(0,10);
      if(!/^\d{4}-\d{2}-\d{2}$/.test(due))return null;
      const days=daysAway(due);if(days===null||days>7||days< -30)return null;
      const timing=days<0?`기한 ${Math.abs(days)}일 지남`:days===0?'오늘 마감':days===1?'내일 마감':`D-${days}`;
      return {days,priority:days<0?0:days<=1?1:2,title:item.title||'학원 과제',subject:item.subject||'학원',due,timing};
    }).filter(Boolean).sort((a,b)=>a.priority-b.priority||a.days-b.days).slice(0,3);
    if(!alerts.length){list.innerHTML='<div class="shh-alert-empty"><strong>가까운 과제 마감이 없어요</strong><span>학원 과제에 마감일을 등록하면 중요한 일정이 여기에 표시돼요.</span></div>';return;}
    list.innerHTML=alerts.map(item=>`<button class="shh-important-alert ${item.days<=1?'urgent':''}" type="button" data-shh-action="academy"><span class="shh-alert-symbol">${icon('notes')}</span><span class="shh-alert-copy"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.subject)} · ${escapeHtml(fmtDate(dateFromKey(item.due)||new Date()))}</small></span><span class="shh-alert-timing">${escapeHtml(item.timing)}</span></button>`).join('');
  }

  function renderDashboard() {
    if(!$('#shh-student-dashboard')) return;
    renderHomeGreeting();
    renderBgmShortcut();
    renderImportantAlerts();
    const mins=Math.floor(totalTodaySeconds()/60), goal=getGoal(), pct=Math.min(100,Math.round(mins/goal*100));
    $('#shh-goal-label').textContent=String(goal); $('#shh-today-minutes').textContent=String(mins); $('#shh-stat-time').textContent=`${mins}분`;
    $('#shh-goal-progress').style.width=`${pct}%`;
    const sessions=getSessions().filter(x=>x.date===todayKey()); $('#shh-stat-sessions').textContent=`${sessions.length}회`;
    const exams=upcomingExams(); $('#shh-stat-exams').textContent=`${exams.length}개`;
    const week=$('#shh-week-grid');
    if(week){
      week.replaceChildren(); const today=new Date();
      for(let i=6;i>=0;i--){const day=new Date(today.getFullYear(),today.getMonth(),today.getDate()-i), key=todayKey(day), seconds=dayTotalSeconds(key), min=Math.floor(seconds/60), h=Math.min(100,Math.max(6,Math.round(min/Math.max(30,goal)*100)));
        const cell=document.createElement('div');cell.className='shh-week-day'+(i===0?' today':'');cell.innerHTML=`<span>${['일','월','화','수','목','금','토'][day.getDay()]}</span><span class="shh-week-bar"><i style="height:${min? h:6}%"></i></span><small>${min?min+'′':'—'}</small>`;week.append(cell);}
    }
    const practiceSummary=$('#shh-home-practice');
    if(practiceSummary){const state=load('sh_duo_state',{}),xp=Math.max(0,Number(state?.todayXP)||0),xpGoal=Math.max(1,Number(state?.goalXP)||50),streak=Math.max(0,Number(state?.streak)||0),xpPct=Math.min(100,Math.round(xp/xpGoal*100));practiceSummary.innerHTML=`<div class="shh-home-practice-card"><div class="shh-home-practice-copy"><span>오늘의 챌린지</span><strong>${xp} / ${xpGoal} XP</strong><small>${streak?`${streak}일 연속 학습 중`:'5문제로 오늘의 흐름을 시작해요'}</small></div><div class="shh-home-practice-rail"><i style="width:${xpPct}%"></i></div><button class="shh-button secondary small" type="button" data-shh-action="practice">계속 풀기 ${icon('arrow')}</button></div>`;}
    const recent=$('#shh-home-recent');
    if(recent){recent.replaceChildren();const list=allRecords().slice(0,3);if(!list.length)recent.innerHTML='<div class="shh-empty">첫 공부를 마치면 여기에 기록이 쌓여요.</div>';else list.forEach(r=>recent.append(makeRecordRow(r)));}
    const funToday=$('#shh-fun-today'); if(funToday)funToday.textContent=`${mins}분`;
    renderAcademyPage();
  }

  function makeRecordRow(record) {
    const row=document.createElement('div');row.className='shh-record-row';
    const glyph=record.type==='focus'?'timer':record.type==='exam'?'exam':record.type==='language'?'language':record.type==='academy'?'school':'records';
    const left=document.createElement('span');left.className='shh-record-icon';left.innerHTML=icon(glyph);row.append(left);
    const text=document.createElement('span');text.style.minWidth='0';
    const title=document.createElement('strong');title.textContent=record.title||'학습 기록';
    const sub=document.createElement('small');sub.textContent=`${record.date||todayKey()} · ${record.subject||'학습'}${record.time?` · ${record.time}`:''}`;
    text.append(title,sub);row.append(text);
    const value=document.createElement('span');value.className='shh-record-value';value.textContent=record.seconds?`${minutesOf(record.seconds)}분`:record.type==='focus'?'집중':'완료';row.append(value);
    return row;
  }

  function allRecords() {
    const sessions=getSessions().map(s=>({id:s.id,type:'focus',title:`${s.subject||'과목'} 집중 학습`,subject:s.subject||'과목',date:s.date||todayKey(),createdAt:s.endedAt||s.startedAt||0,seconds:s.seconds||0,time:s.endedAt?fmtTime(s.endedAt):''}));
    const activities=getActivities();
    const recorded=activities.filter(a=>a.type==='academy'||a.type==='exam'||a.type==='language').map(a=>({...a,type:a.type==='exam'?'exam':a.type==='language'?'language':'academy'}));
    return [...sessions,...recorded].sort((a,b)=>(Number(b.createdAt)||0)-(Number(a.createdAt)||0));
  }

  function renderExams() {
    const list=$('#shh-exam-list'); if(!list) return;
    const exams=getExams().sort((a,b)=>a.date.localeCompare(b.date));
    $('#shh-exam-count').textContent=`${upcomingExams().length}개 예정`;
    list.replaceChildren();
    if(!exams.length){list.innerHTML='<div class="shh-empty">아직 등록한 시험이 없어요.<br>첫 일정을 추가하면 홈 화면에도 표시됩니다.</div>';return;}
    for(const exam of exams){
      const n=daysAway(exam.date), dt=dateFromKey(exam.date), row=document.createElement('div');row.className='shh-exam-row';
      const dateBox=document.createElement('span');dateBox.className='shh-exam-datebox';dateBox.innerHTML=`<b>${dt?dt.getDate():'?'}</b><small>${dt?`${dt.getMonth()+1}월`:''}</small>`;
      const copy=document.createElement('span');copy.style.minWidth='0';const title=document.createElement('strong');title.textContent=exam.title;const sub=document.createElement('small');sub.textContent=`${exam.subject||'전체 과목'} · ${dt?fmtDate(dt):exam.date}`;copy.append(title,sub);
      const count=document.createElement('span');count.className='shh-exam-count';count.textContent=n===null?'':n<0?'지난 시험':n===0?'D-DAY':`D-${n}`;
      const del=document.createElement('button');del.type='button';del.textContent='삭제';del.setAttribute('aria-label',`${exam.title} 일정 삭제`);del.dataset.shhDeleteExam=exam.id;
      row.append(dateBox,copy,count,del);list.append(row);
    }
  }

  function saveExam(event) {
    event.preventDefault();const form=event.currentTarget,fd=new FormData(form);
    const title=String(fd.get('title')||'').trim(),subject=String(fd.get('subject')||'전체 과목'),date=String(fd.get('date')||'');
    if(!title||!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
    const exams=getExams();exams.push({id:`exam-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,title,subject,date,createdAt:Date.now()});save(KEYS.exams,exams);syncLegacyExamCountdown();
    pushActivity('exam',`${title} 시험 일정 등록`,subject);form.reset();renderExams();renderDashboard();renderPractice();
    if(window.showToast)window.showToast('시험 일정을 저장했어요','success');
  }

  function renderAcademyPage() {
    const area=$('#shh-academy-page');if(!area)return;
    const saved=load('sh_v21_academy',{});
    const d=saved&&typeof saved==='object'&&!Array.isArray(saved)?saved:{};
    const classes=Array.isArray(d.classes)?d.classes:(d.cls?[{title:d.cls}]:[]);
    const attendance=Array.isArray(d.attendance)?d.attendance:[];
    const assignments=Array.isArray(d.assignments)?d.assignments:(d.work?[{title:d.work,done:false}]:[]);
    const today=new Date().toISOString().slice(0,10);
    const todayAttendance=attendance.filter(item=>item.date===today).sort((a,b)=>String(b.time||'').localeCompare(String(a.time||'')));
    const pending=assignments.filter(item=>!item.done).length;
    const classTitle=classes[0]?.title||'';
    const set=(id,text)=>{const node=$(id);if(node)node.textContent=text;};
    set('#shh-ac-class-summary',classTitle?`${classTitle}${classes.length>1?` 외 ${classes.length-1}개`:''}`:'아직 없음');
    set('#shh-ac-att-summary',todayAttendance.length?`${todayAttendance[0].status||'출결'} ${todayAttendance.length>1?`외 ${todayAttendance.length-1}건`:''}`:d.att?'출석 완료':'미기록');
    set('#shh-ac-work-summary',assignments.length?pending?`미완료 ${pending}개`:'모두 완료':'아직 없음');
    const target=$('#shh-ac-activities');if(target){target.replaceChildren();const activities=getActivities().filter(a=>a.type==='academy').slice(-6).reverse();if(!activities.length)target.innerHTML='<div class="shh-empty">학원 출석 또는 수업 기록을 남기면 여기에 표시돼요.</div>';else activities.forEach(a=>target.append(makeRecordRow(a)));}
  }

  function renderPractice() {
    const page=$('#shh-practice-page');if(!page)return;
    const validSubjects=['국어','수학','영어','과학','사회'];
    let subject=load(KEYS.practiceSubject,'국어');if(!validSubjects.includes(subject))subject='국어';
    let level=Number(load(KEYS.practiceLevel,1));if(!Number.isInteger(level)||level<1||level>4)level=1;
    const select=$('#shh-practice-subject');if(select)select.value=subject;
    $$('.shh-practice-level',page).forEach(button=>button.classList.toggle('is-active',Number(button.dataset.level)===level));
    window.setDuoSub?.(subject);window.setDuoLevel?.(level);
    const state=load('sh_duo_state',{}),todayUTC=new Date().toISOString().slice(0,10);
    const xp=Math.max(0,(state?.lastDate===todayUTC?Number(state?.todayXP):0)||0),goal=Math.max(1,Number(state?.goalXP)||50);
    const totalXP=Math.max(0,Number(state?.totalXP)||0);
    const wrong=load('sh_m_wrong',[]),wrongItems=Array.isArray(wrong)?wrong.filter(item=>item&&typeof item==='object'):[];
    const history=Array.isArray(state?.history)?state.history.filter(value=>/^\d{4}-\d{2}-\d{2}$/.test(String(value))).map(String):[];
    const historyDates=new Set(history),streakAnchor=new Date(`${todayUTC}T00:00:00Z`);
    if(!historyDates.has(todayUTC))streakAnchor.setUTCDate(streakAnchor.getUTCDate()-1);
    let streak=0;while(historyDates.has(streakAnchor.toISOString().slice(0,10))){streak++;streakAnchor.setUTCDate(streakAnchor.getUTCDate()-1);}
    const weekStart=new Date(Date.now()-6*86400000).toISOString().slice(0,10);
    const activeDays=new Set([...historyDates].filter(day=>day>=weekStart&&day<=todayUTC));
    const set=(id,value)=>{const node=$(id);if(node)node.textContent=value;};
    set('#shh-practice-grade',$('#grade-select')?.value||'현재 학년');set('#shh-practice-xp',`${xp} / ${goal} XP`);set('#shh-practice-xp-caption',`${xp} / ${goal} XP`);set('#shh-practice-total-xp',`${totalXP} XP`);set('#shh-practice-streak',`${streak}일`);set('#shh-practice-active-days',`${activeDays.size}일`);set('#shh-practice-wrong',`${wrongItems.length}개`);
    const bar=$('#shh-practice-xp-bar');if(bar)bar.style.width=`${Math.min(100,Math.round(xp/goal*100))}%`;
    renderPracticeWrongNotes(wrongItems);renderPracticeExam();
  }

  function renderPracticeWrongNotes(items) {
    const list=$('#shh-practice-wrong-list');if(!list)return;
    list.replaceChildren();
    const subjects=$('#shh-practice-wrong-subjects');if(subjects)subjects.replaceChildren();
    if(!items.length){const empty=document.createElement('div');empty.className='shh-empty';empty.textContent='아직 저장된 오답이 없어요. 문제를 풀면 틀린 문제와 해설이 여기에 모여요.';list.append(empty);return;}
    if(subjects){
      const counts=new Map();items.forEach(item=>{const subject=String(item.subject||item.sub||'과목 미기록');counts.set(subject,(counts.get(subject)||0)+1);});
      [...counts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,5).forEach(([subject,count])=>{const tag=document.createElement('span');tag.className='shh-practice-wrong-tag';tag.textContent=`${subject} ${count}`;subjects.append(tag);});
    }
    items.slice(0,5).forEach(item=>{
      const card=document.createElement('article');card.className='shh-practice-wrong-item';
      const head=document.createElement('div');head.className='shh-practice-wrong-head';
      const copy=document.createElement('div');copy.className='shh-practice-wrong-copy';
      const title=document.createElement('strong');title.textContent=String(item.title||item.question||item.q||'문제 제목 없음');
      const meta=document.createElement('small');meta.textContent=[item.subject||item.sub||'과목 미기록',item.grade||item.g||''].filter(Boolean).join(' · ');
      copy.append(title,meta);head.append(copy);
      const reason=document.createElement('p');reason.className='shh-practice-wrong-reason';reason.textContent=String(item.reason||'틀린 문제로 기록됐어요.');
      const details=document.createElement('details');details.className='shh-practice-answer';
      const summary=document.createElement('summary');summary.textContent='정답·해설 확인';
      const answer=document.createElement('p');answer.textContent=String(item.correctAns||item.answer||item.explanation||'이 항목에는 별도 해설이 없어요.');
      details.append(summary,answer);card.append(head,reason,details);list.append(card);
    });
  }

  function renderPracticeExam() {
    const target=$('#shh-practice-exam-card');if(!target)return;
    target.replaceChildren();
    const exam=upcomingExams()[0],card=document.createElement('div');card.className='shh-practice-exam-summary';
    const copy=document.createElement('div');copy.className='shh-practice-exam-copy';
    const badge=document.createElement('span');badge.className='shh-practice-dday';
    const title=document.createElement('strong');const meta=document.createElement('small');
    const button=document.createElement('button');button.type='button';button.className='shh-button secondary small';
    if(exam){
      const days=daysAway(exam.date),date=dateFromKey(exam.date);
      badge.textContent=days===null?'D-day':days===0?'D-DAY':`D-${days}`;
      title.textContent=exam.title||'다가오는 시험';meta.textContent=`${exam.subject||'전체 과목'} · ${date?fmtDate(date):exam.date}`;
      button.dataset.shhAction='planner';button.innerHTML=`${icon('history')} 시험 대비 플래너`;
    }else{
      badge.textContent='일정 없음';title.textContent='시험 일정을 등록해 보세요';meta.textContent='등록한 시험 날짜가 홈 카운트다운과 플래너에도 반영돼요.';
      button.dataset.shhAction='exam';button.innerHTML=`${icon('plus')} 시험 등록`;
    }
    copy.append(title,meta);card.append(badge,copy,button);target.append(card);
  }

  let syncingLegacyExamCountdown=false;
  function syncLegacyExamCountdown() {
    let savedExamList=false;
    try{savedExamList=localStorage.getItem(KEYS.exams)!==null;}catch{}
    const exam=upcomingExams()[0];
    if(!exam&&!savedExamList)return;
    const date=exam?.date||'';
    syncingLegacyExamCountdown=true;
    try{
      if(date)localStorage.setItem('sh_m_exam',date);else localStorage.removeItem('sh_m_exam');
      const input=$('#exam-date-input');
      if(input&&input.value!==date){input.value=date;input.dispatchEvent(new Event('change',{bubbles:true}));}
    }catch{}finally{queueMicrotask(()=>{syncingLegacyExamCountdown=false;});}
  }

  function syncExamsFromLegacyPlanner(date) {
    if(syncingLegacyExamCountdown)return;
    const exams=getExams(),upcoming=upcomingExams()[0];
    let target=upcoming?exams.find(item=>item.id===upcoming.id):exams.find(item=>item.legacy);
    if(date){
      if(target)target.date=date;
      else exams.push({id:`planner-${Date.now()}`,title:'스마트 플래너 시험',subject:'전체 과목',date,createdAt:Date.now(),legacy:true});
    }else if(target){
      const index=exams.findIndex(item=>item.id===target.id);if(index>=0)exams.splice(index,1);
    }
    save(KEYS.exams,exams);renderExams();renderDashboard();renderPractice();
  }

  function openSmartPlanner() {
    syncLegacyExamCountdown();window.switchTab?.('home');
    const target=$('#dday-text')?.closest('section')||$('#planner-percent')?.closest('section');
    for(let details=target?.closest('details');details;details=details.parentElement?.closest('details'))details.open=true;
    setTimeout(()=>target?.scrollIntoView({behavior:'smooth',block:'center'}),80);
  }

  function startPractice() {
    const subject=$('#shh-practice-subject')?.value||'국어',level=Number($('.shh-practice-level.is-active')?.dataset.level||1);
    save(KEYS.practiceSubject,subject);save(KEYS.practiceLevel,level);
    if(typeof window.setDuoSub!=='function'||typeof window.setDuoLevel!=='function'||typeof window.startDuoQuiz!=='function'){window.showToast?.('문제풀이를 불러오는 중이에요. 잠시 후 다시 시도해 주세요.','info');return;}
    window.setDuoSub(subject);window.setDuoLevel(level);pushActivity('practice',`${subject} 문제 풀이 시작 · ${['','기초','기본','심화','실전'][level]}`,subject);window.startDuoQuiz(level);
  }

  function renderRecords() {
    const target=$('#shh-records-list');if(!target)return;
    const range=$('#shh-record-range')?.value||'7', query=($('#shh-record-search')?.value||'').trim().toLowerCase();
    const cutoff=new Date();cutoff.setDate(cutoff.getDate()-(range==='all'?36500:Number(range)||7));
    const records=allRecords().filter(r=>{
      const d=dateFromKey(r.date);if(range!=='all'&&d&&d<new Date(cutoff.getFullYear(),cutoff.getMonth(),cutoff.getDate()))return false;
      const text=`${r.title} ${r.subject} ${r.date}`.toLowerCase();return !query||text.includes(query);
    });
    $('#shh-record-total').textContent=String(records.filter(r=>r.type==='focus').reduce((sum,r)=>sum+minutesOf(r.seconds),0));
    target.replaceChildren();if(!records.length){target.innerHTML='<div class="shh-empty">선택한 기간에 기록이 없어요.<br>타이머로 공부를 시작하거나 학원 활동을 저장해 보세요.</div>';return;}
    records.forEach(r=>target.append(makeRecordRow(r)));
    renderGallery('#shh-record-gallery');
  }

  function exportRecords() {
    const rows=[['날짜','구분','과목','기록','집중시간(초)'],...allRecords().map(r=>[r.date,r.type,r.subject,r.title,r.seconds||0])];
    const csv='\uFEFF'+rows.map(row=>row.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\r\n');
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`studyhub-records-${todayKey()}.csv`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  function timerState() { return load(KEYS.timer,null); }
  function saveTimer(state) { if(state)save(KEYS.timer,state);else {try{localStorage.removeItem(KEYS.timer);}catch{}} }
  function remainingMs(state) { if(!state)return 0;return state.status==='running'?Math.max(0,(Number(state.deadline)||0)-Date.now()):Math.max(0,Number(state.remainingMs)||0); }
  function formatClock(ms) { const seconds=Math.ceil(Math.max(0,ms)/1000),m=Math.floor(seconds/60),s=seconds%60;return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; }
  let tickHandle=null;
  function renderFocus() {
    const state=timerState();const digits=$('#shh-timer-digits');if(!digits)return;
    const start=$('[data-shh-action="timer-start"]'),pause=$('[data-shh-action="timer-pause"]'),stop=$('[data-shh-action="timer-stop"]');
    const subject=$('#shh-focus-subject'),duration=$('#shh-focus-duration');
    const active=Boolean(state);
    if(active){digits.textContent=formatClock(remainingMs(state));if(subject)subject.value=state.subject;if(duration)duration.value=String(Math.round((state.durationMs||1500000)/60000));if(subject)subject.disabled=true;if(duration)duration.disabled=true;
      if(start)start.style.display=state.status==='running'?'none':'';if(pause)pause.style.display=state.status==='running'?'':'none';if(stop)stop.style.display='';
      const caption=$('#shh-timer-caption');if(caption)caption.textContent=state.status==='running'?`${state.subject}에 집중하는 중`:'잠시 쉬는 중 · 준비되면 다시 시작해요';
    } else {const d=Number(duration?.value||25);digits.textContent=`${String(d).padStart(2,'0')}:00`;if(subject)subject.disabled=false;if(duration)duration.disabled=false;if(start)start.style.display='';if(pause)pause.style.display='none';if(stop)stop.style.display='none';const caption=$('#shh-timer-caption');if(caption)caption.textContent='준비되면 시작을 눌러 주세요';}
    const stateNode=$('#shh-focus-state');if(stateNode){stateNode.textContent=state?`${state.subject} · 화면 이탈 ${state.interruptions?.length||0}회 · 기록은 이 브라우저에 저장돼요.`:'기록은 이 브라우저에 저장돼요.';stateNode.dataset.active=String(Boolean(state&&state.status==='running'));}
    const elapsed=state?(state.durationMs-remainingMs(state))/1000:0;
    $('#shh-camera-consent')?.setAttribute('aria-describedby','shh-camera-status');
    const manual=$('[data-shh-action="capture-now"]');if(manual)manual.disabled=!cameraStream||!state||state.status!=='running';
    const camOn=$('[data-shh-action="camera-start"]'),camOff=$('[data-shh-action="camera-stop"]');if(camOn)camOn.style.display=cameraStream?'none':'';if(camOff)camOff.style.display=cameraStream?'':'none';
    const subjectSums={};getSessions().filter(s=>s.date===todayKey()).forEach(s=>subjectSums[s.subject||'기타']=(subjectSums[s.subject||'기타']||0)+(Number(s.seconds)||0));
    if(state&&state.date===todayKey())subjectSums[state.subject]=(subjectSums[state.subject]||0)+elapsed;
    const box=$('#shh-subject-totals');if(box){box.replaceChildren();const entries=Object.entries(subjectSums).sort((a,b)=>b[1]-a[1]);$('#shh-focus-total').textContent=`${Math.floor(Object.values(subjectSums).reduce((x,y)=>x+y,0)/60)}분`;if(!entries.length)box.innerHTML='<div class="shh-empty" style="padding:12px">첫 집중 세션을 마치면 과목별 시간이 쌓여요.</div>';else entries.slice(0,5).forEach(([name,sec])=>{const row=document.createElement('div');row.className='shh-record-row';row.innerHTML=`<span class="shh-record-icon">${icon('book')}</span><span><strong>${escapeHtml(name)}</strong><small>오늘 누적</small></span><span class="shh-record-value">${Math.floor(sec/60)}분</span>`;box.append(row);});}
    renderDashboard();
  }

  function startTimer() {
    let state=timerState();
    if(!state){const duration=Number($('#shh-focus-duration')?.value||25)*60000;state={id:`focus-${Date.now()}`,subject:$('#shh-focus-subject')?.value||'기타',date:todayKey(),startedAt:Date.now(),durationMs:duration,remainingMs:duration,status:'paused',interruptions:[]};}
    if(state.status==='running')return;
    state.status='running';state.deadline=Date.now()+Math.max(1000,state.remainingMs||state.durationMs);saveTimer(state);
    if(tickHandle)clearInterval(tickHandle);tickHandle=setInterval(()=>{const s=timerState();if(!s)return;const left=remainingMs(s);if(left<=0){finishTimer(true);return;}renderFocus();},1000);
    if(cameraStream){capturePhoto(true);startCaptureLoop();}
    renderFocus();
  }
  function pauseTimer() {
    const state=timerState();if(!state)return;
    state.remainingMs=remainingMs(state);state.status='paused';delete state.deadline;saveTimer(state);
    if(tickHandle){clearInterval(tickHandle);tickHandle=null;}stopCaptureLoop();renderFocus();
  }
  function finishTimer(completed=false) {
    const state=timerState();if(!state)return;
    const elapsedMs=completed?state.durationMs:Math.max(0,state.durationMs-remainingMs(state));
    const seconds=Math.floor(elapsedMs/1000);
    if(seconds>=30){const sessions=getSessions();sessions.push({id:state.id,subject:state.subject,date:state.date||todayKey(),startedAt:state.startedAt,endedAt:Date.now(),seconds,interruptions:state.interruptions||[]});save(KEYS.sessions,sessions.slice(-1000));}
    saveTimer(null);if(tickHandle){clearInterval(tickHandle);tickHandle=null;}stopCaptureLoop();stopCamera(completed?'집중 세션이 끝나 카메라를 껐어요.':'세션을 종료해 카메라를 껐어요.');renderFocus();renderDashboard();renderRecords();
    if(window.showToast)window.showToast(completed?'집중 세션을 완료하고 기록했어요.':'공부 시간을 기록했어요.','success');
  }

  let cameraStream=null,cameraLoop=null,dbPromise=null;
  function openProofDB() {
    if(dbPromise)return dbPromise;
    dbPromise=new Promise((resolve,reject)=>{
      if(!('indexedDB' in window)){reject(new Error('이 브라우저는 로컬 사진 보관함을 지원하지 않습니다.'));return;}
      const request=indexedDB.open('studyhub-proof-library',1);
      request.onupgradeneeded=()=>{const db=request.result;if(!db.objectStoreNames.contains('captures'))db.createObjectStore('captures',{keyPath:'id'});};
      request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error||new Error('사진 저장소를 열지 못했어요.'));
    });
    return dbPromise;
  }
  async function openCamera() {
    const status=$('#shh-camera-status'),consent=$('#shh-camera-consent');
    if(!consent?.checked){if(status)status.textContent='카메라를 켜기 전에 선택 동의 항목을 확인해 주세요.';return;}
    if(!navigator.mediaDevices?.getUserMedia){if(status)status.textContent='이 브라우저에서는 카메라를 사용할 수 없어요. 보안 연결과 카메라 지원을 확인해 주세요.';return;}
    try {
      await openProofDB();
      cameraStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'user'},width:{ideal:960},height:{ideal:720}},audio:false});
      const video=$('#shh-camera-video');if(video){video.srcObject=cameraStream;await video.play().catch(()=>{});}
      $('#shh-camera-preview')?.classList.add('on');$('#shh-camera-badge')?.classList.add('on');
      if(status)status.textContent='카메라가 켜져 있어요. 미리보기가 보이고, 진행 중인 집중 세션에서만 주기 촬영합니다.';
      renderFocus();
      const state=timerState();if(state?.status==='running'){setTimeout(()=>capturePhoto(true),700);startCaptureLoop();}
    } catch(error) {
      cameraStream=null;const msg=error?.name==='NotAllowedError'?'브라우저 카메라 권한이 허용되지 않았어요.':error?.name==='NotFoundError'?'사용 가능한 카메라를 찾지 못했어요.':`카메라를 켜지 못했어요: ${error?.message||'권한 또는 기기 상태를 확인해 주세요.'}`;
      if(status)status.textContent=msg;
      $('#shh-camera-badge')?.classList.remove('on');
    }
  }
  function stopCaptureLoop() { if(cameraLoop){clearInterval(cameraLoop);cameraLoop=null;} }
  function startCaptureLoop() {
    stopCaptureLoop();const state=timerState();if(!cameraStream||!state||state.status!=='running')return;
    cameraLoop=setInterval(()=>{const current=timerState();if(cameraStream&&current?.status==='running'&&!document.hidden)capturePhoto(true);},5*60*1000);
  }
  function stopCamera(message='카메라가 꺼져 있어요.') {
    stopCaptureLoop();
    if(cameraStream){cameraStream.getTracks().forEach(track=>track.stop());cameraStream=null;}
    const video=$('#shh-camera-video');if(video){video.pause();video.srcObject=null;}
    $('#shh-camera-preview')?.classList.remove('on');$('#shh-camera-badge')?.classList.remove('on');
    const status=$('#shh-camera-status');if(status)status.textContent=message;
    renderFocus();
  }
  async function capturePhoto(automatic=false) {
    const state=timerState(),video=$('#shh-camera-video'),status=$('#shh-camera-status');
    if(!$('#shh-camera-consent')?.checked){if(status)status.textContent='카메라 동의가 꺼져 있어 사진을 저장하지 않았어요.';return;}
    if(!cameraStream||!video||video.readyState<2||document.hidden){if(status&&automatic)status.textContent='미리보기가 준비되면 인증 사진을 기록할게요.';return;}
    if(!state||state.status!=='running'){if(status)status.textContent='인증 사진은 진행 중인 집중 세션에서만 저장할 수 있어요.';return;}
    const w=video.videoWidth||640,h=video.videoHeight||480,scale=Math.min(1,640/w),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(w*scale));canvas.height=Math.max(1,Math.round(h*scale));
    const context=canvas.getContext('2d',{alpha:false});if(!context){if(status)status.textContent='사진을 준비하지 못했어요.';return;}
    context.save();context.translate(canvas.width,0);context.scale(-1,1);context.drawImage(video,0,0,canvas.width,canvas.height);context.restore();
    const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.72));if(!blob){if(status)status.textContent='사진 파일을 만들지 못했어요.';return;}
    const id=`proof-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
    try {
      const db=await openProofDB();await new Promise((resolve,reject)=>{const tx=db.transaction('captures','readwrite');tx.objectStore('captures').add({id,sessionId:state.id,subject:state.subject,takenAt:Date.now(),blob});tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error||new Error('저장 실패'));});
      if(status)status.textContent=`인증 사진 ${automatic?'자동 ':'문제없이 '}기록 · ${fmtTime(Date.now())} · 이 기기에 저장됨`;
      renderGallery('#shh-focus-gallery');renderGallery('#shh-record-gallery');
    } catch(error){if(status)status.textContent=`사진을 저장하지 못했어요: ${error?.message||'저장 공간을 확인해 주세요.'}`;}
  }
  async function getPhotos() {
    const db=await openProofDB();return new Promise((resolve,reject)=>{const tx=db.transaction('captures','readonly'),req=tx.objectStore('captures').getAll();req.onsuccess=()=>resolve((req.result||[]).sort((a,b)=>b.takenAt-a.takenAt));req.onerror=()=>reject(req.error||new Error('사진 목록을 불러오지 못했어요.'));});
  }
  async function renderGallery(selector) {
    const box=$(selector);if(!box)return;
    try {
      const photos=await getPhotos();box.replaceChildren();
      if(!photos.length){box.innerHTML='<div class="shh-empty" style="grid-column:1/-1">저장된 인증 사진이 없어요. 카메라는 기본 꺼짐이며 원할 때 직접 켤 수 있습니다.</div>';return;}
      photos.slice(0,24).forEach(photo=>{const card=document.createElement('article');card.className='shh-photo';const img=document.createElement('img');img.alt=`${photo.subject||'집중'} 인증 사진 ${fmtTime(photo.takenAt)}`;img.src=URL.createObjectURL(photo.blob);img.onload=()=>URL.revokeObjectURL(img.src);const del=document.createElement('button');del.type='button';del.textContent='×';del.title='사진 삭제';del.setAttribute('aria-label','인증 사진 삭제');del.dataset.shhDeletePhoto=photo.id;const small=document.createElement('small');small.textContent=`${photo.subject||'집중'} · ${fmtTime(photo.takenAt)}`;card.append(img,del,small);box.append(card);});
    } catch(error){box.innerHTML=`<div class="shh-empty" style="grid-column:1/-1">사진 보관함을 사용할 수 없어요. ${escapeHtml(error?.message||'브라우저 저장소를 확인해 주세요.')}</div>`;}
  }
  async function deletePhoto(id) {
    try {const db=await openProofDB();await new Promise((resolve,reject)=>{const tx=db.transaction('captures','readwrite');tx.objectStore('captures').delete(id);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});renderGallery('#shh-focus-gallery');renderGallery('#shh-record-gallery');}
    catch(error){if(window.showToast)window.showToast(`사진을 삭제하지 못했어요: ${error.message}`,'error');}
  }
  async function deleteAllPhotos() {
    if(!window.confirm('이 브라우저에 저장된 인증 사진을 모두 삭제할까요? 이 작업은 되돌릴 수 없습니다.'))return;
    try {const db=await openProofDB();await new Promise((resolve,reject)=>{const tx=db.transaction('captures','readwrite');tx.objectStore('captures').clear();tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});renderGallery('#shh-focus-gallery');renderGallery('#shh-record-gallery');}
    catch(error){if(window.showToast)window.showToast(`사진을 삭제하지 못했어요: ${error.message}`,'error');}
  }

  function openMoreSheet() { const sheet=$('#v20-sheet'); if(sheet){sheet.classList.add('on');sheet.setAttribute('aria-hidden','false');} }
  function closeMoreSheet() { const sheet=$('#v20-sheet'); if(sheet){sheet.classList.remove('on');sheet.setAttribute('aria-hidden','true');} }

  function appendMoreShortcuts() {
    const sheet=$('#v20-sheet');if(!sheet)return;
    const rpg=$('[data-v20="rpg"]',sheet);if(rpg)rpg.remove();
    const quick=$('#sh-quick-grid');const quickRpg=quick?.querySelector('[data-sh-rpg]');if(quickRpg)quickRpg.remove();
    if(!$('#shh-more-shortcuts')){
      const sections=$$('.v20-sec',sheet),first=sections[0];const section=document.createElement('div');section.id='shh-more-shortcuts';section.innerHTML=`<div class="v20-sec">학생 학습 바로가기</div><div class="v20-grid"><button class="v20-it" type="button" data-shh-action="academy"><span>${icon('school')}</span>학원 센터</button><button class="v20-it" type="button" data-shh-action="fun"><span>${icon('fun')}</span>펀허브</button><button class="v20-it" type="button" data-shh-action="exam"><span>${icon('exam')}</span>시험 일정</button><button class="v20-it" type="button" data-shh-action="records"><span>${icon('records')}</span>학습 기록</button><button class="v20-it" type="button" data-shh-action="language" data-shh-language-open="1"><span>${icon('language')}</span>언어 학습실</button></div>`;
      if(first)first.before(section);else sheet.querySelector('.v20-box')?.append(section);
    }
    const map={'tab:links':'notes','tab:sub':'book','tab:music':'music','review':'history','click:#v8-sb':'search','click:#v14-open':'command','click:#v14-brief-open':'briefing','click:#sh-d-full':'screen','click:#sh-d-print':'print','click:#sh-d-export':'archive','click:#sh-d-keys':'help','click:#v2-dark':'moon','click:#v2-mode':'phone','lock':'lock','export':'archive','settings':'settings','click:#v6-hb':'help'};
    $$('.v20-it',sheet).forEach(button=>{
      const key=button.dataset.v20;const glyph=map[key];if(!glyph)return;
      let holder=button.querySelector('span');if(!holder){holder=document.createElement('span');button.prepend(holder);}holder.innerHTML=icon(glyph);
    });
    replaceDecorativeIcons(sheet);
  }

  function insertAcademyShortcuts() {
    const box=$('#sh-academy .box');if(!box||$('#shh-academy-shortcuts'))return;
    const block=document.createElement('div');block.id='shh-academy-shortcuts';block.className='shh-academy-shortcuts';
    block.innerHTML=`<button class="shh-button secondary" type="button" data-shh-action="academy-route" data-dest="pomo">${icon('timer')}공부 타이머</button><button class="shh-button secondary" type="button" data-shh-action="academy-route" data-dest="exam">${icon('exam')}시험 일정</button><button class="shh-button secondary" type="button" data-shh-action="academy-route" data-dest="records">${icon('records')}학습 기록</button>`;
    const actions=$('#sh-ac-actions');if(actions)actions.after(block);else box.append(block);
  }

  function addActivityFromAcademy(event) {
    const target=event.target.closest('#sh-ac-present,#sh-ac-save');if(!target)return;
    setTimeout(()=>{
      const d=load('sh_v21_academy',{}),subject=d?.cls||'학원';
      pushActivity('academy',target.id==='sh-ac-present'?'학원 출석 기록':'학원 수업·과제 기록',subject);
      renderAcademyPage();
    },0);
  }

  const emojiMap={
    '🏫':'school','📚':'book','📘':'book','📖':'book','📓':'notes','📝':'notes','🧠':'book','🎧':'music','🎮':'fun','🕹':'fun','⚔':'quest','⚔️':'quest','🔁':'history','🔍':'search','⌘':'command','✦':'spark','🖥':'screen','🖨':'print','⤓':'archive','📦':'archive','🔒':'lock','🌙':'moon','📱':'phone','❓':'help','⏱':'timer','⏱️':'timer','⏲':'timer','⏲️':'timer','📅':'exam','🗓':'exam','✅':'check','📌':'notes','🏆':'award','🔥':'spark','⚡':'spark','💡':'spark','🎯':'target','🔊':'music','🎵':'music','🔇':'music','💬':'notes','🪙':'award','❤️':'award','⭐':'star','🔔':'exam','🧭':'target','📈':'records','🗂':'archive','✏':'notes','✏️':'notes','🧩':'fun'
  };
  function replaceDecorativeIcons(root=document) {
    if(!root.querySelectorAll)return;
    const nodes=[];if(root.matches?.('span,b,i'))nodes.push(root);nodes.push(...root.querySelectorAll('span,b,i'));
    for(const node of nodes){
      if(node.querySelector('svg'))continue;
      const txt=node.textContent.trim().replace(/[\uFE0E\uFE0F]/g,'');
      const key=Object.keys(emojiMap).find(k=>k.replace(/[\uFE0E\uFE0F]/g,'')===txt);
      if(!key)continue;
      const button=node.closest('button');
      const accessibleLabels={school:'학원 센터',book:'학습 도구',notes:'메모',music:'학습 음악',fun:'펀허브',quest:'스터디 RPG',history:'학습 기록',search:'검색',command:'빠른 명령',briefing:'오늘의 브리핑',screen:'전체 화면',print:'인쇄',archive:'보관·내보내기',lock:'잠금',phone:'모바일 설정',moon:'다크 모드',help:'도움말',timer:'집중 타이머',exam:'시험 일정',check:'완료',award:'학습 보상',spark:'학습 도전',target:'목표'};
      if(button&&!button.getAttribute('aria-label')&&!button.textContent.replace(node.textContent,'').trim())button.setAttribute('aria-label',accessibleLabels[emojiMap[key]]||'학습 기능');
      node.innerHTML=icon(emojiMap[key]);node.setAttribute('aria-hidden','true');
    }
  }

  function syncGameEntries(root=document) {
    if(!root?.querySelectorAll)return;
    const buttons=[];if(root.matches?.('#sh-v44-fun-btn,#sh-fun-top'))buttons.push(root);
    buttons.push(...root.querySelectorAll('#sh-v44-fun-btn,#sh-fun-top'));
    buttons.forEach(button=>{
      if(button.dataset.shhUnifiedGame==='1')return;
      button.innerHTML=`${icon('fun')}<span>펀허브</span>`;
      button.onclick=event=>{event.preventDefault();event.stopPropagation();setActiveNav('fun');window.switchTab?.('fun');};
      button.dataset.shhUnifiedGame='1';button.setAttribute('aria-label','펀허브 열기');
    });
  }

  function interceptGameEntry(event) {
    const button=event.target.closest('#sh-v44-fun-btn,#sh-fun-top');if(!button)return;
    event.preventDefault();event.stopImmediatePropagation();setActiveNav('fun');window.switchTab?.('fun');
  }

  function handleAction(action,el) {
    if(el.closest('#v20-sheet')) closeMoreSheet();
    if(action==='focus'){window.switchTab?.('pomo');return;}
    if(action==='school'){if(window.openSchoolTab)window.openSchoolTab();else window.switchTab?.('school');return;}
    if(action==='practice'){window.switchTab?.('practice');return;}
    if(action==='practice-start'){startPractice();return;}
    if(action==='practice-level'){const level=Number(el.dataset.level);if(level>=1&&level<=4){save(KEYS.practiceLevel,level);window.setDuoLevel?.(level);renderPractice();}return;}
    if(action==='wrong'){$('#nav-wrong')?.click();return;}
    if(action==='exam'){window.switchTab?.('exam');return;}
    if(action==='planner'){openSmartPlanner();return;}
    if(action==='academy'){window.switchTab?.('academy');return;}
    if(action==='records'){window.switchTab?.('records');return;}
    if(action==='fun'){window.switchTab?.('fun');return;}
    if(action==='more'){setActiveNav('more');openMoreSheet();return;}
    if(action==='academy-modal'){window.shAcademyOpen?.();insertAcademyShortcuts();return;}
    if(action==='academy-route'){const dest=el.dataset.dest;$('#sh-ac-close')?.click();setTimeout(()=>window.switchTab?.(dest),50);return;}
    if(action==='legacy-exam'){if(window.shCore?.openExam)window.shCore.openExam('dash');else $('#nav-exam')?.click();return;}
    if(action==='rpg'){if(window.v19Open)window.v19Open();else if(window.showToast)window.showToast('RPG 퀘스트를 준비하고 있어요.','info');return;}
    if(action==='quiz'){window.switchTab?.('practice');return;}
    if(action==='fun-panel'){const open=window.__studyhubOpenFunPanel||window.openFunStudy;if(open)open();return;}
    if(action==='music'){window.switchTab?.('music');return;}
    if(action==='study-ai'){const helper=$('#se-ai-card');if(helper)helper.click();else $('#nav-sub')?.click();return;}
    if(action==='bgm-toggle'){const player=window.v24Bgm;if(!player?.set||!player?.state){window.showToast?.('배경음악 기능을 불러오는 중이에요.','info');return;}player.set(!player.state().on);renderBgmShortcut();return;}
    if(action==='goal-plus'||action==='goal-minus'){const shift=action==='goal-plus'?15:-15;const next=Math.min(600,Math.max(15,getGoal()+shift));try{localStorage.setItem(KEYS.goal,String(next));}catch{}renderDashboard();return;}
    if(action==='timer-start'){startTimer();return;}
    if(action==='timer-pause'){pauseTimer();return;}
    if(action==='timer-stop'){finishTimer(false);return;}
    if(action==='camera-start'){openCamera();return;}
    if(action==='camera-stop'){stopCamera();return;}
    if(action==='capture-now'){capturePhoto(false);return;}
    if(action==='delete-all-photos'){deleteAllPhotos();return;}
    if(action==='export-records'){exportRecords();return;}
  }

  function bindEvents() {
    document.addEventListener('click',interceptGameEntry,true);
    document.addEventListener('click',event=>{
      const action=event.target.closest('[data-shh-action]');if(action){event.preventDefault();handleAction(action.dataset.shhAction,action);}
      const del=event.target.closest('[data-shh-delete-exam]');if(del){const exams=getExams().filter(x=>x.id!==del.dataset.shhDeleteExam);save(KEYS.exams,exams);syncLegacyExamCountdown();renderExams();renderDashboard();renderPractice();}
      const photo=event.target.closest('[data-shh-delete-photo]');if(photo)deletePhoto(photo.dataset.shhDeletePhoto);
      const done=event.target.closest('[data-ac-done]');
      if(done){const id=done.dataset.acDone,checked=done.checked;setTimeout(()=>{const data=load('sh_v21_academy',{}),items=Array.isArray(data.assignments)?data.assignments:[],item=items.find(x=>x.id===id);if(!item)return;item.done=checked;if(checked){item.completedAt=Date.now();pushActivity('academy',`과제 완료 · ${item.title}`,item.subject||'학원');}else delete item.completedAt;save('sh_v21_academy',data);renderAcademyPage();renderRecords();renderDashboard();},0);}
      const removed=event.target.closest('[data-ac-del-class],[data-ac-del-work],[data-ac-del-note],[data-ac-del-student]');if(removed)setTimeout(()=>{renderAcademyPage();renderDashboard();renderRecords();},0);
    });
    $('#shh-exam-form')?.addEventListener('submit',saveExam);
    $('#shh-record-range')?.addEventListener('change',renderRecords);
    $('#shh-record-search')?.addEventListener('input',renderRecords);
    $('#shh-focus-duration')?.addEventListener('change',renderFocus);
    $('#shh-bgm-volume')?.addEventListener('input',event=>{const value=Number(event.currentTarget.value);window.v24Bgm?.setVolume?.(value/100);renderBgmShortcut();});
    $('#shh-practice-subject')?.addEventListener('change',event=>{const subject=event.currentTarget.value;save(KEYS.practiceSubject,subject);window.setDuoSub?.(subject);});
    document.addEventListener('click',event=>{if(event.target.closest('#duo-submit-btn'))setTimeout(()=>{renderPractice();renderDashboard();},80);});
    document.addEventListener('change',event=>{if(event.target.matches?.('#exam-date-input'))syncExamsFromLegacyPlanner(event.target.value);});
    document.addEventListener('click',addActivityFromAcademy);
    window.addEventListener('storage',event=>{if(event.key==='sh_user_name')renderHomeGreeting();if(event.key===KEYS.exams||event.key==='sh_m_exam'){renderExams();renderDashboard();renderPractice();}if(event.key==='sh_duo_state'||event.key==='sh_m_wrong')renderPractice();});
    $('#shh-camera-consent')?.addEventListener('change',event=>{if(!event.currentTarget.checked){stopCamera('동의가 해제되어 카메라와 자동 촬영을 중지했어요.');}else if(!cameraStream){const status=$('#shh-camera-status');if(status)status.textContent='동의가 켜졌어요. 촬영을 시작하려면 카메라 켜기를 눌러 주세요.';}});
    document.addEventListener('submit',event=>{
      const form=event.target;if(!form.matches?.('#sh-ac-class-form,#sh-ac-att-form,#sh-ac-work-form,#sh-ac-note-form'))return;
      const formId=form.id,values=Object.fromEntries(new FormData(form).entries());
      setTimeout(()=>{const data=load('sh_v21_academy',{}),classes=Array.isArray(data.classes)?data.classes:[];let title='',subject='학원';if(formId==='sh-ac-class-form'){title=`수업 등록 · ${values.title||''}`;subject=values.subject||'학원';}else if(formId==='sh-ac-att-form'){const cls=classes.find(x=>x.id===values.classId);title=`출결 · ${values.student||'학생'} ${values.status||'기록'}`;subject=cls?.title||'학원';}else if(formId==='sh-ac-work-form'){title=`과제 등록 · ${values.title||''}`;subject=values.subject||'학원';}else if(formId==='sh-ac-note-form'){title=`상담 메모 · ${values.title||'저장'}`;}if(title!==''){pushActivity('academy',title,subject);renderAcademyPage();renderRecords();}},0);
    },true);
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden){
        const state=timerState();if(state?.status==='running'){state.interruptions=state.interruptions||[];state.interruptions.push({at:Date.now(),type:'page-hidden'});saveTimer(state);}
        if(cameraStream)stopCamera('앱 화면을 벗어나 카메라를 껐어요. 다시 켜려면 동의와 권한이 필요합니다.');
      } else {renderFocus();renderDashboard();renderPractice();}
    });
    window.addEventListener('beforeunload',()=>{if(cameraStream)cameraStream.getTracks().forEach(track=>track.stop());});
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&cameraStream&&$('#shh-camera-badge')?.classList.contains('on'))stopCamera('카메라를 껐어요.');});
  }

  function startTimerIfRecovered() {
    const state=timerState();if(!state)return;
    if(state.status==='running'){
      tickHandle=setInterval(()=>{const s=timerState();if(!s)return;if(remainingMs(s)<=0){finishTimer(true);return;}renderFocus();},1000);
      if(remainingMs(state)<=0)finishTimer(true);
    }
  }

  function boot() {
    const main=$('main'),home=$('#view-home');if(!main||!home){setTimeout(boot,80);return;}
    patchBrand();mountDashboard();
    if(window.editUserName&&!window.editUserName.__shhGreetingWrapped){const original=window.editUserName,wrapped=function(...args){const result=original.apply(this,args);renderHomeGreeting();return result;};wrapped.__shhGreetingWrapped=true;window.editUserName=wrapped;}
    const pages=pageMarkup();addMainView('exam',pages.exam);addMainView('records',pages.records);addMainView('academy',pages.academy);addMainView('fun',pages.fun);addMainView('practice',practiceMarkup());
    mountFunRpg();mountNavigation();ensureFocusPanel();appendMoreShortcuts();insertAcademyShortcuts();
    bindEvents();
    renderExams();syncLegacyExamCountdown();renderAcademyPage();renderDashboard();renderFocus();renderPractice();renderGallery('#shh-focus-gallery');renderGallery('#shh-record-gallery');startTimerIfRecovered();
    replaceDecorativeIcons(document);syncGameEntries(document);
    const observer=new MutationObserver(records=>{for(const record of records)for(const node of record.addedNodes)if(node.nodeType===1){replaceDecorativeIcons(node);syncGameEntries(node);}mountFunRpg();});
    observer.observe(document.body,{childList:true,subtree:true});
    setInterval(()=>{if(!timerState())renderDashboard();},20000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
