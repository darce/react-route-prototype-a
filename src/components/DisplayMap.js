import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const DisplayMap = () => {
    const mapContainerRef = useRef(null)
    const mapRef = useRef(null)
    const [lng, setLng] = useState([-73.9442345])
    const [lat, setLat] = useState([40.7191821])
    const [zoom, setZoom] = useState([13])

    /** Initialize map when component mounts */
    useEffect(() => {
        if (mapRef.current) return // initialize map only once
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [lng, lat],
            zoom: zoom,
            /** Avaiable style options: https://docs.mapbox.com/api/maps/#styles */
            style: 'mapbox://styles/mapbox/navigation-night-v1'
        })
    })

    /** On map move */
    useEffect(() => {
        if(!mapRef.current) return // wait for initalization
        mapRef.current.on('move', () => {
            setLng(mapRef.current.getCenter().lng.toFixed(4))
            setLat(mapRef.current.getCenter().lat.toFixed(4))
            setZoom(mapRef.current.getZoom().toFixed(2))
        })

    })


    return (
        <div>
            <div className ="coords-container">
                Longitude: {lng} | Latitude: {lat} | Zoom {zoom}
            </div>
        <div className="map-container" ref={mapContainerRef} />
        </div>
    )
}

export default DisplayMap