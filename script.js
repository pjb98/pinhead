// Tweet Images Configuration for $FOREVER
const profileImages = [
    'IMG_4603.jpeg',
    'IMG_4607.jpeg',
    'IMG_4608.jpeg',
    'IMG_4609.jpeg',
    'IMG_4610.jpeg',
    'IMG_4611.jpeg',
    'IMG_4612.jpeg',
    'IMG_4613.jpeg',
    'IMG_4614.jpeg',
    'IMG_4615.jpeg',
    'IMG_4616.jpeg',
    'IMG_4617.jpeg',
    'IMG_4618.jpeg',
    'IMG_4619.jpeg',
    'IMG_4621.jpeg',
    'IMG_4622.jpeg',
    'IMG_4623.jpeg',
    'IMG_4625.jpeg',
    'IMG_4626.jpeg',
    'IMG_4628.jpeg',
    'IMG_4631.jpeg',
    'IMG_4632.jpeg'
];

// Floating Background Tweets ($FOREVER theme)
function createFloatingImages() {
    const container = document.getElementById('floatingImages');

    if (!container) {
        console.error('Floating images container not found!');
        return;
    }

    console.log('Starting floating tweets animation...');

    // Track used positions to avoid overlap
    let usedPositions = [];

    function isPositionValid(left, top, width, height) {
        const minDistance = 150; // Minimum pixels between tweets
        for (let pos of usedPositions) {
            const dx = Math.abs(left - pos.left);
            const dy = Math.abs(top - pos.top);
            if (dx < minDistance && dy < minDistance) {
                return false;
            }
        }
        return true;
    }

    function spawnFloatingImage() {
        const floatingImg = document.createElement('div');
        floatingImg.classList.add('floating-image');

        // Use random image
        const randomImage = profileImages[Math.floor(Math.random() * profileImages.length)];
        floatingImg.style.backgroundImage = `url('${randomImage}')`;

        // Position tweets on the sides to avoid content
        let leftPosition, topPosition, attempts = 0;
        do {
            // Randomly choose left or right side
            const isLeftSide = Math.random() < 0.5;

            if (isLeftSide) {
                // Left side: 0-20% from left
                leftPosition = Math.random() * 20;
            } else {
                // Right side: 75-95% from left
                leftPosition = Math.random() * 20 + 75;
            }

            // Full vertical range
            topPosition = Math.random() * 80 + 5;
            attempts++;
        } while (!isPositionValid(leftPosition, topPosition, 350, 200) && attempts < 20);

        floatingImg.style.left = leftPosition + '%';
        floatingImg.style.top = topPosition + '%';

        // Store position
        usedPositions.push({left: leftPosition, top: topPosition});

        // Tweet-sized dimensions (rectangular) - smaller boxes
        const width = 300 + Math.random() * 100; // Width between 300-400px
        const height = width * 0.56; // Adjust aspect ratio to fit content without blank space
        floatingImg.style.width = width + 'px';
        floatingImg.style.height = height + 'px';

        // Random animation duration - shorter display time
        const duration = 4 + Math.random() * 2;
        floatingImg.style.animationDuration = duration + 's';

        container.appendChild(floatingImg);
        console.log('Spawned floating tweet, total images:', container.children.length);

        // Remove after animation completes and clean up position tracking
        setTimeout(() => {
            if (floatingImg.parentNode) {
                floatingImg.remove();
            }
            // Remove position from tracking after tweet fades out
            usedPositions = usedPositions.filter(pos =>
                pos.left !== leftPosition || pos.top !== topPosition
            );
        }, duration * 1000 + 500);
    }

    // Spawn images frequently for multiple visible tweets
    const spawnInterval = setInterval(() => {
        spawnFloatingImage();
    }, 1500);

    // Spawn initial batch with staggered timing
    for (let i = 0; i < 8; i++) {
        setTimeout(spawnFloatingImage, i * 300);
    }

    // Store interval so we can clear it if needed
    window.floatingImageInterval = spawnInterval;

    console.log('Floating tweets setup complete. Spawning every 1500ms');
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

    const characters = '∞FOREVER01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ffffff';
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
