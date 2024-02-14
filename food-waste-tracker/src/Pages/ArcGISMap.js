import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import mapStyle from '../GeoJSON/mapStyle.json';
import geojson from '../GeoJSON/example.json';

export default class ArcGISMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Extracting points from GeoJSON
    const points = geojson.features.map(feature => ({
      latitude: feature.geometry.coordinates[1],
      longitude: feature.geometry.coordinates[0],
      properties: feature.properties
    }));

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          width={Dimensions.get('window').width}
          height={Dimensions.get('window').height}
          zoomEnabled={true}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: 45.2538,
            longitude: -68.4455,
            latitudeDelta: 5,
            longitudeDelta: 5
          }}>
          {/* Displaying markers for each point */}
          {points.map((point, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: point.latitude, longitude: point.longitude }}
              onPress={() => Alert.alert(
                'Marker Properties',
                `Latitude: ${point.latitude}\nLongitude: ${point.longitude}\nProperties: ${JSON.stringify(point.properties)}`
              )}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  }
});
