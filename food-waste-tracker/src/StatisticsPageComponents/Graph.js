import React, {Component} from 'react'
import {StyleSheet, View, Text, Dimensions} from 'react-native'
import {COLORS} from '../Utils/colors'
import {LineChart} from 'react-native-chart-kit'

export default class Graph extends Component {
  constructor(props) {
    super(props)
  }

  // Returns an array of dates from passed data prop
  getDateArray() {
    return this.props.data.map((item) => item.date)
  }

  // Returns an array of waste amount from passed data prop
  getAmountArray() {
    return this.props.data.map((item) => item.amount)
  }

  render() {
    // Store dates and amounts for graph data
    const dateArray = this.getDateArray()
    const amountArray = this.getAmountArray()

    return (
      <View style={styles.container}>
        <LineChart
          style={styles.chart}
          data={{
            labels: dateArray,
            datasets: [
              {
                data: amountArray
              }
            ]
          }}
          width={Dimensions.get('window').width * 0.89}
          height={Dimensions.get('window').height * 0.28}
          chartConfig={chartConfig}
          fromZero={true}
          segments={4}
          bezier
          yAxisSuffix=' lbs'
          yLabelsOffset={15}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10
  },
  chart: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    marginTop: '4%',
    marginRight: 15
  }
})

const chartConfig = {
  backgroundColor: COLORS.white,
  backgroundGradientFrom: COLORS.white,
  backgroundGradientTo: COLORS.white,
  fillShadowGradientFrom: COLORS.lightGreen,
  fillShadowGradientTo: COLORS.lightGreen,
  fillShadowGradientFromOpacity: 0.5,
  fillShadowGradientToOpacity: 0.5,
  strokeWidth: 2,
  propsForBackgroundLines: {
    stroke: COLORS.black
  },
  color: () => COLORS.darkGreen,
  labelColor: () => COLORS.black,
  decimalPlaces: 1
}
