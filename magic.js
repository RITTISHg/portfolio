/* ═══════════════════════════════════════════
   RITTISH G — MAGICAL PORTFOLIO JS
   Premium Animations & Interactions
   ═══════════════════════════════════════════ */

/* ── PRELOADER ── */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hidden');
    }, 1200);
});

/* ── CURSOR ── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
const trails = [];
const TRAIL_COUNT = 8;

for (let i = 0; i < TRAIL_COUNT; i++) {
    const t = document.createElement('div');
    t.className = 'cursor-trail';
    document.body.appendChild(t);
    trails.push({ el: t, x: 0, y: 0 });
}

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
});

function animCursor() {
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';

    trails.forEach((t, i) => {
        const prev = i === 0 ? { x: mx, y: my } : trails[i - 1];
        t.x += (prev.x - t.x) * (0.3 - i * 0.025);
        t.y += (prev.y - t.y) * (0.3 - i * 0.025);
        t.el.style.left = t.x + 'px';
        t.el.style.top = t.y + 'px';
        t.el.style.opacity = (1 - i / TRAIL_COUNT) * 0.4;
        t.el.style.width = (4 - i * 0.3) + 'px';
        t.el.style.height = (4 - i * 0.3) + 'px';
    });

    requestAnimationFrame(animCursor);
}
animCursor();

// Hover effect on interactive elements
document.querySelectorAll('a, button, .project-card, .skill-chip, .ach-card, .contact-link').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

/* ── CANVAS PARTICLE NETWORK ── */
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let W, H, nodes = [];

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Node {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - .5) * .35;
        this.vy = (Math.random() - .5) * .35;
        this.r = Math.random() * 2 + .5;
        this.alpha = Math.random() * .6 + .2;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * .02 + .01;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        this.pulse += this.pulseSpeed;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();

        // Mouse interaction
        const dx = this.x - mx, dy = this.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
            const force = (150 - dist) / 150 * .5;
            this.vx += (dx / dist) * force * .1;
            this.vy += (dy / dist) * force * .1;
        }
        // Dampen velocity
        this.vx *= .99; this.vy *= .99;
    }
    draw() {
        const glow = Math.sin(this.pulse) * .3 + .7;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * glow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${this.alpha * glow})`;
        ctx.fill();
    }
}

const nodeCount = Math.min(120, Math.floor(W * H / 12000));
for (let i = 0; i < nodeCount; i++) nodes.push(new Node());

function drawNetwork() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => n.update());
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 150) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                const alpha = (1 - d / 150) * .2;
                const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                grad.addColorStop(0, `rgba(0,229,255,${alpha})`);
                grad.addColorStop(1, `rgba(124,58,237,${alpha * .6})`);
                ctx.strokeStyle = grad;
                ctx.lineWidth = .5;
                ctx.stroke();
            }
        }
    }
    nodes.forEach(n => n.draw());
    requestAnimationFrame(drawNetwork);
}
drawNetwork();

/* ── MAGIC SPARKLES ── */
const sparklesContainer = document.querySelector('.magic-particles');
function createSparkle() {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.left = Math.random() * 100 + '%';
    s.style.animationDuration = (Math.random() * 4 + 4) + 's';
    s.style.animationDelay = Math.random() * 2 + 's';
    const colors = ['var(--accent)', 'var(--accent2)', 'var(--accent3)', 'var(--gold)'];
    s.style.background = colors[Math.floor(Math.random() * colors.length)];
    s.style.width = (Math.random() * 3 + 1) + 'px';
    s.style.height = s.style.width;
    s.style.boxShadow = `0 0 ${Math.random() * 8 + 4}px currentColor`;
    sparklesContainer.appendChild(s);
    setTimeout(() => s.remove(), 8000);
}
setInterval(createSparkle, 300);

/* ── SCROLL PROGRESS ── */
const prog = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    prog.style.width = pct + '%';
});

/* ── NAV SCROLL EFFECT ── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── MOBILE MENU ── */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });
}

/* ── INTERSECTION OBSERVER ── */
const io = new IntersectionObserver(entries => {
    entries.forEach((e, idx) => {
        if (e.isIntersecting) {
            // Stagger animation
            setTimeout(() => {
                e.target.classList.add('visible');
            }, idx * 100);
            // Counters
            e.target.querySelectorAll('[data-count]').forEach(el => {
                const target = parseFloat(el.dataset.count);
                const dec = target % 1 !== 0;
                let current = 0;
                const duration = 2000;
                const startTime = performance.now();
                function animate(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    current = target * eased;
                    el.textContent = dec ? current.toFixed(2) : Math.floor(current);
                    if (progress < 1) requestAnimationFrame(animate);
                }
                requestAnimationFrame(animate);
            });
        }
    });
}, { threshold: .15 });

document.querySelectorAll('.project-card,.timeline-item,.ach-card,.stat-item,.skill-category,.reveal').forEach(el => io.observe(el));

/* ── SKILL CHIP OBSERVER ── */
const chipIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            const lvl = parseInt(e.target.dataset.level) || 0;
            const container = e.target.querySelector('.chip-level');
            if (container && container.children.length === 0) {
                for (let i = 0; i < 5; i++) {
                    const seg = document.createElement('div');
                    seg.className = 'level-seg';
                    if (i < lvl) {
                        seg.classList.add('active');
                        if (i >= 3) seg.classList.add('high');
                        else if (i >= 2) seg.classList.add('mid');
                    }
                    seg.style.transitionDelay = (i * 0.12) + 's';
                    container.appendChild(seg);
                }
                requestAnimationFrame(() => {
                    container.querySelectorAll('.level-seg').forEach(s => s.style.opacity = '1');
                });
            }
            chipIO.unobserve(e.target);
        }
    });
}, { threshold: .2 });
document.querySelectorAll('.skill-chip').forEach(el => chipIO.observe(el));

/* ── TYPED TITLE ── */
const titles = [
    'Embedded Systems Engineer',
    'IoT Solutions Developer',
    'Industrial Automation',
    'Aerospace Design Enthusiast',
    'Smart Energy Innovator'
];
const titleEl = document.getElementById('typedTitle');
let ti = 0, ci = 0, deleting = false;
function type() {
    const full = titles[ti];
    if (!deleting) {
        ci++;
        titleEl.innerHTML = full.slice(0, ci) + '<span class="typed-cursor"></span>';
        if (ci === full.length) { deleting = true; setTimeout(type, 1800); return; }
        setTimeout(type, 65);
    } else {
        ci--;
        titleEl.innerHTML = full.slice(0, ci) + '<span class="typed-cursor"></span>';
        if (ci === 0) { deleting = false; ti = (ti + 1) % titles.length; setTimeout(type, 400); return; }
        setTimeout(type, 35);
    }
}
setTimeout(type, 2000);

/* ── CARD MOUSE TRACKING (Spotlight Effect) ── */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
        const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
    });
});

/* ── TILT EFFECT ON CARDS ── */
document.querySelectorAll('.ach-card, .skill-chip').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ── FORM SUBMIT ── */
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-send');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = '⟶ Sending...';
    btn.style.opacity = '.6';

    emailjs.sendForm('service_f6l60ch', 'template_w2qhpp', e.target)
        .then(() => {
            btn.textContent = '✓ Message Sent!';
            btn.style.color = 'var(--accent3)';
            btn.style.borderColor = 'var(--accent3)';
            btn.style.opacity = '1';
            e.target.reset();
            // Create celebratory sparkles
            for (let i = 0; i < 20; i++) {
                setTimeout(createSparkle, i * 50);
            }
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.color = ''; btn.style.borderColor = '';
                btn.disabled = false;
            }, 4000);
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            btn.textContent = '✗ Failed — Try Again';
            btn.style.color = '#ef4444';
            btn.style.borderColor = '#ef4444';
            btn.style.opacity = '1';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.color = ''; btn.style.borderColor = '';
                btn.disabled = false;
            }, 4000);
        });
}

/* ── NAV ACTIVE ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinksAll.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
});

/* ── SMOOTH PARALLAX ── */
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const aurora = document.querySelector('.aurora');
    if (aurora) aurora.style.transform = `translateY(${scrolled * 0.1}px)`;
});

/* ── MAGNETIC BUTTONS ── */
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});
