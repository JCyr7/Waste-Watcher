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

  renderCustomDots() {
    const { data } = this.props;

    return data.map((item, index) => {
      // Calculate x and y positions
      const x = parseFloat((index / (data.length - 0) * (Dimensions.get('window').width * 0.838)).toFixed(1));
      const y = parseFloat(((1 - item.amount / Math.max(...this.getAmountArray())) * (Dimensions.get('window').height * 0.24)).toFixed(1));

      return (
        <View style={[styles.customDot, { left: x+10, top: y+6 }]} key={index}>
          <Text style={styles.customDotText}>{item.amount.toFixed(1)} lb</Text>
        </View>
      );
    });
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
                data: amountArray,
              },
            ],
          }}
          width={Dimensions.get('window').width * 0.99}
          height={Dimensions.get('window').height * 0.22}
          chartConfig={chartConfig}
          fromZero={true}
          segments={4}
          bezier
          withHorizontalLabels={false}  // Set withVerticalLabels to false
          yLabelsOffset={0}
        />
        {this.renderCustomDots()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: COLORS.whitetransparent,

  },
  chart: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: '10%',
    
  },
  customDot: {
    position: 'absolute',
    height: 20, // Adjust the height as needed
    backgroundColor: COLORS.transparent,
  },
  customDotText: {
    color: COLORS.blue,

  },
})

const chartConfig = {
  backgroundColor: COLORS.white,
  backgroundGradientFrom: COLORS.white,
  backgroundGradientTo: COLORS.white,
  fillShadowGradientFrom: COLORS.blue,
  fillShadowGradientTo: COLORS.white,
  fillShadowGradientFromOpacity: 0.5,
  fillShadowGradientToOpacity: 0.8,
  strokeWidth: 3,
  
  propsForBackgroundLines: {
    stroke: COLORS.white,
    strokeWidth: 1,  // Set the desired width for the lines
    //strokeDasharray: [],  // Set an empty array to make the lines continuous
  },
    propsForDots: {
    r: "2",  // Set the radius of the dots
    strokeWidth: "2",  // Set the stroke width of the dots
    stroke: COLORS.blue,  // Set the stroke color of the dots
  },
  color: () => COLORS.blue,
  labelColor: () => COLORS.blue,
  decimalPlaces: 0,
}
