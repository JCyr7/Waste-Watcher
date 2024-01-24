import {React, Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {COLORS} from '../Utils/colors'
import {MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons'

export default class StreakPopup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Current Streak */}
        <View style={styles.streak}>
          <View style={styles.streakLabel}>
            <MaterialIcons
              name='local-fire-department'
              size={60}
              color={COLORS.black}
            />
            <Text style={styles.labelText}>Current Streak:</Text>
          </View>
          <Text style={styles.streakText}>8</Text>
        </View>

        {/* All Time Streak */}
        <View style={styles.streak}>
          <View style={styles.streakLabel}>
            <MaterialCommunityIcons
              name='trophy-award'
              size={60}
              color={COLORS.black}
            />
            <Text style={styles.labelText}>Highest Streak:</Text>
          </View>
          <Text style={styles.streakText}>12</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '97%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  streak: {
    width: '100%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  streakLabel: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelText: {
    fontWeight: '700',
    fontSize: 30
  },
  streakText: {
    fontWeight: '700',
    fontSize: 80
  }
})
