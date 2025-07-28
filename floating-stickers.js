class FloatingStickers {
    constructor() {
        this.stickers = [
            'images/doodles/Samant.png',
            'images/doodles/Shrika.png'
        ];
        this.container = null;
        this.stickerElements = [];
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createStickers());
        } else {
            this.createStickers();
        }
        
        this.isInitialized = true;
    }

    createStickers() {
        const bookCover = document.querySelector('.book-cover');
        if (!bookCover) {
            console.warn('Book cover not found for floating stickers');
            return;
        }

        this.container = document.createElement('div');
        this.container.className = 'floating-stickers-container';
        bookCover.style.position = 'relative';
        bookCover.appendChild(this.container);

        this.stickers.forEach((stickerPath, index) => {
            this.createSticker(stickerPath, index);
        });

        window.addEventListener('resize', () => this.updatePositions());
        
        console.log('Profile photo stickers initialized around book cover');
    }

    createSticker(imagePath, index) {
        const sticker = document.createElement('img');
        sticker.src = imagePath;
        sticker.className = 'floating-sticker profile-sticker';
        sticker.alt = `Profile photo ${index + 1}`;
        
        const size = 80;
        sticker.style.width = `${size}px`;
        sticker.style.height = `${size}px`;
        
        const rotation = Math.random() * 20 - 10;
        sticker.style.transform = `rotate(${rotation}deg)`;
        
        this.setStrategicPosition(sticker, index);
        
        this.container.appendChild(sticker);
        this.stickerElements.push(sticker);

        sticker.addEventListener('error', () => {
            console.warn(`Failed to load profile photo: ${imagePath}`);
            sticker.style.display = 'none';
        });

        sticker.addEventListener('mouseenter', () => {
            const hoverRotation = Math.random() * 15 - 7.5;
            sticker.style.transform = `scale(1.2) rotate(${hoverRotation}deg)`;
            sticker.style.opacity = '1';
            sticker.style.zIndex = '15';
        });

        sticker.addEventListener('mouseleave', () => {
            sticker.style.transform = `rotate(${rotation}deg)`;
            sticker.style.opacity = '';
            sticker.style.zIndex = '';
        });

        setTimeout(() => {
            sticker.style.animationDelay = `${Math.random() * 2}s`;
        }, 100);
    }

    setStrategicPosition(sticker, index) {
        const containerRect = this.container.getBoundingClientRect();
        const stickerSize = 80;
        
        const positions = [
            { x: 20, y: 30 },
            { x: containerRect.width - stickerSize - 20, y: 50 },
            { x: 30, y: containerRect.height - stickerSize - 30 },
            { x: containerRect.width - stickerSize - 30, y: containerRect.height - stickerSize - 50 }
        ];
        
        const position = positions[index % positions.length];
        
        const randomOffsetX = (Math.random() - 0.5) * 30;
        const randomOffsetY = (Math.random() - 0.5) * 30;
        
        sticker.style.left = `${Math.max(0, position.x + randomOffsetX)}px`;
        sticker.style.top = `${Math.max(0, position.y + randomOffsetY)}px`;
    }

    setRandomPosition(sticker) {
        this.setStrategicPosition(sticker, 0);
    }

    updatePositions() {
        this.stickerElements.forEach((sticker, index) => {
            this.setStrategicPosition(sticker, index);
        });
    }

    addSticker(imagePath) {
        if (this.container) {
            this.createSticker(imagePath, this.stickerElements.length);
        }
    }

    toggleVisibility() {
        if (this.container) {
            const isVisible = this.container.style.display !== 'none';
            this.container.style.display = isVisible ? 'none' : 'block';
        }
    }

    destroy() {
        if (this.container) {
            this.container.remove();
            this.container = null;
            this.stickerElements = [];
            this.isInitialized = false;
        }
    }
}

const floatingStickers = new FloatingStickers();

floatingStickers.init();

window.FloatingStickers = FloatingStickers;
window.floatingStickers = floatingStickers;