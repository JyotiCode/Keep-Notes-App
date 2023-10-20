import {StyleSheet, Text, View,StatusBar, FlatList, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React, {useEffect, useState,} from 'react';
import SearchBar from './SearchBar';
import Colors from '../misc/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NoteInputModal from './NoteInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from './Note';
import NotFound from './NotFound';
//import SearchBar from './SearchBar';
import { useNotes } from '../contexts/NoteProvider';


const reverseData = data => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};
const NoteScreen = ({ user, navigation }) => {
  const [greet, setGreet] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false);

  const { notes, setNotes, findNotes } = useNotes();

  const findGreet = () => {
    const hrs = new Date().getHours();
    // console.log(hrs);
    if (hrs === 0 || hrs < 12) return setGreet('Morning');
    if (hrs === 1 || hrs < 17) return setGreet('Afternoon');
    setGreet('Evening');
  };
  
  useEffect(() => {
    //AsyncStorage.clear();
   
    findGreet();
  }, []);

  const reverseNotes = reverseData(notes);

  const handleOnSubmit = async (title, desc) => {
//console.log(title,desc);
//const time=new Date().getTime()
const note = { id: Date.now(), title, desc, time: Date.now() };
//console.log(note);
const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };
  const openNote = note => {
    navigation.navigate('NoteDetail', { note });
  };
  const handleOnSearchInput = async text => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });

    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery('');
    setResultNotFound(false);
    await findNotes();
  };
  return (
     <>
     <StatusBar barStyle='dark-content' />
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
     <View style={styles.container}>
          <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
         {notes.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              containerStyle={{ marginVertical: 15 }}
              onClear={handleOnClear}
            />
         ) : null}

{resultNotFound ? (
            <NotFound />
          ) : (
      
      
            <FlatList
              data={reverseNotes}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 15,
              }}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Note onPress={() => openNote(item)} item={item} />
              )}
            />
          )}

          {!notes.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add Notes</Text>
            </View>
          ) : null}
    </View>
    </TouchableWithoutFeedback>
    <AntDesign
          name="plus"
          color="white"
          size={30}
          style={styles.btn}
          onPress={() => setModalVisible(true)}
        />
    <NoteInputModal  visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}/>
    </>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color:Colors.DARK
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    marginTop: 10,
    zIndex:-1
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'red',
    zIndex: -1,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.5,
  },
  btn: {
    position: 'absolute',
    right: 15,
    bottom: 50,
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
});
