import { View, Text, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './styles';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>
      <Image source={"../../assets/birthdayParty.jpeg"} styles={styles.logo} />
        <Text style={styles.title}>Event manager App</Text>
      </View>
     
    </View>
  );
}