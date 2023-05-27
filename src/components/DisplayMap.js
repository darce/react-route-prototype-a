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
    const [routeCoords, setRouteCoords] = useState([])

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

        mapRef.current.on('load', () => {
            if (!mapRef.current.getSource('route-source')) {
                mapRef.current.addSource('route-source', {
                    'type': 'geojson',
                    data: {
                        'type': 'Feature'
                    }
                })
            }
            if (mapRef.current.getLayer('route-layer')) return
            mapRef.current.addLayer({
                'id': 'route-layer',
                'type': 'line',
                'source': 'route-source',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#c0ff00',
                    'line-width': 4
                }
            })
        })
    }, [])

    /** On map move */
    useEffect(() => {
        if (!mapRef.current) return // wait for initalization
        mapRef.current.on('move', () => {
            setLng(mapRef.current.getCenter().lng.toFixed(4))
            setLat(mapRef.current.getCenter().lat.toFixed(4))
            setZoom(mapRef.current.getZoom().toFixed(2))
        })
    })

    /** On map click */
    useEffect(() => {
        if (!mapRef.current) return // wait for initalization
        mapRef.current.on('click', handleClickPath)
        return () => {
            mapRef.current.off('click', handleClickPath);
        };
    }, [routeCoords])

    const handleClickPath = (e) => {
        const clickedCoords = e.lngLat;
        setRouteCoords(routeCoords.concat(clickedCoords))
        console.log('coords', routeCoords)
        const geojsonSource = mapRef.current.getSource('route-source')
        geojsonSource.setData({
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                coordinates: spreadCoords([...routeCoords, clickedCoords]),

            }
        })
    }

    const spreadCoords = (coordsArray) => {
        const spreadCoords = coordsArray.map(coords => [coords.lng, coords.lat])
        console.log(spreadCoords)
        return spreadCoords
    }

    return (
        <div>
            <div className="coords-container">
                Longitude: {lng} | Latitude: {lat} | Zoom {zoom}
            </div>
            <div className="map-container" ref={mapContainerRef} />
        </div>
    )
}

export default DisplayMap