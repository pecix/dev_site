document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    /**
     * ZARZĄDZANIE MOTYWEM (DARK / LIGHT)
     */
    // 1. Sprawdź, czy użytkownik ma zapisany motyw
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    // Ustaw domyślny motyw lub pobrany
    if (savedTheme === 'light') {
        setTheme('light');
    } else {
        setTheme('dark');
    }

    // Dodanie nasłuchiwacza zdarzeń do przycisku przełączania motywu
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        setTheme(newTheme);
    });

    /**
     * Funkcja aplikująca motyw i zmieniająca ikonę
     */
    function setTheme(theme) {
        // Ustaw atrybut dla CSS
        htmlElement.setAttribute('data-theme', theme);
        // Zapisz preferencję do pamięci
        localStorage.setItem('portfolio-theme', theme);
        
        // Zmień ikonkę słońca / księżyca
        if (theme === 'dark') {
            // W trybie ciemnym pokazujemy księżyc (lub można pokazać słońce sugerujące 'zmień na światło')
            // Przyjmijmy: ikonka pokazuje obecny tryb wizualnie lub akcję. Dajmy Słońce, by kliknięcie włączyło jasność.
            themeIcon.className = 'bi bi-sun-fill fs-5 text-warning';
        } else {
            // W trybie jasnym pokazujemy księżyc, by móc przełączyć na dark
            themeIcon.className = 'bi bi-moon-stars-fill fs-5 text-dark';
        }
    }

    /**
     * PŁYNNE PRZEWIJANIE (SMOOTH SCROLL) 
     * Dla estetyki przy kliknięciu na linki menu
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Konfiguracja scrolla biorąca pod uwagę pływający (fixed) nawigator
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Zamknij mobilne menu po kliknięciu
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });
});
