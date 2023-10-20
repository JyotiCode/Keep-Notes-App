import {StyleSheet, Text, View, TextInput, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Colors from '../misc/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IntroScreen = ({ onFinish }) => {
  const [name, setName] = useState('');
  const handleOnChangeText = text => setName(text);

  const handleSubmit = async () => {
    const user = { name: name };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    if (onFinish) onFinish();
  };
  //console.log(name);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter Your Name To Continue</Text>
      <TextInput
        value={name}
        onChangeText={handleOnChangeText}
        placeholder="Enter Name"
        style={styles.textInput}
      />
      {name.trim().length >= 3 ? (
        <AntDesign
          name="arrowright"
          color="white"
          size={30}
          style={styles.icon}
          onPress={handleSubmit} />
      ) : null}
    </View>
  );
};

export default IntroScreen;

const width = Dimensions.get('window').width - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    width,
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 25,
    color: Colors.PRIMARY,
    marginBottom: 10,
  },
  text: {
    alignSelf: 'flex-start',
    paddingLeft: 28,
    marginBottom: 5,
    //opacity: 0.7,
  },
  icon: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
});
