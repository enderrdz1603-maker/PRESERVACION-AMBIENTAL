document.addEventListener('DOMContentLoaded', () => {
    
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('glass-nav', 'shadow-lg', 'py-4');
            navbar.classList.remove('py-6');
        } else {
            navbar.classList.remove('glass-nav', 'shadow-lg', 'py-4');
            navbar.classList.add('py-6');
        }
    });

    setTimeout(() => {
        const title = document.getElementById('hero-title');
        const subtitle = document.getElementById('hero-subtitle');
        const btns = document.getElementById('hero-btns');
        if(title) title.classList.replace('opacity-0', 'opacity-100'), title.classList.remove('translate-y-10');
        if(subtitle) subtitle.classList.replace('opacity-0', 'opacity-100');
        if(btns) btns.classList.replace('opacity-0', 'opacity-100');
    }, 300);

    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const btn = item.querySelector('button');
        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            accordionItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            tabBtns.forEach(b => {
                b.classList.remove('active', 'border-primary', 'text-primary');
                b.classList.add('text-slate-400');
            });
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active', 'border-primary', 'text-primary');
            btn.classList.remove('text-slate-400');
            document.getElementById(target).classList.add('active');
        });
    });

    const solBtns = document.querySelectorAll('.sol-btn');
    const solPanels = document.querySelectorAll('.sol-panel');
    solBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-sol');
            solBtns.forEach(b => {
                b.classList.remove('active', 'bg-primary', 'text-white');
                b.classList.add('bg-slate-100', 'text-slate-500');
            });
            solPanels.forEach(p => p.classList.add('hidden'));
            btn.classList.add('active', 'bg-primary', 'text-white');
            btn.classList.remove('bg-slate-100', 'text-slate-500');
            document.getElementById(target).classList.remove('hidden');
        });
    });

    const toggleFocus = document.getElementById('toggle-focus');
    if (toggleFocus) {
        toggleFocus.addEventListener('click', () => {
            document.body.classList.toggle('focus-mode-active');
            const isActive = document.body.classList.contains('focus-mode-active');
            toggleFocus.querySelector('span:last-child').textContent = isActive ? 'Salir de Enfoque' : 'Modo Enfoque';
        });
    }

    const counters = document.querySelectorAll('[data-count]');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                const duration = 2000;
                const startTime = performance.now();
                
                const update = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const currentCount = Math.floor(progress * target);
                    entry.target.textContent = currentCount.toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                };
                requestAnimationFrame(update);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('section, [data-eco-tip]').forEach(s => observer.observe(s));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
