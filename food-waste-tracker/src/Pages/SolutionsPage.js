import React, {Component} from 'react'
import {StyleSheet,
  View,
  Text, 
  Pressable, 
  Image,
  Platform,
} from 'react-native'
import {COLORS} from '../Utils/colors'
import MapView, {Geojson, PROVIDER_GOOGLE} from 'react-native-maps'
import mapStyle from '../GeoJSON/mapStyle.json'
import geojson from '../GeoJSON/example.json'
import MeatReduciton from '../WasteReductionTips/MeatReduction'
import FishReduciton from '../WasteReductionTips/FishReduction'
import ProduceReduciton from '../WasteReductionTips/ProduceReduction'
import GrainReduciton from '../WasteReductionTips/GrainReduction'
import DairyReduciton from '../WasteReductionTips/DairyReduction'
import GeneralReduciton from '../WasteReductionTips/GeneralReduction'

export default class LeaderboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
 
 
  navmap(navigation) {
    navigation.navigate('ArcGISMap');
  }




  render() {
    const {navigation} = this.props
    return (
      <View style={styles.container}>
        {/* <Image source={require('../../images/logo.png')} style={styles.image}/> */}
        <Text style={styles.titleText}>Solutions</Text>
        {/* Map of Food Waste Solutions:
        Reduce Waste (see tips below) 
        Feeding People (food pantries/donation sites)
        Feeding Animals (livestock farms)
        Compost (service providers/drop-off sites)
        AD (service providers) */}
        <View style={styles.fullmapContainer}>
          <View style={styles.mapContainer}>
            <Pressable 
              style={styles.maptitlecontainer} 
              onPress={this.navmap}>
              <Text style={styles.mapText}>Map of Food Waste Solutions</Text>
              <Image source={require('../../images/expand.png')} style={styles.expandImage} />
            </Pressable>
            <MapView
              style={styles.map}
              zoomEnabled={true}
              provider={PROVIDER_GOOGLE}
              customMapStyle={mapStyle}
              initialRegion={{
                latitude: 45.2538,
                longitude: -69.4455,
                latitudeDelta: 4,
                longitudeDelta: 4
              }}>
              {/* GeoJSON object displays simple line for testing */}
              <Geojson geojson={geojson} />
            </MapView>
          </View>
        </View>
        <View style={styles.newContainer}>
          {/* Hierarchy Container */}
          <View style={styles.heirarchyContainer}>
            <Image source={require('../../images/heirarchy.png')} style={styles.heirarchyImage} />
          </View>

          {/* Learn More Container */}
          <View style={styles.learnMoreContainer}>
          <Image source={require('../../images/expand.png')} style={styles.heirarchyexpandImage} />
            <View style={styles.learnmoretextcontainer}>
              <Text style={styles.learnMoreText}>Food Waste</Text>
              <Text style={styles.learnMoreText}>Hierarchy</Text>
            </View>
          </View>
        </View>
        {/* Waste Reduction Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsHeader}>Waste Reduction Tips</Text>
          <View style={styles.linkContainer}>
            <MeatReduciton />
            <ProduceReduciton />
            <GrainReduciton />
            <FishReduciton />
            <DairyReduciton />
            <GeneralReduciton />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? '3%' : '0%',
    marginBottom: '2%'
  },
  // image: {
  //   width: '60%',
  //   height: 'auto',
  //   tintColor: COLORS.blue, // Use tintColor instead of color
  //   aspectRatio: 1290 / 193,
  // },
  titleText: {
    color: COLORS.blue,
    fontWeight: '500',
    fontSize: 28,
  },
 fullmapContainer:{
    width: '90%',
    height: '32%',
    marginTop: '3%',
    padding: 10, // Add padding
    borderRadius: 10,
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: -7,
      height: 7
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 1,
    shadowColor: COLORS.blue,
  },
  mapContainer:{
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',

  },
  maptitlecontainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 6,
  },
  mapText: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.blue,
    textAlign: 'center', // Center text
  },
  expandImage: {
    position: 'absolute', // Make the expandImage absolute
    right: '0%', // Align to the right
    width: 25,
    height: 25,
    tintColor: COLORS.blue,
  },
  map: {
    marginTop: 6,
    overflow: 'hidden',
    height: '85%',
    width: '100%',
    borderRadius: 6,
  },


  newContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '25%',
    width: '90%',
    marginTop: '3%',
    marginBottom: '3%',
    borderRadius: 10,
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: -7,
      height: 7
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 1,
    shadowColor: COLORS.blue,
  },
  heirarchyContainer:{
    height: '100%',
    width: '60%',
    paddingLeft: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  heirarchyImage: {
    height: '90%',
    width: 'auto',
    aspectRatio: 584/427,
  },  
  heirarchyexpandImage: {
    position: 'absolute', // Make the expandImage absolute
    top: '7.5%', // Align to the top
    right: '7.5%', // Align to the right
    width: 25,
    height: 25,
    tintColor: COLORS.blue,
  },
  learnMoreContainer: {
    height: '90%',
    width: '40%', // Adjust width as needed
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  learnmoretextcontainer: {
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '20%',
  },
  learnMoreText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.blue,
  },
  tipsContainer: {
    height: '28%',
    width: '90%',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    // shadowOffset: {
    //   width: -3,
    //   height: 4
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 6,
    // elevation: 10,
    // shadowColor: COLORS.shadow
  },
  tipsHeader: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.blue,
    marginTop: '4%'
  },
  linkContainer: {
    flexDirection: 'row', // Set flexDirection to 'row'
    flexWrap: 'wrap', // Allow items to wrap to the next line
    justifyContent: 'space-between',
    width: '100%', // Adjust the width as needed
    height: '80%',
    paddingBottom: '5%', // Add horizontal padding for spacing between items
  },
})
