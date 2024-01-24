import React, {Component} from 'react'
import {StyleSheet, View, Text, TextInput} from 'react-native'
import {SelectList} from 'react-native-dropdown-select-list'

export default class WasteEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedMonth: '',
      selectedDay: 0,
      weightUnit: '',
      weightValue: 0,
      convertedWeight: 0
    }
  }
  // method to conditionally display different numbers of days for each month
  dayOption(month) {
    if (month === 'February') {
      return dayDropdown.slice(0, 28)
    } else if (
      month === 'April' ||
      month === 'June' ||
      month === 'September' ||
      month === 'November'
    ) {
      return dayDropdown.slice(0, 30)
    } else {
      return dayDropdown
    }
  }

  // Method converts weight from one unit to oz
  // convertWeight(weight, unit) {
  //   if (unit === "g")
  // }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.text}>Month</Text>
            <SelectList
              placeholder={' '}
              search={false}
              boxStyles={styles.dateBoxStyle}
              dropdownStyles={styles.dateDropdownStyle}
              inputStyles={{color: 'grey'}}
              dropdownTextStyles={{color: 'grey'}}
              setSelected={(value) => this.setState({selectedMonth: value})}
              data={monthDropdown}
              save='value'
            />
            <View style={[styles.row, {marginTop: '5%'}]}>
              <Text style={styles.text}>Weight</Text>
              <TextInput
                style={styles.weightInput}
                placeholder='0.0'
                keyboardType='numeric'
                cursorColor={'black'}
                onChangeText={(text) =>
                  this.setState({weightValue: text})
                }></TextInput>
            </View>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>Day</Text>
            <SelectList
              search={false}
              placeholder={' '}
              boxStyles={styles.dayBoxStyle}
              dropdownStyles={styles.dayDropdownStyle}
              inputStyles={{color: 'grey'}}
              dropdownTextStyles={{color: 'grey'}}
              setSelected={(value) => this.setState({selectedDay: value})}
              data={this.dayOption(this.state.selectedMonth)}
              save='value'
            />
            <SelectList
              search={false}
              placeholder={' '}
              boxStyles={styles.weightunitBoxStyle}
              dropdownStyles={styles.weightunitDropdown}
              inputStyles={{color: 'grey'}}
              dropdownTextStyles={{color: 'grey'}}
              setSelected={(value) => this.setState({weightUnit: value})}
              data={weightunitDropdown}
              save='value'></SelectList>
          </View>
        </View>
      </View>
    )
  }
}

const monthDropdown = [
  {key: '1', value: 'January'},
  {key: '2', value: 'February'},
  {key: '3', value: 'March'},
  {key: '4', value: 'April'},
  {key: '5', value: 'May'},
  {key: '6', value: 'June'},
  {key: '7', value: 'July'},
  {key: '8', value: 'August'},
  {key: '9', value: 'September'},
  {key: '10', value: 'October'},
  {key: '11', value: 'November'},
  {key: '12', value: 'December'}
]

const dayDropdown = [
  {key: '1', value: 1},
  {key: '2', value: 2},
  {key: '3', value: 3},
  {key: '4', value: 4},
  {key: '5', value: 5},
  {key: '6', value: 6},
  {key: '7', value: 7},
  {key: '8', value: 8},
  {key: '9', value: 9},
  {key: '10', value: 10},
  {key: '11', value: 11},
  {key: '12', value: 12},
  {key: '13', value: 13},
  {key: '14', value: 14},
  {key: '15', value: 15},
  {key: '16', value: 16},
  {key: '17', value: 17},
  {key: '18', value: 18},
  {key: '19', value: 19},
  {key: '20', value: 20},
  {key: '21', value: 21},
  {key: '22', value: 22},
  {key: '23', value: 23},
  {key: '24', value: 24},
  {key: '25', value: 25},
  {key: '26', value: 26},
  {key: '27', value: 27},
  {key: '28', value: 28},
  {key: '29', value: 29},
  {key: '30', value: 30},
  {key: '31', value: 31}
]

const weightunitDropdown = [
  {key: '1', value: 'lbs'},
  {key: '2', value: 'oz'},
  {key: '3', value: 'kg'},
  {key: '4', value: 'g'}
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
    // backgroundColor: 'red'
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flex: 0.5
  },
  text: {
    marginLeft: '10%',
    fontSize: 18,
    fontWeight: '500',
    color: 'grey'
  },
  dateBoxStyle: {
    borderRadius: 10,
    width: '90%',
    borderWidth: 3,
    marginLeft: '10%'
  },
  dateDropdownStyle: {
    borderRadius: 10,
    width: '60%',
    borderWidth: 3,
    marginLeft: '20%'
  },
  dayBoxStyle: {
    borderRadius: 10,
    width: '80%',
    borderWidth: 3,
    marginLeft: '10%'
  },
  dayDropdownStyle: {
    borderRadius: 10,
    width: '60%',
    borderWidth: 3,
    marginLeft: '20%'
  },
  weightInput: {
    borderRadius: 10,
    borderWidth: 3,
    paddingLeft: '10%',
    width: '50%',
    height: 50,
    marginLeft: '5%',
    borderColor: 'grey',
    fontSize: 18
  },
  weightunitBoxStyle: {
    borderRadius: 10,
    width: '80%',
    marginLeft: '10%',
    borderWidth: 3,
    marginTop: '5%'
  },
  weightunitDropdown: {
    borderRadius: 10,
    marginLeft: '10%',
    borderWidth: 3,
    width: '80%'
  }
})
