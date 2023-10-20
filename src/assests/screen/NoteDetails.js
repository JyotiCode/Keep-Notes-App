import {ScrollView, StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState} from 'react';
import Colors from '../misc/Colors';
//import{useHeaderHeight} from '@react-navigation/stack'
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNotes} from '../contexts/NoteProvider';
import NoteInputModal from './NoteInputModal';

const formatDate = ms => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteDetails = props => {
  //const {note} = props.route.params;
  const [note, setNote] = useState(props.route.params.note);
  //const headerHeight =useHeaderHeight()
  //console.log(note);
  const {setNotes} = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      'Are You Sure!',
      'This action will delete your note permanently!',
      [
        {
          text: 'Delete',
          onPress: deleteNote,
        },

        {
          text: 'No Thanks',
          onPress: () => console.log('no thanks'),
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        n.time = time;

        setNote(n);
      }
      return n;
    });
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };
  return (
    <>
      <ScrollView style={[styles.container, {paddingTop: 40, paddingLeft: 20}]}>
      <Text style={styles.time}>
          {note.isUpdated
            ? `Updated At ${formatDate(note.time)}`
            : `Created At ${formatDate(note.time)}`}
        </Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
      </ScrollView>
      <View style={styles.btncontainer}>
        <AntDesign
          name="delete"
          color="white"
          size={30}
          style={{
            position: 'absolute',
            right: 15,
            bottom: 5,
            padding: 10,
            borderRadius: 50,
            elevation: 5,
            backgroundColor: Colors.ERROR,
          }}
          onPress={displayDeleteAlert}
        />
        <AntDesign
          name="edit"
          color="white"
          size={30}
          style={{
            position: 'absolute',
            right: 15,
            bottom: 50,
            padding: 10,
            borderRadius: 50,
            elevation: 5,
            backgroundColor: Colors.PRIMARY,
            marginBottom: 15,
          }}
          onPress={openEditModal}
        />
      </View>
      <NoteInputModal
        isEdit={isEdit}
        note={note}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

export default NoteDetails;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    color:Colors.PRIMARY,
    fontWeight: 'bold',
  },
  desc: {
    color: Colors.DARK,
    fontSize: 20,
    opacity: 0.9,
  },
  time: {
    color: Colors.DARK,
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.7,
  },
  btncontainer: {
    position: 'absolute',
    right: 15,
    bottom: 50, //padding: 15,
    borderRadius: 50,
    elevation: 5,
    //backgroundColor: Colors.PRIMARY,
  },
});
