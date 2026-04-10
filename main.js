// ============================================================
//  CerpenEdu — main.js
//  Handles: Navbar, Tabs, Cerpen Tabs, Quiz
// ============================================================

/* ── NAVBAR ──────────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');
const navLinks  = document.querySelectorAll('.nav-link');

// Sticky shadow
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close menu on link click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

/* ── UNSUR TABS ──────────────────────────────────────────── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`tab-${target}`).classList.add('active');
  });
});

/* ── CERPEN TABS ─────────────────────────────────────────── */
document.querySelectorAll('.cerpen-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.cerpen;
    document.querySelectorAll('.cerpen-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.cerpen-display').forEach(c => c.classList.add('hidden'));
    btn.classList.add('active');
    document.getElementById(target).classList.remove('hidden');
  });
});

/* ── QUIZ ────────────────────────────────────────────────── */
const questions = [
  {
    q: 'Cerpen adalah singkatan dari…',
    opts: ['Cerita Panjang', 'Cerita Pendek', 'Cerita Penuh', 'Cerita Pengembangan'],
    ans: 1,
    explain: 'Cerpen = Cerita Pendek, karya sastra prosa fiksi yang singkat dan padat.'
  },
  {
    q: 'Bagian cerpen yang memperkenalkan tokoh, latar, dan suasana awal disebut…',
    opts: ['Komplikasi', 'Resolusi', 'Orientasi', 'Koda'],
    ans: 2,
    explain: 'Orientasi adalah bagian pembuka yang mengenalkan setting dan tokoh cerita.'
  },
  {
    q: 'Unsur berikut ini yang BUKAN merupakan unsur intrinsik cerpen adalah…',
    opts: ['Tema', 'Alur', 'Latar Belakang Pengarang', 'Amanat'],
    ans: 2,
    explain: 'Latar belakang pengarang termasuk unsur ekstrinsik, bukan intrinsik.'
  },
  {
    q: 'Klimaks dalam cerpen terdapat pada bagian…',
    opts: ['Orientasi', 'Komplikasi', 'Resolusi', 'Prolog'],
    ans: 1,
    explain: 'Komplikasi berisi perkembangan konflik dan mencapai puncak ketegangan (klimaks).'
  },
  {
    q: 'Penokohan secara tidak langsung artinya pengarang menggambarkan watak tokoh melalui…',
    opts: [
      'Narasi deskripsi fisik tokoh',
      'Dialog, tindakan, dan pikiran tokoh',
      'Keterangan langsung dari narator',
      'Judul cerpen yang dipilih pengarang'
    ],
    ans: 1,
    explain: 'Penokohan tidak langsung (dramatik) disampaikan lewat dialog, tindakan, dan pikiran tokoh.'
  },
  {
    q: 'Cerpen yang menggunakan sudut pandang orang pertama ditandai dengan penggunaan kata…',
    opts: ['Dia / Ia', 'Mereka', 'Aku / Saya', 'Kalian'],
    ans: 2,
    explain: 'Sudut pandang orang pertama menggunakan kata ganti "aku" atau "saya" sebagai pencerita.'
  },
  {
    q: 'Pesan moral yang ingin disampaikan pengarang kepada pembaca disebut…',
    opts: ['Tema', 'Alur', 'Amanat', 'Latar'],
    ans: 2,
    explain: 'Amanat adalah pesan atau nilai moral yang terkandung dalam cerpen, bisa tersurat atau tersirat.'
  },
  {
    q: 'Alur yang menceritakan kisah dari masa kini kemudian melompat ke masa lalu disebut alur…',
    opts: ['Maju', 'Mundur', 'Campuran', 'Linier'],
    ans: 1,
    explain: 'Alur mundur (flashback) menceritakan peristiwa dari masa kini ke masa lalu.'
  },
  {
    q: 'Kondisi sosial dan budaya masyarakat yang memengaruhi penulisan cerpen termasuk unsur…',
    opts: ['Intrinsik', 'Ekstrinsik', 'Struktural', 'Formal'],
    ans: 1,
    explain: 'Kondisi sosial-budaya adalah bagian dari unsur ekstrinsik yang berada di luar teks cerpen.'
  },
  {
    q: 'Menurut Edgar Allan Poe, cerpen adalah cerita yang dapat dibaca dalam…',
    opts: [
      'Beberapa hari',
      'Satu jam',
      'Sekali duduk',
      'Satu minggu'
    ],
    ans: 2,
    explain: 'Edgar Allan Poe mendefinisikan cerpen sebagai cerita yang bisa selesai dibaca dalam sekali duduk.'
  }
];

let current    = 0;
let userAnswers = new Array(questions.length).fill(-1);
let submitted  = false;

function renderQuestion(idx) {
  const q = questions[idx];
  const area = document.getElementById('quizArea');

  const html = `
    <div class="question-block">
      <div class="question-num">Soal ${idx + 1} dari ${questions.length}</div>
      <div class="question-text">${q.q}</div>
      <ul class="options-list" id="optsList">
        ${q.opts.map((opt, i) => `
          <li class="option-item ${userAnswers[idx] === i ? 'selected' : ''}"
              data-idx="${i}" onclick="selectOption(${i})">
            <span class="option-letter">${'ABCD'[i]}</span>
            <span class="option-text">${opt}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `;
  area.innerHTML = html;

  // Update progress
  document.getElementById('qCurrent').textContent = idx + 1;
  document.getElementById('qFill').style.width = `${((idx + 1) / questions.length) * 100}%`;

  // Nav buttons
  document.getElementById('btnPrev').disabled = idx === 0;
  const isLast = idx === questions.length - 1;
  document.getElementById('btnNext').classList.toggle('hidden', isLast);
  document.getElementById('btnSubmit').classList.toggle('hidden', !isLast);
}

function selectOption(optIdx) {
  if (submitted) return;
  userAnswers[current] = optIdx;
  renderQuestion(current);
}

function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    renderQuestion(current);
  }
}

function prevQuestion() {
  if (current > 0) {
    current--;
    renderQuestion(current);
  }
}

function submitQuiz() {
  const unanswered = userAnswers.filter(a => a === -1).length;
  if (unanswered > 0) {
    if (!confirm(`Masih ada ${unanswered} soal yang belum dijawab. Lanjutkan pengumpulan?`)) return;
  }

  submitted = true;

  const correctCount = userAnswers.filter((a, i) => a === questions[i].ans).length;
  const total        = questions.length;
  const pct          = Math.round((correctCount / total) * 100);

  // Grade
  let icon, title, msg;
  if (pct >= 90)      { icon = '🏆'; title = 'Luar Biasa!';    msg = 'Kamu sangat menguasai materi cerpen. Pertahankan!'; }
  else if (pct >= 70) { icon = '🎉'; title = 'Bagus Sekali!';  msg = 'Nilaimu memuaskan. Sedikit lagi untuk sempurna!'; }
  else if (pct >= 50) { icon = '📚'; title = 'Cukup Baik';     msg = 'Masih ada ruang untuk berkembang. Pelajari ulang materinya ya!'; }
  else                { icon = '💪'; title = 'Terus Semangat!'; msg = 'Jangan menyerah! Baca materi dari awal dan coba lagi.'; }

  // Detail answers
  const detailHTML = `
    <h4>Detail Jawaban</h4>
    ${questions.map((q, i) => {
      const isRight = userAnswers[i] === q.ans;
      const userAns = userAnswers[i] >= 0 ? q.opts[userAnswers[i]] : '(tidak dijawab)';
      return `
        <div class="detail-item">
          <span class="di-status">${isRight ? '✅' : '❌'}</span>
          <div class="di-text">
            <strong>${i + 1}. ${q.q}</strong>
            ${!isRight ? `Jawabanmu: ${userAns}<br/>` : ''}
            Jawaban benar: ${q.opts[q.ans]}<br/>
            <em style="font-size:.8rem;color:var(--ink-3)">${q.explain}</em>
          </div>
        </div>
      `;
    }).join('')}
  `;

  document.getElementById('quizWrapper').classList.add('hidden');
  const result = document.getElementById('quizResult');
  result.classList.remove('hidden');
  document.getElementById('resultIcon').textContent = icon;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultScore').textContent = `${correctCount} / ${total} Benar (${pct}%)`;
  document.getElementById('resultMsg').textContent = msg;
  document.getElementById('resultDetail').innerHTML = detailHTML;

  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetQuiz() {
  current = 0;
  userAnswers = new Array(questions.length).fill(-1);
  submitted   = false;

  document.getElementById('quizResult').classList.add('hidden');
  document.getElementById('quizWrapper').classList.remove('hidden');
  renderQuestion(0);
  document.getElementById('quizWrapper').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Init quiz
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('qTotal').textContent = questions.length;
  renderQuestion(0);
});

/* ── SMOOTH SCROLL FIX for fixed navbar ─────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
