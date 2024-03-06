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
    width: '100%',
    height: '75%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  labels: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
    borderRadius: 5,
    marginBottom: 2,

  },
  rankLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 5, 
    color: COLORS.white
  },
  nameLabel: {
    flex: 5,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.white
  },
  scoreLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    marginRight: 5, 
    color: COLORS.white
  },
  ranks: {
    width: '100%',
    flex: 1,
  },
});


// This page is acctually the Leaderboard, didnt feel like changing all the paths yet incase more changes in the future
// Like a placeholder for leaderboard functions


// import React, {Component} from 'react'
// import {StyleSheet, View, Text, Pressable, Platform} from 'react-native'
// import {COLORS} from '../Utils/colors'
// import Leaderboard from '../LeaderboardComponents/Leaderboard'
// import {LOCAL, GLOBAL} from '../Utils/TestData'

// export default class LeaderboardPage extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       visibility: 0
//     }
//   }

//   // Toggle visibility of local and all time leaderboard
//   // 0 = Local, 1 = All Time
//   setVisibility(value) {
//     this.setState({visibility: value})
//   }

//   // Sort ranks in descending order depending on score
//   sortDescendingScore(array) {
//     array.sort(function (a, b) {
//       return b.score - a.score
//     })
//     return array
//   }

//   render() {
//     const localData = this.sortDescendingScore(LOCAL)
//     const globalData = this.sortDescendingScore(GLOBAL)

//     return (
//       <View style={styles.container}>
//         {/* Header Container*/}
//         <View style={styles.header}>
//           <Text style={styles.headerText}>Leaderboard</Text>
//           <View style={styles.headerButtons}>
//             {/* Local Button */}
//             <Pressable
//               style={[
//                 styles.button,
//                 {
//                   backgroundColor:
//                     this.state.visibility === 0
//                       ? COLORS.darkGreen
//                       : COLORS.lightGreen
//                 }
//               ]}
//               onPress={() => this.setVisibility(0)}>
//               <Text style={styles.buttonText}>Local</Text>
//             </Pressable>

//             {/* All Time Button */}
//             <Pressable
//               style={[
//                 styles.button,
//                 {
//                   backgroundColor:
//                     this.state.visibility === 1
//                       ? COLORS.darkGreen
//                       : COLORS.lightGreen
//                 }
//               ]}
//               onPress={() => this.setVisibility(1)}>
//               <Text style={styles.buttonText}>Global</Text>
//             </Pressable>
//           </View>
//         </View>

//         {/* Leaderboard Container */}
//         <View style={styles.content}>
//           {this.state.visibility === 0 && <Leaderboard data={localData} />}
//           {this.state.visibility === 1 && <Leaderboard data={globalData} />}
//         </View>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: Platform.OS === 'android' ? '10%' : '2%',
//     marginBottom: '5%'
//   },
//   header: {
//     width: '90%',
//     height: '25%',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     backgroundColor: COLORS.white,
//     borderRadius: 10,
//     shadowOffset: {
//       width: -3,
//       height: 4
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 10,
//     shadowColor: COLORS.shadow
//   },
//   headerText: {
//     fontSize: 30,
//     fontWeight: '700',
//     color: COLORS.darkGreen
//   },
//   headerButtons: {
//     width: '90%',
//     height: '25%',
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center'
//   },
//   button: {
//     width: '25%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 30,
//     backgroundColor: COLORS.darkGreen
//   },
//   buttonText: {
//     color: COLORS.white
//   },
//   content: {
//     width: '90%',
//     height: '72%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: COLORS.white,
//     borderRadius: 10,
//     shadowOffset: {
//       width: -3,
//       height: 4
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 10,
//     shadowColor: COLORS.shadow
//   }
// })
