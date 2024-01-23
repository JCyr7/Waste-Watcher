import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Alert
} from 'react-native'
import {COLORS} from '../Utils/colors'
import {SelectList} from 'react-native-dropdown-select-list'
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group'
import {DATA} from '../Utils/TestData'

// Class for meal tracking
export default class TrackMeal extends Component {
  constructor(props) {
    super(props)
    // States defined for the meal being tracked, date, weight value and weight unit
    this.state = {
      meal: '',
      selectedMonth: '',
      selectedDay: 0,
      weightUnit: '',
      weightValue: 0,
      ateOutBool: '',
      // Based on unit input by user, this value will be standardized to a specific unit and sent
      // to backend
      standardWeight: 0
    }
  }

  // Method checks which month the user selected, then returns array with corresponding number of days
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

  setAteOut(value) {
    if (value === '"Ate Out"') {
      this.setState({ateOutBool: true})
    } else {
      this.setState({ateOutBool: false})
    }
    console.log(this.state.ateOutBool)
  }

  submitWaste() {
    Alert.alert('Submitted')
    // console.log(this.state.meal)
    // console.log(this.state.selectedMonth)
    // console.log(this.state.selectedDay)
    // console.log(this.state.weightUnit)
    // console.log(this.state.weightValue)
    // console.log(this.state.ateOutBool)
    const date = this.getDate(this.state.selectedMonth, this.state.selectedDay)
    const meal = this.state.meal
    const weight = parseFloat(this.state.weightValue)
    DATA.push({date: date, category: meal, amount: weight})
  }

  getDate(month, day) {
    let mm, dd
    for (let i = 0; i < monthDropdown.length; i++) {
      if (monthDropdown[i].value === month) mm = monthDropdown[i].key
    }
    for (let i = 0; i < dayDropdown.length; i++) {
      if (dayDropdown[i].value === day) dd = dayDropdown[i].key
    }
    return `${mm}/${dd}`
  }

  render() {
    return (
      // Scroll view container

      <ScrollView>
        <View style={styles.row}>
          {/* CheckBox Group for meals */}
          <View flex={0.5}>
            <BouncyCheckboxGroup
              style={styles.checkBoxGroup}
              data={checkBoxOptions}
              onChangeText={(selectedItem) => {
                this.setState({meal: JSON.stringify(selectedItem.text)})
              }}></BouncyCheckboxGroup>
            <View>
              <View style={styles.row}>
                <View>
                  {/* Input section for weight and unit of weight */}
                  <Text style={styles.textStyle}>Weight</Text>
                  <TextInput
                    placeholder='0.0'
                    keyboardType='numeric'
                    cursorColor={'black'}
                    inputStyles={{color: 'grey'}}
                    style={styles.weightInput}
                    onChangeText={(text) =>
                      this.setState({weightValue: text})
                    }></TextInput>
                </View>
                <View>
                  <Text style={styles.textStyle}>Unit</Text>
                  <SelectList
                    search={false}
                    placeholder={'lbs'}
                    boxStyles={styles.weightunitBoxStyle}
                    dropdownStyles={styles.weightunitDropdown}
                    inputStyles={{color: 'grey'}}
                    dropdownTextStyles={{color: 'grey'}}
                    setSelected={(value) => this.setState({weightUnit: value})}
                    data={weightunitDropdown}
                    save='value'></SelectList>
                </View>
              </View>
              {/* Type of food wasted */}
              <View flexDirection={'column'}>
                <Text style={styles.textStyle}>Type</Text>
                <SelectList
                  search={false}
                  placeholder={' '}
                  boxStyles={styles.typeBoxStyle}
                  dropdownStyles={styles.typeDropdown}
                  inputStyles={{color: 'grey'}}
                  dropdownTextStyles={{color: 'grey'}}
                  setSelected={(value) => this.setState({meal: value})}
                  data={foodTypes}
                  save='value'></SelectList>
              </View>
            </View>
          </View>
          {/* Date of wasted food */}
          <View flex={0.5}>
            <Text style={styles.dateTextStyle}>Month</Text>
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
            <Text style={styles.dateTextStyle}>Day</Text>
            <SelectList
              search={false}
              placeholder={' '}
              boxStyles={styles.dateBoxStyle}
              dropdownStyles={styles.dateDropdownStyle}
              inputStyles={{color: 'grey'}}
              dropdownTextStyles={{color: 'grey'}}
              setSelected={(value) => this.setState({selectedDay: value})}
              data={this.dayOption(this.state.selectedMonth)}
              save='value'
            />
            <View>
              <Text style={styles.textStyle}>Ate out or stayed in?</Text>
              <BouncyCheckboxGroup
                style={styles.checkBoxGroup}
                data={eatoutOptions}
                onChange={(selectedItem) => {
                  this.setAteOut(JSON.stringify(selectedItem.text))
                }}></BouncyCheckboxGroup>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => this.submitWaste()}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? COLORS.lightGreen : COLORS.darkGreen
            },
            styles.submitButton
          ]}>
          <Text style={styles.submitTextStyle}>Submit</Text>
        </Pressable>
      </ScrollView>
    )
  }
}

// JSON constant for checkbox group options
const checkBoxOptions = [
  {
    id: 0,
    text: 'Breakfast',
    textStyle: {textDecorationLine: 'none', fontSize: 18, fontWeight: '500'},
    fillColor: COLORS.lightGreen,
    unfillColor: COLORS.white,
    style: {
      marginLeft: '10%',
      // alignSelf: 'center',
      marginBottom: '3%'
    }
  },
  {
    id: 1,
    text: 'Lunch',
    textStyle: {textDecorationLine: 'none', fontSize: 18, fontWeight: '500'},
    fillColor: COLORS.lightGreen,
    unfillColor: COLORS.white,
    style: {
      marginLeft: '10%',
      // alignSelf: 'center',
      marginBottom: '3%'
    }
  },
  {
    id: 2,
    text: 'Dinner',
    textStyle: {textDecorationLine: 'none', fontSize: 18, fontWeight: '500'},
    fillColor: COLORS.lightGreen,
    unfillColor: COLORS.white,
    style: {
      marginLeft: '10%',
      // alignSelf: 'center',
      marginBottom: '3%'
    }
  },
  {
    id: 3,
    text: 'Other',
    textStyle: {textDecorationLine: 'none', fontSize: 18, fontWeight: '500'},
    fillColor: COLORS.lightGreen,
    unfillColor: COLORS.white,
    style: {
      marginLeft: '10%',
      // alignSelf: 'center',
      marginBottom: '3%'
    }
  }
]
// JSON constant for month options
const monthDropdown = [
  {key: '01', value: 'January'},
  {key: '02', value: 'February'},
  {key: '03', value: 'March'},
  {key: '04', value: 'April'},
  {key: '05', value: 'May'},
  {key: '06', value: 'June'},
  {key: '07', value: 'July'},
  {key: '08', value: 'August'},
  {key: '09', value: 'September'},
  {key: '10', value: 'October'},
  {key: '11', value: 'November'},
  {key: '12', value: 'December'}
]
// JSON constant for day options
const dayDropdown = [
  {key: '01', value: 1},
  {key: '02', value: 2},
  {key: '03', value: 3},
  {key: '04', value: 4},
  {key: '05', value: 5},
  {key: '06', value: 6},
  {key: '07', value: 7},
  {key: '08', value: 8},
  {key: '09', value: 9},
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
// JSON constant for weight unit
const weightunitDropdown = [
  {key: '1', value: 'lbs'},
  {key: '2', value: 'oz'},
  {key: '3', value: 'kg'},
  {key: '4', value: 'g'}
]
// JSON constant for types of food waste
const foodTypes = [
  {key: '1', value: 'Produce'},
  {key: '2', value: 'Dairy'},
  {key: '3', value: 'Grain'},
  {key: '4', value: 'Meat'},
  {key: '5', value: 'Fish'}
]
const eatoutOptions = [
  {
    id: 0,
    text: 'Ate Out',
    textStyle: {textDecorationLine: 'none', fontSize: 18, fontWeight: '500'},
    fillColor: COLORS.lightGreen,
    unfillColor: COLORS.white,
    style: {
      marginLeft: '10%',
      // alignSelf: 'center',
      marginBottom: '3%'
    }
  },
  {
    id: 1,
    text: 'Stayed In',
    textStyle: {textDecorationLine: 'none', fontSize: 18, fontWeight: '500'},
    fillColor: COLORS.lightGreen,
    unfillColor: COLORS.white,
    style: {
      marginLeft: '10%',
      // alignSelf: 'center',
      marginBottom: '3%'
    }
  }
]
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  checkBoxGroup: {
    flexDirection: 'column'
  },
  dateBoxStyle: {
    borderRadius: 10,
    width: '60%',
    borderWidth: 3,
    marginLeft: '20%'
  },
  dateDropdownStyle: {
    borderRadius: 10,
    width: '60%',
    borderWidth: 3,
    marginLeft: '20%'
  },
  weightunitBoxStyle: {
    borderRadius: 10,
    width: '60%',
    marginLeft: '5%',
    borderWidth: 3
  },
  weightunitDropdown: {
    borderRadius: 10,
    marginLeft: '5%',
    borderWidth: 3,
    width: '60%'
  },
  typeBoxStyle: {
    borderRadius: 10,
    width: '65%',
    marginLeft: '3%',
    borderWidth: 3
  },
  typeDropdown: {
    borderRadius: 10,
    marginLeft: '3%',
    borderWidth: 3,
    width: '65%'
  },

  textStyle: {
    marginLeft: '5%',
    fontSize: 18,
    fontWeight: '500',
    color: 'grey'
  },
  dateTextStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'grey',
    marginLeft: '20%'
  },
  weightInput: {
    borderRadius: 10,
    borderWidth: 3,
    paddingLeft: '10%',
    width: '100%',
    height: 50,
    marginLeft: '5%',
    borderColor: 'grey',
    // fontSize: 18
    color: COLORS.darkGray
  },

  submitButton: {
    width: 90,
    height: 40,
    alignItems: 'flex-end',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: '60%'
  },
  submitTextStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    alignSelf: 'center'
  }
})
