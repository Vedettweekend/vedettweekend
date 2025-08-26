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
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }

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
        
        // Initialize countdown timer
        this.initializeCountdown();
    }

    loadContent() {
        // Featured artists are now loaded from CMS in index.html
        
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





    // ===== VIDEO CONTROLS =====
    initializeVideo() {
        const heroVideo = document.getElementById('heroVideo');
        if (!heroVideo) return;
        
        // Autoplay video on mobile (muted)
        if (window.innerWidth <= 768) {
            heroVideo.muted = true;
            heroVideo.play().catch(() => {
                // Autoplay failed, show play button
                const playButton = document.getElementById('playButton');
                if (playButton) playButton.style.display = 'block';
            });
        }
    }

    toggleVideo(playButton, video) {
        if (video.paused) {
            video.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
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
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.artist-card, .sponsor-item, .section-header').forEach(el => {
            observer.observe(el);
        });
    }

    // ===== COUNTDOWN TIMER =====
    initializeCountdown() {
        // Get individual countdown elements
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;

        const targetDate = new Date('2025-10-24T20:00:00').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                // Event has started
                daysElement.textContent = '00';
                hoursElement.textContent = '00';
                minutesElement.textContent = '00';
                secondsElement.textContent = '00';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update individual elements
            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ===== CONTENT LOADING =====
    // Featured artists are now loaded from CMS in index.html

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
        // This function is now handled by the loadFeaturedSponsors() function in index.html
        // Featured sponsors are loaded dynamically from the CMS
        console.log('Featured sponsors loading handled by loadFeaturedSponsors()');
    }

    // createSponsorItem function removed - now handled by loadFeaturedSponsors() in index.html

    // Load Footer Sponsors from CMS (New expandable panel structure)
    async loadFooterSponsors() {
        try {
            const response = await fetch('content/home/footer-sponsors.md');
            const text = await response.text();
            
    
            
            // Parse frontmatter to get sponsors list
            const sponsorsMatch = text.match(/sponsors:\s*\n([\s\S]*?)(?=\n---|$)/);
            
            if (sponsorsMatch) {
                const sponsorsSection = sponsorsMatch[1];
    
                
                const sponsors = [];
                
                // Handle both field orders: altText first OR active first
                const sponsorMatches = sponsorsSection.matchAll(/(?:^|\n)\s*-\s*(?:altText|active):/g);
    
                
                // Reset the iterator
                const sponsorMatches2 = sponsorsSection.matchAll(/(?:^|\n)\s*-\s*(?:altText|active):/g);
                
                for (const match of sponsorMatches2) {
                    const startIndex = match.index;
                    

                    
                    // Find the end of this sponsor item (next dash or end of section)
                    const nextSponsorDash = sponsorsSection.indexOf('\n  - ', startIndex + 1);
                    const endIndex = nextSponsorDash > -1 ? nextSponsorDash : sponsorsSection.length;
                    

                    
                    // Extract the full sponsor block
                    const sponsorBlock = sponsorsSection.substring(startIndex, endIndex);
                    

                    
                    // Extract each field using regex (order doesn't matter)
                    const altTextMatch = sponsorBlock.match(/altText:\s*"?([^"\n]+)"?/);
                    const imageMatch = sponsorBlock.match(/image:\s*"?([^"\n]+)"?/);
                    const websiteUrlMatch = sponsorBlock.match(/websiteUrl:\s*"?([^"\n]+)"?/);
                    const activeMatch = sponsorBlock.match(/active:\s*(true|false)/);
                    

                    
                    // Check if sponsor is active and has required fields
                    if (activeMatch && activeMatch[1] === 'true' && imageMatch && websiteUrlMatch) {
                        // Ensure URL has proper protocol
                        let urlValue = websiteUrlMatch[1].trim();
                        if (urlValue && !urlValue.startsWith('http://') && !urlValue.startsWith('https://')) {
                            urlValue = 'https://' + urlValue;
                        }
                        
                        const sponsor = {
                            image: imageMatch[1].trim(),
                            websiteUrl: urlValue,
                            altText: altTextMatch ? altTextMatch[1].trim() : 'Footer Sponsor'
                        };
                        
                        sponsors.push(sponsor);
                        
                    } else {
                        // Sponsor was not active or missing required fields - skip it
                    }
                }
                

                
                // Display active footer sponsors in footer
                const footerSponsorsContainer = document.getElementById('footerSponsors');
                if (footerSponsorsContainer && sponsors.length > 0) {
                    const htmlContent = sponsors.map(sponsor => `
                        <a href="${sponsor.websiteUrl}" class="footer-sponsor" target="_blank" rel="noopener noreferrer">
                            <img src="${sponsor.image}" alt="${sponsor.altText}" loading="lazy">
                        </a>
                    `).join('');
                    
                    footerSponsorsContainer.innerHTML = htmlContent;

                }
            } else {

            }
            
        } catch (error) {
            console.error('Footer sponsor loading error:', error);
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
        // Load hardcoded info data
        if (window.info) {
            this.updateLocationInfo(window.info.location);
            this.updateFacilities(window.info.facilities);
            this.updatePaymentInfo(window.info.paymentInfo);
            this.updateTrafficInfo(window.info.traffic);
            this.updateFAQ(window.info.faq);
        }
    }

    updateLocationInfo(locationData) {
        // Your HTML already has the location info hardcoded, so no updates needed
        // This function is kept for future CMS integration
    }

    updateFacilities(facilitiesData) {
        // Your HTML already has the facilities hardcoded, so no updates needed
        // This function is kept for future CMS integration
    }

    updatePaymentInfo(paymentData) {
        // Your HTML already has the payment info hardcoded, so no updates needed
        // This function is kept for future CMS integration
    }

    updateTrafficInfo(trafficData) {
        // Your HTML already has the traffic info hardcoded, so no updates needed
        // This function is kept for future CMS integration
    }

    updateFAQ(faqData) {
        // Your HTML already has the FAQ hardcoded, so no updates needed
        // This function is kept for future CMS integration
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
        
        // Load footer sponsors from CMS
        this.loadFooterSponsors();
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

        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== TICKETSHOP FUNCTIONALITY =====
    loadTicketshop() {
        // Check if we have CMS data, otherwise fall back to hardcoded data
        if (window.ticketshopCMS) {
            this.loadTicketshopFromCMS();
        } else if (window.ticketshop) {
            this.loadTicketshopFromData();
        }
    }

    loadTicketshopFromCMS() {
        // Load ticketshop data from CMS
        if (window.ticketshopCMS.iframeUrl) {
            const iframe = document.getElementById('ticketshopIframe');
            if (iframe) {
                iframe.src = window.ticketshopCMS.iframeUrl;
            }
        }
    }

    loadTicketshopFromData() {
        // Load ticketshop data from hardcoded data
        if (window.ticketshop && window.ticketshop.iframeUrl) {
            const iframe = document.getElementById('ticketshopIframe');
            if (iframe) {
                iframe.src = window.ticketshop.iframeUrl;
            }
        }
    }
}

// ===== STRAPI CMS INTEGRATION =====
// Strapi API integration will be added here when ready

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

// Fullscreen functions are already defined in the HTML files

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    new VedettWebsite();
});
