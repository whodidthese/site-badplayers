const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

const app = createApp({
    setup() {
        // State
        const currentLang = ref('en');
        const showLangMenu = ref(false); // Dropdown state
        const config = AppConfig;
        
        // Computed: Get current language content
        const t = computed(() => {
            return config.i18n[currentLang.value] || config.i18n['en'];
        });

        const isZh = computed(() => currentLang.value === 'zh');
        
        // Computed: Get current language screenshot
        const currentScreenshot = computed(() => {
            const screenshotMap = {
                'en': config.images.screenshotEn,
                'zh': config.images.screenshotZh,
                'ja': config.images.screenshotJa,
                'ko': config.images.screenshotKo
            };
            return screenshotMap[currentLang.value] || config.images.screenshotEn;
        });
        
        const showCTA = computed(() => {
            const link = config.links.appStore;
            return link && link !== '' && link !== '#';
        });

        const showGitHub = computed(() => {
            const link = config.links.github;
            return link && link !== '' && link !== '#';
        });
        
        // Available languages list - scalable for future
        const availableLangs = [
            { code: 'en', label: 'English' },
            { code: 'zh', label: '繁體中文' },
            { code: 'ja', label: '日本語' },
            { code: 'ko', label: '한국어' }
        ];

        // Methods
        const toggleLangMenu = () => {
            showLangMenu.value = !showLangMenu.value;
        };

        const setLang = (lang) => {
            // Check if lang exists in config to prevent errors, fallback to English if missing
            if (config.i18n[lang]) { 
                currentLang.value = lang;
            } else {
                // If language is supported in UI but not in config (e.g. ja/ko), 
                // we still set it but the 't' computed property will fallback to 'en'
                // This allows the UI to show the selection even if translation is missing
                currentLang.value = lang; 
            }
            showLangMenu.value = false;
        };
        
        // Close menu when clicking outside
        const closeMenu = (e) => {
             if (!e.target.closest('.lang-switcher')) {
                showLangMenu.value = false;
             }
        };

        // Canvas Animation Logic
        const initCanvas = () => {
            const canvas = document.getElementById('bg-canvas');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            let width, height;
            let particles = [];
            
            const resize = () => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            };
            
            class Particle {
                constructor() {
                    this.x = Math.random() * width;
                    this.y = Math.random() * height;
                    this.vx = (Math.random() - 0.5) * 0.5;
                    this.vy = (Math.random() - 0.5) * 0.5;
                    this.size = Math.random() * 2 + 0.5;
                    this.alpha = Math.random() * 0.5 + 0.1;
                }
                
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    
                    if (this.x < 0) this.x = width;
                    if (this.x > width) this.x = 0;
                    if (this.y < 0) this.y = height;
                    if (this.y > height) this.y = 0;
                }
                
                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
                    ctx.fill();
                }
            }
            
            const initParticles = () => {
                particles = [];
                const count = Math.min(width * 0.05, 100); // Responsive count
                for (let i = 0; i < count; i++) {
                    particles.push(new Particle());
                }
            };
            
            const animate = () => {
                ctx.clearRect(0, 0, width, height);
                particles.forEach(p => {
                    p.update();
                    p.draw();
                });
                requestAnimationFrame(animate);
            };
            
            window.addEventListener('resize', () => {
                resize();
                initParticles();
            });
            
            resize();
            initParticles();
            animate();
        };

        // Lifecycle
        onMounted(() => {
            // 1. Set background image from config
            const bgElement = document.querySelector('.bg-hero');
            if (bgElement && config.images.background) {
                bgElement.style.backgroundImage = `url('${config.images.background}')`;
            }

            // 2. Detect browser language
            const browserLang = navigator.language || navigator.userLanguage; 
            if (browserLang.toLowerCase().includes('zh')) {
                currentLang.value = 'zh';
            }
            
            // 3. Init click outside listener
            document.addEventListener('click', closeMenu);
            
            // 4. Init Canvas
            initCanvas();
        });
        
        onUnmounted(() => {
            document.removeEventListener('click', closeMenu);
        });

        return {
            currentLang,
            config,
            t,
            isZh,
            currentScreenshot,
            showLangMenu,
            availableLangs,
            toggleLangMenu,
            setLang,
            showCTA,
            showGitHub
        };
    }
});

app.mount('#app');
