import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../Utils/colors';
import Divider from '../Utils/Divider';
import Rank from './Rank';

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Store user data passed as props
    const data = this.props.data.slice(0, 5); // Show only the top 5 ranks

    return (
      <View style={styles.container}>
        {/* Leaderboard Labels */}
        <View style={styles.labels}>
          <Text style={styles.rankLabel}>Rank</Text>
          <Text style={styles.nameLabel}>Name</Text>
          <Text style={styles.scoreLabel}>Score</Text>
        </View>
        <Divider />
        {/* Render top 5 ranks from data */}
        <View style={styles.ranks}>
          {data.map((item, index) => (
            <Rank key={index} rank={index + 1} name={item.name} score={item.score} />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '100%',
    alignItems: 'center',
  },
  labels: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1%',
  },
  rankLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  nameLabel: {
    flex: 5,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  scoreLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  ranks: {
    width: '100%',
    flex: 1,
  },
});
