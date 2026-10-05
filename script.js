// =====================
// PROFILE AVATAR LIGHTBOX
// =====================
const profileAvatar = document.getElementById('profileAvatar');
const avatarLightbox = document.getElementById('avatarLightbox');
const avatarBackdrop = document.getElementById('avatarBackdrop');
const avatarClose = document.getElementById('avatarClose');

function openLightbox() {
    avatarLightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    avatarLightbox.classList.remove('open');
    document.body.style.overflow = '';
}

if (profileAvatar) profileAvatar.addEventListener('click', openLightbox);
if (avatarBackdrop) avatarBackdrop.addEventListener('click', closeLightbox);
if (avatarClose) avatarClose.addEventListener('click', closeLightbox);



// =====================
// DARK MODE TOGGLE
// =====================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

function applyTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (themeIcon) {
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Load saved preference or system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const isDarkOnLoad = savedTheme ? savedTheme === 'dark' : prefersDark;
applyTheme(isDarkOnLoad);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
        applyTheme(!currentlyDark);
        localStorage.setItem('theme', !currentlyDark ? 'dark' : 'light');
    });
}

// =====================
// SKILLS TABS
// =====================
const pills = document.querySelectorAll('#skillTabs .pill');
const tabPanels = document.querySelectorAll('.tab-panel');

pills.forEach(pill => {
    pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const target = pill.dataset.tab;
        tabPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === target) panel.classList.add('active');
        });
    });
});

// =====================
// PROJECT VIEW ALL + FILTERS
// =====================
const viewAllBtn = document.getElementById('viewAllProjects');
const extraProjects = document.querySelectorAll('.project-extra');
const interestsWrapper = document.getElementById('interestsWrapper');
const colSide = document.querySelector('.col-side');
const interestsSection = document.getElementById('interests');
const filterPills = document.querySelectorAll('#projectFilters .filter-pill');
const allProjectCards = document.querySelectorAll('#projectsList .project-card');

function setProjectsExpanded(expand) {
    const isExpanded = viewAllBtn.classList.contains('expanded');
    if (expand === isExpanded) return;

    extraProjects.forEach(card => card.classList.toggle('visible', expand));
    viewAllBtn.classList.toggle('expanded', expand);
    viewAllBtn.innerHTML = expand
        ? '<i class="fas fa-chevron-up"></i> Show Less'
        : '<i class="fas fa-th-large"></i> View All Projects';

    if (expand) {
        interestsSection.classList.remove('interests-fullwidth');
        interestsSection.querySelector('.interests-grid').classList.remove('interests-grid-wide');
        colSide.appendChild(interestsSection);
        interestsWrapper.style.display = 'none';
    } else {
        interestsWrapper.style.display = '';
        interestsSection.classList.add('interests-fullwidth');
        interestsSection.querySelector('.interests-grid').classList.add('interests-grid-wide');
        interestsWrapper.querySelector('.container').appendChild(interestsSection);
    }
}

function applyProjectFilter(filter) {
    filterPills.forEach(p => p.classList.toggle('active', p.dataset.filter === filter));
    if (filter !== 'all') setProjectsExpanded(true);
    allProjectCards.forEach(card => {
        card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
    if (viewAllBtn) viewAllBtn.style.display = filter === 'all' ? '' : 'none';
}

if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
        setProjectsExpanded(!viewAllBtn.classList.contains('expanded'));
    });
}

filterPills.forEach(pill => {
    pill.addEventListener('click', () => applyProjectFilter(pill.dataset.filter));
});

// =====================
// CONTACT MODAL
// =====================
const openContactModal = document.getElementById('openContactModal');
const contactModalOverlay = document.getElementById('contactModalOverlay');
const contactModalClose = document.getElementById('contactModalClose');

function openModal() {
    contactModalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    contactModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

if (openContactModal) openContactModal.addEventListener('click', openModal);
if (contactModalClose) contactModalClose.addEventListener('click', closeModal);
if (contactModalOverlay) {
    contactModalOverlay.addEventListener('click', function(e) {
        if (e.target === contactModalOverlay) closeModal();
    });
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal();
        closeLightbox();
    }
});

// =====================
// SMOOTH SCROLL OFFSET (for fixed navbar)
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});


// =====================
// CONTACT FORM (basic success handling)
// =====================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const btn = this.querySelector('button[type="submit"]');
        btn.textContent = 'Sending...';
        btn.disabled = true;
    });
}

// =====================
// GALLERY CAROUSEL
// =====================
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');

if (track && prevBtn && nextBtn) {
    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    const total = slides.length;
    const visible = 5; // number of slides visible at once
    let current = 0;

    function getSlideWidth() {
        // slide width + gap (10px)
        return slides[0].getBoundingClientRect().width + 10;
    }

    function updateCarousel() {
        const offset = current * getSlideWidth();
        track.style.transform = `translateX(-${offset}px)`;
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current >= total - visible;
    }

    prevBtn.addEventListener('click', () => {
        if (current > 0) { current--; updateCarousel(); }
    });

    nextBtn.addEventListener('click', () => {
        if (current < total - visible) { current++; updateCarousel(); }
    });

    // Touch/swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (diff > 40 && current < total - visible) { current++; updateCarousel(); }
        else if (diff < -40 && current > 0) { current--; updateCarousel(); }
    });

    // Recalculate on resize
    window.addEventListener('resize', () => updateCarousel());

    updateCarousel();
}

//disabled rightclick
document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

// disabled devtools / view-source shortcuts
document.addEventListener('keydown', function (event) {
  const key = event.key.toUpperCase();

  // F12
  if (event.key === 'F12') {
    event.preventDefault();
    return;
  }

  // Ctrl+Shift+I / Cmd+Opt+I (DevTools)
  // Ctrl+Shift+J / Cmd+Opt+J (Console)
  // Ctrl+Shift+C / Cmd+Opt+C (Inspect element)
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && ['I', 'J', 'C'].includes(key)) {
    event.preventDefault();
    return;
  }

  // Ctrl+U / Cmd+Opt+U (View source)
  if ((event.ctrlKey || event.metaKey) && key === 'U') {
    event.preventDefault();
    return;
  }
});
// =====================
// PDF VIEWER MODAL
// =====================
const pdfModalOverlay = document.getElementById('pdfModalOverlay');
const pdfModalClose = document.getElementById('pdfModalClose');
const pdfFrame = document.getElementById('pdfFrame');
const pdfModalTitle = document.getElementById('pdfModalTitle');
const pdfDownloadBtn = document.getElementById('pdfDownloadBtn');

const projectTitles = {
    './pdf/threat-hunting-wazuh.pdf': 'Active Threat Hunting Lab Using Wazuh & Velociraptor',
    './pdf/endpoint-forensics-velociraptor.pdf': 'Endpoint Forensics & Threat Hunting Lab Using Velociraptor',
};

// Mobile browsers (Chrome/Samsung Internet on Android, in-app webviews, etc.)
// don't reliably render a scrollable, all-pages PDF inside an <iframe>. The
// native full-page PDF viewer they open in a new tab, however, always
// supports proper scrolling/zooming through every page. So on mobile we skip
// the in-page modal entirely and just open the PDF natively.
function isMobileDevice() {
    return window.matchMedia('(max-width: 768px)').matches ||
        /Android|iPhone|iPad|iPod|Mobile|Silk/i.test(navigator.userAgent);
}

let scrollYBeforePdfModal = 0;

function lockBodyScroll() {
    // Plain `overflow: hidden` on <body> is not honored for touch-scrolling
    // on iOS Safari, so the page behind the modal can still hijack the touch
    // drag instead of it scrolling the iframe. Locking with `position: fixed`
    // instead actually prevents that.
    scrollYBeforePdfModal = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYBeforePdfModal}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
}

function unlockBodyScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollYBeforePdfModal);
}

function openPdfModal(pdfPath) {
    if (isMobileDevice()) {
        window.open(pdfPath, '_blank');
        return;
    }
    pdfFrame.src = pdfPath;
    pdfModalTitle.textContent = projectTitles[pdfPath] || 'Project Report';
    pdfDownloadBtn.href = pdfPath;
    pdfModalOverlay.classList.add('open');
    lockBodyScroll();
}

function closePdfModal() {
    pdfModalOverlay.classList.remove('open');
    pdfFrame.src = '';
    unlockBodyScroll();
}

document.querySelectorAll('.clickable-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't trigger if clicking a link inside the card
        if (e.target.closest('a')) return;
        const pdf = this.dataset.pdf;
        if (pdf) openPdfModal(pdf);
    });
});

if (pdfModalClose) pdfModalClose.addEventListener('click', closePdfModal);
if (pdfModalOverlay) {
    pdfModalOverlay.addEventListener('click', function(e) {
        if (e.target === pdfModalOverlay) closePdfModal();
    });
}

// Add Escape key support for PDF modal
const _origKeydown = document.onkeydown;
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePdfModal();
});
// =====================
// AI CHATBOT WIDGET
// =====================
(function () {

    //  Helpers 
    function timeNow() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    //  Knowledge Base 
    const KB = [
        {
            match: /\b(hi|hello|hey|good\s(morning|afternoon|evening)|kumusta|musta)\b/,
            reply: "Hi! I am Edward's assistant.\n\nYou can ask me about his skills, projects, work experience, certifications, or how to get in touch with him."
        },
        {
            match: /contact|email|phone|reach|message|gmail/,
            reply: "Here is how you can reach Edward:\n\nEmail\nedwardjemuelm@gmail.com\n\nPhone\n0970 899 4852\n\nLinkedIn\nlinkedin.com/in/edwardjemuelmontano\n\nYou can also use the Contact button on this page."
        },
        {
            match: /linkedin/,
            reply: "Edward's LinkedIn:\nlinkedin.com/in/edwardjemuelmontano"
        },
        {
            match: /github/,
            reply: "You are already on Edward's GitHub Pages portfolio. His GitHub account is linked on this page."
        },
        {
            match: /available|open to work|hire|looking|opportunit|job offer|freelance/,
            reply: "Yes, Edward is actively looking for opportunities — particularly as a SOC Analyst.\n\nFeel free to email him at:\nedwardjemuelm@gmail.com"
        },
        {
            match: /certif|cisco|tryhackme|sophos|rubrik|\bdict\b|globe/,
            reply: "Edward has 10+ certifications (open any of them in the Certifications section to view the certificate):\n\nCisco\n- Cybersecurity Defense Analyst\n- Junior Cybersecurity Analyst\n- Introduction to Cybersecurity\n\nTryHackMe\n- SOC Level 1\n- Jr. Penetration Tester\n- Cyber Security 101\n\nGovernment\n- Cybersecurity Training Program, DICT Region III\n\nOthers\n- Google Workspace Admin Training (Globe Business)\n- Google Workspace End User Training (Globe Business)\n- Data Protection & Cloud Security (Rubrik & Microsoft)\n- Ignite the Power of Cybersecurity (Sophos)"
        },
        {
            match: /wazuh|velociraptor|threat.?hunt|soc.?lab|metasploit|sysmon/,
            reply: "Edward built a home SOC lab where he:\n\n- Simulated attacks using Metasploit Meterpreter reverse TCP payloads\n- Correlated Wazuh SIEM alerts with Sysmon Event IDs (1, 3, 5, 11)\n- Deployed Velociraptor on Ubuntu and enrolled Windows 11 endpoints\n- Collected forensic artifacts: processes, network connections, scheduled tasks\n- Documented SHA-256 IOC hashes for malware analysis"
        },
        {
            match: /security|soc|cyber|threat|siem|forensic|incident|penetration|pentest/,
            reply: "Cybersecurity is Edward's main focus. He has built hands-on home SOC labs using Wazuh, Velociraptor, and Sysmon to simulate and detect real attacks.\n\nKey certifications:\n- Cybersecurity Defense Analyst (Cisco)\n- Junior Cybersecurity Analyst (Cisco)\n- SOC Level 1 (TryHackMe)\n- Jr. Penetration Tester (TryHackMe)"
        },
        {
            match: /skill|tech|stack|language|tool|framework|know|proficient/,
            reply: "Edward's skill set:\n\nSecurity\n- Wazuh, Suricata (IDS), Velociraptor, Sysmon, Metasploit\n- Burp Suite, Nmap, Wireshark\n- Incident Triage, Threat Hunting\n- Active Directory, Microsoft Defender\n\nDevelopment\n- PHP, JavaScript, Python, C#\n- React, Laravel, Django\n- MySQL, Firebase, MS SQL Server\n\nTools\n- Figma, Adobe Suite, Microsoft Visio\n- Git, GitHub, DaVinci Resolve"
        },
        {
            match: /inventor|inventory|capstone/,
            reply: "Inventor-E is Edward's capstone project — a full-stack inventory management system.\n\nFeatures:\n- QR code scanning\n- Equipment tracking\n- User roles and access control\n- Real-time updates\n- Analytics dashboard\n\nBuilt with PHP, MySQL, and JavaScript."
        },
        {
            match: /glosaryo|glossary|flashcard/,
            reply: "Glosaryo is a bilingual educational web and mobile app built for a Bachelor of Education client.\n\nFeatures:\n- Glossary and flashcards\n- Quiz system\n- Pixel-art UI design"
        },
        {
            match: /pmx.*website|website.*pmx|website.*company|company.*website|email.?security|spf|dmarc/,
            reply: "Edward built the full website for PMX 515 Prime Inc. and also configured SPF and DMARC DNS records to authenticate their email and reduce phishing risks."
        },
        {
            match: /film|uncoded|cinematograph|short.?film|best.?picture/,
            reply: "UNCODED is Edward's short film that won Best in Picture and Best in Cinematography. He handled the full editing using DaVinci Resolve."
        },
        {
            match: /gallery|photos?|pictures?|pics/,
            reply: "The Gallery section near the bottom of the page has a carousel of Edward's photos. Use the arrows or swipe to browse them, or tap Gallery in the top navigation to jump there."
        },
        {
            match: /mathimize|linear.?program|math.*app/,
            reply: "Mathimize is an Android app that helps students solve Linear Programming problems step by step, with guided tutorials and multiple-choice assessments."
        },
        {
            match: /project|built|made|portfolio|capstone/,
            reply: "Edward has 10+ projects. Here are the highlights:\n\nCybersecurity\n- Active Threat Hunting Lab (Wazuh + Velociraptor)\n- Endpoint Forensics Lab (Velociraptor)\n- Network Infrastructure Diagram (Prople BPO)\n\nWeb & Systems\n- Inventor-E Inventory System (Capstone)\n- PMX 515 Company Website + Email Security\n- Glosaryo Educational App\n- Purple Hearts Online Store\n- Online Railway Reservation System\n\nOther\n- UNCODED Short Film (Best Picture & Cinematography)\n- Mathimize Android App\n- Drop 4 Java Game\n- Cursed of the Tides TTRPG\n\nScroll to the Projects section for details."
        },
        {
            match: /prople|mandaluyong|active.?directory|symantec|broadcom|ticketing|lan.?patch|laptop.*deploy|endpoint.*check/,
            reply: "IT Infrastructure Intern\nProple BPO Inc. | Mandaluyong City\nJune 2025 – November 2025\n\n- Managed user account provisioning and access control using Active Directory\n- Provided Level 1 IT support, troubleshooting hardware, software, and network issues for end users\n- Logged, documented, and resolved incidents and service requests using an IT ticketing system\n- Performed routine endpoint security checks including antivirus status verification and compliance monitoring using Broadcom Symantec Security\n- Monitored wireless network availability and connectivity to ensure operational stability\n- Configured and deployed company-issued laptops with domain integration and security policies\n- Supported data center networking operations including LAN patching and structured cabling\n- Assisted in IT audits and compliance checks, supporting security and operational standards\n- Provided remote technical support and endpoint monitoring using AnyDesk and RustDesk, troubleshooting hardware, software, and connectivity issues\n- Supported Business Continuity Plan (BCP) operations by ensuring workstations remained operational"
        },
        {
            match: /pmx|515|malabon|spf|dmarc|email.*spoofing|mail.*server|macos.*issue|domain.*email/,
            reply: "IT Support Specialist\nPMX 515 Prime Inc. | Malabon City\nJuly 2024 – March 2026\n\n- Implemented and configured SPF and DMARC DNS records, validating authorized mail servers, enforcing policy alignment, and reducing email spoofing and phishing risks\n- Troubleshot and resolved macOS and Windows system issues including email and domain-related problems\n- Supported domain email accounts including configuration, access issues, and basic security troubleshooting\n- Developed and deployed the company's business website, ensuring functionality and usability"
        },
        {
            match: /experience|work|job|intern|prople|pmx|ojt|active.?directory|symantec|broadcom|ticketing|lan.?patch|endpoint/,
            reply: "Edward's work experience:\n\nIT Infrastructure Intern\nProple BPO Inc. | Mandaluyong City\nJune 2025 – November 2025\n- Managed user account provisioning and access control using Active Directory\n- Provided Level 1 IT support, troubleshooting hardware, software, and network issues for end users\n- Logged, documented, and resolved incidents and service requests using an IT ticketing system\n- Performed routine endpoint security checks including antivirus status verification and compliance monitoring using Broadcom Symantec Security\n- Monitored wireless network availability and connectivity to ensure operational stability\n- Configured and deployed company-issued laptops with domain integration and security policies\n- Supported data center networking operations including LAN patching and structured cabling\n- Assisted in IT audits and compliance checks, supporting security and operational standards\n- Provided remote technical support and endpoint monitoring using AnyDesk and RustDesk, troubleshooting hardware, software, and connectivity issues\n- Supported Business Continuity Plan (BCP) operations by ensuring workstations remained operational\n\nIT Support Specialist\nPMX 515 Prime Inc. | Malabon City\nJuly 2024 – March 2026\n- Implemented and configured SPF and DMARC DNS records, validating authorized mail servers, enforcing policy alignment, and reducing email spoofing and phishing risks\n- Troubleshot and resolved macOS and Windows system issues including email and domain-related problems\n- Supported domain email accounts including configuration, access issues, and basic security troubleshooting\n- Developed and deployed the company's business website, ensuring functionality and usability\n\nFull Stack Developer\nFreelance / Capstone Projects\n2023 – 2026"
        },
        {
            match: /education|school|college|university|plv|pamantasan|degree|bsit/,
            reply: "Edward completed his BS Information Technology degree at Pamantasan ng Lungsod ng Valenzuela (2022 – 2026).\n\nHe also completed 486 hours of IT Infrastructure OJT at Prople BPO Inc. (2025)."
        },
        {
            match: /interest|passion|hobby|like|love/,
            reply: "Edward's interests:\n\n- Cybersecurity: threat defense, SOC operations, and security tooling\n- Artificial Intelligence: intelligent automation and its impact across industries\n- Machine Learning: building systems that learn from data"
        },
        {
            match: /location|where.*from|manila|philippines|based/,
            reply: "Edward is based in Metro Manila, Philippines."
        },
        {
            match: /thank|thanks|salamat|appreciate/,
            reply: "You are welcome. Feel free to ask anything else."
        },
        {
            match: /who are you|what are you|are you (a )?(bot|ai|robot|assistant)/,
            reply: "I am a chatbot built into Edward's portfolio. I can answer questions about his skills, projects, work experience, certifications, and contact details."
        },
    ];

    function getStaticReply(msg) {
        const q = msg.toLowerCase().trim();
        for (const entry of KB) {
            if (entry.match.test(q)) return entry.reply;
        }
        return "I am not sure about that. For anything specific, you can email Edward directly at edwardjemuelm@gmail.com and he will get back to you.";
    }

    //  State 
    let isOpen = false;
    let isTyping = false;

    //  DOM refs 
    const widget      = document.getElementById('chatWidget');
    const launcher    = document.getElementById('chatLauncher');
    const launcherIcon  = launcher.querySelector('.chat-launcher-icon');
    const launcherClose = launcher.querySelector('.chat-launcher-close');
    const launcherBadge = document.getElementById('chatLauncherBadge');
    const messages    = document.getElementById('chatMessages');
    const input       = document.getElementById('chatInput');
    const sendBtn     = document.getElementById('chatSend');
    const clearBtn    = document.getElementById('chatClear');
    const minimizeBtn = document.getElementById('chatMinimize');
    const charCount   = document.getElementById('chatCharCount');
    const initTime    = document.getElementById('chatInitTime');

    // Set initial timestamp
    if (initTime) initTime.textContent = timeNow();

    //  Open / Close 
    function openChat() {
        isOpen = true;
        widget.classList.add('open');
        launcherIcon.style.display = 'none';
        launcherClose.style.display = '';
        launcherBadge.classList.add('hidden');
        setTimeout(() => input.focus(), 220);
    }

    function closeChat() {
        isOpen = false;
        widget.classList.remove('open');
        launcherIcon.style.display = '';
        launcherClose.style.display = 'none';
    }

    launcher.addEventListener('click', () => isOpen ? closeChat() : openChat());
    minimizeBtn.addEventListener('click', e => { e.stopPropagation(); closeChat(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeChat(); });

    //  Clear 
    clearBtn.addEventListener('click', e => {
        e.stopPropagation();
        messages.innerHTML = `
            <div class="chat-date-divider">Today</div>
            <div class="chat-msg bot">
                <div class="chat-bubble">Hi! I am Edward's assistant. Ask me about his skills, projects, experience, or how to contact him.</div>
                <span class="chat-time">${timeNow()}</span>
            </div>
            <div class="chat-suggestions" id="chatSuggestions">
                <button class="chat-suggestion-pill">Top skills</button>
                <button class="chat-suggestion-pill">Projects</button>
                <button class="chat-suggestion-pill">Experience</button>
                <button class="chat-suggestion-pill">Contact info</button>
                <button class="chat-suggestion-pill">Certifications</button>
                <button class="chat-suggestion-pill">Available to hire?</button>
            </div>`;
        clearBtn.style.display = 'none';
        bindSuggestions();
    });

    //  Suggestions 
    function bindSuggestions() {
        document.querySelectorAll('.chat-suggestion-pill').forEach(pill => {
            pill.addEventListener('click', () => sendMessage(pill.textContent));
        });
    }
    bindSuggestions();

    //  Char counter 
    input.addEventListener('input', () => {
        const len = input.value.length;
        const max = 300;
        sendBtn.disabled = len === 0 || isTyping;
        if (len === 0) {
            charCount.textContent = '';
            charCount.className = 'chat-char-count';
        } else {
            charCount.textContent = `${len}/${max}`;
            charCount.className = 'chat-char-count' +
                (len >= max ? ' limit' : len >= max * 0.8 ? ' warn' : '');
        }
    });

    //  Append message 
    function appendMessage(role, text) {
        const wrapper = document.createElement('div');
        wrapper.className = `chat-msg ${role}`;

        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';

        // Render blank lines as spacers, others as text + <br>
        const lines = text.split('\n');
        lines.forEach((line, i) => {
            if (line === '' && i > 0) {
                bubble.appendChild(document.createElement('br'));
            } else {
                bubble.appendChild(document.createTextNode(line));
                if (i < lines.length - 1) bubble.appendChild(document.createElement('br'));
            }
        });

        const time = document.createElement('span');
        time.className = 'chat-time';
        time.textContent = timeNow();

        wrapper.appendChild(bubble);
        wrapper.appendChild(time);
        messages.appendChild(wrapper);
        messages.scrollTop = messages.scrollHeight;
    }

    //  Typing indicator 
    function showTyping() {
        const el = document.createElement('div');
        el.className = 'chat-msg bot chat-typing';
        el.id = 'chatTypingIndicator';
        el.innerHTML = '<div class="chat-bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
        messages.appendChild(el);
        messages.scrollTop = messages.scrollHeight;
    }
    function hideTyping() {
        const el = document.getElementById('chatTypingIndicator');
        if (el) el.remove();
    }

    //  Send message 
    function sendMessage(text) {
        text = text.trim();
        if (!text || isTyping) return;

        const suggestionsEl = document.getElementById('chatSuggestions');
        if (suggestionsEl) suggestionsEl.remove();

        clearBtn.style.display = '';
        appendMessage('user', text);
        input.value = '';
        charCount.textContent = '';
        charCount.className = 'chat-char-count';
        input.disabled = true;
        sendBtn.disabled = true;
        isTyping = true;
        showTyping();

        // Vary delay slightly based on reply length
        const reply = getStaticReply(text);
        const delay = Math.min(600 + reply.length * 1.2, 1800);

        setTimeout(() => {
            hideTyping();
            appendMessage('bot', reply);
            input.disabled = false;
            sendBtn.disabled = true; // keep disabled until user types again
            isTyping = false;
            input.focus();
        }, delay);
    }

    sendBtn.addEventListener('click', () => sendMessage(input.value));
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input.value);
        }
    });

})();

// =====================
// STICKY NAV: scrolled state, back-to-top
// =====================
(function () {
    const nav = document.getElementById('siteNav');
    const toTop = document.getElementById('backToTop');

    function onScroll() {
        const y = window.scrollY;
        if (nav) nav.classList.toggle('scrolled', y > 8);
        if (toTop) toTop.classList.toggle('show', y > 700);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// =====================
// CERTIFICATE VIEWER (image-only)
// Looks for ./certificates/<name>.png|jpg|jpeg|webp. If only a PDF exists,
// it is rendered to images in the browser so viewers never see a PDF viewer.
// =====================
(function () {
    const rows = Array.from(document.querySelectorAll('.cert-row[data-cert]'));
    const overlay = document.getElementById('certModalOverlay');
    if (!rows.length || !overlay) return;

    const stage = document.getElementById('certStage');
    const titleEl = document.getElementById('certModalTitle');
    const subEl = document.getElementById('certModalSub');
    const counter = document.getElementById('certCounter');
    const btnPrev = document.getElementById('certPrev');
    const btnNext = document.getElementById('certNext');
    const btnClose = document.getElementById('certClose');
    const btnZoomIn = document.getElementById('certZoomIn');
    const btnZoomOut = document.getElementById('certZoomOut');

    const EXTS = ['png', 'jpg', 'jpeg', 'webp'];
    const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    const MAX_PDF_PAGES = 4;

    const cache = new Map();
    let index = 0;
    let zoom = 1;
    let ticket = 0;

    function probeImage(src) {
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = () => resolve(null);
            img.src = src;
        });
    }

    let pdfjsPromise = null;
    function loadPdfJs() {
        if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
        if (!pdfjsPromise) {
            pdfjsPromise = new Promise((resolve, reject) => {
                const s = document.createElement('script');
                s.src = PDFJS;
                s.onload = () => {
                    window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
                    resolve(window.pdfjsLib);
                };
                s.onerror = reject;
                document.head.appendChild(s);
            });
        }
        return pdfjsPromise;
    }

    async function pdfToImages(url) {
        const lib = await loadPdfJs();
        const pdf = await lib.getDocument(url).promise;
        const pages = Math.min(pdf.numPages, MAX_PDF_PAGES);
        const out = [];
        for (let p = 1; p <= pages; p++) {
            const page = await pdf.getPage(p);
            const viewport = page.getViewport({ scale: 2 });
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
            out.push(canvas.toDataURL('image/jpeg', 0.92));
        }
        return out;
    }

    async function resolveCert(base) {
        if (cache.has(base)) return cache.get(base);
        let result = [];

        const isPdf = /\.pdf$/i.test(base);
        const hasExt = /\.[a-z0-9]{3,4}$/i.test(base);
        if (!isPdf) {
            const candidates = hasExt ? [base] : EXTS.map(e => base + '.' + e);
            for (const src of candidates) {
                const ok = await probeImage(src);
                if (ok) { result = [ok]; break; }
            }
        }
        if (!result.length && (isPdf || !hasExt)) {
            try { result = await pdfToImages(isPdf ? base : base + '.pdf'); } catch (e) { result = []; }
        }
        cache.set(base, result);
        return result;
    }

    function setZoom(z) {
        zoom = Math.max(1, Math.min(3, z));
        stage.style.setProperty('--zoom', zoom);
        stage.classList.toggle('zoomed', zoom > 1);
        btnZoomOut.disabled = zoom <= 1;
        btnZoomIn.disabled = zoom >= 3;
    }

    async function show(i) {
        index = (i + rows.length) % rows.length;
        const row = rows[index];
        const my = ++ticket;

        titleEl.textContent = row.dataset.title;
        subEl.textContent = row.dataset.issuer;
        counter.textContent = (index + 1) + ' of ' + rows.length;
        setZoom(1);
        stage.scrollTo(0, 0);
        stage.innerHTML = '<div class="cert-state"><i class="fas fa-circle-notch fa-spin"></i><span>Loading certificate…</span></div>';

        const pages = await resolveCert(row.dataset.cert);
        if (my !== ticket) return;

        stage.innerHTML = '';
        if (!pages.length) {
            stage.innerHTML = '<div class="cert-state"><i class="fas fa-image"></i><span>This certificate image isn\u2019t available yet.</span></div>';
            return;
        }
        pages.forEach((src, n) => {
            const img = document.createElement('img');
            img.className = 'cert-page';
            img.src = src;
            img.alt = row.dataset.title + ' \u2014 ' + row.dataset.issuer + (pages.length > 1 ? ' (page ' + (n + 1) + ')' : '');
            img.draggable = false;
            stage.appendChild(img);
        });
    }

    function open(i) {
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        lockBodyScroll();
        show(i);
        btnClose.focus();
    }

    function close() {
        if (!overlay.classList.contains('open')) return;
        ticket++;
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        stage.innerHTML = '';
        unlockBodyScroll();
        if (rows[index]) rows[index].focus();
    }

    rows.forEach((row, i) => row.addEventListener('click', () => open(i)));
    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', () => show(index - 1));
    btnNext.addEventListener('click', () => show(index + 1));
    btnZoomIn.addEventListener('click', () => setZoom(zoom + 0.5));
    btnZoomOut.addEventListener('click', () => setZoom(zoom - 0.5));
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    document.addEventListener('keydown', e => {
        if (!overlay.classList.contains('open')) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft') show(index - 1);
        else if (e.key === 'ArrowRight') show(index + 1);
    });

    let sx = 0;
    stage.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', e => {
        if (zoom > 1) return;
        const dx = sx - e.changedTouches[0].clientX;
        if (Math.abs(dx) > 60) show(index + (dx > 0 ? 1 : -1));
    });
})();