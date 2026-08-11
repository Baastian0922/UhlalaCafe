/**
 * Uhlala Café - Interactive Features & Luxury Experience
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileNav();
    initScrollSpy();
    initMenuTabs();
    initCoffeeFinder();
});

/* ==========================================================================
   Header Scroll Effect
   ========================================================================== */
function initHeader() {
    const header = document.querySelector('header');
    
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
}

/* ==========================================================================
   Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    
    if (!menuToggle || !nav) return;
    
    // Create menu burger icon states
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
        
        if (nav.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close nav on click outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && !nav.contains(e.target) && e.target !== menuToggle) {
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close nav when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

/* ==========================================================================
   Active Navigation Scroll spy
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a, .mobile-bottom-nav a');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const options = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the main viewing area
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, options);
    
    sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   Menu Category Tabs
   ========================================================================== */
function initMenuTabs() {
    const tabButtons = document.querySelectorAll('.menu-tab-btn');
    const grids = document.querySelectorAll('.menu-grid');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetCategory = btn.getAttribute('data-tab');
            
            // Toggle active buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle active menu grids with a quick fade animation
            grids.forEach(grid => {
                grid.classList.remove('active');
                if (grid.getAttribute('id') === `menu-${targetCategory}`) {
                    // Let the DOM update first to trigger CSS transitions
                    setTimeout(() => {
                        grid.classList.add('active');
                    }, 50);
                }
            });
        });
    });
}

/* ==========================================================================
   Interactive Coffee Finder
   ========================================================================== */
function initCoffeeFinder() {
    const finder = document.getElementById('coffee-finder-widget');
    if (!finder) return;
    
    const slides = finder.querySelectorAll('.finder-slide');
    const nodes = finder.querySelectorAll('.progress-node');
    const fill = finder.querySelector('.finder-progress-fill');
    const prevBtn = document.getElementById('finder-prev');
    const nextBtn = document.getElementById('finder-next');
    const restartBtn = document.getElementById('finder-restart');
    const bookResultBtn = document.getElementById('finder-book-result');
    
    let currentStep = 0;
    const totalSteps = 3; // Step 0, Step 1, Step 2
    
    // User choices
    const choices = {
        style: null,  // intense / silky / aromatic
        profile: null, // sweet / floral / complex
        time: null     // morning / afternoon / night
    };
    
    // Coffee Database for Recommendations
    const recommendations = {
        geisha: {
            title: "Panamá Geisha V60",
            desc: "Un café etéreo e inigualable. Nuestro Geisha de micro-lote se extrae de forma manual con un método de filtrado de precisión, revelando notas florales excepcionales y una acidez brillante.",
            method: "Pour-over V60",
            origin: "Boquete, Panamá (1,950m)",
            notes: "Jazmín, Durazno blanco, Bergamota",
            sca: "91.5 pts"
        },
        espresso: {
            title: "Ristretto Uhlala Blend",
            desc: "Una extracción densa, corta y sumamente potente. Diseñada para paladares exigentes que aprecian el cuerpo denso, un dulzor natural concentrado y un final persistente.",
            method: "Ristretto Espresso",
            origin: "Etiopía & Colombia Bourbon",
            notes: "Cacao oscuro, Nuez pecana, Piel de naranja",
            sca: "88.5 pts"
        },
        flatwhite: {
            title: "Flat White Velvet",
            desc: "La armonía perfecta entre la intensidad de nuestro espresso y la sedosidad de la leche emulsionada a 62°C. Cremoso, dulce y con un balance térmico inmejorable.",
            method: "Double Shot Espresso & Microfoam",
            origin: "Sidama, Etiopía",
            notes: "Caramelo de mantequilla, Chocolate con leche",
            sca: "89.0 pts"
        },
        coldbrew: {
            title: "Nitro Cold Brew Infusion",
            desc: "Una infusión en frío de 18 horas nitrogenada en grifo. El resultado es una bebida refrescante con una textura extremadamente cremosa, similar a una cerveza negra stout premium.",
            method: "Slow Cold Extraction & Nitrogenated Tap",
            origin: "Nariño, Colombia",
            notes: "Frutos rojos maduros, Maple, Ron añejo",
            sca: "88.0 pts"
        }
    };
    
    // Track option selection
    slides.forEach((slide, slideIdx) => {
        const optionCards = slide.querySelectorAll('.option-card');
        optionCards.forEach(card => {
            card.addEventListener('click', () => {
                // Clear selection in this slide
                optionCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                
                // Save decision
                const category = slide.getAttribute('data-question');
                const val = card.getAttribute('data-value');
                choices[category] = val;
                
                // Enable next button
                nextBtn.removeAttribute('disabled');
            });
        });
    });
    
    const updateProgress = () => {
        // Calculate progress percentage for fill bar (only between nodes)
        // Nodes: index 0, 1, 2, and Result (which hides progress)
        const percent = (currentStep / (totalSteps)) * 100;
        fill.style.width = `${percent}%`;
        
        nodes.forEach((node, idx) => {
            node.classList.remove('active', 'completed');
            if (idx < currentStep) {
                node.classList.add('completed');
                node.innerHTML = '<i class="fas fa-check"></i>';
            } else if (idx === currentStep) {
                node.classList.add('active');
                node.innerText = idx + 1;
            } else {
                node.innerText = idx + 1;
            }
        });
        
        // Toggle Nav Buttons
        if (currentStep === 0) {
            prevBtn.style.visibility = 'hidden';
        } else {
            prevBtn.style.visibility = 'visible';
        }
        
        // Check if next step is already answered to toggle nextBtn state
        if (currentStep < totalSteps) {
            const currentSlide = slides[currentStep];
            const hasSelection = currentSlide.querySelector('.option-card.selected');
            if (hasSelection) {
                nextBtn.removeAttribute('disabled');
            } else {
                nextBtn.setAttribute('disabled', 'true');
            }
            
            // Show next/prev control area
            document.querySelector('.finder-actions').style.display = 'flex';
            document.querySelector('.finder-progress').style.display = 'flex';
        } else {
            // It's the result slide
            document.querySelector('.finder-actions').style.display = 'none';
            document.querySelector('.finder-progress').style.display = 'none';
        }
    };
    
    const showSlide = (index) => {
        slides.forEach((slide, idx) => {
            slide.classList.remove('active');
            if (idx === index) {
                slide.classList.add('active');
            }
        });
    };
    
    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps - 1) {
            currentStep++;
            showSlide(currentStep);
            updateProgress();
        } else if (currentStep === totalSteps - 1) {
            // Compute recommendation and show result
            currentStep++;
            showResult();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            showSlide(currentStep);
            updateProgress();
        }
    });
    
    const showResult = () => {
        // Selection Logic
        let recommendedKey = "flatwhite"; // Default fallback
        
        if (choices.style === "aromatic" && choices.profile === "floral") {
            recommendedKey = "geisha";
        } else if (choices.style === "intense" && choices.profile === "complex") {
            recommendedKey = "geisha";
        } else if (choices.style === "intense" && choices.profile === "sweet") {
            recommendedKey = "espresso";
        } else if (choices.style === "aromatic" && choices.time === "afternoon") {
            recommendedKey = "coldbrew";
        } else if (choices.style === "silky") {
            recommendedKey = "flatwhite";
        } else if (choices.profile === "sweet") {
            recommendedKey = "flatwhite";
        } else if (choices.profile === "complex") {
            recommendedKey = "geisha";
        } else if (choices.profile === "floral") {
            recommendedKey = "geisha";
        }
        
        const coffee = recommendations[recommendedKey];
        
        // Inject results into DOM
        document.getElementById('res-coffee-name').innerText = coffee.title;
        document.getElementById('res-coffee-desc').innerText = coffee.desc;
        document.getElementById('res-val-method').innerText = coffee.method;
        document.getElementById('res-val-origin').innerText = coffee.origin;
        document.getElementById('res-val-notes').innerText = coffee.notes;
        document.getElementById('res-val-sca').innerText = coffee.sca;
        
        // Store recommended name on the book button dataset
        bookResultBtn.setAttribute('data-coffee', coffee.title);
        
        showSlide(totalSteps); // Show result slide
        updateProgress();
    };
    
    restartBtn.addEventListener('click', () => {
        // Reset selections
        choices.style = null;
        choices.profile = null;
        choices.time = null;
        
        slides.forEach(slide => {
            const options = slide.querySelectorAll('.option-card');
            options.forEach(o => o.classList.remove('selected'));
        });
        
        currentStep = 0;
        showSlide(currentStep);
        updateProgress();
    });
    
    bookResultBtn.addEventListener('click', () => {
        // Scroll to visitanos section
        const visitSection = document.getElementById('visitanos');
        if (visitSection) {
            visitSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Init widget state
    updateProgress();
}


