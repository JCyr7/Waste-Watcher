import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView} from 'react-native'
import {COLORS} from '../Utils/colors'
import Divider from '../Utils/Divider'
import Rank from './Rank'

export default class Leaderboard extends Component {
  constructor(props) {
    super(props)
  }

  // Store user data passed as props
  data = this.props.data

  render() {
    return (
      <View style={styles.container}>
        {/* Leaderboard Labels */}
        <View style={styles.labels}>
          <Text style={styles.rankLabel}>Rank</Text>
          <Text style={styles.spacerLabel} />
          <Text style={styles.nameLabel}>Name</Text>
          <Text style={styles.scoreLabel}>Score</Text>
        </View>
        <Divider />
        {/* Render ranks from data */}
        <View style={styles.ranks}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            {this.data.map((item, index) => {
              return (
                <Rank
                  key={index}
                  rank={index + 1}
                  name={item.name}
                  score={item.score}
                />
              )
            })}
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '93%',
    alignItems: 'center'
  },
  scrollContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  contentContainer: {
    flex: 1
  },
  labels: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%'
  },
  rankLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500'
  },
  spacerLabel: {
    flex: 1
  },
  nameLabel: {
    flex: 5,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500'
  },
  scoreLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500'
  },
  ranks: {
    width: '100%',
    flex: 1
  }
})
