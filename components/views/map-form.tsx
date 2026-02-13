"use client"

import { useEffect, useRef, useCallback } from 'react'
import styled, { css } from 'styled-components'
import { Dollar } from '@styled-icons/boxicons-regular/Dollar'
import { Building } from '@styled-icons/fa-regular/Building'
import { Parking } from '@styled-icons/boxicons-solid/Parking'
import { Restaurant } from '@styled-icons/boxicons-regular/Restaurant'
import { Coffee } from '@styled-icons/boxicons-solid/Coffee'
import Box from '@/components/ui/box'
import Heading from '@/components/ui/heading'

const iconStyles = css`
  color: ${(props) => props.theme.colors.primary};
  flex: none;
  width: 1rem;
  margin-right: 1rem;
`

const SDollar = styled(Dollar)`${iconStyles}`
const SBuilding = styled(Building)`${iconStyles}`
const SParking = styled(Parking)`${iconStyles}`
const SRestaurant = styled(Restaurant)`${iconStyles}`
const SCoffee = styled(Coffee)`${iconStyles}`

const IconWrap = styled.div`
  align-items: center;
  display: flex;
  margin: 0.5rem 0;
  cursor: pointer;
  &:hover { opacity: 0.7; }
`

declare global {
  interface Window {
    google: any
    initAutocomplete: () => void
  }
}

function loadScript(url: string) {
  const index = window.document.getElementsByTagName('script')[0]
  const script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index?.parentNode?.insertBefore(script, index)
}

export default function MapForm() {
  const mapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const fillSearch = useCallback((textVal: string) => {
    if (inputRef.current) {
      inputRef.current.value = textVal
      inputRef.current.focus()
      if (window.google) {
        window.google.maps.event.trigger(inputRef.current, 'focus')
        window.google.maps.event.trigger(inputRef.current, 'keydown', { keyCode: 13 })
      }
    }
  }, [])

  const initAutocomplete = useCallback(() => {
    if (!mapRef.current) return

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 32.79341, lng: -96.80473 },
      zoom: 16,
      mapTypeId: 'roadmap',
      mapTypeControl: true,
      panControl: true,
      zoomControl: true,
      streetViewControl: true,
    })

    const geocoder = new window.google.maps.Geocoder()
    const address = '2021 McKinney Avenue, Dallas, TX 75201, USA'
    geocoder.geocode({ address }, (results: any, status: string) => {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location)
        new window.google.maps.Marker({ map, position: results[0].geometry.location })
      }
    })

    if (inputRef.current) {
      const searchBox = new window.google.maps.places.SearchBox(inputRef.current)
      map.addListener('bounds_changed', () => searchBox.setBounds(map.getBounds()))

      let markers: any[] = []
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces()
        if (!places || places.length === 0) return

        markers.forEach((marker: any) => marker.setMap(null))
        markers = []

        const bounds = new window.google.maps.LatLngBounds()
        places.forEach((place: any) => {
          if (!place.geometry) return
          const icon = {
            url: place.icon,
            size: new window.google.maps.Size(71, 71),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(17, 34),
            scaledSize: new window.google.maps.Size(25, 25),
          }
          markers.push(new window.google.maps.Marker({
            map, icon, title: place.name, position: place.geometry.location,
          }))
          if (place.geometry.viewport) bounds.union(place.geometry.viewport)
          else bounds.extend(place.geometry.location)
        })
        map.fitBounds(bounds)
      })
    }
  }, [])

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyDcOUZbp3_ZctDiriJaRdh95EoJH4YHwLc'
    window.initAutocomplete = initAutocomplete
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&callback=initAutocomplete`)
  }, [initAutocomplete])

  return (
    <Box display="flex" flexWrap="wrap">
      <Box flex="1 1 66%" minWidth="300px" style={{ position: 'relative', overflow: 'hidden' }}>
        <div ref={mapRef} style={{ width: '100%', height: '500px' }} />
      </Box>
      <Box flex="1 1 33%" minWidth="280px" p={4}>
        <Heading fontSize={[4, '36px']} mb={3}>
          Search <span>Location</span>
        </Heading>
        <input
          ref={inputRef}
          className="controls locationSearch"
          type="text"
          placeholder="Search Box"
          style={{
            border: '3px solid #ccc',
            fontSize: '1.25rem',
            padding: '1.125rem',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
        <Box my={4}>
          Use the search box above to find local area amenities (e.g. restaurants, etc.) or click below for specific select.
        </Box>
        <Box>
          <IconWrap onClick={() => fillSearch('banks')}>
            <SDollar /><div>{"Banks and ATM's"}</div>
          </IconWrap>
          <IconWrap onClick={() => fillSearch('hotels')}>
            <SBuilding /><div>Hotel</div>
          </IconWrap>
          <IconWrap onClick={() => fillSearch('parking')}>
            <SParking /><div>Parking</div>
          </IconWrap>
          <IconWrap onClick={() => fillSearch('restaurant')}>
            <SRestaurant /><div>Restaurant</div>
          </IconWrap>
          <IconWrap onClick={() => fillSearch('Coffee Shops')}>
            <SCoffee /><div>Coffee</div>
          </IconWrap>
        </Box>
      </Box>
    </Box>
  )
}
