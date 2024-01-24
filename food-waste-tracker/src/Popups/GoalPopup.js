import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native'
import {SelectList} from 'react-native-dropdown-select-list'
import {COLORS} from '../Utils/colors'
import Divider from '../Utils/Divider'
import Goal from './Goal'

// Window dimensions are used for absolute positioning of lowerContainer
// Allows for the use of z-index so that date dropdown doesn't push down elements when opened
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export const GOALS = []

export default class GoalPopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedMonth: '',
      selectedDay: 0,
      wasteGoal: 0,
      streakGoal: 0,
      goals: GOALS
    }
    this.handleCallBack = this.handleCallBack.bind(this)
  }

  // Updates state containing list of goals
  addGoal(goal) {
    this.setState((prevState) => ({
      goals: [...prevState.goals, goal]
    }))
  }

  // Callback function retrieves index from goal component
  handleCallBack(val) {
    this.removeGoal(val)
  }

  // Removes goal from list of goals
  removeGoal(index) {
    this.setState((prevState) => ({
      goals: prevState.goals.filter((_, i) => i !== index)
    }))
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <View style={styles.dateContainer}>
              <View style={styles.monthContainer}>
                <Text style={styles.inputLabel}>Month</Text>
                <SelectList
                  placeholder={' '}
                  search={false}
                  boxStyles={styles.dateBoxStyle}
                  dropdownStyles={styles.dateBoxStyle}
                  inputStyles={{color: 'black'}}
                  setSelected={(value) => this.setState({selectedMonth: value})}
                  data={monthDropdown}
                  save='value'
                  maxHeight={130}
                />
              </View>
              <View style={styles.dayContainer}>
                <Text style={styles.inputLabel}>Day</Text>
                <SelectList
                  placeholder={' '}
                  search={false}
                  boxStyles={styles.dateBoxStyle}
                  dropdownStyles={styles.dateBoxStyle}
                  inputStyles={{color: 'black'}}
                  setSelected={(value) => this.setState({selectedDay: value})}
                  data={dayDropdown}
                  save='value'
                  maxHeight={130}
                />
              </View>
            </View>
            <View style={styles.lowerContainer}>
              <View style={styles.goalInputcontainer}>
                <View style={styles.wasteGoalContainer}>
                  <Text style={styles.inputLabel}>Avg. Waste Goal</Text>
                  <TextInput
                    style={styles.input1}
                    onChangeText={(value) => this.setState({wasteGoal: value})}
                    keyboardType='decimal-pad'
                  />
                </View>
                <View style={styles.streakGoalContainer}>
                  <Text style={styles.inputLabel}>Streak Goal</Text>
                  <TextInput
                    style={styles.input2}
                    onChangeText={(value) => this.setState({streakGoal: value})}
                    keyboardType='number-pad'
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Pressable
                    style={styles.button}
                    onPress={() =>
                      this.addGoal({
                        month: this.state.selectedMonth,
                        day: this.state.selectedDay,
                        waste: this.state.wasteGoal,
                        streak: this.state.streakGoal
                      })
                    }>
                    <Text style={styles.buttonText}>Add Goal</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.goalsContainer}>
            <View style={styles.goalHeader}>
              <Text style={styles.headerText}>Target Date</Text>
              <Text style={styles.headerText}>Avg. Waste</Text>
              <Text style={styles.headerText}>Streak</Text>
            </View>
            <Divider />
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}>
              {this.state.goals.map((item, index) => {
                const i = index
                return (
                  <View style={styles.goalContainer}>
                    <Goal
                      key={index}
                      i={i}
                      callBack={this.handleCallBack}
                      month={item.month}
                      day={item.day}
                      waste={item.waste}
                      streak={item.streak}
                    />
                    <Divider />
                  </View>
                )
              })}
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '97%',
    marginLeft: '5%',
    justifyContent: 'space-between'
  },
  inputContainer: {
    height: '40%',
    marginTop: '-5%'
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '3%',
    zIndex: 1
  },
  inputLabel: {
    fontSize: 15,
    color: COLORS.darkGray,
    fontWeight: '500'
  },
  monthContainer: {
    width: '45%'
  },
  dayContainer: {
    width: '45%'
  },
  dateBoxStyle: {
    borderRadius: 10,
    width: '100%',
    borderWidth: 3,
    zIndex: 1,
    backgroundColor: COLORS.lightGray
  },
  lowerContainer: {
    position: 'absolute',
    width: windowWidth * 0.81,
    top: windowHeight * 0.11,
    height: '70%',
    zIndex: 0
  },
  goalInputcontainer: {
    flexDirection: 'row',
    height: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  wasteGoalContainer: {
    width: '50%',
    height: '50%',
    justifyContent: 'center'
  },
  streakGoalContainer: {
    width: '50%',
    height: '50%',
    justifyContent: 'center',
    paddingLeft: '5%'
  },
  input1: {
    height: '60%',
    width: '90%',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: COLORS.darkGray,
    paddingHorizontal: '5%'
  },
  input2: {
    height: '60%',
    width: '100%',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: COLORS.darkGray,
    paddingHorizontal: '5%'
  },
  buttonContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: '40%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.darkGreen
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '500'
  },
  goalsContainer: {
    height: '60%'
  },
  goalHeader: {
    marginHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '1%'
  },
  headerText: {
    fontWeight: '500',
    fontSize: 15
  },
  scrollContainer: {
    width: '100%',
    flexDirection: 'column',
    flexWrap: 'nowrap'
  },
  contentContainer: {
    flex: 1
  },
  goalContainer: {
    width: '100%',
    height: '15%'
  }
})

// JSON constant for month options
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
