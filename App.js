import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';

export default function App() {

  const [contact, setContact] = useState([]);

  const getContact = async () => {
    const {status} = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const {data} = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers]
      });
      if(data.length >0)
      setContact(data);
    }
  }


  return (
    <View style={styles.container}>
      <Text>Kontaktit
      </Text>
     <Button title = 'Get contact' onPress={getContact} />
      <FlatList 
      data={contact}
      renderItem={({ item }) => (
        <View>
          <Text>{item.name}</Text>
          {item.phoneNumbers && item.phoneNumbers.map((phoneNumber, index) => (
            <Text key={index}>{phoneNumber.number}</Text>
          ))}
        </View>
      )}
      keyExtractor={(item) => item.id}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
