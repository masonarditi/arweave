import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =  'pk.eyJ1IjoibWFzb25hcmRpdGkiLCJhIjoiY20zNnprM2c5MGI3aDJrcHNwcTlqc2tkYiJ9._ZXBwh8zhsRKp1hn1_b75A';
// Replace with your Mapbox access token

const Map = () => {
    const [map, setMap] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const newMap = new mapboxgl.Map({
            container: 'mapContainer', // ID of the container
            style: 'mapbox://styles/mapbox/dark-v11', // Map style
            center: [-122.4194, 37.7749], // Default center (San Francisco)
            zoom: 10, // Default zoom level
        });

        // Load pins from local storage
        const savedPins = JSON.parse(localStorage.getItem('pins')) || [];
        savedPins.forEach(pin => {
            new mapboxgl.Marker()
                .setLngLat(pin)
                .addTo(newMap);
        });

        newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
        setMap(newMap);

        return () => newMap.remove(); // Cleanup on unmount
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (!searchQuery) return; // Exit if searchQuery is empty

        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxgl.accessToken}`);
        const data = await response.json();
        if (data.features && data.features.length > 0) {
            const [lng, lat] = data.features[0].center;
            // Fly to the new location based on search query
            map.flyTo({ center: [lng, lat], zoom: 12 });
        } else {
            console.error("No results found for the search query.");
        }
    };

    const handleAddPin = (e) => {
        const coordinates = map.getCenter(); // Get the current center of the map
        new mapboxgl.Marker() // Create a new marker
            .setLngLat(coordinates) // Set the marker's position
            .addTo(map); // Add the marker to the map

        // Save the pin to local storage
        const savedPins = JSON.parse(localStorage.getItem('pins')) || [];
        savedPins.push(coordinates);
        localStorage.setItem('pins', JSON.stringify(savedPins));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter a location"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch(); // Trigger search on Enter key press
                    }
                }}
                className="border rounded px-2 py-1"
            />
            <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handleSearch} className="border rounded px-2 py-1">
                    Search
                </button>
                <button onClick={handleAddPin} className="border rounded px-2 py-1">
                    Add Pin
                </button>
            </div>
            <div id="mapContainer" style={{ width: '100%', height: '400px' }}></div>
        </div>
    );
};

export default Map;
