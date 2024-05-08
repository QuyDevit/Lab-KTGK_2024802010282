import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import firestore from '@react-native-firebase/firestore'
import { List } from 'react-native-paper'

const Job = ({index,title}) => {
  return (
    <List.Item
        title={title}
        style={styles.item}
        left={props =>(
            <Text style={{marginLeft:10,fontSize:18}}>{index + 1}.</Text>
        )}
    >

    </List.Item>
  )
}

export default Job

const styles = StyleSheet.create({
  item: {
    borderWidth:1,
    borderStyle:'solid',
    borderColor:'#ccc',
    marginBottom:8,
    borderRadius:8
  },
});