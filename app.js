/* ==================================================
   BORMEY.DEV — Portfolio App JS
   Mobile-First, Touch-Optimized + Particles + Typing
   ================================================== */

// ── Particle Engine ──────────────────────────────────
(function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [], W, H, animFrame, enabled = true;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function randomColor() {
        const palette = [
            'rgba(99,102,241,VAL)',
            'rgba(139,92,246,VAL)',
            'rgba(236,72,153,VAL)',
            'rgba(16,185,129,VAL)'
        ];
        return palette[Math.floor(Math.random() * palette.length)];
    }

    function createParticle() {
        const a = Math.random() * 0.35 + 0.05;
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 2 + 0.5,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            color: randomColor().replace('VAL', a.toFixed(2))
        };
    }

    const COUNT = Math.min(80, Math.floor(W * H / 18000));
    for (let i = 0; i < COUNT; i++) particles.push(createParticle());

    function draw() {
        if (!enabled) { animFrame = requestAnimationFrame(draw); return; }
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < -5)  p.x = W + 5;
            if (p.x > W+5) p.x = -5;
            if (p.y < -5)  p.y = H + 5;
            if (p.y > H+5) p.y = -5;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        // Draw connecting lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 110) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(99,102,241,${(1 - dist/110) * 0.08})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        animFrame = requestAnimationFrame(draw);
    }
    draw();

    // Expose toggle
    window.toggleParticles = function(on) {
        enabled = on;
        canvas.style.display = on ? '' : 'none';
    };
})();

// ── Typing Animation ─────────────────────────────────
(function initTyping() {
    const el = document.getElementById('typed-role');
    if (!el) return;
    const roles = [
        'AI Prompt Engineer',
        'Web Developer',
        'Graphic Designer',
        'Photographer',
        'Content Creator'
    ];
    let ri = 0, ci = 0, deleting = false;

    function tick() {
        const word = roles[ri];
        if (!deleting) {
            el.textContent = word.slice(0, ++ci);
            if (ci === word.length) {
                deleting = true;
                setTimeout(tick, 1800);
                return;
            }
        } else {
            el.textContent = word.slice(0, --ci);
            if (ci === 0) {
                deleting = false;
                ri = (ri + 1) % roles.length;
            }
        }
        setTimeout(tick, deleting ? 45 : 80);
    }
    setTimeout(tick, 800);
})();

document.addEventListener('DOMContentLoaded', () => {

    // ─── State ────────────────────────────────────
    let currentTheme = 'light-glass';
    let currentLanguage = 'en';
    let activeModal = null;   // currently open modal ID
    let isMobile = window.innerWidth <= 600;

    // ─── Translation Dictionary ───────────────────
    const translations = {
        en: {
            profileTitle: "Profile",
            workspaceTitle: "Workspace",
            badgeStatus: "Open to Work",
            projectsLbl: "Projects",
            usersLbl: "Bot Users",
            commitsLbl: "Commits",
            menuPhotos: "My Projects",
            menuCredits: "Service Packages",
            menuStats: "Commit Analytics",
            menuSocial: "Social Profiles",
            grid3Title: "Job Calendar",
            grid3Sub: "Inspect my weekly freelance availability.",
            grid4Title: "Tech Stack",
            grid4Sub: "My preferred languages & tools.",
            projectTitle: "My Projects",
            projectSub: "Websites & Telegram bots I built.",
            pDesc1: "Web tools suite portal",
            pDesc2: "Cultural calendar designer",
            pDesc3: "Video platforms downloader",
            modalTitlePackages: "Project Services & Scopes",
            pkgScopes: ["Landing Page & UI", "Full Web / Telegram Bot", "Custom AI Automation", "Business Site & Branding", "Web App + Bot Suite", "Custom Enterprise System"],
            modalTitleStats: "Commit Analytics",
            modalTitleSocial: "Social Profiles",
            chartHeader: "Monthly Git Commits",
            pkgTitle1: "Starter Project",
            pkgVal1: "Single-Page Scope",
            pkgTitle2: "Growth Project",
            pkgVal2: "Web App & Bot Suite",
            pkgTitle3: "Pro AI Suite",
            pkgVal3: "AI Model & Automation",
            pkgTitle4: "Corporate Web",
            pkgVal4: "Corporate Brand Platform",
            pkgTitle5: "Full Platform",
            pkgVal5: "Full Business Architecture",
            pkgTitle6: "Enterprise Suite",
            pkgVal6: "Tailored Enterprise Solution",
            pkgPopular: "RECOMMENDED",
            btnQuote: "Start Project",
            optionGlow: "Glow Effect",
            legendLess: "Less",
            legendMore: "More",
            totalCommitsLbl: "Total Commits",
            activeStreakLbl: "Day Streak",
            successRateLbl: "Push Success",
            mobStyle: "Workspace",
            mobProfile: "Profile",
            mobProjects: "Projects",
            mobPackages: "Packages",
            mobMore: "More",
            dayNamesShort: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            dayVals: [
                "System Architecture (Busy)",
                "Telegram Bot Revamps (Open)",
                "Contract Development (Busy)",
                "Research & Study (Open)",
                "API Integrations (Open)"
            ],
            tip1: "Bormey specializes in Telegram bots & web platform scripts.",
            tip2: "Tap My Projects to see all live work & projects.",
            successQuote: "Request received! Contact me on Telegram @ShennCelest for faster scoping."
        },
        kh: {
            profileTitle: "ប្រវត្តិរូប",
            workspaceTitle: "កន្លែងការងារ",
            badgeStatus: "ទទួលគម្រោងថ្មីៗ",
            projectsLbl: "គម្រោងសរុប",
            usersLbl: "អ្នកប្រើប្រាស់ប៊ត",
            commitsLbl: "ការចូលរួម (Git)",
            menuPhotos: "គម្រោងរបស់ខ្ញុំ",
            menuCredits: "កញ្ចប់សេវាកម្ម",
            menuStats: "ស្ថិតិការចូលរួម",
            menuSocial: "បណ្តាញសង្គម",
            grid3Title: "កាលវិភាគការងារ",
            grid3Sub: "ភាពទំនេរសម្រាប់ការងារក្រៅម៉ោងរបស់ខ្ញុំ។",
            grid4Title: "បច្ចេកវិទ្យា",
            grid4Sub: "ភាសាកូដ និងឧបករណ៍ដែលខ្ញុំចូលចិត្ត។",
            projectTitle: "គម្រោងរបស់ខ្ញុំ",
            projectSub: "គេហទំព័រ និងតេឡេក្រាមប៊តដែលខ្ញុំបានបង្កើត។",
            pDesc1: "ផតថលឧបករណ៍បណ្តាញ",
            pDesc2: "រចនាកាលវិភាគប្រពៃណីខ្មែរ",
            pDesc3: "ទាញយកវីដេអូបណ្តាញសង្គម",
            modalTitlePackages: "សេវាកម្ម និងទំហំគម្រោង",
            pkgScopes: ["រចនាទំព័រដើម & UI", "គេហទំព័រ & តេឡេក្រាមប៊ត", "ប្រព័ន្ធ AI ពិសេស", "គេហទំព័រអាជីវកម្ម & ម៉ាកយីហោ", "ប្រព័ន្ធគេហទំព័រ & ប៊ត", "ប្រព័ន្ធសហគ្រាសពិសេស"],
            modalTitleStats: "ស្ថិតិការចូលរួម",
            modalTitleSocial: "បណ្តាញសង្គម",
            chartHeader: "ការបញ្ជូនកូដប្រចាំខែ",
            pkgTitle1: "គម្រោងចាប់ផ្តើម",
            pkgVal1: "ទំហំទំព័រទោល",
            pkgTitle2: "គម្រោងលូតលាស់",
            pkgVal2: "ប្រព័ន្ធគេហទំព័រ & ប៊ត",
            pkgTitle3: "កញ្ចប់ AI អាជីព",
            pkgVal3: "ម៉ូឌែល AI & អូតូម៉ាតកម្ម",
            pkgTitle4: "គេហទំព័រក្រុមហ៊ុន",
            pkgVal4: "ប្រព័ន្ធម៉ាកយីហោអាជីវកម្ម",
            pkgTitle5: "ប្រព័ន្ធពេញលេញ",
            pkgVal5: "រចនាសម្ព័ន្ធអាជីវកម្មពេញលេញ",
            pkgTitle6: "កញ្ចប់សហគ្រាស",
            pkgVal6: "ដំណោះស្រាយសហគ្រាសពិសេស",
            pkgPopular: "ណែនាំខ្លាំង",
            btnQuote: "ចាប់ផ្តើមគម្រោង",
            optionGlow: "ពន្លឺជុំវិញ",
            legendLess: "តិច",
            legendMore: "ច្រើន",
            totalCommitsLbl: "ការបញ្ជូនកូដសរុប",
            activeStreakLbl: "ថ្ងៃជាប់គ្នា",
            successRateLbl: "ជោគជ័យ",
            mobStyle: "កន្លែងការងារ",
            mobProfile: "ប្រវត្តិ",
            mobProjects: "គម្រោង",
            mobPackages: "កញ្ចប់សេវា",
            mobMore: "បន្ថែម",
            dayNamesShort: ["ចន្ទ", "អង្គារ", "ពុធ", "ព្រហ", "សុក្រ"],
            dayVals: [
                "រចនាសម្ព័ន្ធប្រព័ន្ធ (រវល់)",
                "កែសម្រួលតេឡេក្រាមប៊ត (ទំនេរ)",
                "អភិវឌ្ឍន៍កិច្ចសន្យា (រវល់)",
                "ស្រាវជ្រាវ និងសិក្សា (ទំនេរ)",
                "បញ្ចូលប្រព័ន្ធ API (ទំនេរ)"
            ],
            tip1: "💡 បរមី ជំនាញខាងបង្កើតតេឡេក្រាមប៊ត និងស្គ្រីបគេហទំព័រ។",
            tip2: "💡 ចុចលើ 'គម្រោងរបស់ខ្ញុំ' ដើម្បីមើលគម្រោងទាំងអស់។",
            successQuote: "📨 បានទទួលសំណើ! ទំនាក់ទំនងតាម Telegram @ShennCelest ។"
        }
    };

    // ─── DOM References ────────────────────────────
    const colSidebar    = document.getElementById('col-sidebar');
    const colWorkspace  = document.getElementById('col-workspace');
    const backdrop      = document.getElementById('modal-backdrop');
    const modals        = document.querySelectorAll('.phone-modal');
    const langBtns      = document.querySelectorAll('.lang-btn');
    const themeBtns     = document.querySelectorAll('.theme-btn');
    const mobNavStyle   = document.getElementById('mob-nav-style');
    const mobNavProfile = document.getElementById('mob-nav-profile');
    const mobNavProjects = document.getElementById('mob-nav-projects');
    const mobNavPackages = document.getElementById('mob-nav-packages');
    const mobNavMore    = document.getElementById('mob-nav-more');
    const moreSheet     = document.getElementById('mobile-more-sheet');
    const allNavItems   = document.querySelectorAll('.mobile-bottom-nav .nav-item');

    // ─── Utility: detect mobile ────────────────────
    function checkMobile() { isMobile = window.innerWidth <= 600; }
    window.addEventListener('resize', checkMobile);

    // ─── Desktop Nav Items ─────────────────────────
    const deskNavWorkspace = document.getElementById('desk-nav-workspace');
    const deskNavProfile   = document.getElementById('desk-nav-profile');
    const deskNavProjects  = document.getElementById('desk-nav-projects');
    const deskNavPackages  = document.getElementById('desk-nav-packages');
    const deskNavMore      = document.getElementById('desk-nav-more');
    const allDeskNavBtns   = document.querySelectorAll('.desktop-nav .desk-nav-btn');

    // ─── Utility: detect mobile ────────────────────
    function checkMobile() { isMobile = window.innerWidth <= 600; }
    window.addEventListener('resize', checkMobile);

    // ─── Clear all nav active states ───────────────
    function clearNavActive() {
        allNavItems.forEach(btn => btn.classList.remove('active-tab'));
        allDeskNavBtns.forEach(btn => btn.classList.remove('active-tab'));
        if (moreSheet) moreSheet.classList.remove('visible');
    }

    // ─── Update Active Tab across Desktop & Mobile ──
    function setActiveTab(tabName) {
        clearNavActive();
        if (tabName === 'workspace') {
            if (mobNavStyle) mobNavStyle.classList.add('active-tab');
            if (deskNavWorkspace) deskNavWorkspace.classList.add('active-tab');
        } else if (tabName === 'profile') {
            if (mobNavProfile) mobNavProfile.classList.add('active-tab');
            if (deskNavProfile) deskNavProfile.classList.add('active-tab');
        } else if (tabName === 'projects') {
            if (mobNavProjects) mobNavProjects.classList.add('active-tab');
            if (deskNavProjects) deskNavProjects.classList.add('active-tab');
        } else if (tabName === 'packages') {
            if (mobNavPackages) mobNavPackages.classList.add('active-tab');
            if (deskNavPackages) deskNavPackages.classList.add('active-tab');
        } else if (tabName === 'more') {
            if (mobNavMore) mobNavMore.classList.add('active-tab');
            if (deskNavMore) deskNavMore.classList.add('active-tab');
        }
    }

    // ─── Quick Click Navigation Event Binder ───────
    function bindNavClick(el, callback) {
        if (!el) return;
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            callback(e);
        });
    }

    // ─── Desktop Nav Listeners ─────────────────────
    bindNavClick(deskNavWorkspace, () => {
        closeAllModals();
        if (isMobile) showMobileColumn('style');
        else {
            setActiveTab('workspace');
            colWorkspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
    bindNavClick(deskNavProfile, () => {
        closeAllModals();
        if (isMobile) showMobileColumn('profile');
        else {
            setActiveTab('profile');
            colSidebar.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
    bindNavClick(deskNavProjects, () => openModal('modal-photos'));
    bindNavClick(deskNavPackages, () => openModal('modal-credits'));
    bindNavClick(deskNavMore,     () => openModal('modal-more'));

    // ─── Mobile Column Toggle ──────────────────────
    function showMobileColumn(id) {
        colSidebar.classList.remove('active-col');
        colWorkspace.classList.remove('active-col');
        clearNavActive();

        if (id === 'style') {
            colWorkspace.classList.add('active-col');
            setActiveTab('workspace');
        } else {
            colSidebar.classList.add('active-col');
            setActiveTab('profile');
        }
        closeAllModals(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    bindNavClick(mobNavStyle,   () => showMobileColumn('style'));
    bindNavClick(mobNavProfile, () => showMobileColumn('profile'));

    // ─── Mobile Nav Listeners (Instant 1-Click Open) ─
    bindNavClick(mobNavProjects, () => openModal('modal-photos'));
    bindNavClick(mobNavPackages, () => openModal('modal-credits'));
    bindNavClick(mobNavMore,     () => openModal('modal-more'));

    // More modal options
    const moreItemSocial = document.getElementById('more-item-social');
    const moreItemAnalytics = document.getElementById('more-item-analytics');
    const moreItemPreviewer = document.getElementById('more-item-previewer');
    const btnMoreAnalyticsModal = document.getElementById('btn-more-analytics-modal');

    bindNavClick(moreItemSocial, () => openModal('modal-settings'));
    bindNavClick(moreItemAnalytics, () => openModal('modal-stats'));
    bindNavClick(btnMoreAnalyticsModal, () => openModal('modal-stats'));

    // ─── Live Web App Previewer Controller ─────────
    const previewerTitle = document.getElementById('previewer-title');
    const previewerUrlText = document.getElementById('previewer-url-text');
    const previewerIframe = document.getElementById('previewer-iframe');
    const btnOpenExt = document.getElementById('btn-open-ext');
    const previewerFrameWrap = document.getElementById('previewer-frame-wrap');
    const btnModeDesktop = document.getElementById('btn-mode-desktop');
    const btnModeMobile = document.getElementById('btn-mode-mobile');

    function openLivePreview(url, title = 'Live Website Preview') {
        if (previewerTitle) previewerTitle.textContent = title;
        if (previewerUrlText) previewerUrlText.textContent = url;
        if (btnOpenExt) btnOpenExt.href = url;
        if (previewerIframe) previewerIframe.src = url;

        // Reset to desktop view
        if (previewerFrameWrap) previewerFrameWrap.classList.remove('mobile-mode');
        if (btnModeDesktop) btnModeDesktop.classList.add('active');
        if (btnModeMobile) btnModeMobile.classList.remove('active');

        openModal('modal-previewer');
    }

    if (btnModeDesktop) {
        btnModeDesktop.addEventListener('click', () => {
            btnModeDesktop.classList.add('active');
            if (btnModeMobile) btnModeMobile.classList.remove('active');
            if (previewerFrameWrap) previewerFrameWrap.classList.remove('mobile-mode');
        });
    }

    if (btnModeMobile) {
        btnModeMobile.addEventListener('click', () => {
            btnModeMobile.classList.add('active');
            if (btnModeDesktop) btnModeDesktop.classList.remove('active');
            if (previewerFrameWrap) previewerFrameWrap.classList.add('mobile-mode');
        });
    }

    bindNavClick(moreItemPreviewer, () => {
        openLivePreview('https://meyyynash.github.io/OFFICE-WIN/', 'Office-Win Hub');
    });

    // Wire live website cards to open in-site previewer
    document.querySelectorAll('.project-showcase-item[data-status="live"]').forEach(item => {
        const title = item.querySelector('.project-item-title')?.textContent || 'Live Preview';
        const linkBtn = item.querySelector('.project-link-btn');
        if (linkBtn) {
            const url = linkBtn.getAttribute('href');
            if (url && url.startsWith('http') && !url.includes('t.me') && !url.includes('github.com/bormey')) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    openLivePreview(url, title);
                });
            }
        }
    });

    // ─── Modal Open / Close (With Body Scroll Lock & 1-Click Toggle) ──
    function openModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;

        // Tapping open modal closes it (1-click toggle)
        if (activeModal === id) {
            closeAllModals(true);
            return;
        }

        // Close existing active modals without resetting tab
        modals.forEach(m => {
            m.classList.remove('active');
            m.style.transform = '';
        });

        modal.classList.add('active');
        backdrop.classList.add('active');
        activeModal = id;

        // Auto-sync active tab indicator
        if (id === 'modal-photos') setActiveTab('projects');
        else if (id === 'modal-credits') setActiveTab('packages');
        else if (id === 'modal-more' || id === 'modal-settings' || id === 'modal-stats') setActiveTab('more');

        // Prevent body scroll on mobile and desktop
        document.body.classList.add('modal-open');
    }

    function closeAllModals(resetTab = true) {
        modals.forEach(m => {
            m.classList.remove('active');
            m.style.transform = '';
        });
        backdrop.classList.remove('active');
        activeModal = null;
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';

        if (resetTab && isMobile) {
            if (colSidebar.classList.contains('active-col')) {
                setActiveTab('profile');
            } else {
                setActiveTab('workspace');
            }
        }
    }

    backdrop.addEventListener('click', () => closeAllModals());

    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            closeAllModals();
        });
    });

    window.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeAllModals();
    });

    // ─── Swipe-to-dismiss for bottom sheets ───────
    function addSwipeDismiss(modal) {
        let startY = 0, currentY = 0, dragging = false;
        const content = modal.querySelector('.modal-content');

        modal.addEventListener('touchstart', e => {
            // Only initiate swipe-dismiss if content is at top (scrollTop === 0)
            if (content && content.scrollTop > 0) return;
            startY = e.touches[0].clientY;
            currentY = startY;
            dragging = true;
        }, { passive: true });

        modal.addEventListener('touchmove', e => {
            if (!dragging) return;
            if (content && content.scrollTop > 0) {
                dragging = false;
                modal.style.transform = '';
                return;
            }
            currentY = e.touches[0].clientY;
            const delta = currentY - startY;
            if (delta > 0 && isMobile) {
                modal.style.transition = 'none';
                modal.style.transform = `translateY(${delta}px)`;
            }
        }, { passive: true });

        modal.addEventListener('touchend', () => {
            if (!dragging) return;
            dragging = false;
            modal.style.transition = '';
            const delta = currentY - startY;
            if (delta > 90 && isMobile) {
                closeAllModals();
                modal.style.transform = '';
            } else {
                modal.style.transform = '';
            }
        });
    }

    modals.forEach(addSwipeDismiss);

    // ─── Sidebar Menu Bindings ─────────────────────
    const btnMenuPhotos = document.getElementById('menu-photos');
    const btnMenuCredits = document.getElementById('menu-credits');
    const btnMenuStats = document.getElementById('menu-stats');
    const btnMenuSettings = document.getElementById('menu-settings');

    if (btnMenuPhotos) {
        btnMenuPhotos.addEventListener('click', () => {
            setActiveTab('projects');
            openModal('modal-photos');
        });
    }
    if (btnMenuCredits) {
        btnMenuCredits.addEventListener('click', () => {
            setActiveTab('packages');
            openModal('modal-credits');
        });
    }
    if (btnMenuStats) {
        btnMenuStats.addEventListener('click', () => {
            setActiveTab('more');
            openModal('modal-stats');
        });
    }
    if (btnMenuSettings) {
        btnMenuSettings.addEventListener('click', () => {
            setActiveTab('more');
            openModal('modal-settings');
        });
    }

    // ─── Package Tab Switcher (Personal / Company) ──
    document.querySelectorAll('.pkg-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            // Update active tab
            document.querySelectorAll('.pkg-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Show correct panel
            document.querySelectorAll('.pkg-panel').forEach(p => p.classList.add('hidden'));
            const panel = document.getElementById(`panel-${target}`);
            if (panel) panel.classList.remove('hidden');
        });
    });

    // ─── Hero Intro Actions ─────────────────────────
    const btnHeroProjects = document.getElementById('btn-hero-projects');
    if (btnHeroProjects) {
        btnHeroProjects.addEventListener('click', () => openModal('modal-photos'));
    }
    const btnHeroContact = document.getElementById('btn-hero-contact');
    if (btnHeroContact) {
        btnHeroContact.addEventListener('click', () => openModal('modal-quote'));
    }

    // ─── Projects — Under Development / Code Private ─
    const wipProjects = [
        { id: 'portfolio-wip-link', name: 'Portfolio Website' },
        { id: 'sms-wip-link', name: 'Student Management System' },
        { id: 'photo-wip-link', name: 'Photography Portfolio' },
        { id: 'design-wip-link', name: 'Graphic Design Collection' },
        { id: 'photoedit-wip-link', name: 'Photo Editing Showcase' },
        { id: 'video-wip-link', name: 'Video Editing Projects' },
        { id: 'uiux-wip-link', name: 'UI/UX Design Concepts' }
    ];

    wipProjects.forEach(proj => {
        const link = document.getElementById(proj.id);
        if (link) {
            link.addEventListener('click', e => {
                e.preventDefault();
                showToast(`${proj.name} is currently in development (Code Private).`);
            });
        }
    });

    // ─── Quote Form Logic ──────────────────────────
    const quoteModal     = document.getElementById('modal-quote');
    const quoteFormWrap  = document.getElementById('quote-form-wrap');
    const quoteSuccess   = document.getElementById('quote-success');
    const quotePkgName   = document.getElementById('quote-pkg-name');
    const quotePkgPrice  = document.getElementById('quote-pkg-price');
    const quoteForm      = document.getElementById('quote-form');
    const qName          = document.getElementById('q-name');
    const qEmail         = document.getElementById('q-email');
    const qDesc          = document.getElementById('q-desc');
    const charCount      = document.getElementById('char-count');
    const MAX_DESC       = 500;

    // Character counter on textarea
    if (qDesc) {
        qDesc.addEventListener('input', () => {
            const len = qDesc.value.length;
            charCount.textContent = `${len} / ${MAX_DESC}`;
            charCount.classList.toggle('near-limit', len >= MAX_DESC * 0.8 && len < MAX_DESC);
            charCount.classList.toggle('at-limit', len >= MAX_DESC);
            if (len > MAX_DESC) qDesc.value = qDesc.value.slice(0, MAX_DESC);
        });
    }

    // Open quote modal pre-filled with a package
    function openQuoteModal(pkgName, pkgPrice) {
        // Reset form to fresh state
        if (quoteForm) quoteForm.reset();
        if (charCount) charCount.textContent = '0 / 500';
        ['q-name','q-email','q-desc'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('error');
        });
        ['err-name','err-email','err-desc'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '';
        });
        // Inject selected package details
        if (quotePkgName)  quotePkgName.textContent  = pkgName;
        if (quotePkgPrice) quotePkgPrice.textContent = pkgPrice;
        // Show form, hide success
        if (quoteFormWrap) quoteFormWrap.style.display = '';
        if (quoteSuccess)  quoteSuccess.classList.add('hidden');
        openModal('modal-quote');
    }

    // Get Quote buttons → open quote form
    document.querySelectorAll('.buy-pkg-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const pkg   = btn.getAttribute('data-pkg')   || 'Package';
            const price = btn.getAttribute('data-price')  || '';
            openQuoteModal(pkg, price);
        });
    });

    // "← Packages" back button inside quote modal → return to Service Packages
    const btnBackQuote = document.getElementById('btn-back-quote');
    if (btnBackQuote) {
        btnBackQuote.addEventListener('click', () => {
            closeAllModals();
            setTimeout(() => openModal('modal-credits'), 60);
        });
    }

    // "Change" button → same as back
    const btnChangePkg = document.getElementById('btn-change-pkg');
    if (btnChangePkg) {
        btnChangePkg.addEventListener('click', () => {
            closeAllModals();
            setTimeout(() => openModal('modal-credits'), 60);
        });
    }

    // Form validation helpers
    function setFieldError(inputId, errId, msg) {
        const input = document.getElementById(inputId);
        const err   = document.getElementById(errId);
        if (input) input.classList.toggle('error', !!msg);
        if (err)   err.textContent = msg;
        return !!msg;
    }
    function validateQuoteForm() {
        let hasError = false;
        const nameVal  = qName  ? qName.value.trim()  : '';
        const emailVal = qEmail ? qEmail.value.trim()  : '';
        const descVal  = qDesc  ? qDesc.value.trim()   : '';
        const emailRx  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameVal)             hasError = setFieldError('q-name',  'err-name',  'Please enter your full name.')        || hasError;
        else                                 setFieldError('q-name',  'err-name',  '');
        if (!emailVal)            hasError = setFieldError('q-email', 'err-email', 'Please enter your email address.')     || hasError;
        else if (!emailRx.test(emailVal)) hasError = setFieldError('q-email','err-email','Enter a valid email address.')  || hasError;
        else                                 setFieldError('q-email', 'err-email', '');
        if (!descVal)             hasError = setFieldError('q-desc',  'err-desc',  'Please describe your project.')       || hasError;
        else                                 setFieldError('q-desc',  'err-desc',  '');

        return !hasError;
    }

    // Clear error on input
    ['q-name','q-email','q-desc'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const errId = 'err-' + id.replace('q-', '');
        el.addEventListener('input', () => setFieldError(id, errId, ''));
    });

    // Form submit
    if (quoteForm) {
        quoteForm.addEventListener('submit', e => {
            e.preventDefault();
            if (!validateQuoteForm()) return;

            const btn = document.getElementById('btn-submit-quote');
            if (btn) { btn.disabled = true; btn.querySelector('span').textContent = 'Sending…'; }

            // Simulate send (replace with real API call if needed)
            setTimeout(() => {
                if (quoteFormWrap) quoteFormWrap.style.display = 'none';
                if (quoteSuccess)  quoteSuccess.classList.remove('hidden');
                if (btn) { btn.disabled = false; btn.querySelector('span').textContent = 'Send Quote Request'; }
            }, 900);
        });
    }

    // "Done" button inside success state closes modal
    const successCloseBtn = document.getElementById('success-close-btn');
    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', () => closeAllModals());
    }

    // ─── Simple Toast Notification ─────────────────
    function showToast(msg) {
        const existing = document.getElementById('app-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'app-toast';
        toast.textContent = msg;
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: isMobile ? 'calc(90px + env(safe-area-inset-bottom, 0px))' : '24px',
            left: '50%',
            transform: 'translateX(-50%) translateY(20px)',
            background: 'var(--text-primary)',
            color: 'var(--stat-card-bg)',
            padding: '13px 20px',
            borderRadius: '14px',
            fontSize: '13px',
            fontWeight: '700',
            zIndex: '200',
            maxWidth: 'min(360px, 90vw)',
            width: 'max-content',
            textAlign: 'center',
            lineHeight: '1.5',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            opacity: '0',
            fontFamily: "'Kantumruy Pro', 'Sora', sans-serif"
        });
        document.body.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateX(-50%) translateY(0)';
            });
        });

        // Animate out
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(12px)';
            setTimeout(() => toast.remove(), 350);
        }, 3200);
    }

    // ─── Bulb Tip Button ───────────────────────────
    document.getElementById('bulb-btn').addEventListener('click', () => {
        const dict = translations[currentLanguage];
        const tips = [dict.tip1, dict.tip2].filter(Boolean);
        if (tips.length) showToast(tips[Math.floor(Math.random() * tips.length)]);
    });

    // ─── Glow Toggle ──────────────────────────────
    const glowToggle = document.getElementById('settings-glow');
    const glowToggleMore = document.getElementById('settings-glow-more');
    function setGlow(on) {
        const glow = document.querySelector('.avatar-glow');
        if (glow) glow.style.display = on ? '' : 'none';
        if (glowToggle) glowToggle.checked = on;
        if (glowToggleMore) glowToggleMore.checked = on;
    }
    if (glowToggle) glowToggle.addEventListener('change', e => setGlow(e.target.checked));
    if (glowToggleMore) glowToggleMore.addEventListener('change', e => setGlow(e.target.checked));

    // ─── Particles Toggle ─────────────────────────
    const particlesToggle = document.getElementById('settings-particles');
    const particlesToggleMore = document.getElementById('settings-particles-more');
    function setParticles(on) {
        if (window.toggleParticles) window.toggleParticles(on);
        if (particlesToggle) particlesToggle.checked = on;
        if (particlesToggleMore) particlesToggleMore.checked = on;
    }
    if (particlesToggle) particlesToggle.addEventListener('change', e => setParticles(e.target.checked));
    if (particlesToggleMore) particlesToggleMore.addEventListener('change', e => setParticles(e.target.checked));

    // ─── Theme Switcher ────────────────────────────
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            if (theme === currentTheme) return;
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.body.className = `theme-${theme}`;
            currentTheme = theme;
        });
    });

    // ─── Language Switcher ─────────────────────────
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.getAttribute('data-lang'));
        });
    });

    function setLanguage(lang) {
        currentLanguage = lang;
        const d = translations[lang];

        // Active state on buttons
        langBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === lang));

        // Page title
        document.title = lang === 'en'
            ? "Penhpich Bormey – Developer Portfolio"
            : "ប៉ែនពិជ បរមី – ប្រវត្តិរូបអ្នកអភិវឌ្ឍន៍";

        // Profile card
        setText('txt-profile-title', d.profileTitle);
        setText('txt-badge-status', d.badgeStatus);
        setText('lbl-projects', d.projectsLbl);
        setText('lbl-users', d.usersLbl);
        setText('lbl-commits', d.commitsLbl);

        // Menu
        setText('menu-txt-photos', d.menuPhotos);
        setText('menu-txt-credits', d.menuCredits);
        setText('menu-txt-stats', d.menuStats);
        setText('menu-txt-settings', d.menuSocial);

        // Mobile nav labels
        setText('mob-txt-style', d.mobStyle);
        setText('mob-txt-profile', d.mobProfile);
        setText('mob-txt-projects', d.mobProjects);
        setText('mob-txt-packages', d.mobPackages);
        setText('mob-txt-more', d.mobMore);

        // Workspace
        setText('modal-title-projects', d.projectTitle);
        setText('grid-txt-2-sub', d.projectSub);
        setText('p-desc-1', d.pDesc1);
        setText('p-desc-2', d.pDesc2);
        setText('p-desc-3', d.pDesc3);
        setText('grid-txt-4-title', d.grid4Title);
        setText('grid-txt-4-sub', d.grid4Sub);
        setText('grid-txt-3-title', d.grid3Title);
        setText('grid-txt-3-sub', d.grid3Sub);

        // Calendar days
        document.querySelectorAll('.planner-day').forEach((day, i) => {
            const name = day.querySelector('.day-name');
            const val  = day.querySelector('.day-outfit');
            if (name && d.dayNamesShort[i]) name.textContent = d.dayNamesShort[i];
            if (val && d.dayVals[i])  val.textContent  = d.dayVals[i];
        });

        // Modals
        setText('modal-title-packages', d.modalTitlePackages);
        setText('modal-title-stats', d.modalTitleStats);
        setText('modal-title-social', d.modalTitleSocial);
        setText('modal-title-more', d.modalTitleMore || (lang === 'en' ? 'More Options' : 'ជម្រើសបន្ថែម'));
        setText('more-lbl-social', d.menuSocial);
        setText('more-lbl-analytics', d.menuStats);

        // Scopes
        if (d.pkgScopes) {
            d.pkgScopes.forEach((scope, i) => {
                setText(`pkg-scope-${i + 1}`, scope);
            });
        }

        // Package details
        document.querySelectorAll('.pkg-popular').forEach(el => el.textContent = d.pkgPopular);
        
        // Translate all 6 package card titles and values safely
        for (let i = 1; i <= 6; i++) {
            const t = document.querySelector(`.pkg-card-title-${i}`);
            if (t) t.textContent = d[`pkgTitle${i}`];
            setText(`pkg-card-val-${i}`, d[`pkgVal${i}`]);
        }
        
        document.querySelectorAll('.buy-pkg-btn').forEach(b => b.textContent = d.btnQuote);

        // Heatmap labels
        setText('txt-chart-header', d.chartHeader);
        setText('txt-legend-less', d.legendLess);
        setText('txt-legend-more', d.legendMore);
        setText('lbl-total-commits', d.totalCommitsLbl);
        setText('lbl-active-streak', d.activeStreakLbl);
        setText('lbl-success-rate', d.successRateLbl);

        // Social & Options
        setText('txt-option-glow', d.optionGlow);
        setText('txt-option-glow-more', d.optionGlow);
        setText('lbl-q-contact', lang === 'en' ? 'Telegram / Contact Handle (optional)' : 'តេឡេក្រាម / ទំនាក់ទំនង (ជម្រើសបន្ថែម)');
    }

    function setText(id, val) {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    }

    // ─── GitHub-style Heatmap Generation ──────────
    function generateHeatmapCells(count) {
        const cells = [];
        for (let i = 0; i < count; i++) {
            const cell = document.createElement('div');
            cell.classList.add('heatmap-cell');
            const r = Math.random();
            const level = r > 0.88 ? 4 : r > 0.75 ? 3 : r > 0.55 ? 2 : r > 0.35 ? 1 : 0;
            cell.classList.add(`level-${level}`);
            const commits = level === 0 ? 0 : Math.floor(Math.random() * level * 3) + 1;
            cell.title = `${commits} commit${commits !== 1 ? 's' : ''}`;
            cells.push(cell);
        }
        return cells;
    }

    function populateHeatmap() {
        // Full heatmap in analytics modal (154 cells)
        const fullGrid = document.getElementById('full-heatmap-cells');
        if (fullGrid) {
            fullGrid.innerHTML = '';
            generateHeatmapCells(154).forEach(c => fullGrid.appendChild(c));
        }
        // Mini heatmap preview in workspace card (70 cells = 10 weeks × 7 days)
        const miniGrid = document.querySelector('.mini-heatmap-cells');
        if (miniGrid) {
            miniGrid.innerHTML = '';
            generateHeatmapCells(70).forEach(c => miniGrid.appendChild(c));
        }
    }

    // ─── Project Filter Tabs ───────────────────────
    document.querySelectorAll('.proj-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.proj-filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            document.querySelectorAll('.project-showcase-item').forEach(item => {
                const status = item.getAttribute('data-status');
                const show = filter === 'all' || status === filter;
                item.classList.toggle('hidden', !show);
            });
        });
    });

    // ─── Skill Bar Animations ──────────────────────
    function animateSkillBars() {
        document.querySelectorAll('.skill-bar-fill').forEach(bar => {
            bar.classList.add('animate');
        });
    }
    // Use IntersectionObserver for smooth entry
    const skillSection = document.querySelector('.skill-bars-section');
    if (skillSection && 'IntersectionObserver' in window) {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { animateSkillBars(); obs.disconnect(); }
            });
        }, { threshold: 0.3 });
        obs.observe(skillSection);
    } else {
        setTimeout(animateSkillBars, 500);
    }

    // ─── Counter Animation ────────────────────────
    function animateCounter(el, target, duration = 1200) {
        let start = 0;
        const step = timestamp => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(ease * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        };
        requestAnimationFrame(step);
    }
    const counters = document.querySelectorAll('.about-stat-num.counter');
    if (counters.length && 'IntersectionObserver' in window) {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(c => animateCounter(c, parseInt(c.getAttribute('data-target'))));
                    obs.disconnect();
                }
            });
        }, { threshold: 0.5 });
        obs.observe(counters[0].closest('.about-stats-grid') || counters[0]);
    }

    // ─── Code Editor Sidebar Files Switcher ────────
    const codeFiles = document.querySelectorAll('.code-editor-sidebar .sidebar-file');
    const codeTitle = document.querySelector('.code-editor-title');
    const codeContainer = document.querySelector('.code-editor-content pre code');

    const codeSnippets = {
        'prompt_eng.py': `<span class="code-comment"># AI Prompt Engineer &amp; Creative Dev</span>
<span class="code-keyword">import</span> openai, anthropic, gemini

<span class="code-keyword">class</span> <span class="code-class">BormeyPromptEngine</span>:
    <span class="code-keyword">def</span> <span class="code-func">__init__</span>(<span class="code-params">self</span>):
        <span class="code-params">self</span>.system_prompt = <span class="code-string">"You are an expert AI Assistant"</span>
        <span class="code-params">self</span>.temperature = <span class="code-number">0.7</span>

    <span class="code-keyword">def</span> <span class="code-func">optimize</span>(<span class="code-params">self</span>, task):
        <span class="code-keyword">return</span> <span class="code-string">f"Hyper-optimizing prompt for: {task}"</span>`,

        'web_dev.js': `<span class="code-comment">// High-performance glassmorphic UI engine</span>
<span class="code-keyword">const</span> <span class="code-class">Portfolio</span> = {
    developer: <span class="code-string">"PENHPICH BORMEY"</span>,
    skills: [<span class="code-string">"JavaScript"</span>, <span class="code-string">"CSS3"</span>, <span class="code-string">"Node.js"</span>],
    <span class="code-func">init</span>() {
        console.log(<span class="code-string">"Portfolio loaded with smooth transitions!"</span>);
    }
};
Portfolio.init();`,

        'creative.css': `<span class="code-comment">/* Modern Glassmorphic Design Token System */</span>
<span class="code-class">.theme-cyberpunk</span> {
    <span class="code-keyword">--accent</span>: <span class="code-string">#ff00ff</span>;
    <span class="code-keyword">--neon-cyan</span>: <span class="code-string">#00ffff</span>;
    <span class="code-keyword">--card-border</span>: <span class="code-number">2px</span> solid <span class="code-string">#ff00ff</span>;
    <span class="code-keyword">box-shadow</span>: <span class="code-number">0 0 20px</span> rgba(<span class="code-number">255,0,255,0.2</span>);
}`
    };

    codeFiles.forEach(file => {
        file.style.cursor = 'pointer';
        file.addEventListener('click', () => {
            codeFiles.forEach(f => f.classList.remove('active'));
            file.classList.add('active');
            const fileName = file.textContent.trim();
            if (codeTitle) codeTitle.textContent = `bormey-workspace // ${fileName}`;
            if (codeContainer && codeSnippets[fileName]) {
                codeContainer.innerHTML = codeSnippets[fileName];
            }
        });
    });

    // ─── Init ─────────────────────────────────────
    showMobileColumn('style'); // default mobile view = Workspace
    setLanguage('en');
    populateHeatmap();

    // Wire Full Analytics button
    const btnViewCommits = document.getElementById('btn-view-commits');
    if (btnViewCommits) {
        btnViewCommits.addEventListener('click', () => openModal('modal-stats'));
    }
});
