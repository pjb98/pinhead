// Gallery Configuration
const galleryImages = [
    {
        src: 'Screenshot 2025-10-07 152005.jpg',
        caption: 'Solana is Forever'
    },
    {
        src: 'Screenshot 2025-10-07 152614.jpg',
        caption: 'Forever Movement'
    },
    {
        src: 'Screenshot 2025-10-07 152635.jpg',
        caption: 'Solana Strong'
    },
    {
        src: 'Screenshot 2025-10-07 152722.jpg',
        caption: 'The Believers'
    },
    {
        src: 'Screenshot 2025-10-07 152740.jpg',
        caption: 'Forever'
    }
];

// Floating Background Images
function createFloatingImages() {
    const container = document.getElementById('floatingImages');

    if (!container) {
        console.error('Floating images container not found!');
        return;
    }

    const images = galleryImages.map(img => img.src);
    console.log('Starting floating images animation...');

    function spawnFloatingImage() {
        const floatingImg = document.createElement('div');
        floatingImg.classList.add('floating-image');

        // Random image from gallery
        const randomImage = images[Math.floor(Math.random() * images.length)];
        floatingImg.style.backgroundImage = `url('${randomImage}')`;

        // Random starting position (left side of screen)
        const leftPosition = Math.random() * 90;
        floatingImg.style.left = leftPosition + '%';

        // Tweet-sized dimensions (width x height for tweet screenshots)
        const width = 500;
        const height = 150;
        floatingImg.style.width = width + 'px';
        floatingImg.style.height = height + 'px';

        // Random animation duration (slower)
        const duration = 15 + Math.random() * 10;
        floatingImg.style.animationDuration = duration + 's';

        // Add some horizontal drift
        const drift = -20 + Math.random() * 40;
        floatingImg.style.setProperty('--drift', drift + 'px');

        container.appendChild(floatingImg);
        console.log('Spawned floating image, total images:', container.children.length);

        // Remove after animation completes
        setTimeout(() => {
            if (floatingImg.parentNode) {
                floatingImg.remove();
            }
        }, duration * 1000 + 500);
    }

    // Spawn images less frequently
    const spawnInterval = setInterval(() => {
        spawnFloatingImage();
    }, 2000);

    // Spawn initial batch with staggered timing
    for (let i = 0; i < 5; i++) {
        setTimeout(spawnFloatingImage, i * 400);
    }

    // Store interval so we can clear it if needed
    window.floatingImageInterval = spawnInterval;

    console.log('Floating images setup complete. Spawning every 2000ms');
}

// Initialize gallery
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');

    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.caption;
        img.loading = 'lazy';

        const caption = document.createElement('div');
        caption.classList.add('gallery-caption');
        caption.textContent = image.caption;

        galleryItem.appendChild(img);
        galleryItem.appendChild(caption);

        // Add click event for lightbox
        galleryItem.addEventListener('click', () => {
            openLightbox(image.src, image.caption);
        });

        galleryGrid.appendChild(galleryItem);
    });
}

// Lightbox functionality
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');

    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');

    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close lightbox on click outside image or on close button
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});

// Smooth scroll for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll reveal animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.lore-section, .legend-section, .gallery-section, .join-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// Ticker animation - duplicate for seamless loop
function setupTicker() {
    const ticker = document.querySelector('.ticker-content');
    if (ticker) {
        const tickerClone = ticker.cloneNode(true);
        ticker.parentElement.appendChild(tickerClone);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // initGallery(); // Gallery removed from HTML
    revealOnScroll();
    setupTicker();
    createFloatingImages();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
