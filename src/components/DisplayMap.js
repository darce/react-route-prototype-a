import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const DisplayMap = () => {
    const mapContainerRef = useRef(null)
    /** Initialize map when component mounts */
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            /** Avaiable style options: https://docs.mapbox.com/api/maps/#styles */
            style: 'mapbox://styles/mapbox/navigation-night-v1',
            center: [-73.9442345, 40.7191821],
            zoom: 13
        })
    /** Add map controls */
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
    }, [])

    return(
        <div className="map-container" ref={mapContainerRef} />
    )
}

export default DisplayMap