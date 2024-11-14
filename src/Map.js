import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =  'pk.eyJ1IjoibWFzb25hcmRpdGkiLCJhIjoiY20zNnprM2c5MGI3aDJrcHNwcTlqc2tkYiJ9._ZXBwh8zhsRKp1hn1_b75A';
// Replace with your Mapbox access token

const Map = () => {
    const [map, setMap] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [coordinates, setCoordinates] = useState({ lng: null, lat: null });
    const [locationName, setLocationName] = useState('');
    const [pins, setPins] = useState([]);

    useEffect(() => {
        const newMap = new mapboxgl.Map({
            container: 'mapContainer', // ID of the container
            style: 'mapbox://styles/mapbox/dark-v11', // Map style
            center: [-122.4194, 37.7749], // Default center (San Francisco)
            zoom: 10, // Default zoom level
        });
        

        newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
        setMap(newMap);

        return () => newMap.remove(); // Cleanup on unmount
    }, []);

    useEffect(() => {
        const savedPins = JSON.parse(localStorage.getItem('pins')) || [];
        setPins(savedPins);

        if (map) {
            savedPins.forEach(pin => {
                if (typeof pin.lng === 'number' && typeof pin.lat === 'number') {
                    new mapboxgl.Marker()
                        .setLngLat([pin.lng, pin.lat])
                        .addTo(map);
                } else {
                    console.error("Invalid pin data:", pin);
                }
            });
        }
    }, [map]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (!searchQuery) return; // Exit if searchQuery is empty

        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxgl.accessToken}`);
        const data = await response.json();
        if (data.features && data.features.length > 0) {
            const [lng, lat] = data.features[0].center;
            setCoordinates({ lng, lat });
            setLocationName(data.features[0].place_name);
            
            // Fly to the new location based on search query
            map.flyTo({ center: [lng, lat], zoom: 12 });
        } else {
            console.error("No results found for the search query.");
        }
    };

    const handleAddPin = (e) => {
        const coordinates = map.getCenter(); // Get the current center of the map
        const newPin = {
            lng: coordinates.lng,
            lat: coordinates.lat,
            name: locationName,
        };
        
        setPins((prevPins) => {
            const updatedPins = [...prevPins, newPin];
            localStorage.setItem('pins', JSON.stringify(updatedPins));
            return updatedPins;
        });

        new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map);
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
            {coordinates.lng && coordinates.lat && (
                <div>
                    <p>Longitude: {coordinates.lng}</p>
                    <p>Latitude: {coordinates.lat}</p>
                    <p>Location: {locationName}</p>
                </div>
            )}
            <div>
                <h3>Saved Pins:</h3>
                {pins.map((pin, index) => (
                    <div key={index}>
                        <p>Longitude: {pin.lng}</p>
                        <p>Latitude: {pin.lat}</p>
                        <p>Location: {pin.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Map;
