import {React, Component} from 'react'
import {StyleSheet, View, ScrollView, Text} from 'react-native'
import {COLORS} from '../Utils/colors'
import Divider from '../Utils/Divider'
import WasteLog from '../StatisticsPageComponents/WasteLog'

export default class WasteHistoryPopup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Labels */}
        <View style={styles.header}>
          <Text style={styles.dateLabel}>Date</Text>
          <Text style={styles.categoryLabel}>Category</Text>
          <Text style={styles.amountLabel}>Amount</Text>
        </View>
        <Divider />

        {/* Waste History Log */}
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          {this.props.data
            .map((item, index) => {
              return (
                <WasteLog
                  key={index}
                  date={item.date}
                  category={item.category}
                  amount={item.amount}
                />
              )
            })
            .reverse()}
          <View style={styles.bottomMargin} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '97%',
    alignItems: 'center'
  },
  header: {
    width: '95%',
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dateLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700'
  },
  categoryLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  },
  amountLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'right'
  },
  scrollContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  contentContainer: {
    flex: 1
  },
  bottomMargin: {
    marginBottom: 4
  }
})
