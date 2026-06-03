// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check localStorage for preferred theme
const savedTheme = localStorage.getItem('theme') || 'dark-theme';
body.className = savedTheme;

themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light-theme');
    } else {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    }
});

// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
        
        // Active states are handled by scroll observer, but set immediately for UX
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Dynamic Title Typing Effect
const titles = [
    "Software Engineer",
    "Fullstack Developer",
    "AI Agent Engineer",
    "AI Data Scientist"
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenTitles = 2000;
const typingTitleElement = document.getElementById('typing-title');

function typeEffect() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingTitleElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTitleElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
    
    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        currentSpeed = delayBetweenTitles; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        currentSpeed = 500; // Pause before typing next word
    }
    
    setTimeout(typeEffect, currentSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

// Skills Filter Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Toggle Active Button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        skillCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            if (filterValue === 'all' || categories.includes(filterValue)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Intersection Observer for Section Animation & Scroll Highlighting
const sections = document.querySelectorAll('.content-section');
const skillBarFills = document.querySelectorAll('.skill-bar-fill');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -40% 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add scroll entry animation
            entry.target.classList.add('active-scroll');
            
            // Highlight navbar link
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            // Trigger skill bars if skills section is visible
            if (id === 'skills') {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Animate Skills Bar Fill
function animateSkillBars() {
    skillBarFills.forEach(bar => {
        // Retrieve width from inline style and set it
        const targetWidth = bar.parentElement.previousElementSibling.querySelector('.skill-pct').textContent;
        // Map tags to width if not already done, but we set width in style, so let's read the style's width
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// AI Assistant Chatbot Simulation
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const suggestBtns = document.querySelectorAll('.suggest-btn');

// QA Database
const qaData = {
    about: "Ahmad Azarruddin adalah mahasiswa S1 Teknik dan Ilmu Komputer di Universitas Nahdlatul Ulama Indonesia (angkatan 2023). Ia berfokus pada Fullstack Web Development dan integrasi AI, serta memiliki portofolio bootcamp yang cukup komprehensif di bidang web dev & data science.",
    skills: "Keahlian utama Ahmad meliputi:<br>• <strong>Web Development</strong>: HTML, CSS, JavaScript dasar dan responsif design.<br>• <strong>Fullstack Development</strong>: Pembuatan REST API, database, frontend & backend integration.<br>• <strong>AI Agent</strong>: Merancang LLM orchestration, RAG systems, dan workflow AI Agent.<br>• <strong>AI Data Scientist</strong>: Integrasi data, pemrosesan Python, dan integrasi Gemini API.",
    bootcamp: "Ahmad telah menyelesaikan 5 bootcamp penting:<br>1. <strong>Hacktiv8 (2026)</strong>: LLM-Based Tools & Gemini API Integration.<br>2. <strong>IBM SkillBuilds (2026)</strong>: Cloud Foundation & IT Professional.<br>3. <strong>Dibimbing (2026)</strong>: Fullstack Web Development.<br>4. <strong>Samsung Innovation Campus (2025)</strong>: Coding & ICT AI Foundations.<br>5. <strong>VSGA Kominfo (2023)</strong>: Junior Web Developer.",
    contact: "Anda dapat menghubungi Ahmad secara langsung melalui:<br>• <strong>Email</strong>: ahmadazarruddin@gmail.com<br>• <strong>WhatsApp</strong>: +62 812-9267-5810 (Menteng, Jakarta Pusat)<br>Link chat WhatsApp dan email juga tersedia di panel sidebar sebelah kiri.",
    education: "Ahmad sedang menempuh pendidikan tinggi <strong>S1 Teknik dan Ilmu Komputer</strong> di <strong>Universitas Nahdlatul Ulama Indonesia (UNU)</strong> sejak tahun 2023 hingga sekarang. Ia mempelajari struktur data, algoritma, rekayasa perangkat lunak, dan AI.",
    status: "Ahmad saat ini berstatus <strong>Open to Work</strong>. Ia sangat tertarik dengan peluang magang (internship), proyek freelance, maupun posisi full-time junior sebagai Fullstack Web Developer, Frontend/Backend Developer, atau AI Agent Integrator.",
    projects: "Ahmad memiliki beberapa proyek unggulan:<br>1. <strong>AI Agent Chat System</strong>: LLM Orchestration & RAG untuk chatbot interaktif portofolio.<br>2. <strong>LLM Data Processing Pipeline</strong>: Integrasi Gemini API untuk analisis data otomatis (Hacktiv8).<br>3. <strong>Portfolio Website</strong>: Website responsif dengan dark/light theme + AI chat (project ini).<br>4. <strong>Fullstack Web App</strong>: REST API + database + frontend integration (Dibimbing).",
    greetings: "Halo! Selamat datang di portofolio Ahmad. Ada yang bisa saya bantu jelaskan tentang profil Ahmad? Anda dapat memilih pertanyaan di bawah ini atau ketik langsung."
};

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    handleUserMessage(query);
    chatInput.value = '';
});

suggestBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        handleUserMessage(query);
    });
});

function handleUserMessage(query) {
    // Add User Message
    addMessage(query, 'outgoing');

    // Show Typing Indicator
    showTypingIndicator();

    // Process Response after brief delay
    setTimeout(() => {
        removeTypingIndicator();
        const reply = getAIResponse(query);
        addMessage(reply, 'incoming');
    }, 1000);
}

function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    
    // Timestamp
    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    
    messageElement.innerHTML = `
        <div class="msg-bubble">${text}</div>
        <span class="msg-time">${time}</span>
    `;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

let typingIndicator = null;

function showTypingIndicator() {
    typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message', 'incoming', 'typing-container');
    typingIndicator.innerHTML = `
        <div class="typing-bubble">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    if (typingIndicator) {
        typingIndicator.remove();
        typingIndicator = null;
    }
}

function getAIResponse(query) {
    const q = query.toLowerCase();
    
    // Simple Keyword matching
    if (q.includes('keahlian') || q.includes('skill') || q.includes('bisa apa') || q.includes('kemampuan') || q.includes('teknologi')) {
        return qaData.skills;
    } else if (q.includes('bootcamp') || q.includes('pengalaman') || q.includes('pelatihan') || q.includes('kerja') && q.includes('riwayat')) {
        return qaData.bootcamp;
    } else if (q.includes('kontak') || q.includes('hubungi') || q.includes('email') || q.includes('no hp') || q.includes('whatsapp') || q.includes('telepon')) {
        return qaData.contact;
    } else if (q.includes('kuliah') || q.includes('pendidikan') || q.includes('sekolah') || q.includes('universitas') || q.includes('belajar')) {
        return qaData.education;
    } else if (q.includes('kerja') || q.includes('magang') || q.includes('internship') || q.includes('lowongan') || q.includes('status')) {
        return qaData.status;
    } else if (q.includes('siapa') || q.includes('tentang') || q.includes('profile') || q.includes('profil') || q.includes('ahmad')) {
        return qaData.about;
    } else if (q.includes('proyek') || q.includes('project') || q.includes('portofolio') || q.includes('buat apa') || q.includes('ai agent') && q.includes('proyek')) {
        return qaData.projects;
    } else if (q.includes('halo') || q.includes('hello') || q.includes('hai') || q.includes('hi') || q.includes('selamat')) {
        return qaData.greetings;
    } else {
        return "Terima kasih atas pertanyaannya! Saya merekomendasikan Anda untuk mengecek tab menu atau mengklik salah satu pintasan di bawah untuk informasi resmi mengenai Ahmad: <strong>Keahlian Utama</strong>, <strong>Riwayat Bootcamp</strong>, atau <strong>Status Kerja</strong>.";
    }
}
