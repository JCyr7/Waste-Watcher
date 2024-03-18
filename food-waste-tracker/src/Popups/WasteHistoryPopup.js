import React, {Component} from 'react'
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
        <View style={styles.headerContainer}>
          <Text style={styles.headerlabel}>My Waste History</Text>
        </View>
        {/* Labels */}
        <View style={styles.header}>
          <Text style={styles.dateLabel}>Date</Text>
          <Text style={styles.categoryLabel}>Category</Text>
          <Text style={styles.amountLabel}>Weight</Text>
          <Text style={styles.unitLabel}>Unit</Text>
          <Text style={styles.trashSpace}>trash</Text>
        </View>
        <Divider />

        {/* Waste History Log */}
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          {this.props.data
          .slice() // Create a shallow copy of the array to avoid mutating the original props
          .sort((a, b) => {
            // Ensure the month and day are always two digits (e.g., "03/05")
            const formatDate = (date) => {
              const [month, day] = date.split('/');
              return `${month.padStart(2, '0')}${day.padStart(2, '0')}`;
            };
        
            const dateA = formatDate(a.date);
            const dateB = formatDate(b.date);
        
            // Now, you can directly compare these string values
            return dateA.localeCompare(dateB);
          }).reverse()
          .map((item, index) => {
            return (
              <WasteLog
                onDelete={this.onDelete}
                onWasteDeleted={this.props.onReload}
                key={index} // Consider using a more stable key if possible
                date={item.date}
                category={item.category}
                amount={item.amount}
                unit={item.amountType}
              />
            );
          })}
          <View style={styles.bottomMargin} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '97%',
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    marginBottom: 30,
  },
  headerlabel: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text,
  },
  header: {
    width: '100%',
    marginBottom: '3%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.element,
    width: '15%',
    textAlign: 'center', // Center text horizontally
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.element,
    width: '25%',
    textAlign: 'center', // Center text horizontally
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.element,
    width: '25%',
    textAlign: 'center', // Center text horizontally
  },
  unitLabel: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.element,
    width: '20%',
    textAlign: 'center', // Center text horizontally
  },
  trashSpace: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
    color: COLORS.background,
    width: '15%',
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
    marginBottom: 1
  }
})
