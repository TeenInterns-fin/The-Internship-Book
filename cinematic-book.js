class CinematicBookViewer {
    constructor(options = {}) {
        this.pages = options.pages || [];
        this.bookCoverSrc = options.bookCover || 'images/trials/trial3.png';
        
        this.settings = {
            pageFlipInterval: 1000,
            autoFlipCount: 5,
            zoomDuration: 800,
            bookOpenDuration: 1800,
            pageFlipDuration: 800
        };
        
        this.isActive = false;
        this.isAnimating = false;
        this.isPaused = false;
        this.currentPageIndex = 0;
        this.animationTimeout = null;
        
        this.sounds = {};
        this.audioEnabled = true;
        this.masterVolume = 0.7;
        
        this.init();
    }
    
    init() {
        this.setupElements();
        this.setupAudio();
        this.setupEventListeners();
        this.createParticles();
        this.generatePages();
    }
    
    setupElements() {
        this.overlay = document.getElementById('cinematicOverlay');
        this.book = document.getElementById('cinematicBook');
        this.cover = document.getElementById('cinematicCover');
        this.pagesContainer = document.getElementById('cinematicPages');
        this.particles = document.getElementById('bookParticles');
        
        this.closeBtn = document.getElementById('cinematicClose');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.soundToggle = document.getElementById('soundToggle');
        this.volumeSlider = document.getElementById('volumeSlider');
    }
    
    setupAudio() {
        this.audioContext = null;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
            this.audioEnabled = false;
            return;
        }
        
        this.sounds = {
            whoosh: () => this.generateWhooshSound(),
            bookOpen: () => this.generateBookOpenSound(),
            pageFlip: () => this.generatePageFlipSound(),
            ambient: () => this.generateAmbientSound()
        };
        
        this.ambientGain = null;
    }
    
    setupEventListeners() {
        this.closeBtn.addEventListener('click', () => this.close());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isActive) {
                this.close();
            }
        });
        
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.restartBtn.addEventListener('click', () => this.restart());
        this.soundToggle.addEventListener('click', () => this.toggleSound());
        
        this.volumeSlider.addEventListener('input', (e) => {
            this.setVolume(e.target.value / 100);
        });
        
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
    }
    
    generatePages() {
        this.pagesContainer.innerHTML = '';
        
        this.pages.forEach((pageSrc, index) => {
            const pageDiv = document.createElement('div');
            pageDiv.className = 'page-3d';
            pageDiv.dataset.page = index;
            
            pageDiv.innerHTML = `
                <div class="page-front">
                    <img src="${pageSrc}" alt="Page ${index + 1}" loading="lazy">
                </div>
                <div class="page-back"></div>
            `;
            
            this.pagesContainer.appendChild(pageDiv);
        });
    }
    
    createParticles() {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 4) + 's';
            
            this.particles.appendChild(particle);
        }
    }
    
    async open() {
        if (this.isAnimating) return;
        
        this.isActive = true;
        this.isAnimating = true;
        this.currentPageIndex = 0;
        
        this.cover.src = this.bookCoverSrc;
        this.resetAnimations();
        
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        this.playSound('whoosh');
        
        await this.delay(600);
        await this.animateZoomIn();
        await this.animateBookOpening();
        await this.startAutoPageFlipping();
        
        this.isAnimating = false;
        this.updatePlayPauseButton();
    }
    
    async animateZoomIn() {
        return new Promise(resolve => {
            gsap.fromTo(this.book, 
                { 
                    scale: 0.3, 
                    rotationY: -15,
                    z: -500
                },
                {
                    scale: 1,
                    rotationY: 0,
                    z: 0,
                    duration: this.settings.zoomDuration / 1000,
                    ease: 'power3.out',
                    onComplete: resolve
                }
            );
        });
    }
    
    async animateBookOpening() {
        this.playSound('bookOpen');
        this.playSound('ambient');
        
        return new Promise(resolve => {
            this.book.classList.add('book-opening');
            setTimeout(resolve, this.settings.bookOpenDuration);
        });
    }
    
    async startAutoPageFlipping() {
        const totalPages = Math.min(this.settings.autoFlipCount, this.pages.length);
        
        for (let i = 0; i < totalPages; i++) {
            if (!this.isActive || this.isPaused) break;
            
            await this.delay(this.settings.pageFlipInterval);
            
            if (!this.isActive || this.isPaused) break;
            
            await this.flipPage(i);
            this.currentPageIndex = i + 1;
        }
    }
    
    async flipPage(pageIndex) {
        const page = this.pagesContainer.querySelector(`[data-page="${pageIndex}"]`);
        if (!page) return;
        
        this.playPageFlipSound();
        
        return new Promise(resolve => {
            page.classList.add('page-flipping');
            setTimeout(resolve, this.settings.pageFlipDuration);
        });
    }
    
    playPageFlipSound() {
        if (this.sounds.pageFlip && this.audioEnabled) {
            const rate = 0.8 + (Math.random() * 0.4);
            this.sounds.pageFlip.rate(rate);
            this.sounds.pageFlip.play();
        }
    }
    
    playSound(soundName) {
        if (this.sounds[soundName] && this.audioEnabled && this.audioContext) {
            try {
                if (this.audioContext.state === 'suspended') {
                    this.audioContext.resume();
                }
                this.sounds[soundName]();
            } catch (e) {
                console.log('Error playing sound:', e);
            }
        }
    }
    
    stopSound(soundName) {
        if (soundName === 'ambient' && this.ambientGain) {
            this.ambientGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
            setTimeout(() => {
                if (this.ambientGain) {
                    this.ambientGain.disconnect();
                    this.ambientGain = null;
                }
            }, 500);
        }
    }
    
    generateWhooshSound() {
        const duration = 0.8;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + duration);
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);
        filter.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + duration);
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(this.masterVolume * 0.3, this.audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    generateBookOpenSound() {
        const duration = 0.6;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);
        oscillator.frequency.linearRampToValueAtTime(180, this.audioContext.currentTime + 0.2);
        oscillator.frequency.linearRampToValueAtTime(120, this.audioContext.currentTime + duration);
        
        filter.type = 'highpass';
        filter.frequency.value = 80;
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(this.masterVolume * 0.2, this.audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    generatePageFlipSound() {
        const duration = 0.3;
        
        const bufferSize = this.audioContext.sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
        }
        
        const source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        source.buffer = buffer;
        
        filter.type = 'bandpass';
        filter.frequency.value = 1500 + (Math.random() * 500);
        filter.Q.value = 2;
        
        gainNode.gain.setValueAtTime(this.masterVolume * 0.4, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
        
        source.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        source.start(this.audioContext.currentTime);
    }
    
    generateAmbientSound() {
        if (this.ambientGain) return;
        
        const oscillator1 = this.audioContext.createOscillator();
        const oscillator2 = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        oscillator1.type = 'sine';
        oscillator1.frequency.value = 80;
        
        oscillator2.type = 'sine';
        oscillator2.frequency.value = 120;
        
        filter.type = 'lowpass';
        filter.frequency.value = 200;
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(this.masterVolume * 0.1, this.audioContext.currentTime + 2);
        
        oscillator1.connect(filter);
        oscillator2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator1.start(this.audioContext.currentTime);
        oscillator2.start(this.audioContext.currentTime);
        
        this.ambientGain = gainNode;
        this.ambientOscillators = [oscillator1, oscillator2];
    }
    
    togglePlayPause() {
        this.isPaused = !this.isPaused;
        this.updatePlayPauseButton();
        
        if (this.isPaused) {
            this.stopSound('ambient');
        } else {
            this.playSound('ambient');
        }
    }
    
    updatePlayPauseButton() {
        this.playPauseBtn.textContent = this.isPaused ? '▶' : '⏸';
        this.playPauseBtn.classList.toggle('active', !this.isPaused);
    }
    
    restart() {
        if (this.isAnimating) return;
        
        this.resetAnimations();
        this.isPaused = false;
        this.currentPageIndex = 0;
        
        setTimeout(() => {
            this.animateBookOpening();
            this.startAutoPageFlipping();
        }, 300);
    }
    
    toggleSound() {
        this.audioEnabled = !this.audioEnabled;
        this.soundToggle.textContent = this.audioEnabled ? '🔊' : '🔇';
        this.soundToggle.classList.toggle('active', this.audioEnabled);
        
        if (!this.audioEnabled) {
            this.stopSound('ambient');
        }
    }
    
    setVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        
        if (this.ambientGain) {
            this.ambientGain.gain.setValueAtTime(this.masterVolume * 0.1, this.audioContext.currentTime);
        }
    }
    
    resetAnimations() {
        this.book.classList.remove('book-opening');
        
        const pages = this.pagesContainer.querySelectorAll('.page-3d');
        pages.forEach(page => page.classList.remove('page-flipping'));
        
        gsap.set(this.book, {
            scale: 1,
            rotationY: 0,
            z: 0
        });
    }
    
    async close() {
        if (!this.isActive) return;
        
        this.isActive = false;
        this.isPaused = false;
        
        this.stopSound('ambient');
        
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
        }
        
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        await this.delay(600);
        this.resetAnimations();
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    trigger() {
        this.open();
    }
    
    destroy() {
        if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
        }
        
        if (this.audioContext) {
            this.audioContext.close();
        }
        
        if (this.ambientOscillators) {
            this.ambientOscillators.forEach(osc => {
                try {
                    osc.stop();
                } catch (e) {
                    
                }
            });
        }
    }
}

window.CinematicBookViewer = CinematicBookViewer;