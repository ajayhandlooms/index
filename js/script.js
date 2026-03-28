document.addEventListener('DOMContentLoaded', function() {
    const panoConfigs = [
        { img: 'images/pano1.jpg', title: 'Exterior' },
        { img: 'images/pano2.jpg', title: 'Interior' },
        { img: 'images/pano3.jpg', title: 'Fabric Area' }
    ];
    
    let currentViewer = null;
    const container = document.getElementById('pano-container');
    
    // Function to load panorama
    function loadPano(index) {
        const config = panoConfigs[index];
        console.log(`Loading: ${config.title} - ${config.img}`);
        
        // Destroy previous viewer
        if (currentViewer) {
            currentViewer.destroy();
        }
        
        // Load new panorama
        currentViewer = pannellum.viewer('pano-container', {
            type: 'equirectangular',
            panorama: config.img,
            autoLoad: true,
            compass: true,
            showControls: true,
            showZoomCtrl: true
        });
    }
    
    // Initial load
    loadPano(0);
    
    // Tab switching - REPLACES panorama
    document.querySelectorAll('.tour-tab').forEach((tab, index) => {
        tab.addEventListener('click', function() {
            // Update active tab
            document.querySelectorAll('.tour-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Load new panorama (replaces old one)
            loadPano(index);
        });
    });
    
    // Keep ALL your other code...
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
    
    // Scroll animations (your existing code)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.product-card, .review-card, .gallery-item, .about-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    console.log('✅ All panoramas ready!');
});