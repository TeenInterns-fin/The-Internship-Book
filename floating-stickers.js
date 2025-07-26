// Floating Stickers System
class FloatingStickers {
    constructor() {
        this.stickers = [
            // Only profile photos from doodles folder
            'images/doodles/Samant.png',
            'images/doodles/Shrika.png'
        ];
        this.container = null;
        this.stickerElements = [];
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        
        // Wait for DOM to be ready
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

        // Create container for stickers positioned relative to book cover
        this.container = document.createElement('div');
        this.container.className = 'floating-stickers-container';
        bookCover.style.position = 'relative'; // Ensure book cover is positioned
        bookCover.appendChild(this.container);

        // Create individual stickers
        this.stickers.forEach((stickerPath, index) => {
            this.createSticker(stickerPath, index);
        });

        // Update positions on resize
        window.addEventListener('resize', () => this.updatePositions());
        
        console.log('Profile photo stickers initialized around book cover');
    }

    createSticker(imagePath, index) {
        const sticker = document.createElement('img');
        sticker.src = imagePath;
        sticker.className = 'floating-sticker profile-sticker';
        sticker.alt = `Profile photo ${index + 1}`;
        
        // Profile photos get bigger size and are invisible
        const size = 80; // Increased from 60 to 80px
        sticker.style.width = `${size}px`;
        sticker.style.height = `${size}px`;
        
        // Add subtle rotation for natural look
        const rotation = Math.random() * 20 - 10; // -10 to +10 degrees
        sticker.style.transform = `rotate(${rotation}deg)`;
        
        // Set strategic position around book cover
        this.setStrategicPosition(sticker, index);
        
        // Add to container
        this.container.appendChild(sticker);
        this.stickerElements.push(sticker);

        // Handle image load errors
        sticker.addEventListener('error', () => {
            console.warn(`Failed to load profile photo: ${imagePath}`);
            sticker.style.display = 'none';
        });

        // Add enhanced hover effect
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

        // Add subtle bobbing animation with delay
        setTimeout(() => {
            sticker.style.animationDelay = `${Math.random() * 2}s`;
        }, 100);
    }

    setStrategicPosition(sticker, index) {
        // Get container dimensions
        const containerRect = this.container.getBoundingClientRect();
        const stickerSize = 80; // Updated to match new size
        
        // Define strategic positions around the book cover
        const positions = [
            // Top left area
            { x: 20, y: 30 },
            // Top right area  
            { x: containerRect.width - stickerSize - 20, y: 50 },
            // Bottom left area
            { x: 30, y: containerRect.height - stickerSize - 30 },
            // Bottom right area
            { x: containerRect.width - stickerSize - 30, y: containerRect.height - stickerSize - 50 }
        ];
        
        // Use modulo to cycle through positions if we have more stickers than positions
        const position = positions[index % positions.length];
        
        // Add some randomness to avoid perfect alignment
        const randomOffsetX = (Math.random() - 0.5) * 30;
        const randomOffsetY = (Math.random() - 0.5) * 30;
        
        sticker.style.left = `${Math.max(0, position.x + randomOffsetX)}px`;
        sticker.style.top = `${Math.max(0, position.y + randomOffsetY)}px`;
    }

    setRandomPosition(sticker) {
        // Keep this method for backwards compatibility, but use strategic positioning
        this.setStrategicPosition(sticker, 0);
    }

    updatePositions() {
        // Reposition stickers on window resize using strategic positioning
        this.stickerElements.forEach((sticker, index) => {
            this.setStrategicPosition(sticker, index);
        });
    }

    // Method to add new stickers dynamically
    addSticker(imagePath) {
        if (this.container) {
            this.createSticker(imagePath, this.stickerElements.length);
        }
    }

    // Method to toggle stickers visibility
    toggleVisibility() {
        if (this.container) {
            const isVisible = this.container.style.display !== 'none';
            this.container.style.display = isVisible ? 'none' : 'block';
        }
    }

    // Method to remove all stickers
    destroy() {
        if (this.container) {
            this.container.remove();
            this.container = null;
            this.stickerElements = [];
            this.isInitialized = false;
        }
    }
}

// Initialize floating stickers
const floatingStickers = new FloatingStickers();

// Auto-initialize when script loads
floatingStickers.init();

// Export for global access
window.FloatingStickers = FloatingStickers;
window.floatingStickers = floatingStickers;
