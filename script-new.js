// ===== VEDETTWEEKEND WEBSITE - MODERN COMPONENT-BASED JAVASCRIPT =====

class VedettWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.loadContent();
    }

    setupEventListeners() {
        // Mobile navigation
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => this.toggleMobileMenu(hamburger, navMenu));
        }

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu(hamburger, navMenu));
        });

        // Header scroll effect
        window.addEventListener('scroll', () => this.handleHeaderScroll());

        // Video controls
        const playButton = document.getElementById('playButton');
        const heroVideo = document.getElementById('heroVideo');
        
        if (playButton && heroVideo) {
            playButton.addEventListener('click', () => this.toggleVideo(playButton, heroVideo));
        }

        // Resize handling
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.handleResize(), 100);
        });

        // Initialize on load
        window.addEventListener('load', () => this.handleLoad());
        

    }

    initializeComponents() {
        // Initialize video autoplay
        this.initializeVideo();
        
        // Initialize smooth scrolling for anchor links
        this.initializeSmoothScrolling();
        
        // Initialize intersection observer for animations
        this.initializeAnimations();
    }

    loadContent() {
        // Load featured artists
        this.loadFeaturedArtists();
        
        // Load sponsors
        this.loadSponsors();
        
        // Load footer sponsors
        this.loadFooterSponsors();
        
        // Load lineup if on lineup page
        if (window.lineup) {
            this.loadLineup();
        }
        
        // Load info if on info page
        if (window.info) {
            this.loadInfo();
        }
    }

    // ===== MOBILE NAVIGATION =====
    toggleMobileMenu(hamburger, navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu(hamburger, navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
    }

    // ===== HEADER SCROLL EFFECT =====
    handleHeaderScroll() {
        const header = document.querySelector('.header');
        const scrollY = window.scrollY;
        
        if (header) {
            if (scrollY > 600) { /* Increased threshold - solid background appears after video section */
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    // ===== VIDEO CONTROLS =====
    initializeVideo() {
        const video = document.getElementById('heroVideo');
        const playButton = document.getElementById('playButton');
        
        if (video && playButton) {
            // Ensure video is muted for autoplay
            video.muted = true;
            
            // Try to autoplay
            video.play().catch(error => {
                console.log('Autoplay prevented:', error);
                // Show play button if autoplay fails
                playButton.style.display = 'block';
            });
            
            // Update button state
            video.addEventListener('play', () => this.updatePlayButton(playButton, false));
            video.addEventListener('pause', () => this.updatePlayButton(playButton, true));
        }
    }

    toggleVideo(playButton, video) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    updatePlayButton(playButton, isPaused) {
        if (isPaused) {
            playButton.textContent = '▶';
            playButton.setAttribute('aria-label', 'Play video');
        } else {
            playButton.textContent = '❚❚';
            playButton.setAttribute('aria-label', 'Pause video');
        }
    }

    // ===== SMOOTH SCROLLING =====
    initializeSmoothScrolling() {
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
    }

    // ===== ANIMATIONS =====
    initializeAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.artist-card, .sponsor-item, .section-header').forEach(el => {
            observer.observe(el);
        });
    }

    // ===== CONTENT LOADING =====
    loadFeaturedArtists() {
        const artistsGrid = document.getElementById('artistsGrid');
        if (!artistsGrid) return;

        // Featured artists data - this would come from Netlify CMS
        const featuredArtists = [
            {
                date: 'VR 25 OKT',
                image: './img/Kezze24.png',
                imageMobile: './img/Kezze-small.jpg',
                title: 'CHECK OUT:',
                djName: 'KEZZE',
                websiteUrl: 'https://www.facebook.com/vedettweekend',
                websiteIcon: 'fas fa-link'
            },
            {
                date: 'ZA 26 OKT',
                image: './img/GekkeBoys24.png',
                imageMobile: './img/GekkeBoys-small.jpg',
                title: 'CHECK OUT:',
                djName: 'GEKKE BOYS',
                websiteUrl: 'https://www.instagram.com/vedettweekend/',
                websiteIcon: 'fas fa-link'
            },
            {
                date: 'VR 25 OKT',
                image: './img/C-track.png',
                imageMobile: './img/C-track-small.jpg',
                title: 'CHECK OUT:',
                djName: 'C-TRACK',
                websiteUrl: 'https://www.tiktok.com/@vedettweekend',
                websiteIcon: 'fas fa-link'
            },
            {
                date: 'ZA 26 OKT',
                image: './img/Tomorrowband24.png',
                imageMobile: './img/Tomorrowband-small.jpg',
                title: 'CHECK OUT:',
                djName: 'TOMORROWBAND',
                websiteUrl: 'https://www.facebook.com/vedettweekend',
                websiteIcon: 'fas fa-link'
            }
        ];

        // Render artist cards
        artistsGrid.innerHTML = featuredArtists.map(artist => this.createArtistCard(artist)).join('');
    }

    createArtistCard(artist) {
        return `
            <a href="${artist.websiteUrl}" class="artist-card-link" target="_blank" rel="noopener noreferrer">
                <div class="artist-card">
                    <div class="card-header">
                        <div class="date-badge">${artist.date}</div>
                        <div class="website-icon">
                            <i class="${artist.websiteIcon}"></i>
                        </div>
                    </div>
                    <div class="artist-image-container">
                        <picture>
                            <source srcset="${artist.imageMobile}" media="(max-width: 768px)">
                            <source srcset="${artist.image}" media="(min-width: 769px)">
                            <img src="${artist.image}" class="artist-image" alt="Artist image" loading="lazy">
                        </picture>
                    </div>
                    <div class="artist-card-footer">
                        <h3 class="artist-title">${artist.title}</h3>
                        <div class="dj-name">${artist.djName}</div>
                    </div>
                </div>
            </a>
        `;
    }

    loadSponsors() {
        const sponsorsGrid = document.getElementById('sponsorsGrid');
        if (!sponsorsGrid) return;

        // Sponsors data - this would come from Netlify CMS
        const sponsors = [
            { image: 'img/Instabel(FV).png', url: 'https://www.instabel.be/', alt: 'Instabel Sponsor' },
            { image: 'img/MaxT(FV).png', url: 'https://www.facebook.com/p/Drankenhandel-Maxt-Dranken-100084040300979/', alt: 'MaxT Sponsor' },
            { image: 'img/dreamsupport(fv).png', url: 'https://www.dreamsupport.be/', alt: 'Dreamsupport Sponsor' },
            { image: 'img/Consteca(FV).png', url: 'https://www.consteca.be/', alt: 'Consteca Sponsor' },
            { image: 'img/Cynthia\'sBakery(FV).png', url: 'https://www.facebook.com/p/Cynthias-bakery-100063702123669/', alt: 'Cynthia\'s Bakery Sponsor' },
            { image: 'img/Thielemans.png', url: 'https://kantoorthielemans.be/', alt: 'Thielemans Sponsor' },
            { image: 'img/Tubo(FV).png', url: 'https://verwarminggids.be/nieuwenrode/tubo-centrale-verwarming-en/', alt: 'Tubo Sponsor' },
            { image: 'img/VanRoey(FV).png', url: 'https://www.vanroey.be/en/', alt: 'VanRoey Sponsor' },
            { image: 'img/Argenta(FV).png', url: 'https://www.argenta.be/nl/kantoren/de-jongh--gits-bv-3136.html', alt: 'Argenta Sponsor' },
            { image: 'img/BakerTilly(FV) 1.png', url: 'https://www.bakertilly.be/nl', alt: 'BakerTilly Sponsor' }
        ];

        // Render sponsor items
        sponsorsGrid.innerHTML = sponsors.map(sponsor => this.createSponsorItem(sponsor)).join('');
    }

    createSponsorItem(sponsor) {
        return `
            <a href="${sponsor.url}" class="sponsor-item" target="_blank" rel="noopener noreferrer">
                <img src="${sponsor.image}" alt="${sponsor.alt}" loading="lazy">
            </a>
        `;
    }

    loadFooterSponsors() {
        const footerSponsors = document.getElementById('footerSponsors');
        if (!footerSponsors) return;

        // Footer sponsors data - this would come from Netlify CMS
        const footerSponsorsList = [
            { image: 'img/BakerTilly(FV) 1.svg', url: 'https://www.bakertilly.be/nl', alt: 'BakerTilly' },
            { image: 'img/Consteca(FV).svg', url: 'https://www.consteca.be/', alt: 'Consteca' },
            { image: 'img/Cynthia\'sBakery(FV).svg', url: 'https://www.facebook.com/p/Cynthias-bakery-100063702123669/', alt: 'Cynthia\'s Bakery' },
            { image: 'img/Datality(FV).svg', url: 'https://www.datality.be/', alt: 'Datality' },
            { image: 'img/VanRoey(FV).png', url: 'https://www.vanroey.be/en/', alt: 'VanRoey' },
            { image: 'img/Instabel(FV).svg', url: 'https://www.instabel.be/', alt: 'Instabel' },
            { image: 'img/Redlogo.svg', url: 'https://www.redbull.com/', alt: 'Red Bull' },
            { image: 'img/CoMarkt(FV).svg', url: 'https://comarkthumbeek.be/', alt: 'CoMarkt' },
            { image: 'img/MaxT(FV).svg', url: 'https://www.facebook.com/p/Drankenhandel-Maxt-Dranken-100084040300979/', alt: 'MaxT' },
            { image: 'img/Marivoet(FV).svg', url: 'https://www.marivoet.be/', alt: 'Marivoet' },
            { image: 'img/1tubo.svg', url: 'https://verwarminggids.be/nieuwenrode/tubo-centrale-verwarming-en/', alt: 'Tubo' },
            { image: 'img/Argenta(FV).svg', url: 'https://www.argenta.be/nl/kantoren/de-jongh--gits-bv-3136.html', alt: 'Argenta' },
            { image: 'img/dreamsupport(fv).png', url: 'https://www.dreamsupport.be', alt: 'Dreamsupport' },
            { image: 'img/DuvelMoortgat.svg', url: 'https://www.duvel.com/nl-be', alt: 'Duvel Moortgat' },
            { image: 'img/Broothaerts.svg', url: 'https://www.selexion.be/nl/ad/broothaerts-elektro-bvba', alt: 'Broothaerts' }
        ];

        // Render footer sponsor logos
        footerSponsors.innerHTML = footerSponsorsList.map(sponsor => `
            <a href="${sponsor.url}" target="_blank" rel="noopener noreferrer" aria-label="${sponsor.alt}">
                <img src="${sponsor.image}" alt="${sponsor.alt}" loading="lazy">
            </a>
        `).join('');
    }

    // ===== RESIZE HANDLING =====
    handleResize() {
        // Close mobile menu on resize if screen becomes large
        if (window.innerWidth > 768) {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('navMenu');
            if (hamburger && navMenu) {
                this.closeMobileMenu(hamburger, navMenu);
            }
        }
    }

    // ===== LOAD HANDLING =====
    handleLoad() {
        // Add loaded class to body for potential CSS animations
        document.body.classList.add('loaded');
        
        // Initialize any additional components that need the page to be fully loaded
        this.initializeLazyLoading();
    }

    // ===== LAZY LOADING =====
    initializeLazyLoading() {
        // Intersection Observer for lazy loading images
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        // Observe images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== ERROR HANDLING =====
    handleError(error, context) {
        console.error(`Error in ${context}:`, error);
        
        // You could add error reporting here (e.g., to a service like Sentry)
        // or show user-friendly error messages
    }

    // ===== PERFORMANCE MONITORING =====
    measurePerformance() {
        // Measure page load performance
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                    }
                }, 0);
            });
        }
    }

    // ===== LINEUP FUNCTIONALITY =====
    loadLineup() {
        // Check if we have CMS data, otherwise fall back to hardcoded data
        if (window.lineupCMS) {
            this.loadLineupFromCMS();
        } else if (window.lineup) {
            this.loadLineupFromData();
        }
    }

    loadLineupFromCMS() {
        // Load Friday timeline from CMS
        const fridayTimeline = document.getElementById('fridayTimeline');
        if (fridayTimeline && window.lineupCMS.friday) {
            fridayTimeline.innerHTML = window.lineupCMS.friday.events.map(event => this.createTimelineItem(event)).join('');
        }

        // Load Saturday timeline from CMS
        const saturdayTimeline = document.getElementById('saturdayTimeline');
        if (saturdayTimeline && window.lineupCMS.saturday) {
            saturdayTimeline.innerHTML = window.lineupCMS.saturday.events.map(event => this.createTimelineItem(event)).join('');
        }
    }

    loadLineupFromData() {
        // Load Friday timeline from hardcoded data
        const fridayTimeline = document.getElementById('fridayTimeline');
        if (fridayTimeline && window.lineup.friday) {
            fridayTimeline.innerHTML = window.lineup.friday.events.map(event => this.createTimelineItem(event)).join('');
        }

        // Load Saturday timeline from hardcoded data
        const saturdayTimeline = document.getElementById('saturdayTimeline');
        if (saturdayTimeline && window.lineup.saturday) {
            saturdayTimeline.innerHTML = window.lineup.saturday.events.map(event => this.createTimelineItem(event)).join('');
        }
    }

    createTimelineItem(event) {
        const specialClass = event.isSpecial ? 'special-event' : '';
        return `
            <div class="timeline-item">
                <div class="timeline-time">${event.time}</div>
                <a href="${event.url}" target="_blank" rel="noopener noreferrer" class="timeline-content ${specialClass}">
                    <div class="timeline-card">
                        <div class="timeline-card-image">
                            <img src="${event.image}" alt="${event.artist}" class="timeline-image">
                        </div>
                        <div class="timeline-card-info">
                            <h4 class="timeline-artist">${event.artist}</h4>
                            <p class="timeline-dj-description">${event.description}</p>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }

    // ===== INFO PAGE CONTENT LOADING =====
    loadInfo() {
        // Check if we're on the info page
        if (!document.querySelector('.info-main')) return;
        
        // Try to load from CMS first, fallback to hardcoded data
        if (window.infoCMS) {
            this.loadInfoFromCMS();
        } else if (window.info) {
            this.loadInfoFromData();
        }
    }

    loadInfoFromCMS() {
        // Update location info
        if (window.infoCMS.location) {
            this.updateLocationInfo(window.infoCMS.location);
        }
        
        // Update facilities
        if (window.infoCMS.facilities) {
            this.updateFacilities(window.infoCMS.facilities);
        }
        
        // Update payment info
        if (window.infoCMS.paymentInfo) {
            this.updatePaymentInfo(window.infoCMS.paymentInfo);
        }
        
        // Update traffic info
        if (window.infoCMS.traffic) {
            this.updateTrafficInfo(window.infoCMS.traffic);
        }
        
        // Update FAQ
        if (window.infoCMS.faq) {
            this.updateFAQ(window.infoCMS.faq);
        }
    }

    loadInfoFromData() {
        // Update location info
        if (window.info.location) {
            this.updateLocationInfo(window.info.location);
        }
        
        // Update facilities
        if (window.info.facilities) {
            this.updateFacilities(window.info.facilities);
        }
        
        // Update payment info
        if (window.info.paymentInfo) {
            this.updatePaymentInfo(window.info.paymentInfo);
        }
        
        // Update traffic info
        if (window.info.traffic) {
            this.updateTrafficInfo(window.info.traffic);
        }
        
        // Update FAQ
        if (window.info.faq) {
            this.updateFAQ(window.info.faq);
        }
    }

    updateLocationInfo(location) {
        // Update map iframe
        const mapIframe = document.querySelector('.map-container iframe');
        if (mapIframe && location.mapUrl) {
            mapIframe.src = location.mapUrl;
        }
        
        // Update location cards
        const bikeInfo = document.querySelector('.info-card:nth-child(1) p');
        const carInfo = document.querySelector('.info-card:nth-child(2) p');
        const pickupInfo = document.querySelector('.info-card:nth-child(3) p');
        
        if (bikeInfo && location.bikeInfo) bikeInfo.textContent = location.bikeInfo;
        if (carInfo && location.carInfo) carInfo.textContent = location.carInfo;
        if (pickupInfo && location.pickupInfo) pickupInfo.textContent = location.pickupInfo;
    }

    updateFacilities(facilities) {
        const facilitiesGrid = document.querySelector('.facilities-grid');
        if (!facilitiesGrid) return;
        
        // Handle both array of strings and array of objects
        const facilityItems = Array.isArray(facilities) ? facilities : [];
        
        // Icon mapping for each facility type
        const facilityIcons = {
            'Bewaakte vestiaire': 'fas fa-tshirt',
            'EHBO Post': 'fas fa-first-aid',
            'Lounge': 'fas fa-couch',
            'WC-Dorp': 'fas fa-toilet',
            'Eetkraam': 'fas fa-utensils',
            'Security': 'fas fa-shield-alt',
            'Doorsales': 'fas fa-ticket-alt'
        };
        
        facilitiesGrid.innerHTML = facilityItems.map(facility => {
            const facilityName = typeof facility === 'string' ? facility : (facility.facility || 'Facility');
            const iconClass = facilityIcons[facilityName] || 'fas fa-check';
            return `
                <div class="facility-item">
                    <i class="${iconClass}"></i>
                    <span>${facilityName}</span>
                </div>
            `;
        }).join('');
    }

    updatePaymentInfo(paymentInfo) {
        const paymentElement = document.querySelector('.payment-info p');
        if (paymentElement) {
            paymentElement.innerHTML = paymentInfo;
        }
        
        // Add payment icon to the heading
        const paymentHeading = document.querySelector('.payment-info h3');
        if (paymentHeading && !paymentHeading.querySelector('i')) {
            paymentHeading.innerHTML = `
                <i class="fas fa-credit-card"></i>
                <span>Betaalmethoden</span>
            `;
        }
    }

    updateTrafficInfo(traffic) {
        // Update traffic image
        const trafficImage = document.getElementById('trafficImage');
        if (trafficImage && traffic.image) {
            trafficImage.src = traffic.image;
        }
        
        // Update traffic text
        const trafficText = document.querySelector('.traffic-text');
        if (trafficText) {
            trafficText.innerHTML = `
                <p>${traffic.description}</p>
                <p>${traffic.perimeterInfo}</p>
            `;
        }
    }

    updateFAQ(faq) {
        const faqList = document.querySelector('.faq-list');
        if (!faqList) return;
        
        faqList.innerHTML = faq.map((item, index) => `
            <div class="faq-item">
                <h3>${index + 1}. ${item.question}</h3>
                <p>${item.answer}</p>
            </div>
        `).join('');
    }


}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    try {
        new VedettWebsite();
    } catch (error) {
        console.error('Failed to initialize VedettWebsite:', error);
    }
});

// ===== NETLIFY CMS INTEGRATION =====
if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
        if (!user) {
            window.netlifyIdentity.on("login", () => {
                document.location.href = "/admin/";
            });
        }
    });
}

// ===== SERVICE WORKER REGISTRATION (OPTIONAL) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== EXPORT FOR MODULE USAGE (OPTIONAL) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VedettWebsite;
}
