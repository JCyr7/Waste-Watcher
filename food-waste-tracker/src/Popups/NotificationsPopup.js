import {React, Component} from 'react'
import {View, StyleSheet, Text, ScrollView} from 'react-native'
import {COLORS} from '../Utils/colors'
import Divider from '../Utils/Divider'
import Notification from '../ProfileComponents/Notification'

export default class NotificationsPopup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Divider />
        {/* Scroll Container for notifications */}
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <Notification />
          <Divider />
          <Notification />
          <Divider />
          <Notification />
          <Divider />
          <Notification />
          <Divider />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '87%',
    marginLeft: '5%',
    alignItems: 'center'
  },
  scrollContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  contentContainer: {
    flex: 1
  }
})
