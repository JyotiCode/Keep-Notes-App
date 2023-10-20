import {
  StyleSheet,
  Text,
  View,
  Modal,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import Colors from '../misc/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const handleModalClose = () => {
    Keyboard.dismiss();
  };


  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'desc') setDesc(text);
  };

 // console.log(title, desc);
 const handleSubmit = () => {
  if (!title.trim() && !desc.trim()) return onClose();

  if (isEdit) {
    onSubmit(title, desc, Date.now());
  } else {
    onSubmit(title, desc);
    setTitle('');
    setDesc('');
  }
  onClose();
};

const closeModal = () => {
  if (!isEdit) {
    setTitle('');
    setDesc('');
  }
  onClose();
};

  return (
    <>
    <StatusBar hidden />
    <Modal visible={visible} animationType='fade'>
      <View style={styles.container}>
        <TextInput
          value={title}
          onChangeText={text => handleOnChangeText(text, 'title')}
          placeholder='Title'
          style={[styles.input, styles.title]}
        />
           <TextInput
            value={desc}
            multiline
            placeholder='Note'
            style={[styles.input, styles.desc]}
            onChangeText={text => handleOnChangeText(text, 'desc')}
          />
           <View style={styles.btnContainer}>
          <AntDesign name="check" color="white" size={30} style={styles.btn}  onPress={handleSubmit}/>
         {title.trim() || desc.trim() ?( <AntDesign name="close" color="white" size={30} style={styles.btn2} onPress={closeModal} />): null}
          </View>
          
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default NoteInputModal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.PRIMARY,
    fontSize: 20,
    color: Colors.DARK,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  desc: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
    //backgroundColor:'red',
  },

     btn: {
         // position: 'absolute',
          //right: 15,
          top: 30,
          backgroundColor: Colors.PRIMARY,
          padding: 15,
          borderRadius: 80,
          elevation: 5,
        },
        btn2:{
          top: 40,
          backgroundColor: Colors.PRIMARY,
          padding: 15,
          borderRadius: 80,
          elevation: 5,
        },
        btnContainer:{}
  
});
