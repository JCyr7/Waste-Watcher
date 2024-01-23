import {React, Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {COLORS} from '../Utils/colors'
import Divider from '../Utils/Divider'

export default class ReferralPopup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Divider />
        <Text>Appstore Link</Text>
        <View />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '87%',
    marginLeft: '5%',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
