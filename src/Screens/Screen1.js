import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, TextInput, Alert, StyleSheet, FlatList, SafeAreaView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { save } from '../database';

const Screen1 = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventType, setEventType] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventPrice, setEventPrice] = useState('');

  const handleSubmit = async () => {
    if (!name || !email || !message ) {
      Alert.alert('All fields are required');
      return;
    }
  
    const data = {
      name,
      email,
      message,
      eventType: selectedEvent ? selectedEvent.type : eventType,
      eventTitle: selectedEvent ? selectedEvent.title : eventTitle,
      eventPrice: selectedEvent ? selectedEvent.price : eventPrice
    };
  
    const id = await save(data);
  
    if (id) {
      Alert.alert('Event added successfully');
      setName('');
      setEmail('');
      setMessage('');
      setEventType('');
      setEventTitle('');
      setEventPrice(''); 
      setModalVisible(false);
    } else {
      Alert.alert('Error adding event');
    }
  };

  const data = [
    { 
      id: '1',
      type: 'event',
      title: 'BirthDay Party',
      price: '$75',
      description: 'A celebration of someone\'s birth',
      imageUrl: require('../../assets/birthdayParty.jpeg')
    },
    { 
      id: '2',
      type: 'event',
      title: 'Wedding Party',
      price: '$75',
      description: 'A ceremony where two people are united in marriage',
      imageUrl: require('../../assets/wedding.jpeg')
    },
    { 
      id: '3',
      type: 'event',
      title: 'Farewell Party',
      description: 'A goodbye celebration for someone leaving',
      price: '$75',
      imageUrl: require('../../assets/farwellParty.jpeg')
    },
    { 
      id: '4',
      type: 'event',
      title: 'Awards Function',
      description: 'A ceremony to honor achievements',
      price: '$120',
      imageUrl: require('../../assets/AwardsFunction.jpeg')
    
    },
   
  ];

  const renderItem = ({ item }) => {
    if (item.type === 'event') {
      return (
        <TouchableOpacity onPress={() => { setSelectedEvent(item); setModalVisible(true); }}>
          <View style={styles.itemContainer}>
            <Image 
              source={item.imageUrl}
              style={styles.image}
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
 <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Events</Text>
      <Text style={styles.pageDescription}>Explore and choose from our exciting events!</Text>
    </View>     
     <FlatList 
        data={data} 
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <View>
                <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                <Image 
                  source={selectedEvent.imageUrl}
                  style={styles.modalImage}
                />
                <Text style={styles.modalDescription}>{selectedEvent.description}</Text>
                <Text style={styles.modalDescription}>Price: {selectedEvent.price}</Text>
              </View>
            )}
            {!selectedEvent && (
              <View>
                <Text style={styles.modalTitle}>Add New Event</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Event Type"
                  value={eventType}
                  onChangeText={(text) => setEventType(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Event Title"
                  value={eventTitle}
                  onChangeText={(text) => setEventTitle(text)}
                />
              </View>
            )}
            <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Get in Touch</Text>
              <TextInput
                style={styles.input}
                placeholder="Your Name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Your Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Your Message"
                multiline
                value={message}
                onChangeText={(text) => setMessage(text)}
              />
            </View>
            <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} />
            <View style={{ width: 20 }} /> 
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  pageDescription: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: "auto%",
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  modalDescription: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', 
    borderRadius: 5, 
    width: "auto",
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  formTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalDescription: {
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: '#F0F0F0', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20, 
  },
});

export default Screen1;
