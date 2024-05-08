import { View, Text ,StyleSheet,FlatList,TouchableOpacity} from 'react-native'
import React, {  useState ,useEffect} from 'react'
import {Appbar,TextInput,Button} from'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import Job from "../component/Job"
import { useMyContextController} from '../store'

const Home = ({navigation}) => {
  const contextValue = useMyContextController();

  const [controller, dispatch] = contextValue;
  const { userLogin } = controller;

  const [job,setJob] = useState('');
  const [loading,setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const ref = firestore().collection('jobs');
  async function addJob() {
    await ref.add({
      title:job,
    });
    setJob('');
  }

  useEffect(() =>{
    if(userLogin == null){
      navigation.navigate("Login")
      return;
    }
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title} = doc.data();
        list.push({
          id:doc.id,
          title,
        })
      })
      setJobs(list);

      if(loading){
        setLoading(false);
      }
    })
  });

  if(loading){
    return null;
  }
  return (
    <View style={styles.container}>
      {/* <Appbar>
        <Appbar.Content title="Jobs List" />
      </Appbar> */}
      <View style={styles.inputRow}>
        <TextInput
          style={{ flex: 0.8,backgroundColor:'#fff' ,borderTopWidth: 1,borderLeftWidth:1,borderRightWidth: 1,borderStyle: 'solid', borderColor: '#ccc'}}
          label="New Job"
          value={job}
          onChangeText={setJob}
   
        />
        <View style={{ flex: 0.2 ,justifyContent:'center',alignItems:'center',marginLeft:2}}>
          <Button
            onPress={addJob}
            mode="contained"
            color="blue"
            style={{borderRadius:4,justifyContent:'center',alignItems:'center',paddingVertical:8,backgroundColor:'#fcc203'}}
          >
           Add
          </Button>
        </View>
      </View>
      <FlatList
        style={{ flex: 1 ,marginTop:10}}
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index  }) => <Job index={index} {...item} />}
      />
    </View>
  )
}

export default Home


const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  inputRow: {
    flexDirection: "row",
    width: '100%',
    justifyContent:'center',
    alignItems:'center'
  },
});