import React, {Component} from 'react'
import {StyleSheet, View, Text, Linking} from 'react-native'

export default class ProduceWasteTip extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const url =
      'https://www.google.com/search?q=reducing+vegetable+waste&sxsrf=AJOqlzW-yXeXrBDxeI8j3INqdi-73zHy_g%3A1676044538310&ei=-mjmY9bEEr6lptQPh96ZwAc&ved=0ahUKEwjWqdW6qIv9AhW-kokEHQdvBngQ4dUDCBA&uact=5&oq=reducing+vegetable+waste&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCAAQogQyCggAEPEEEB4QogQyBQgAEKIEMgUIABCiBDoKCAAQRxDWBBCwAzoHCCMQsAIQJ0oECEEYAEoECEYYAFDeAViGDGDeDWgCcAF4AIABlgGIAYsFkgEDMC41mAEAoAEByAEIwAEB&sclient=gws-wiz-serp'
    return (
      <View style={styles.tipContainer}>
        <Text style={styles.text}>
          <Text>
            Did you know? {'\n'}
            76% of food waste is from raw produce{'\n'} See tips to reduce
            produce waste
          </Text>
          <Text style={styles.link} onPress={() => Linking.openURL(url)}>
            {' '}
            here
          </Text>
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tipContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: '2%',
    width: '80%',
    height: '60%',
    marginBottom: '5%'
  },
  text: {
    fontSize: 16,
    color: 'grey',
    fontWeight: '500'
  },
  link: {
    color: 'blue'
  }
})
