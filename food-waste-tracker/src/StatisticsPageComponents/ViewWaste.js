import React, {Component} from 'react'
import {StyleSheet, View, Text, Pressable, Modal} from 'react-native'
import {COLORS} from '../Utils/colors'
import {AntDesign} from '@expo/vector-icons'
import Popup from '../Popups/Popup'
import WasteHistoryPopup from '../Popups/WasteHistoryPopup'

export default class ViewWaste extends Component {
  constructor(props) {
    super(props)
    this.state = {
      historyModal: false
    }
  }

  historyVisibility(value) {
    this.setState({historyModal: value})
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Button */}
        <Pressable
          style={styles.button}
          onPress={() => this.historyVisibility(true)}>
          <Text style={styles.buttonText}>View Waste History</Text>
        </Pressable>

        {/* Modal */}
        <Modal
          animationType='fade'
          transparent={true}
          statusBarTranslucent={true}
          visible={this.state.historyModal}
          onRequestClose={() => this.historyVisibility(false)}>
          <Popup>
            {/* Header */}
            <View style={styles.popupHeader}>
              <View style={{width: '10%'}} />
              <Text style={styles.popupHeaderText}>Waste History</Text>
              <Pressable
                style={styles.closePopupButton}
                onPress={() => this.historyVisibility(false)}>
                <AntDesign name='close' size={24} color='black' />
              </Pressable>
            </View>

            {/* Content */}
            <View style={styles.popupContent}>
              <WasteHistoryPopup data={this.props.data} />
            </View>
          </Popup>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: '25%',
    // marginTop: '5%',
    // marginBottom: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    backgroundColor: COLORS.darkGreen,
    borderRadius: 10
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center'
  },
  popupHeader: {
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  popupHeaderText: {
    fontSize: 24,
    fontWeight: '800'
  },
  closePopupButton: {
    marginTop: '2%',
    paddingRight: '2%',
    alignItems: 'flex-end',
    width: '10%'
  },
  popupContent: {
    width: '100%',
    height: '90%',
    alignItems: 'center'
  }
})
