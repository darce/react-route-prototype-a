import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import './App.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const App = () => {
    const mapContainerRef = useRef(null)

    /** Initialize map when component mounts */
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            /** Avaiable style options: https://docs.mapbox.com/api/maps/#styles */
            style: 'mapbox://styles/mapbox/navigation-night-v1',
            center: [-73.9442345, 40.7191821],
            zoom: 15.5
        })

        /** Add map controls */
        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

        /** Clean up on unmount */
        return () => map.remove()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

        return (
            <div>
                <div className="map-container" ref={mapContainerRef} />
            </div>
        );
    }

export default App
