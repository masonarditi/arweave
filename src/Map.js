import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = () => {
    const [map, setMap] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        // Set the Mapbox access token
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFzb25hcmRpdGkiLCJhIjoiY20zNnprM2c5MGI3aDJrcHNwcTlqc2tkYiJ9._ZXBwh8zhsRKp1hn1_b75A';

        // Create a new map instance
        const newMap = new mapboxgl.Map({
            container: 'mapContainer', // ID of the container
            style: 'mapbox://styles/mapbox/dark-v11', // Map style
            
            center: [-122.4194, 37.7749], // Default center (San Francisco)
            zoom: 10, // Default zoom level
        });

        // Add navigation controls to the map
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Clean up on unmount
        setMap(newMap);
        return () => {
            newMap.remove();
        };
    }, []);

    useEffect(() => {
        if (map && searchQuery) {
            const handleSearch = async () => {
                const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxgl.accessToken}`);
                const data = await response.json();
                if (data.features && data.features.length > 0) {
                    const [lng, lat] = data.features[0].center;
                    map.flyTo({ center: [lng, lat], zoom: 12 });
                }
            };
            handleSearch();
        }
    }, [map, searchQuery]);

    return <div id="mapContainer" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
