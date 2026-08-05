// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
    }
});

// تنشيط القائمة المتنقلة
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
}

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
        if (burger) burger.classList.remove('toggle');
    });
});

// التمرير السلس للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// تحديث السنة في الفوتر
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ظهور الأقسان عند التمرير
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            const animateElements = entry.target.querySelectorAll('.animate__animated');
            animateElements.forEach((el, index) => {
                setTimeout(() => {
                    const animateClass = el.classList[1];
                    if (animateClass) el.classList.add(animateClass);
                }, index * 150);
            });
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// تغيير الهيدر وشريط التقدم
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const isDark = document.body.classList.contains('dark-mode');

    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        nav.style.background = isDark ? 'rgba(30, 30, 30, 0.98)' : 'rgba(255, 255, 255, 0.98)';
    } else {
        nav.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        nav.style.background = isDark ? '#1E1E1E' : 'white';
    }

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("scrollProgress");
    if (progressBar) progressBar.style.width = scrolled + "%";
});

// تأثير النص المتحرك Typed Text
const words = ["تصميم واجهات الويب", "تطوير تطبيقات الأندرويد", "بناء الأنظمة المخصصة"];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('typed-text').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('typed-text').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            setTimeout(typingEffect, 500);
            return false;
        }
        timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('typed-text')) {
        typingEffect();
    }
});

// 1. Dark Mode
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggleBtn) themeToggleBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggleBtn.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// 2. Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        cursorOutline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
    });
}

// 3. Ripple Effect
document.querySelectorAll('.cta-button, .bio-btn, .filter-btn, button').forEach(button => {
    button.addEventListener('click', function (e) {
        let x = e.clientX - e.target.getBoundingClientRect().left;
        let y = e.clientY - e.target.getBoundingClientRect().top;
        let ripples = document.createElement('span');
        ripples.className = 'ripple';
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        this.appendChild(ripples);
        setTimeout(() => { ripples.remove(); }, 600);
    });
});

// 4. Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// 5. Back To Top
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = (window.scrollY > 300) ? 'block' : 'none';
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 6. Modal Window للتفاصيل
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');
const modalDetails = document.getElementById('modalDetails');

document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') return;
        
        const title = item.querySelector('h3').innerText;
        const desc = item.querySelector('p').innerText;
        const imgSrc = item.querySelector('.project-img').src;

        if (modalDetails && modal) {
            modalDetails.innerHTML = `
                <img src="${imgSrc}" style="width:100%; max-height: 250px; object-fit: cover; border-radius:10px; margin-bottom:1rem;">
                <h2 style="font-size: 1.6rem; margin-bottom: 0.5rem; color: var(--primary-color);">${title}</h2>
                <p style="margin: 1rem 0; color: var(--text-light);">${desc}</p>
                <p><strong>تطوير بواسطة:</strong> URUK SOFT</p>
            `;
            modal.style.display = 'block';
        }
    });
});

if (closeModal && modal) {
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
}

// 7. Tilt Effect
if (window.innerWidth > 768) {
    document.querySelectorAll('.service-card, .portfolio-item, .bio-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            card.style.transform = `perspective(1000px) rotateX(${-y / 30}deg) rotateY(${x / 30}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}