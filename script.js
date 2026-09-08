/* --- 1. 手機版漢堡選單控制 --- */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// 點擊導覽列連結後自動收起選單
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

/* --- 2. 作品分類過濾功能 --- */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 移除其他按鈕的 active 狀態，並加到當前按鈕
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
});

/* --- 3. 彈跳視窗 (Modal) 詳細作品介紹 --- */
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close-btn');

function openModal(title, desc, time, skills) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalTime').textContent = time;
    document.getElementById('modalDesc').textContent = desc;
    
    const skillsContainer = document.getElementById('modalSkills');
    skillsContainer.innerHTML = '';
    skills.forEach(skill => {
        const span = document.createElement('span');
        span.textContent = skill;
        span.style.cssText = 'display: inline-block; background-color: #f0f2f5; color: #555; font-size: 0.8rem; padding: 4px 10px; border-radius: 4px; margin-right: 6px;';
        skillsContainer.appendChild(span);
    });

    modal.style.display = 'flex';
}

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

/* --- 4. 點擊複製 Email 功能 --- */
const emailElement = document.getElementById('copy-email');
emailElement.addEventListener('click', () => {
    const emailText = emailElement.textContent;
    navigator.clipboard.writeText(emailText).then(() => {
        emailElement.textContent = '✅ 已複製信箱！';
        setTimeout(() => {
            emailElement.textContent = emailText;
        }, 2000);
    });
});

/* --- 5. 滾動淡入動畫 (Scroll Fade In) --- */
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});
