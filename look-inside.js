class LookInsideViewer {
    constructor() {
        this.currentPage = 0;
        this.selectedGalleryPage = 0;
        this.currentMainImage = 'images/trials/trial3.png';
        this.pages = [
            'images/trials/trial3.png',
            'images/insight/1.jpg',
            'images/insight/2.jpg',
            'images/insight/3.jpg',
            'images/insight/4.jpg',
            'images/insight/5.jpg',
            'images/insight/6.jpg',
            'images/insight/7.jpg'
        ];
        this.pageLabels = [
            'Cover',
            'Page 1',
            'Page 2', 
            'Page 3',
            'Page 4',
            'Page 5',
            'Page 6',
            'Page 7'
        ];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.generateThumbnails();
        setTimeout(() => this.generateGallery(), 100);
        this.addMobileSupport();
        this.preloadImages();
    }
    
    bindEvents() {
        const trigger = document.getElementById('lookInsideTrigger');
        if (trigger) {
            trigger.addEventListener('click', () => this.openModal());
        }
        
        const closeBtn = document.getElementById('modalClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        const modal = document.getElementById('lookInsideModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
        
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousPage());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextPage());
        }
        
        const zoomBtn = document.getElementById('openZoomView');
        if (zoomBtn) {
            zoomBtn.addEventListener('click', () => this.openModalFromGallery());
        }
        
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('lookInsideModal');
            if (modal && modal.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.previousPage();
                        break;
                    case 'ArrowRight':
                        this.nextPage();
                        break;
                }
            }
        });
    }
    
    addMobileSupport() {
        const pagesContainer = document.getElementById('lookInsideModal');
        if (pagesContainer) {
            this.addSwipeSupport(pagesContainer);
        }
    }
    
    addSwipeSupport(element) {
        let startX = 0;
        let startY = 0;
        
        element.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        element.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextPage();
                } else {
                    this.previousPage();
                }
            }
            
            startX = 0;
            startY = 0;
        });
    }
    
    preloadImages() {
        const imagesToPreload = this.pages.slice(0, 3);
        imagesToPreload.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    generateThumbnails() {
        const container = document.getElementById('thumbnailContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.pages.forEach((page, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = page;
            thumbnail.alt = `Page ${index + 1}`;
            thumbnail.className = 'thumbnail';
            thumbnail.dataset.page = index;
            thumbnail.setAttribute('role', 'tab');
            thumbnail.setAttribute('aria-label', `Go to page ${index + 1}`);
            thumbnail.setAttribute('tabindex', index === 0 ? '0' : '-1');
            
            if (index === 0) {
                thumbnail.classList.add('active');
                thumbnail.setAttribute('aria-selected', 'true');
            } else {
                thumbnail.setAttribute('aria-selected', 'false');
            }
            
            thumbnail.addEventListener('click', () => this.goToPage(index));
            thumbnail.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.goToPage(index);
                }
            });
            
            container.appendChild(thumbnail);
        });
    }
    
    generateGallery() {
        const container = document.getElementById('insidePagesGrid');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.pages.forEach((page, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-page';
            galleryItem.dataset.page = index;
            
            if (index === 0) {
                galleryItem.classList.add('selected');
            }
            
            galleryItem.innerHTML = `
                <img src="${page}" alt="${this.pageLabels[index]}" loading="lazy">
                <div class="gallery-page-number">${this.pageLabels[index] === 'Cover' ? 'C' : index}</div>
            `;
            
            galleryItem.addEventListener('click', () => this.selectGalleryPage(index));
            
            container.appendChild(galleryItem);
        });
    }
    
    openModal() {
        const modal = document.getElementById('lookInsideModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.add('opening');
            
            modal.offsetHeight;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                modal.classList.remove('opening');
            }, 300);
            
            this.loadPage(0);
        }
    }
    
    closeModal() {
        const modal = document.getElementById('lookInsideModal');
        if (modal) {
            modal.classList.add('closing');
            modal.classList.remove('active');
            
            setTimeout(() => {
                modal.style.display = 'none';
                modal.classList.remove('closing');
                document.body.style.overflow = '';
                this.hideImage();
            }, 300);
        }
    }
    
    loadPage(pageIndex) {
        if (pageIndex < 0 || pageIndex >= this.pages.length) return;
        
        this.currentPage = pageIndex;
        
        const spinner = document.getElementById('loadingSpinner');
        const image = document.getElementById('currentPageImage');
        
        if (spinner) spinner.style.display = 'block';
        if (image) image.style.display = 'none';
        
        const newImage = new Image();
        newImage.onload = () => {
            if (image) {
                image.src = newImage.src;
                image.style.display = 'block';
            }
            if (spinner) spinner.style.display = 'none';
        };
        
        newImage.onerror = () => {
            console.error(`Failed to load page: ${this.pages[pageIndex]}`);
            if (spinner) spinner.style.display = 'none';
            if (image) {
                image.style.display = 'none';
                this.showErrorMessage('Unable to load page. Please try again.');
            }
        };
        
        newImage.src = this.pages[pageIndex];
        
        this.updateUI();
    }
    
    hideImage() {
        const image = document.getElementById('currentPageImage');
        if (image) {
            image.style.display = 'none';
        }
    }
    
    showErrorMessage(message) {
        const viewer = document.querySelector('.page-viewer');
        if (viewer) {
            const existingError = viewer.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                color: #666;
                font-size: 1.1rem;
                text-align: center;
                padding: 2rem;
            `;
            errorDiv.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 1rem;">📖</div>
                <div>${message}</div>
            `;
            
            viewer.appendChild(errorDiv);
            
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.remove();
                }
            }, 3000);
        }
    }
    
    updateUI() {
        const counter = document.getElementById('pageCounter');
        if (counter) {
            counter.textContent = `${this.currentPage + 1} / ${this.pages.length}`;
        }
        
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 0;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentPage === this.pages.length - 1;
        }
        
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            const isActive = index === this.currentPage;
            thumb.classList.toggle('active', isActive);
            thumb.setAttribute('aria-selected', isActive.toString());
            thumb.setAttribute('tabindex', isActive ? '0' : '-1');
        });
        
        const activeThumbnail = document.querySelector('.thumbnail.active');
        if (activeThumbnail) {
            activeThumbnail.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }
    
    previousPage() {
        if (this.currentPage > 0) {
            this.loadPage(this.currentPage - 1);
        }
    }
    
    nextPage() {
        if (this.currentPage < this.pages.length - 1) {
            this.loadPage(this.currentPage + 1);
        }
    }
    
    goToPage(pageIndex) {
        this.loadPage(pageIndex);
    }
    
    selectGalleryPage(pageIndex) {
        this.selectedGalleryPage = pageIndex;
        this.currentMainImage = this.pages[pageIndex];
        
        const galleryPages = document.querySelectorAll('.gallery-page');
        galleryPages.forEach((page, index) => {
            page.classList.toggle('selected', index === pageIndex);
        });
        
        const mainBookImage = document.querySelector('.preview-img');
        if (mainBookImage) {
            mainBookImage.style.opacity = '0.7';
            
            const newImage = new Image();
            newImage.onload = () => {
                mainBookImage.src = newImage.src;
                mainBookImage.style.opacity = '1';
                
                mainBookImage.alt = this.pageLabels[pageIndex] === 'Cover' ? 
                    'Teen Interns Book Cover' : 
                    `Teen Interns Book - ${this.pageLabels[pageIndex]}`;
            };
            
            newImage.onerror = () => {
                mainBookImage.src = 'images/trials/trial3.png';
                mainBookImage.style.opacity = '1';
                console.error(`Failed to load page: ${this.pages[pageIndex]}`);
            };
            
            newImage.src = this.pages[pageIndex];
        }
    }
    
    openModalFromGallery() {
        const modal = document.getElementById('lookInsideModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.add('opening');
            
            modal.offsetHeight;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                modal.classList.remove('opening');
            }, 300);
            
            this.loadPage(this.selectedGalleryPage);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const lookInside = new LookInsideViewer();
});

window.LookInsideUtils = {
    preloadImages: function(imageUrls) {
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    },
    
    addSwipeSupport: function(element, leftCallback, rightCallback) {
        let startX = 0;
        let startY = 0;
        
        element.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        element.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
                if (diffX > 0) {
                    rightCallback && rightCallback();
                } else {
                    leftCallback && leftCallback();
                }
            }
            
            startX = 0;
            startY = 0;
        });
    }
};