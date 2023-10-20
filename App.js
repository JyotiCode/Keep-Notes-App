import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import IntroScreen from './src/assests/screen/IntroScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteScreen from './src/assests/screen/NoteScreen';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import NoteDetails from './src/assests/screen/NoteDetails';
import NoteProvider from './src/assests/contexts/NoteProvider';

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    //console.log(result);
    if (result !== null) {
      setUser(JSON.parse(result));
    }
  };

  useEffect(() => {
    findUser();
   //AsyncStorage.clear();
  }, []);
  const renderNoteScreen=(props)=><NoteScreen {...props} user={user}/>

  if (!user.name) return <IntroScreen  onFinish={findUser}/>;
  return <NavigationContainer>
    <NoteProvider>

    
  <Stack.Navigator screenOptions={{headerTitle:'',headerTransparent:true}}>
    <Stack.Screen component={renderNoteScreen} name='NoteScreen'/>
    <Stack.Screen component={NoteDetails} name='NoteDetail'/>
  </Stack.Navigator>
  </NoteProvider>
  </NavigationContainer>
 
};
export default App;
