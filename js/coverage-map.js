// Interactive Coverage Map with Directions
function initCoverageMap() {
    const mapCanvas = document.getElementById('coverage-map-canvas');
    if (!mapCanvas) return;

    // JP Pro Wash location
    const jpProWashLocation = { lat: -12.0606, lng: -77.0489 };

    // Initialize map centered on JP Pro Wash
    const map = new google.maps.Map(mapCanvas, {
        zoom: 12,
        center: jpProWashLocation,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true
    });

    // Add marker for JP Pro Wash
    const marker = new google.maps.Marker({
        position: jpProWashLocation,
        map: map,
        title: 'JP Pro Wash - Lavandería en Breña',
        animation: google.maps.Animation.DROP,
        icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
                    <path fill="#1399AB" d="M20,0 C9,0 0,9 0,20 C0,35 20,50 20,50 S40,35 40,20 C40,9 31,0 20,0 Z"/>
                    <circle cx="20" cy="20" r="8" fill="white"/>
                </svg>
            `),
            scaledSize: new google.maps.Size(40, 50),
            anchor: new google.maps.Point(20, 50)
        }
    });

    // Info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px; font-family: 'Inter', sans-serif;">
                <h3 style="margin: 0 0 8px 0; color: #1399AB; font-size: 16px;">JP Pro Wash</h3>
                <p style="margin: 0 0 4px 0; font-size: 14px;">Jr. Jorge Chávez 1154, Breña</p>
                <p style="margin: 0; font-size: 13px; color: #666;">Lunes a Sábado: 10:00 AM - 9:00 PM</p>
                <a href="https://wa.me/51966167314" target="_blank" style="display: inline-block; margin-top: 8px; color: #1399AB; text-decoration: none; font-weight: 600;">
                    📱 WhatsApp: 966 167 314
                </a>
            </div>
        `
    });

    // Show info window on marker click
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });

    // Show info window by default
    infoWindow.open(map, marker);

    // Directions button
    const directionsBtn = document.getElementById('get-directions-btn');
    if (directionsBtn) {
        directionsBtn.style.display = 'block';

        directionsBtn.addEventListener('click', () => {
            // Open Google Maps with directions
            const destination = 'Jr. Jorge Chávez 1154, Breña, Lima';
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
            window.open(mapsUrl, '_blank');
        });
    }

    // Add coverage circles for visual reference
    const coverageCircle = new google.maps.Circle({
        strokeColor: '#1399AB',
        strokeOpacity: 0.4,
        strokeWeight: 2,
        fillColor: '#1399AB',
        fillOpacity: 0.1,
        map: map,
        center: jpProWashLocation,
        radius: 3000 // 3km radius
    });
}

// Make function global for API callback
window.initCoverageMap = initCoverageMap;
