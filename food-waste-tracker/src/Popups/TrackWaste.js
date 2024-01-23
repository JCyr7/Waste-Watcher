import {AntDesign} from '@expo/vector-icons'
import React, {Component} from 'react'
import {StyleSheet, View, Text, Pressable} from 'react-native'

import {COLORS} from '../Utils/colors'
import WasteEntry from './WasteEntry'

export default class TrackWaste extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entryListSize: 1,
      entryList: [0]
    }
  }

  submitWaste() {}

  addEntry() {
    this.setState({entryListSize: this.state.entryListSize + 1})
    // console.log(this.state.entryListSize)
    this.setState({
      entryList: [...this.state.entryList, this.state.entryListSize]
    })
    console.log(this.state.entryList)
  }

  render() {
    return (
      <View>
        <View>
          {this.state.entryList.map((index) => {
            return <WasteEntry key={index}></WasteEntry>
          })}
        </View>
        <Pressable style={styles.addEntry} onPress={() => this.addEntry()}>
          <View style={styles.row}>
            <AntDesign color={'grey'} name='plus' size={35}></AntDesign>
            <Text style={styles.addEntryText}>Add Entry</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => this.submitWaste()}
          style={({pressed}) => [
            {
              marginTop: this.state.entryListSize === 1 ? '80%' : '50%',
              backgroundColor: pressed ? COLORS.lightGreen : COLORS.darkGreen
            },
            styles.submitButton
          ]}>
          <Text style={styles.submitTextStyle}>Submit</Text>
        </Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginLeft: '5%',
    alignContent: 'center'
  },
  addEntry: {
    width: '100%',
    height: 60,
    // backgroundColor: 'white',
    justifyContent: 'center'
  },
  addEntryText: {
    color: 'grey',
    fontSize: 25
  },
  submitButton: {
    width: 90,
    height: 40,
    alignItems: 'flex-end',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    // marginTop: '80%'
    marginBottom: '10%'
  },
  submitTextStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    alignSelf: 'center'
  }
})
