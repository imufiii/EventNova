import {View, Text, Switch, Platform, Pressable} from 'react-native';
import  {useState, useEffect} from 'react';
import styles from './styles';
import * as Notifications from 'expo-notifications';

export default function LocalNotification() {
    const [reminders, setReminders] = useState(false);
    const [scheduled, setScheduled] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null); 

    const handleReminderPress = async () => {
        if(!reminders){
            const schedule = await scheduleReminder();
            if(schedule){
                setReminders(true);
                setScheduled(await getSchedule());
            }
         
        } else {
            const cancelled = await cancelReminder();
            if(cancelled){
                setReminders(false);
                setScheduled(await getSchedule());
            }
         
        }
    }

    useEffect(() => {
        (async () => {
            const previouslyScheduled = await getSchedule();
            setScheduled(previouslyScheduled);
            if (previouslyScheduled.find((item) => item.type === 'reminder')){
                setReminders(true);
            }
        })();
    },[]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

    return (
        
        <View style={styles.container}>
            
            <View style={styles.sectionTitleContainer}>
  <Text style={styles.sectionTitleText}>Heading</Text>
</View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>App Name:</Text>
        <Text style={styles.detailText}>Event Manager App</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Developer:</Text>
        <Text style={styles.detailText}>Mufeed Muneer and Arul Sajeevkumar</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Version:</Text>
        <Text style={styles.detailText}>1.0.0</Text>
      </View>
      <Text style={styles.detailLabel}>Remind Me:</Text>
      <View style={styles.detailsContainer}>
       
        <Text style={styles.detailText}>To keep you on track, you can set a daily reminder to receive notifications.</Text>
        
 
      </View>

      <View style={styles.rowContainer}>
  <Text style={styles.detailLabel}>Set Daily Reminder</Text>
  <Switch
    value={reminders}
    onValueChange={handleReminderPress}
  />
</View>
</View>
    );
}

async function scheduleReminder() {
    try{
           
            const permission = await Notifications.getPermissionsAsync();
            if(!permission.granted){
                const request = await Notifications.requestPermissionsAsync({
                    ios: {
                        allowAlert: true,
                        allowBadge: true,
                        allowSound: true,
                        
                    }
                });
                if(!request.granted){
                    return false;
            }
        }
        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Todo Reminder',
                body: 'Remember to check your tasks',
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                subtitle: 'Dont forget',
                color: '#FF4500',
                badge: 0,
                data: {
                    userId: 'abc',
                    username: 'maria',
                    type: 'reminder',
                }
            },
            trigger: {
                hour: 12,
                minute: 0,
                repeats: true
            }

        });
        console.log('Scheduled notification with id:', id);
        if(!id){
            return false;
        }
    } catch {
        return false;
    }

return true;
}
async function cancelReminder() {
    console.log('cancel for', Platform.OS);
    let cancelled =  false;
    const schedule =  await getSchedule();
    for (const item of schedule){
        if(item.type === 'reminder'){
            await Notifications.cancelScheduledNotificationAsync(item.id);
            cancelled = true;
        }
    }
    return cancelled;
}

async function getSchedule(){
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    const schedule = [];
    scheduledNotifications.forEach((scheduleNotification) => {
        schedule.push({
            id: scheduleNotification.identifier,
            type: scheduleNotification.content.data.type
           
        });
    });
    return schedule;
}