document.addEventListener('DOMContentLoaded', () => {
  // --- Core Elements ---
  const body = document.body;
  const cursorGlow = document.getElementById('cursor-glow');
  const mainWrapper = document.querySelector('.main-wrapper');
  const loaderScreen = document.getElementById('loader-screen');
  const loaderProgress = document.querySelector('.loader-progress');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const toastContainer = document.getElementById('toast-container');
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');

  // --- Theme Management ---
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    
    const isKh = (localStorage.getItem('portfolio-lang') || 'en') === 'kh';
    if (newTheme === 'light') {
      showToast(
        isKh ? 'បានប្តូរទៅ Light Mode' : 'Switched to Light Mode',
        isKh 
          ? 'ណែនាំ៖ ប្រើប្រាស់ Dark Mode ដើម្បីទទួលបានរូបភាពកញ្ចក់ថ្លាល្អបំផុត!'
          : 'Tip: Switch to Dark Mode for the best glassmorphism experience!',
        'warning',
        0,
        10000
      );
    } else {
      showToast(
        isKh ? 'បានប្តូរទៅ Dark Mode' : 'Theme Updated', 
        isKh ? 'បានផ្លាស់ប្តូរទៅជា Dark Mode ជោគជ័យ' : 'Switched to Dark Mode Successfully'
      );
    }
  });

  // If page loads in light theme, suggest switching to dark mode
  if (savedTheme === 'light') {
    setTimeout(() => {
      const isKh = (localStorage.getItem('portfolio-lang') || 'en') === 'kh';
      showToast(
        isKh ? 'ណែនាំឱ្យប្រើ Dark Mode' : 'Dark Mode Recommended',
        isKh 
          ? 'ដើម្បីទទួលបានបទពិសោធន៍មើលឃើញប្លង់កញ្ចក់ថ្លាល្អបំផុត សូមប្រើប្រាស់ Dark Mode។'
          : 'For the best glassmorphism visual experience, please use Dark Mode.',
        'info',
        0,
        10000
      );
    }, 3500);
  }

  // --- Language Translation System ---
  const translations = {
    en: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      resume: "Resume",
      contact: "Contact",
      hello: "Hello, I'm",
      name: "PENHPICH BORMEY",
      role1: "MIS Student",
      role2: "Web Developer",
      role3: "Telegram Bot Creator",
      heroDesc: "I build modern websites, AI-powered tools, and Telegram bots. Passionate about technology, design, and creating digital experiences that solve real-world problems.",
      viewProjects: "View Projects",
      downloadCv: "Download CV",
      contactMe: "Contact Me"
    },
    kh: {
      home: "ទំព័រដើម",
      about: "អំពីខ្ញុំ",
      skills: "ជំនាញ",
      projects: "គម្រោង",
      resume: "ប្រវត្តិរូប",
      contact: "ទាក់ទង",
      hello: "សួស្តី ខ្ញុំបាទគឺ",
      name: "ពេជ្រពេញបូរមី",
      role1: "និស្សិត MIS",
      role2: "អ្នកបង្កើតគេហទំព័រ",
      role3: "អ្នកបង្កើត Telegram Bot",
      heroDesc: "ខ្ញុំបង្កើតគេហទំព័រទំនើបៗ ឧបករណ៍ជំនួយដោយបញ្ញាសិប្បនិម្មិត (AI) និង Telegram Bot។ ខ្ញុំចូលចិត្តបច្គេកវិទ្យា ការរចនា និងការបង្កើតបទពិសោធន៍ឌីជីថលដើម្បីដោះស្រាយបញ្ហាក្នុងពិភពពិត។",
      viewProjects: "មើលគម្រោង",
      downloadCv: "ទាញយក CV",
      contactMe: "ទាក់ទងខ្ញុំ"
    }
  };

  const selectorTranslations = {
    en: {
      ".nav-brand": "BORMEY.DEV",
      ".weather-city": "Phnom Penh",
      ".weather-condition": "Humid & Hot",
      ".weather-day:nth-of-type(1)": "Today",
      ".stats-grid .stat-card:nth-child(1) .stat-label": "Projects Completed",
      ".stats-grid .stat-card:nth-child(2) .stat-label": "Website Designs",
      ".stats-grid .stat-card:nth-child(3) .stat-label": "Telegram Bots",
      "div[style*='grid-template-columns'] .stat-card:nth-child(1) .info-label:nth-child(1)": "Visitor Tracking",
      "div[style*='grid-template-columns'] .stat-card:nth-child(1) span.info-label": "Global Views",
      "div[style*='grid-template-columns'] .stat-card:nth-child(2) .info-label:nth-child(1)": "Learning Log",
      "div[style*='grid-template-columns'] .stat-card:nth-child(2) span.info-label": "Hours Study",
      "#about .sec-subtitle": "Who I Am",
      "#about .sec-title": "About Me",
      "#about h3": "Student & Digital Developer",
      "#about p": "I am a Management Information Systems (MIS) student passionate about web development, artificial intelligence, user interface design, and Telegram bot creation. I enjoy learning new technologies and building useful digital products that help people work smarter.",
      "#about .info-item:nth-child(1) .info-label": "Name",
      "#about .info-item:nth-child(2) .info-label": "Education",
      "#about .info-item:nth-child(3) .info-label": "Role",
      "#about .info-item:nth-child(4) .info-label": "Languages",
      "#about .info-item:nth-child(2) .info-value": "MIS (Information Systems)",
      "#about .info-item:nth-child(3) .info-value": "Student & Developer",
      "#about .info-item:nth-child(4) .info-value": "Khmer, English",
      "#about .achievement-card:nth-child(1) h3": "Built Multiple Websites",
      "#about .achievement-card:nth-child(1) p": "Designed and deployed diverse portfolio projects and digital stores from scratch.",
      "#about .achievement-card:nth-child(2) h3": "Created Telegram Bots",
      "#about .achievement-card:nth-child(2) p": "Programmed automation assistants, chatbots, and APIs using Telegram API standards.",
      "#about .achievement-card:nth-child(3) h3": "Learning AI Development",
      "#about .achievement-card:nth-child(3) p": "Integrating automation and prompt engineering to improve user workflows.",
      "#about .achievement-card:nth-child(4) h3": "MIS Student Developer",
      "#about .achievement-card:nth-child(4) p": "Bridging technology with business analytics to construct structured platforms.",
      "#skills .sec-subtitle": "My Stack",
      "#skills .sec-title": "My Skills",
      "#projects .sec-subtitle": "Portfolio",
      "#projects .sec-title": "Projects",
      "#projects .filter-btn[data-filter='all']": "All",
      "#projects .filter-btn[data-filter='frontend']": "Frontend",
      "#projects .filter-btn[data-filter='bot']": "Bot & AI",
      "#projects .filter-btn[data-filter='productivity']": "Productivity",
      ".project-card:nth-child(1) .project-title": "AI Telegram Assistant",
      ".project-card:nth-child(1) .project-desc": "An intelligent Telegram bot capable of answering questions, generating content, and assisting users in real-time.",
      ".project-card:nth-child(2) .project-title": "Subscription Store",
      ".project-card:nth-child(2) .project-desc": "A premium digital subscription marketplace website designed with advanced frosted glassmorphism themes.",
      ".project-card:nth-child(3) .project-title": "All-in-One Tools Hub",
      ".project-card:nth-child(3) .project-desc": "A comprehensive web tools collection comprising developer widgets, math solvers, and productivity modules.",
      ".project-card:nth-child(4) .project-title": "CV Builder Platform",
      ".project-card:nth-child(4) .project-desc": "Professional resume builder with downloadable templates, custom fields, and real-time frosted glass previews.",
      "#btn-view-visual": "Visual CV",
      "#btn-view-terminal": "Terminal JSON",
      ".resume-header h3": "PENHPICH BORMEY",
      ".resume-meta": "MIS Student • Web Developer • Telegram Bot Creator • AI Enthusiast",
      ".resume-body-left h4:nth-of-type(1)": "EDUCATION",
      ".education-item h5": "MIS (Management Information Systems)",
      ".education-item .inst": "National University of Management",
      ".education-item .date": "2023 - Present",
      ".resume-body-left h4:nth-of-type(2)": "EXPERIENCE",
      ".experience-item:nth-child(1) h5": "Freelance Web Developer & Bot Creator",
      ".experience-item:nth-child(1) .date": "2023 - Present",
      ".experience-item:nth-child(1) p": "Developing customized landing pages, frosted glass portfolio layouts, and automation tools using modern stacks.",
      ".resume-body-right h4:nth-of-type(1)": "CONTACT",
      ".resume-contact-item:nth-of-type(1) span": "Cambodia",
      ".resume-body-right h4:nth-of-type(2)": "TECH STACK",
      ".resume-body-right h4:nth-of-type(3)": "CERTIFICATIONS & RECOGNITIONS",
      ".cert-item:nth-of-type(1) h6": "Responsive Web Design",
      ".cert-item:nth-of-type(1) p": "FreeCodeCamp Certification",
      ".cert-item:nth-of-type(2) h6": "Telegram Bot Creator Badge",
      ".cert-item:nth-of-type(2) p": "Community Automation Specialist",
      "#contact .sec-subtitle": "Get in Touch",
      "#contact .sec-title": "Contact Me",
      "label[for='form-name']": "Full Name",
      "label[for='form-email']": "Email Address",
      "label[for='form-subject']": "Subject",
      "label[for='form-message']": "Your Message",
      "#emb-submit-btn span.btn-text": "Send Message",
      "#contact-messenger-label": "Messenger",
      ".copyright-area": "© 2026 BORMEY.DEV. All Rights Reserved."
    },
    kh: {
      ".nav-brand": "បូរមី.DEV",
      ".weather-city": "ភ្នំពេញ",
      ".weather-condition": "ក្តៅស្អុះស្អាប់",
      ".weather-day:nth-of-type(1)": "ថ្ងៃនេះ",
      ".stats-grid .stat-card:nth-child(1) .stat-label": "គម្រោងដែលបានបញ្ចប់",
      ".stats-grid .stat-card:nth-child(2) .stat-label": "ការរចនាគេហទំព័រ",
      ".stats-grid .stat-card:nth-child(3) .stat-label": "Telegram Bots",
      "div[style*='grid-template-columns'] .stat-card:nth-child(1) .info-label:nth-child(1)": "ការតាមដានអ្នកទស្សនា",
      "div[style*='grid-template-columns'] .stat-card:nth-child(1) span.info-label": "ការមើលសរុប",
      "div[style*='grid-template-columns'] .stat-card:nth-child(2) .info-label:nth-child(1)": "កំណត់ហេតុសិក្សា",
      "div[style*='grid-template-columns'] .stat-card:nth-child(2) span.info-label": "ម៉ោងសិក្សា",
      "#about .sec-subtitle": "តើនរណាជាខ្ញុំ",
      "#about .sec-title": "អំពីខ្លួនខ្ញុំ",
      "#about h3": "និស្សិត និងអ្នកអភិវឌ្ឍន៍ឌីជីថល",
      "#about p": "ខ្ញុំគឺជានិស្សិតផ្នែកប្រព័ន្ធព័ត៌មានគ្រប់គ្រង (MIS) ដែលមានចំណូលចិត្តលើការអភិវឌ្ឍគេហទំព័រ បញ្ញាសិប្បនិម្មិត ការរចនាចំណុចប្រទាក់អ្នកប្រើប្រាស់ និងការបង្កើត Telegram bot។ ខ្ញុំចូលចិត្តរៀនបច្ចេកវិទ្យាថ្មីៗ និងបង្កើតផលិតផលឌីជីថលដែលមានប្រយោជន៍ ដើម្បីជួយមនុស្សឱ្យធ្វើការងារកាន់តែឆ្លាតវៃ។",
      "#about .info-item:nth-child(1) .info-label": "ឈ្មោះ",
      "#about .info-item:nth-child(2) .info-label": "ការសិក្សា",
      "#about .info-item:nth-child(3) .info-label": "តួនាទី",
      "#about .info-item:nth-child(4) .info-label": "ភាសា",
      "#about .info-item:nth-child(2) .info-value": "ប្រព័ន្ធព័ត៌មានគ្រប់គ្រង (MIS)",
      "#about .info-item:nth-child(3) .info-value": "និស្សិត និងអ្នកអភិវឌ្ឍន៍",
      "#about .info-item:nth-child(4) .info-value": "ខ្មែរ, អង់គ្លេស",
      "#about .achievement-card:nth-child(1) h3": "បង្កើតគេហទំព័រជាច្រើន",
      "#about .achievement-card:nth-child(1) p": "រចនា និងដាក់ឱ្យដំណើរការនូវគម្រោងប្រវត្តិរូបចម្រុះ និងហាងលក់ឌីជីថលពីចំណុចចាប់ផ្តើម។",
      "#about .achievement-card:nth-child(2) h3": "បង្កើត Telegram Bots",
      "#about .achievement-card:nth-child(2) p": "សរសេរកម្មវិធីជំនួយស្វ័យប្រវត្ត ឆាតប៊ុត និង API ដោយប្រើស្តង់ដារ Telegram API។",
      "#about .achievement-card:nth-child(3) h3": "កំពុងសិក្សាការអភិវឌ្ឍន៍ AI",
      "#about .achievement-card:nth-child(3) p": "បញ្ចូលស្វ័យប្រវត្តិកម្ម និងវិស្វកម្មរហ័ស (prompt engineering) ដើម្បីកែលម្អលំហូរការងាររបស់អ្នកប្រើប្រាស់។",
      "#about .achievement-card:nth-child(4) h3": "អ្នកអភិវឌ្ឍន៍ដែលជានិស្សិត MIS",
      "#about .achievement-card:nth-child(4) p": "ភ្ជាប់បច្ចេកវិទ្យាជាមួយការវិភាគអាជីវកម្ម ដើម្បីបង្កើតវេទិកាដែលមានរចនាសម្ព័ន្ធល្អ។",
      "#skills .sec-subtitle": "បច្ចេកវិទ្យាខ្ញុំប្រើ",
      "#skills .sec-title": "ជំនាញរបស់ខ្ញុំ",
      "#projects .sec-subtitle": "ស្នាដៃរបស់ខ្ញុំ",
      "#projects .sec-title": "គម្រោងនានា",
      "#projects .filter-btn[data-filter='all']": "ទាំងអស់",
      "#projects .filter-btn[data-filter='frontend']": "Frontend",
      "#projects .filter-btn[data-filter='bot']": "Bot និង AI",
      "#projects .filter-btn[data-filter='productivity']": "ផលិតភាព",
      ".project-card:nth-child(1) .project-title": "ជំនួយការ AI Telegram",
      ".project-card:nth-child(1) .project-desc": "ប៊ុត Telegram ឆ្លាតវៃដែលអាចឆ្លើយសំណួរ បង្កើតមាតិកា និងជួយអ្នកប្រើប្រាស់ក្នុងពេលជាក់ស្តែង។",
      ".project-card:nth-child(2) .project-title": "ហាងលក់ការជាវ (Subscription)",
      ".project-card:nth-child(2) .project-desc": "គេហទំព័រទីផ្សារលក់ការជាវឌីជីថលដ៏ប្រណិតដែលត្រូវបានរចនាឡើងជាមួយនឹងស្បែកកញ្ចក់ថ្លាទំនើប។",
      ".project-card:nth-child(3) .project-title": "មជ្ឈមណ្ឌលឧបករណ៍ All-in-One",
      ".project-card:nth-child(3) .project-desc": "ការប្រមូលផ្តុំឧបករណ៍គេហទំព័រដ៏ទូលំទូលាយ រួមមាន ធាតុក្រាហ្វិកអ្នកអភិវឌ្ឍន៍ អ្នកដោះស្រាយគណិតវិទ្យា និងម៉ូឌុលផលិតភាព។",
      ".project-card:nth-child(4) .project-title": "វេទិកាបង្កើត CV",
      ".project-card:nth-child(4) .project-desc": "អ្នកបង្កើតប្រវត្តិរូបសង្ខេបអាជីព ជាមួយគំរូដែលអាចទាញយកបាន វាលផ្ទាល់ខ្លួន និងការមើលជាមុនកញ្ចក់ថ្លាក្នុងពេលជាក់ស្តែង។",
      "#btn-view-visual": "ប្រវត្តិរូបសង្ខេប",
      "#btn-view-terminal": "កូដប្រវត្តិរូប (JSON)",
      ".resume-header h3": "ពេជ្រពេញបូរមី",
      ".resume-meta": "និស្សិត MIS • អ្នកអភិវឌ្ឍន៍គេហទំព័រ • អ្នកបង្កើត Telegram Bot • អ្នកចូលចិត្ត AI",
      ".resume-body-left h4:nth-of-type(1)": "ការអប់រំ",
      ".education-item h5": "ប្រព័ន្ធព័ត៌មានគ្រប់គ្រង (MIS)",
      ".education-item .inst": "សាកលវិទ្យាល័យជាតិគ្រប់គ្រង",
      ".education-item .date": "២០២៣ - បច្ចុប្បន្ន",
      ".resume-body-left h4:nth-of-type(2)": "បទពិសោធន៍",
      ".experience-item:nth-child(1) h5": "អ្នកបង្កើតគេហទំព័រ និង Bot ឯករាជ្យ",
      ".experience-item:nth-child(1) .date": "២០២៣ - បច្ចុប្បន្ន",
      ".experience-item:nth-child(1) p": "បង្កើតគេហទំព័រតាមតម្រូវការ ប្លង់ប្រវត្តិរូបកញ្ចក់ថ្លា និងឧបករណ៍ស្វ័យប្រវត្តដោយប្រើប្រាស់បច្ចេកវិទ្យាទំនើប។",
      ".resume-body-right h4:nth-of-type(1)": "ទំនាក់ទំនង",
      ".resume-contact-item:nth-of-type(1) span": "ព្រះរាជាណាចក្រកម្ពុជា",
      ".resume-body-right h4:nth-of-type(2)": "ជំនាញបច្ចេកវិទ្យា",
      ".resume-body-right h4:nth-of-type(3)": "វិញ្ញាបនបត្រ និងការទទួលស្គាល់",
      ".cert-item:nth-of-type(1) h6": "ការរចនាគេហទំព័រឆ្លើយតប (Responsive)",
      ".cert-item:nth-of-type(1) p": "វិញ្ញាបនបត្រ FreeCodeCamp",
      ".cert-item:nth-of-type(2) h6": "ផ្លាកសញ្ញាអ្នកបង្កើត Telegram Bot",
      ".cert-item:nth-of-type(2) p": "អ្នកជំនាញស្វ័យប្រវត្តិកម្មសហគមន៍",
      "#contact .sec-subtitle": "ទំនាក់ទំនងមកខ្ញុំ",
      "#contact .sec-title": "ទាក់ទងមកខ្ញុំ",
      "label[for='form-name']": "ឈ្មោះពេញ",
      "label[for='form-email']": "អាសយដ្ឋានអ៊ីមែល",
      "label[for='form-subject']": "ប្រធានបទ",
      "label[for='form-message']": "សាររបស់អ្នក",
      "#emb-submit-btn span.btn-text": "ផ្ញើសារចេញ",
      "#contact-messenger-label": "ម៉ែសសិនជ័រ",
      ".copyright-area": "© ២០២៦ បូរមី.DEV។ រក្សាសិទ្ធិគ្រប់យ៉ាង។"
    }
  };

  const placeholders = {
    en: {
      "#form-name": "Enter your full name",
      "#form-email": "name@example.com",
      "#form-subject": "How can I help you?",
      "#form-message": "Write your message here..."
    },
    kh: {
      "#form-name": "បញ្ចូលឈ្មោះពេញរបស់អ្នក",
      "#form-email": "name@example.com",
      "#form-subject": "តើខ្ញុំអាចជួយអ្នកដោយរបៀបណា?",
      "#form-message": "សរសេរសាររបស់អ្នកនៅទីនេះ..."
    }
  };

  let currentLang = localStorage.getItem('portfolio-lang') || 'en';
  const btnEn = document.getElementById('lang-btn-en');
  const btnKh = document.getElementById('lang-btn-kh');
  
  function applyLanguage(lang) {
    // 1. Tag translations (elements with data-i18n attributes)
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // 2. Full selector translations (non-tagged elements)
    if (selectorTranslations[lang]) {
      Object.keys(selectorTranslations[lang]).forEach(selector => {
        const el = document.querySelector(selector);
        if (el) {
          el.textContent = selectorTranslations[lang][selector];
        }
      });
    }

    // 3. Placeholders translations
    if (placeholders[lang]) {
      Object.keys(placeholders[lang]).forEach(selector => {
        const el = document.querySelector(selector);
        if (el) {
          el.setAttribute('placeholder', placeholders[lang][selector]);
        }
      });
    }

    // 4. "Under Developer" / "View" text on project cards
    document.querySelectorAll('.project-btn:not(.project-view-btn):not(.project-view-btn-code) span').forEach(el => {
      el.textContent = lang === 'en' ? 'Under Developer' : 'កំពុងអភិវឌ្ឍន៍';
    });
    document.querySelectorAll('.project-view-btn span').forEach(el => {
      el.textContent = lang === 'en' ? 'View' : 'មើល';
    });
    document.querySelectorAll('.project-view-btn-code span').forEach(el => {
      el.textContent = lang === 'en' ? 'GitHub' : 'កូដ';
    });

    // Update active pill button
    if (lang === 'en') {
      if (btnEn) btnEn.classList.add('active');
      if (btnKh) btnKh.classList.remove('active');
    } else {
      if (btnKh) btnKh.classList.add('active');
      if (btnEn) btnEn.classList.remove('active');
    }
  }

  // Initialize Language
  applyLanguage(currentLang);

  function handleLangSwitch(targetLang) {
    if (currentLang === targetLang) return;
    currentLang = targetLang;
    localStorage.setItem('portfolio-lang', currentLang);
    applyLanguage(currentLang);
    
    const modeText = currentLang === 'en' ? 'English Language' : 'ភាសាខ្មែរ (Khmer)';
    showToast(
      currentLang === 'en' ? 'Language Updated' : 'ភាសាត្រូវបានផ្លាស់ប្តូរ', 
      currentLang === 'en' ? `Switched to ${modeText}` : `បានប្តូរទៅកាន់ ${modeText}`
    );
  }

  if (btnEn) btnEn.addEventListener('click', () => handleLangSwitch('en'));
  if (btnKh) btnKh.addEventListener('click', () => handleLangSwitch('kh'));

  // --- Interactive Cursor Glow ---
  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });

  // --- 3D Parallax Tilt Effect on Hero card ---
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  const heroCard = document.querySelector('#home .main-glass-card');
  const heroWrapper = document.getElementById('home');

  if (!isTouchDevice && heroCard && heroWrapper) {
    heroWrapper.addEventListener('mousemove', (e) => {
      const rect = heroWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((centerY - y) / centerY) * 6;
      const rotateY = ((x - centerX) / centerX) * 6;
      
      heroCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      heroCard.style.transition = 'transform 0.1s ease';
    });

    heroWrapper.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
      heroCard.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  }

  // --- Canvas Particle Engine ---
  let particlesArray = [];
  const numberOfParticles = 35;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.3 - 0.15;
      this.speedY = Math.random() * 0.3 - 0.15;
      this.opacity = Math.random() * 0.4 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;
      
      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      const isDark = body.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? `rgba(90, 200, 250, ${this.opacity})` : `rgba(37, 99, 235, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  initParticles();

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // --- Stat Counters Animation ---
  const statsConfig = [
    { id: 'stat-projects', target: 10, suffix: '+' },
    { id: 'stat-websites', target: 20, suffix: '+' },
    { id: 'stat-bots', target: 5, suffix: '+' },
    { id: 'stat-hours', target: 100, suffix: '+' }
  ];

  function animateCounters() {
    statsConfig.forEach(stat => {
      const element = document.getElementById(stat.id);
      if (!element) return;
      
      let currentValue = 0;
      const duration = 2000; // ms
      const increment = Math.ceil(stat.target / 40);
      const intervalTime = Math.floor(duration / 40);
      
      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= stat.target) {
          currentValue = stat.target;
          clearInterval(timer);
        }
        element.textContent = currentValue + stat.suffix;
      }, intervalTime);
    });
  }

  // --- Skills Progress Bars Animation ---
  const skillFills = document.querySelectorAll('.prof-bar-fill');
  let skillsAnimated = false;

  function animateSkills() {
    if (skillsAnimated) return;
    skillsAnimated = true;
    skillFills.forEach(bar => {
      const percent = bar.getAttribute('data-percent');
      bar.style.width = percent;
    });
  }

  // --- Page Scroll Observer (Scroll Spy & Entrance Animations) ---
  const sections = document.querySelectorAll('.section-container');
  const navLinks = document.querySelectorAll('.nav-links a');
  const dockItems = document.querySelectorAll('.dock-item');

  const scrollObserverOptions = {
    threshold: 0.25,
    rootMargin: '0px 0px -10% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate entrance card
        entry.target.classList.add('visible');

        // Scroll Spy: Update Nav links & Dock Items focus rings
        const sectionId = entry.target.getAttribute('id');
        
        // Skip updating active states for subpages like CyberTools
        if (sectionId) {
          updateActiveMenuStates(`#${sectionId}`);
        }

        // Trigger skills progress bars when Skills section comes into view
        if (sectionId === 'skills') {
          animateSkills();
        }
      }
    });
  }, scrollObserverOptions);

  sections.forEach(section => observer.observe(section));

  function updateActiveMenuStates(hrefTarget) {
    // Top Nav
    navLinks.forEach(link => {
      if (link.getAttribute('href') === hrefTarget) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Bottom Dock
    dockItems.forEach(item => {
      if (item.getAttribute('href') === hrefTarget) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // --- Active Nav Links click tracking ---
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetHref = link.getAttribute('href');
      if (targetHref.includes('cybertools')) {
        e.preventDefault();
        if (confirm("Are you sure you want to visit the site?")) {
          openCybertoolsWindow();
        }
      } else if (targetHref.startsWith('#')) {
        e.preventDefault();
        document.querySelector(targetHref).scrollIntoView({ behavior: 'smooth' });
        updateActiveMenuStates(targetHref);
      }
    });
  });

  // --- Dock Icon bounce/scroll/redirects logic ---
  dockItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetHref = item.getAttribute('href');
      const label = item.getAttribute('data-tooltip');
      
      // Bounce animation trigger
      item.style.transform = 'scale(0.85) translateY(0px)';
      setTimeout(() => {
        item.style.transform = 'scale(1.22) translateY(-12px)';
        setTimeout(() => {
          item.style.transform = '';
        }, 150);
      }, 100);

      if (targetHref.startsWith('#')) {
        e.preventDefault();
        
        if (label === 'Contact') {
          // Open popup modal overlay instead of scrolling on contact click from dock
          const contactOverlay = document.getElementById('contact-overlay');
          if (contactOverlay) {
            contactOverlay.classList.add('open');
            showToast('Contact Modal', 'Opening secure terminal form...');
          }
        } else {
          document.querySelector(targetHref).scrollIntoView({ behavior: 'smooth' });
          updateActiveMenuStates(targetHref);
        }
      } else if (label === 'CyberTools' || targetHref.includes('cybertools')) {
        e.preventDefault();
        if (confirm("Are you sure you want to visit the site?")) {
          showToast('CyberTools Suite', 'Launching utility tools workspace...', 100);
          setTimeout(() => {
            openCybertoolsWindow();
          }, 450);
        }
      }
    });
  });

  // --- macOS Dock Magnification Effect (Fisheye) ---
  const dockContainer = document.querySelector('.dock');
  const dockItemsList = document.querySelectorAll('.dock-item');
  
  if (dockContainer && dockItemsList.length > 0 && !isTouchDevice) {
    dockContainer.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      dockItemsList.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;
        
        const distX = mouseX - itemCenterX;
        const distY = mouseY - itemCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        const maxScale = 1.4;
        const baseScale = 1.0;
        const range = 150; // distance range in pixels
        
        let scale = baseScale;
        if (distance < range) {
          scale = maxScale - ((distance / range) * (maxScale - baseScale));
        }
        
        const translateY = (scale - 1) * -12;
        item.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        item.style.transition = 'transform 0.05s ease';
      });
    });
    
    dockContainer.addEventListener('mouseleave', () => {
      dockItemsList.forEach(item => {
        item.style.transform = '';
        item.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    });
  }

  // --- Projects Grid Filter logic ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Resume Section CV Actions ---
  const cvDownloadBtn = document.getElementById('cv-download-btn');
  const cvPrintBtn = document.getElementById('cv-print-btn');
  const resumeSheetArea = document.getElementById('resume-sheet-area');

  if (cvDownloadBtn) {
    cvDownloadBtn.onclick = (e) => {
      e.preventDefault();
      showToast('Download Unavailable', 'ប្រវត្តិរូបសង្ខេប (CV/Resume) អាចស្នើសុំបានដោយផ្ទាល់។ សូមទាក់ទង Penhpich Bormey។', 'warning');
    };
  }

  if (cvPrintBtn) {
    cvPrintBtn.onclick = () => {
      showToast('Print Unavailable', 'The owner has not uploaded a printable CV yet.', 'warning');
    };
  }

  // --- Project Button Click Handler ---
  const projectBtns = document.querySelectorAll('.project-card .project-btn:not(.project-view-btn):not(.project-view-btn-code)');
  projectBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      showToast('Project Status', 'This project is currently under developer and will be available soon.', 'info');
    };
  });

  const projectViewBtns = document.querySelectorAll('.project-card .project-view-btn');
  projectViewBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const appUrl = btn.getAttribute('data-app-url');
      const urlBar = btn.getAttribute('data-url-bar');
      const isCvBuilder = appUrl.includes('cv-builder-pro');
      showToast(isCvBuilder ? 'CV Builder Pro' : 'CyberTools Workspace', isCvBuilder ? 'Launching CV Builder Workspace...' : 'Opening CyberTools Hub...', 'success');
      setTimeout(() => {
        openAppWindow(appUrl, urlBar);
      }, 300);
    };
  });

  // --- Toast Notification System ---
  function showToast(title, description, type = 'success', delay = 0, duration = 4000) {
    if (typeof type === 'number') {
      delay = type;
      type = 'success';
    }

    setTimeout(() => {
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      
      let iconSvg = '';
      if (type === 'success') {
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke-width="2"/><path d="m9 12 2 2 4-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      } else if (type === 'warning' || type === 'error') {
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="2"/><line x1="12" y1="8" x2="12" y2="14" stroke-width="2.5" stroke-linecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-width="3" stroke-linecap="round"/></svg>`;
      } else {
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="2"/><line x1="12" y1="16" x2="12" y2="12" stroke-width="2.5" stroke-linecap="round"/><line x1="12" y1="8" x2="12.01" y2="8" stroke-width="3" stroke-linecap="round"/></svg>`;
      }

      toast.innerHTML = `
        <div class="toast-icon">
          ${iconSvg}
        </div>
        <div class="toast-content">
          <span class="toast-title">${title}</span>
          <span class="toast-desc">${description}</span>
        </div>
      `;
      toastContainer.appendChild(toast);
      
      toast.offsetHeight; // Force repaint
      toast.classList.add('show');
      
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 600);
      }, duration);
    }, delay);
  }

  // --- Popup Contact Modal triggers ---
  const contactOverlay = document.getElementById('contact-overlay');
  const contactCloseBtn = document.getElementById('contact-close-btn');
  const contactForm = document.getElementById('contact-form');
  const contactSubmitBtn = document.getElementById('contact-submit-btn');

  if (contactCloseBtn && contactOverlay) {
    contactCloseBtn.addEventListener('click', () => {
      contactOverlay.classList.remove('open');
    });
  }

  if (contactOverlay) {
    contactOverlay.addEventListener('click', (e) => {
      if (e.target === contactOverlay) {
        contactOverlay.classList.remove('open');
      }
    });
  }

  // Popup Contact Modal form submission handler
  if (contactForm && contactSubmitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactSubmitBtn.classList.add('sending');
      const submitTextSpan = contactSubmitBtn.querySelector('span');
      const originalText = submitTextSpan.textContent;
      submitTextSpan.textContent = 'Sending Message...';

      setTimeout(() => {
        contactSubmitBtn.classList.remove('sending');
        contactSubmitBtn.classList.add('success');
        submitTextSpan.textContent = 'Message Sent! ✓';
        
        showToast('Message Sent', 'Thank you! Bormey will get back to you shortly.', 200);

        setTimeout(() => {
          contactOverlay.classList.remove('open');
          setTimeout(() => {
            contactForm.reset();
            contactSubmitBtn.classList.remove('success');
            submitTextSpan.textContent = originalText;
          }, 600);
        }, 1500);
      }, 2000);
    });
  }

  // --- Embedded Contact Card form submission handler ---
  const embForm = document.getElementById('embedded-contact-form');
  const embSubmitBtn = document.getElementById('emb-submit-btn');

  if (embForm && embSubmitBtn) {
    embForm.addEventListener('submit', (e) => {
      e.preventDefault();
      embSubmitBtn.classList.add('sending');
      const submitTextSpan = embSubmitBtn.querySelector('span');
      const originalText = submitTextSpan.textContent;
      submitTextSpan.textContent = 'Sending Message...';

      setTimeout(() => {
        embSubmitBtn.classList.remove('sending');
        embSubmitBtn.classList.add('success');
        submitTextSpan.textContent = 'Message Sent! ✓';
        
        showToast('Message Sent', 'Message delivered to terminal. Bormey has been notified.', 200);

        setTimeout(() => {
          embForm.reset();
          setTimeout(() => {
            embSubmitBtn.classList.remove('success');
            submitTextSpan.textContent = originalText;
          }, 600);
        }, 2000);
      }, 2000);
    });
  }

  // --- Loading screen initialization and welcome message trigger ---
  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += 1;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      
      setTimeout(() => {
        loaderScreen.classList.add('hidden');
        
        // Trigger counters
        setTimeout(animateCounters, 600);
        
        // Display Welcome notes
        showToast('Active Status', 'PENHPICH BORMEY is currently active in Cambodia', 800);
        showToast('Collaborations', 'Open to design, frontend, and Telegram Bot projects!', 1800);
      }, 500);
    }
    loaderProgress.textContent = `${progress}%`;
  }, 25);

  // --- CyberTools Floating macOS-style Window Logic ---
  const cybertoolsOverlay = document.getElementById('cybertools-overlay');
  const cybertoolsIframe = document.getElementById('cybertools-iframe');
  const cybertoolsClose = document.getElementById('cybertools-close-btn');
  const cybertoolsMin = document.getElementById('cybertools-min-btn');
  const cybertoolsMax = document.getElementById('cybertools-max-btn');
  const appWindow = cybertoolsOverlay ? cybertoolsOverlay.querySelector('.glass-app-window') : null;

  function openAppWindow(appUrl, urlBarText = "meytool://portfolio/dashboard") {
    if (!cybertoolsOverlay || !cybertoolsIframe) return;
    
    const urlBar = cybertoolsOverlay.querySelector('.window-url-bar');
    if (urlBar) {
      urlBar.textContent = urlBarText || 'meytool://portfolio/dashboard';
    }
    
    const iframeSrc = cybertoolsIframe.getAttribute('src');
    if (!iframeSrc || iframeSrc === '' || iframeSrc === '#' || !iframeSrc.includes(appUrl)) {
      cybertoolsIframe.setAttribute('src', appUrl);
    }
    
    cybertoolsOverlay.classList.add('open');
    body.style.overflow = 'hidden'; // Lock main page scrolling
  }

  function openCybertoolsWindow(toolId = null) {
    let targetSrc = './cybertools/index.html';
    if (toolId) {
      targetSrc = `${targetSrc}?tool=${toolId}`;
    }
    openAppWindow(targetSrc, 'meytool://portfolio/dashboard');
  }

  function closeCybertoolsWindow() {
    if (!cybertoolsOverlay) return;
    cybertoolsOverlay.classList.remove('open');
    body.style.overflow = ''; // Restore main page scrolling
  }

  if (cybertoolsClose) {
    cybertoolsClose.addEventListener('click', closeCybertoolsWindow);
  }
  if (cybertoolsMin) {
    cybertoolsMin.addEventListener('click', closeCybertoolsWindow);
  }
  if (cybertoolsMax && appWindow) {
    cybertoolsMax.addEventListener('click', () => {
      appWindow.classList.toggle('maximized');
      showToast('Workspace', appWindow.classList.contains('maximized') ? 'Fullscreen Workspace Enabled' : 'Window Workspace Mode');
    });
  }
  if (cybertoolsOverlay) {
    cybertoolsOverlay.addEventListener('click', (e) => {
      if (e.target === cybertoolsOverlay) {
        closeCybertoolsWindow();
      }
    });
  }

  // Intercept any other links pointing to cybertools (e.g. project cards) to open inside the overlay
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (anchor) {
      const href = anchor.getAttribute('href');
      if (href && href.includes('cybertools')) {
        // Skip navLinks and dockItems since they are already handled individually
        const isNav = anchor.closest('.nav-links');
        const isDock = anchor.classList.contains('dock-item');
        if (!isNav && !isDock) {
          e.preventDefault();
          if (confirm("Are you sure you want to visit the site?")) {
            showToast('CyberTools Suite', 'Launching utility tools workspace...', 100);
            setTimeout(() => {
              openCybertoolsWindow();
            }, 450);
          }
        }
      }
    }
  });

  // --- Resume Visual / Terminal View Switcher & Segment Active Pill logic ---
  const btnVisual = document.getElementById('btn-view-visual');
  const btnTerminal = document.getElementById('btn-view-terminal');
  const visualArea = document.getElementById('resume-sheet-area');
  const terminalArea = document.getElementById('resume-terminal-area');
  const copyJsonBtn = document.getElementById('cv-copy-json-btn');
  const segmentActivePill = document.getElementById('segment-active-pill');

  function updateSegmentPillPosition(activeBtn) {
    if (!segmentActivePill || !activeBtn) return;
    const leftOffset = activeBtn.offsetLeft;
    const width = activeBtn.offsetWidth;
    segmentActivePill.style.left = `${leftOffset}px`;
    segmentActivePill.style.width = `${width}px`;
  }

  // Initialize active pill on mount
  if (btnVisual) {
    setTimeout(() => updateSegmentPillPosition(btnVisual), 100);
  }

  window.addEventListener('resize', () => {
    const activeBtn = document.querySelector('.segment-btn.active');
    if (activeBtn) updateSegmentPillPosition(activeBtn);
  });

  function transitionToView(targetArea, otherArea) {
    // Start exit transition on otherArea (fade + blur + slide down)
    otherArea.style.transition = 'opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), filter 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)';
    otherArea.style.opacity = '0';
    otherArea.style.filter = 'blur(10px)';
    otherArea.style.transform = 'translateY(15px)';
    
    setTimeout(() => {
      otherArea.style.display = 'none';
      otherArea.style.opacity = '';
      otherArea.style.filter = '';
      otherArea.style.transform = '';
      
      // Initialize targetArea state (hidden, blurred, shifted down)
      targetArea.style.display = 'block';
      targetArea.style.opacity = '0';
      targetArea.style.filter = 'blur(15px)';
      targetArea.style.transform = 'translateY(20px)';
      
      // Trigger reflow
      targetArea.offsetHeight;
      
      // Apply clean spring entrance
      targetArea.style.transition = 'opacity 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.1), filter 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.1), transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.1)';
      targetArea.style.opacity = '1';
      targetArea.style.filter = 'blur(0px)';
      targetArea.style.transform = 'translateY(0px)';
    }, 220);
  }

  if (btnVisual && btnTerminal && visualArea && terminalArea) {
    btnVisual.addEventListener('click', () => {
      if (btnVisual.classList.contains('active')) return;
      btnVisual.classList.add('active');
      btnTerminal.classList.remove('active');
      updateSegmentPillPosition(btnVisual);
      transitionToView(visualArea, terminalArea);
      showToast('Resume View', 'Switched to Visual Layout.');
    });

    btnTerminal.addEventListener('click', () => {
      if (btnTerminal.classList.contains('active')) return;
      btnTerminal.classList.add('active');
      btnVisual.classList.remove('active');
      updateSegmentPillPosition(btnTerminal);
      transitionToView(terminalArea, visualArea);
      showToast('Resume View', 'Switched to Code JSON.');
    });
  }

  if (copyJsonBtn) {
    copyJsonBtn.addEventListener('click', () => {
      const codeElement = document.getElementById('terminal-code-block');
      if (!codeElement) return;
      
      const textToCopy = codeElement.textContent;
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Success', 'Resume JSON copied to clipboard!');
      }).catch(() => {
        showToast('Error', 'Failed to copy text.');
      });
    });
  }

  // --- Expandable Coursework & Tool Accordion Drawers ---
  const eduTrigger = document.getElementById('edu-card-trigger');
  const expTrigger = document.getElementById('exp-card-trigger');
  const eduDrawer = document.getElementById('edu-cv-drawer');
  const expDrawer = document.getElementById('exp-cv-drawer');

  if (eduTrigger && eduDrawer) {
    eduTrigger.addEventListener('click', (e) => {
      if (e.target.closest('.cv-expanded-drawer')) return;
      
      const isOpen = eduDrawer.classList.contains('open');
      if (isOpen) {
        eduDrawer.classList.remove('open');
        eduTrigger.classList.remove('drawer-open');
      } else {
        eduDrawer.classList.add('open');
        eduTrigger.classList.add('drawer-open');
      }
    });
  }

  if (expTrigger && expDrawer) {
    expTrigger.addEventListener('click', (e) => {
      if (e.target.closest('.cv-expanded-drawer')) return;
      
      const isOpen = expDrawer.classList.contains('open');
      if (isOpen) {
        expDrawer.classList.remove('open');
        expTrigger.classList.remove('drawer-open');
      } else {
        expDrawer.classList.add('open');
        expTrigger.classList.add('drawer-open');
      }
    });
  }

  // --- Interactive Skill Mapped Highlighting (visionOS Style Adaptive Spotlight) ---
  const skillBadges = document.querySelectorAll('.skill-badge[data-skill]');
  const linkedElements = document.querySelectorAll('[data-skill-linked]');

  if (!isTouchDevice) {
    skillBadges.forEach(badge => {
      const skill = badge.getAttribute('data-skill');
      if (!skill) return;

      badge.addEventListener('mouseenter', () => {
        // Capture the HSL/HEX accent color of the hovered badge
        const badgeAccent = getComputedStyle(badge).getPropertyValue('--badge-accent').trim();
        
        linkedElements.forEach(el => {
          const linkedSkills = el.getAttribute('data-skill-linked').split(',');
          if (linkedSkills.includes(skill)) {
            el.classList.add('skill-highlight');
            if (badgeAccent) {
              // Apply matching glow spotlight to related cards
              el.style.setProperty('--accent-color', badgeAccent);
              el.style.setProperty('--accent-glow', `${badgeAccent}26`); /* ~15% opacity */
            }
          }
        });
      });

      badge.addEventListener('mouseleave', () => {
        linkedElements.forEach(el => {
          el.classList.remove('skill-highlight');
          el.style.removeProperty('--accent-color');
          el.style.removeProperty('--accent-glow');
        });
      });
    });
  }

  // --- Auto-Hide Menu & Dock on Scroll ---
  let lastScrollY = window.scrollY;
  const navbar = document.querySelector('.navbar');
  const dockWrapper = document.querySelector('.dock-wrapper');
  let isScrolling = false;

  if (navbar && dockWrapper) {
    window.addEventListener('scroll', () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Hide menu/dock when scrolling down (and scrolled past 100px)
          if (currentScrollY > 100 && currentScrollY > lastScrollY) {
            navbar.classList.add('nav-hidden');
            navbar.classList.remove('nav-visible');
            dockWrapper.classList.add('dock-hidden');
            dockWrapper.classList.remove('dock-visible');
          } else {
            // Show menu/dock when scrolling up
            navbar.classList.remove('nav-hidden');
            navbar.classList.add('nav-visible');
            dockWrapper.classList.remove('dock-hidden');
            dockWrapper.classList.add('dock-visible');
          }

          lastScrollY = currentScrollY;
          isScrolling = false;
        });
        isScrolling = true;
      }
    }, { passive: true });
  }

});
