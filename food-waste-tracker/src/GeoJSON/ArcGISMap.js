import React, {Component} from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import MapView, {Geojson, PROVIDER_GOOGLE} from 'react-native-maps'
import mapStyle from './mapStyle.json'
import geojson from './example.json'

//Component displays a map view of Maine
export default class ArcGISMap extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      // Map container view
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          width={Dimensions.get('window').width}
          height={Dimensions.get('window').height}
          zoomEnabled={true}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: 39.2538,
            longitude: -68.4455,
            latitudeDelta: 5,
            longitudeDelta: 5
          }}>
          {/* GeoJSON object displays simple line for testing */}
          <Geojson geojson={geojson} />
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%', // Added width to ensure it takes up the full width of its container
    aspectRatio: 1.5, // Adjust the aspect ratio as needed
  },
  map: {
    overflow: 'hidden',
    height: '100%',
    width: '100%'
  }
})
