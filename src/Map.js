import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = () => {
    useEffect(() => {
        // Set the Mapbox access token
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFzb25hcmRpdGkiLCJhIjoiY20zNnprM2c5MGI3aDJrcHNwcTlqc2tkYiJ9._ZXBwh8zhsRKp1hn1_b75A';

        // Create a new map instance
        const map = new mapboxgl.Map({
            container: 'mapContainer', // ID of the container
            style: 'mapbox://styles/mapbox/dark-v11', // Map style
            
            center: [-122.4194, 37.7749], // Default center (San Francisco)
            zoom: 10, // Default zoom level
        });

        // Add navigation controls to the map
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Clean up on unmount
        return () => {
            map.remove();
        };
    }, []);

    return <div id="mapContainer" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
