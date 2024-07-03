import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F7F7F7', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', 
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionLabel: {
    fontSize: 18,
    marginLeft: 10,
    color: '#007F00', 
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333', 
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333', 
  },
  detailText: {
    fontSize: 16,
    color: '#555', 
  },

    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    optionLabel: {
      fontSize: 16,
      marginRight: 10,
    },
    sectionTitleContainer: {
      
      padding: 10,
      marginBottom: 10,
   
      // Additional styles as needed
    },
    sectionTitleText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333333',
      // Additional styles as needed
    },

  
});

export default styles;
