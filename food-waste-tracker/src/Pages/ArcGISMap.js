import React, {Component} from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import MapView, {Geojson, PROVIDER_GOOGLE} from 'react-native-maps'
import mapStyle from '../GeoJSON/mapStyle.json'
import geojson from '../GeoJSON/example.json'

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
            latitude: 45.2538,
            longitude: -69.2455,
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
    overflow: 'hidden'
  },
  map: {
    overflow: 'hidden',
    height: '100%',
    width: '100%'
  }
})
