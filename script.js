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
// PROJECT VIEW ALL
// =====================
const viewAllBtn = document.getElementById('viewAllProjects');
const extraProjects = document.querySelectorAll('.project-extra');
const interestsWrapper = document.getElementById('interestsWrapper');
const colSide = document.querySelector('.col-side');
const interestsSection = document.getElementById('interests');

if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
        const isExpanded = viewAllBtn.classList.contains('expanded');

        extraProjects.forEach(card => {
            card.classList.toggle('visible', !isExpanded);
        });
        viewAllBtn.classList.toggle('expanded', !isExpanded);
        viewAllBtn.innerHTML = isExpanded
            ? '<i class="fas fa-th-large"></i> View All Projects'
            : '<i class="fas fa-chevron-up"></i> Show Less';

        if (!isExpanded) {
            // Move interests into col-side
            interestsSection.classList.remove('interests-fullwidth');
            interestsSection.querySelector('.interests-grid').classList.remove('interests-grid-wide');
            colSide.appendChild(interestsSection);
            interestsWrapper.style.display = 'none';
        } else {
            // Move interests back to full-width wrapper
            interestsWrapper.style.display = '';
            interestsSection.classList.add('interests-fullwidth');
            interestsSection.querySelector('.interests-grid').classList.add('interests-grid-wide');
            interestsWrapper.querySelector('.container').appendChild(interestsSection);
        }
    });
}

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
    const RESUME_CONTEXT = `
You are an AI assistant embedded in Edward Jemuel G. Montano's personal portfolio website. Answer questions about Edward naturally and helpfully — as if you're his knowledgeable representative. Be concise, friendly, and professional.

=== PERSONAL INFO ===
Full Name: Edward Jemuel G. Montano
Location: Metro Manila, Philippines
Email: edwardjemuelm@gmail.com
Phone: 0970 899 4852
LinkedIn: linkedin.com/in/edwardjemuelmontano
GitHub Portfolio: edwardjemuelm.github.io/Portfolio/

=== ABOUT ===
Aspiring SOC Analyst and IT professional with hands-on experience in IT infrastructure, endpoint security, and cybersecurity. Built home labs simulating real attack scenarios using Wazuh, Velociraptor, Sysmon, and Metasploit to develop practical skills in threat hunting, log analysis, and digital forensics. Completed Bachelor of Science in Information Technology at Pamantasan ng Lungsod ng Valenzuela (2022–2026). Eager to grow in a Security Operations Center environment.

=== EXPERIENCE ===
1. IT Infrastructure Intern — Prople BPO Inc., Mandaluyong City (Jun–Nov 2025)
   - 486 hours OJT in IT infrastructure
   - Designed MDF/IDF network infrastructure diagrams using Microsoft Visio
   - Structured cabling layouts and rack elevations
2. IT Support Specialist — PMX 515 Prime Inc., Malabon City (Jul 2024–Feb 2025)
   - Built and deployed the company's responsive website (pmx515prime.com)
   - Configured SPF and DMARC DNS records for email security
3. Full Stack Developer — Freelance/Capstone Projects (2023–2025)
4. BSIT Student — Pamantasan ng Lungsod ng Valenzuela (Sep 2022–May 2026)
5. First line of code written in 2018

=== EDUCATION ===
- BS Information Technology, Pamantasan ng Lungsod ng Valenzuela (Sep 2022–May 2026)
- IT Infrastructure OJT at Prople BPO Inc. — 486 hours (Jun–Nov 2025)

=== SKILLS ===
Security:
- Network & Endpoint: TCP/IP, DNS, HTTP/S, Wireshark, Nmap/Zenmap, Firewall Rules, Symantec Endpoint
- SOC & Threat Detection: Wazuh (SIEM), Velociraptor (DFIR), Sysmon, Microsoft Defender, Log Analysis, Threat Hunting, Incident Triage, IOC Identification, Incident Reporting & Escalation, Jira
- Threat Testing: Burp Suite, Gobuster/DIRB, Hydra, Metasploit, Web Reconnaissance, Vulnerability Assessment
- Systems & Admin: Windows, Linux, macOS, Active Directory, User Access Management, Google Workspace

Development:
- Languages: PHP, JavaScript, Python, C#, TypeScript, HTML/CSS
- Frameworks: React, Tailwind CSS, Laravel, Django
- Databases: MySQL, SQLite, Firebase, MS SQL Server
- Version Control: Git, GitHub

Tools:
- Dev Tools: Visual Studio, VS Code, XAMPP, Microsoft Visio
- Design: Figma, Adobe Creative Suite, DaVinci Resolve, Blender 3D, Unity
- Soft Skills: Analytical Thinking, Attention to Detail, Adaptability, Teamwork, Continuous Learning

=== PROJECTS (10+) ===
1. Active Threat Hunting Lab Using Wazuh & Velociraptor (SOC Lab)
   - Built home SOC lab, simulated endpoint attacks using Metasploit Meterpreter reverse TCP payload
   - Correlated Wazuh SIEM alerts with Sysmon Event IDs (1, 3, 5, 11) and Velociraptor forensic artifacts
   - Documented SHA-256 IOC hashes for malware analysis
   - Tags: Wazuh, Velociraptor, Sysmon, Metasploit, DFIR, Threat Hunting

2. Endpoint Forensics & Threat Hunting Lab Using Velociraptor (SOC Lab)
   - Deployed Velociraptor server on Ubuntu Linux, enrolled Windows 11 endpoint
   - Collected forensic artifacts: 290 running processes, network connections, Windows services, scheduled tasks
   - Tags: Velociraptor, Endpoint Forensics, Windows Artifacts, Threat Hunting, Ubuntu Linux

3. Network Infrastructure Diagram (Security)
   - Designed MDF and IDF diagrams for Prople BPO Inc.
   - Structured cabling layouts, rack elevations, end-to-end network topology documentation
   - Tags: Microsoft Visio, Network Topology, Structured Cabling

4. Inventor-E: Inventory System (Capstone)
   - Full-stack inventory management system with booking, equipment tracking, user roles, real-time updates, QR code scanning, analytics dashboard
   - Applied secure coding practices
   - Tags: PHP, MySQL, JavaScript, QR Code

5. PMX 515 Website & Email Security (Web)
   - Built responsive professional website for PMX 515 Prime Inc.
   - Configured SPF and DMARC DNS records to authenticate email, reduce phishing
   - Tags: HTML/CSS/JS, SPF/DMARC, DNS Security

6. Glosaryo Web and Mobile Application (Web)
   - Bilingual educational app for a Bachelor of Education (Filipino major) client
   - Features: glossary, flashcards, quizzes, pixel-art UI
   - Tags: Web & Mobile App, UI/UX Design, Flashcards, Quiz System

7. Mathimize: Linear Programming Tutor (Mobile App)
   - Android app helping students solve Linear Programming problems step-by-step
   - Features: multiple-choice assessments, guided tutorials, LP practice exercises
   - Tags: Android Studio, Linear Programming, Education

8. Purple Hearts Online Store (System)
   - E-commerce web system with product listings, shopping cart, order management, user authentication
   - Tags: PHP, MySQL, E-Commerce

9. Online Railway Reservation System (System)
   - WinForms application in C# .NET for railway ticket booking, seat management, payment processing
   - Tags: C#, WinForms, .NET, SQL

10. UNCODED (Media)
    - Award-winning short film — Best in Picture & Cinematography
    - Tags: DaVinci Resolve, Cinematography, Storytelling

11. Drop 4 Java Game
    - Strategic Java-based Connect Four game with OOP principles
    - Tags: Java, OOP, Game Logic

12. Cursed of the Tides TTRPG
    - Complete tabletop RPG with custom mechanics, world-building, original character design
    - Tags: Game Design, Storytelling, World Building

=== CERTIFICATIONS (10+) ===
- Cybersecurity Defense Analyst — Cisco Networking Academy
- Junior Cybersecurity Analyst — Cisco Networking Academy
- Introduction to Cybersecurity — Cisco Networking Academy
- SOC Level 1 — TryHackMe
- Jr. Penetration Tester — TryHackMe
- Cyber Security 101 — TryHackMe
- Google Workspace Admin Training — Globe Business
- Google Workspace End User Training — Globe Business
- Ignite the Power of Cybersecurity with Sophos — Micro Pacific Technologies
- Data Protection & Cloud Security Workshop — Rubrik & Microsoft

=== AREAS OF INTEREST ===
- Cybersecurity: Protecting digital assets, latest threats and defense mechanisms
- Artificial Intelligence: AI's potential to transform industries through intelligent automation
- Machine Learning: Algorithms that enable computers to learn and make decisions from data

=== STATS ===
- 10+ Projects
- 10+ Certifications
- 1+ Year of Professional Experience

Keep answers focused, accurate, and based only on the information above. If asked something outside this scope, politely redirect. For contact/hiring inquiries, encourage them to reach out via email (edwardjemuelm@gmail.com) or LinkedIn.
`;

    let conversationHistory = [];
    let isOpen = false;
    let isTyping = false;

    const widget = document.getElementById('chatWidget');
    const launcher = document.getElementById('chatLauncher');
    const launcherIcon = launcher.querySelector('.chat-launcher-icon');
    const launcherClose = launcher.querySelector('.chat-launcher-close');
    const launcherBadge = document.getElementById('chatLauncherBadge');
    const messages = document.getElementById('chatMessages');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSend');
    const clearBtn = document.getElementById('chatClear');
    const minimizeBtn = document.getElementById('chatMinimize');
    const suggestions = document.getElementById('chatSuggestions');

    function toggleChat() {
        isOpen = !isOpen;
        widget.classList.toggle('open', isOpen);
        launcherIcon.style.display = isOpen ? 'none' : '';
        launcherClose.style.display = isOpen ? '' : 'none';
        launcherBadge.classList.add('hidden');
        if (isOpen) {
            setTimeout(() => input.focus(), 200);
        }
    }

    launcher.addEventListener('click', toggleChat);
    minimizeBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleChat(); });

    clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        conversationHistory = [];
        messages.innerHTML = `
            <div class="chat-msg bot">
                <div class="chat-bubble">Hey! 👋 I'm Edward's AI assistant. Ask me anything about his skills, projects, experience, or how to get in touch.</div>
            </div>
            <div class="chat-suggestions" id="chatSuggestions">
                <button class="chat-suggestion-pill">What are your top skills?</button>
                <button class="chat-suggestion-pill">Tell me about your projects</button>
                <button class="chat-suggestion-pill">What's your experience?</button>
                <button class="chat-suggestion-pill">How can I contact you?</button>
            </div>`;
        clearBtn.style.display = 'none';
        bindSuggestions();
    });

    function bindSuggestions() {
        document.querySelectorAll('.chat-suggestion-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                sendMessage(pill.textContent);
            });
        });
    }

    bindSuggestions();

    function appendMessage(role, text, isError = false) {
        const wrapper = document.createElement('div');
        wrapper.className = `chat-msg ${role}`;
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble' + (isError ? ' error' : '');
        bubble.textContent = text;
        wrapper.appendChild(bubble);
        messages.appendChild(wrapper);
        messages.scrollTop = messages.scrollHeight;
        return wrapper;
    }

    function showTyping() {
        const wrapper = document.createElement('div');
        wrapper.className = 'chat-msg bot chat-typing';
        wrapper.id = 'chatTypingIndicator';
        wrapper.innerHTML = '<div class="chat-bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
        messages.appendChild(wrapper);
        messages.scrollTop = messages.scrollHeight;
    }

    function hideTyping() {
        const el = document.getElementById('chatTypingIndicator');
        if (el) el.remove();
    }

    async function sendMessage(text) {
        text = text.trim();
        if (!text || isTyping) return;

        // Remove suggestions on first real message
        const suggestionsEl = document.getElementById('chatSuggestions');
        if (suggestionsEl) suggestionsEl.remove();

        clearBtn.style.display = '';
        appendMessage('user', text);
        conversationHistory.push({ role: 'user', content: text });

        input.value = '';
        input.disabled = true;
        sendBtn.disabled = true;
        isTyping = true;
        showTyping();

        try {
            const GEMINI_API_KEY = 'AQ.Ab8RN6Iynmxy8T_hwk90c8FxoP7Oio3EJH2BX_yW8oQxLLbTig';

            // Convert conversation history to Gemini format
            const geminiHistory = conversationHistory.slice(0, -1).map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }]
            }));

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        system_instruction: { parts: [{ text: RESUME_CONTEXT }] },
                        contents: [
                            ...geminiHistory,
                            { role: 'user', parts: [{ text: text }] }
                        ],
                        generationConfig: { maxOutputTokens: 800 }
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || 'API error');
            }

            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';

            conversationHistory.push({ role: 'assistant', content: reply });
            hideTyping();
            appendMessage('bot', reply);
        } catch (err) {
            hideTyping();
            appendMessage('bot', '⚠️ Something went wrong. Please try again in a moment.', true);
            // Remove failed message from history
            conversationHistory.pop();
        } finally {
            input.disabled = false;
            sendBtn.disabled = false;
            isTyping = false;
            input.focus();
        }
    }

    sendBtn.addEventListener('click', () => sendMessage(input.value));
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input.value);
        }
    });

    // Close on Escape (don't interfere with other modals)
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && isOpen) toggleChat();
    });
})();