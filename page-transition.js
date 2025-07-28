class PageTransitionManager {
    constructor() {
        this.currentPage = window.location.pathname;
        this.transitionElement = null;
        this.contentLoaded = false;
        this.initTransitionElement();
        this.setupEventListeners();
    }

    initTransitionElement() {
        if (!document.querySelector('.page-transition')) {
            const transitionEl = document.createElement('div');
            transitionEl.className = 'page-transition';
            
            const loader = document.createElement('div');
            loader.className = 'loader';
            
            for (let i = 0; i < 3; i++) {
                const circle = document.createElement('div');
                circle.className = 'loader-circle';
                loader.appendChild(circle);
            }
            
            const loaderText = document.createElement('div');
            loaderText.className = 'loader-text';
            loaderText.innerHTML = 'Loading content<span class="dots"></span>';
            
            transitionEl.appendChild(loader);
            transitionEl.appendChild(loaderText);
            
            document.body.appendChild(transitionEl);
            this.transitionElement = transitionEl;
        } else {
            this.transitionElement = document.querySelector('.page-transition');
        }
    }

    setupEventListeners() {
        window.addEventListener('load', () => {
            this.hideTransition();
        });
        
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            
            if (link && link.getAttribute('href') && 
                !link.getAttribute('href').startsWith('http') && 
                !link.getAttribute('href').startsWith('#') && 
                !link.hasAttribute('data-no-transition')) {
                
                e.preventDefault();
                this.navigateTo(link.href);
            }
        });
    }

    navigateTo(url) {
        if (url === window.location.href) return;
        
        this.showTransition();
        
        setTimeout(() => {
            window.location.href = url;
        }, 500); 
    }

    showTransition() {
        document.body.classList.add('loading');
        this.transitionElement.classList.remove('fade-out');
    }

    hideTransition() {
        this.transitionElement.classList.add('fade-out');
        
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 600); 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.transitionManager = new PageTransitionManager();
});