document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    
    function updateToggleText(theme) {
        const toggleText = document.querySelector('.toggle-text');
        if (toggleText) {
            toggleText.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
        }
    }
    
    updateToggleText(savedTheme);
    
    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleText(newTheme);
        
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
    
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            toggleTheme();
        }
    });
});