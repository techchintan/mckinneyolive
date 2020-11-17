import React, { Component } from 'react'
import { Container, Row, Col } from 'styled-bootstrap-grid'

// Components
import Box from '../../components/Box'
import Heading from '../../components/Heading'

import {
  SDollar,
  SBuilding,
  SParking,
  SRestaurant,
  SCoffee,
  IconWrap,
} from './styles'

const gmapColumn = {
  position: 'relative',
  overflow: 'hidden',
}

class MapForm extends Component {
  componentDidMount() {
    this.renderMap()
  }

  renderMap = () => {
    loadScript(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDcOUZbp3_ZctDiriJaRdh95EoJH4YHwLc&libraries=places,geometry&callback=initAutocomplete'
    )
    window.initAutocomplete = this.initAutocomplete
  }

  codeAddress = (geocoder, map) => {
    var address = '300 Crescent Ct, Dallas, TX 75201, USA'
    geocoder.geocode({ address: address }, function(results, status) {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location)
        new window.google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
        })
      } else {
        alert('Geocode was not successful for the following reason: ' + status)
      }
    })
  }

  fillsearch = textval => {
    document.getElementById('pac-input').value = textval
    var input = document.getElementById('pac-input')
    input.focus()
    window.google.maps.event.trigger(input, 'focus')
    window.google.maps.event.trigger(input, 'keydown', {
      keyCode: 13,
    })
  }

  initAutocomplete = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 32.79341, lng: -96.80473 },
      zoom: 16,
      mapTypeId: 'roadmap',
      mapTypeControl: true,
      panControl: true,
      zoomControl: true,
      streetViewControl: true,
    })

    var geocoder = new window.google.maps.Geocoder()
    this.codeAddress(geocoder, map)

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input')
    var searchBox = new window.google.maps.places.SearchBox(input)
    // map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds())
    })

    var markers = []
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces()

      if (places.length === 0) {
        return
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null)
      })

      markers = []

      // For each place, get the icon, name and location.
      var bounds = new window.google.maps.LatLngBounds()
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log('Returned place contains no geometry')
          return
        }
        var icon = {
          url: place.icon,
          size: new window.google.maps.Size(71, 71),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 34),
          scaledSize: new window.google.maps.Size(25, 25),
        }

        // Create a marker for each place.
        markers.push(
          new window.google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location,
          })
        )

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location)
        }
      })

      map.fitBounds(bounds)
    })
  }
  render() {
    return (
      <Container>
        <Row>
          <Col col={12} xl={12}>
            <Row className="mapRow">
              <Col col={12} xl={8} style={gmapColumn}>
                <div id="map" className="gmapDiv"></div>
              </Col>
              <Col col={12} xl={4}>
                <Box mt={[4, null, null, null, 0]}>
                  <Heading fontSize={[4, '36px']} mb={3}>
                    Search <span>Location</span>
                  </Heading>
                </Box>
                <input
                  id="pac-input"
                  className="controls locationSearch"
                  type="text"
                  placeholder="Search Box"
                />
                <Box my={4}>
                  Use the search box above to find local area amenities (e.g.
                  restaurants, etc.) or click below for specific select.
                </Box>
                <Box>
                  <IconWrap onClick={e => this.fillsearch('banks')}>
                    <SDollar />
                    <div>Banks and ATM’s</div>
                  </IconWrap>
                  <IconWrap onClick={e => this.fillsearch('hotels')}>
                    <SBuilding />
                    <div>Hotel</div>
                  </IconWrap>
                  <IconWrap onClick={e => this.fillsearch('parking')}>
                    <SParking />
                    <div>Parking</div>
                  </IconWrap>
                  <IconWrap onClick={e => this.fillsearch('restaurant')}>
                    <SRestaurant />
                    <div>Restaurant</div>
                  </IconWrap>
                  <IconWrap onClick={e => this.fillsearch('Coffee Shops')}>
                    <SCoffee />
                    <div>Coffee</div>
                  </IconWrap>
                </Box>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName('script')[0]
  var script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default MapForm
