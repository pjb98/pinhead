// Profile Picture Images Configuration
const profileImages = [
    'G20V1CWaAAA3asJ.jfif'
];

// Floating Background Profile Pictures (Anonymous theme)
function createFloatingImages() {
    const container = document.getElementById('floatingImages');

    if (!container) {
        console.error('Floating images container not found!');
        return;
    }

    console.log('Starting floating profile pictures animation...');

    function spawnFloatingImage() {
        const floatingImg = document.createElement('div');
        floatingImg.classList.add('floating-image');

        // Use the main image
        const randomImage = profileImages[Math.floor(Math.random() * profileImages.length)];
        floatingImg.style.backgroundImage = `url('${randomImage}')`;

        // Random starting position (across full width)
        const leftPosition = Math.random() * 90;
        floatingImg.style.left = leftPosition + '%';

        // Profile picture circular dimensions
        const size = 80 + Math.random() * 120; // Random sizes between 80px and 200px
        floatingImg.style.width = size + 'px';
        floatingImg.style.height = size + 'px';

        // Random animation duration
        const duration = 12 + Math.random() * 8;
        floatingImg.style.animationDuration = duration + 's';

        // Add horizontal drift
        const drift = -30 + Math.random() * 60;
        floatingImg.style.setProperty('--drift', drift + 'px');

        container.appendChild(floatingImg);
        console.log('Spawned floating profile picture, total images:', container.children.length);

        // Remove after animation completes
        setTimeout(() => {
            if (floatingImg.parentNode) {
                floatingImg.remove();
            }
        }, duration * 1000 + 500);
    }

    // Spawn images frequently for profile picture cult effect
    const spawnInterval = setInterval(() => {
        spawnFloatingImage();
    }, 1500);

    // Spawn initial batch with staggered timing
    for (let i = 0; i < 8; i++) {
        setTimeout(spawnFloatingImage, i * 300);
    }

    // Store interval so we can clear it if needed
    window.floatingImageInterval = spawnInterval;

    console.log('Floating profile pictures setup complete. Spawning every 1500ms');
}

// Copy contract address functionality
function setupCopyButton() {
    const copyButton = document.getElementById('copyButton');
    const contractAddress = document.getElementById('contractAddress');

    if (copyButton && contractAddress) {
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(contractAddress.textContent);

                // Visual feedback
                const originalText = copyButton.innerHTML;
                copyButton.innerHTML = '<span>✓ Copied!</span>';
                copyButton.style.background = 'var(--neon-green)';

                setTimeout(() => {
                    copyButton.innerHTML = originalText;
                    copyButton.style.background = 'var(--matrix-green)';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = contractAddress.textContent;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    const originalText = copyButton.innerHTML;
                    copyButton.innerHTML = '<span>✓ Copied!</span>';
                    copyButton.style.background = 'var(--neon-green)';

                    setTimeout(() => {
                        copyButton.innerHTML = originalText;
                        copyButton.style.background = 'var(--matrix-green)';
                    }, 2000);
                } catch (err2) {
                    console.error('Fallback copy failed:', err2);
                }
                document.body.removeChild(textArea);
            }
        });
    }
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
    const elements = document.querySelectorAll('.lore-section, .legend-section, .contract-section, .join-section');

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

// Matrix rain effect (optional - subtle background effect)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.05';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = 'ANON01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    setupTicker();
    createFloatingImages();
    setupCopyButton();
    createMatrixRain(); // Subtle matrix effect
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
