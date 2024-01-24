import {React, Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {COLORS} from '../Utils/colors'
import Divider from '../Utils/Divider'

export default class WasteLog extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logContainer}>
          <Text style={styles.date}>{this.props.date}</Text>
          <Text style={styles.category}>{this.props.category}</Text>
          <Text style={styles.amount}>{this.props.amount.toFixed(2)} lbs</Text>
        </View>
        <Divider />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
    alignItems: 'center'
  },
  logContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1
  },
  date: {
    flex: 1,
    fontSize: 18
  },
  category: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18
  },
  amount: {
    flex: 1,
    textAlign: 'right',
    fontSize: 18
  }
})
