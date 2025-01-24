import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../utils/colors";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  currencyBalanceContainer: {
    marginVertical: 30,
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  currencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    width: width * 0.9, // Increased to 90% for better screen utilization
    maxWidth: 400, // Set a max width for larger screens
    alignSelf: 'center', // Center the card on all screen sizes
  },
  flagIcon: {
    width: 60,
    height: 60,
    borderRadius: 30, // Circular flag icon
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  balanceDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  currencyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textAlign: 'left', 
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginTop: 5,
    textAlign: 'right',
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 5,
    textAlign: 'right',
  },
  conversionRate: {
    fontSize: 12,
    color: colors.white,
    marginTop: 5,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  actionButton: {  
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white for glassy effect  
    color: colors.white, // Maintain text color  
    paddingVertical: 12,  
    paddingHorizontal: 20,  
    borderRadius: 10,  
    textAlign: 'center',  
    fontWeight: '600',  
    fontSize: 16,  
    borderWidth: 1,  
    borderColor: 'rgba(255, 255, 255, 0.5)', // Light border for better contrast  
    elevation: 3,  
    shadowColor: 'rgba(0, 0, 0, 0.2)',  
    shadowOffset: { width: 0, height: 2 },  
    shadowOpacity: 0.3,  
    shadowRadius: 4,  
  },  
  quickActionButton: {  
    flexDirection: 'row',  
    alignItems: 'center',  
    justifyContent: 'center',  
    flex: 1,  
    marginHorizontal: 5,  
    position: 'relative',  
    overflow: 'hidden', // Helps with the overflow of children like shadows  
    borderRadius: 10, // Match with actionButton for consistency  
  }, 
  iconStyle: {  
    position: 'absolute', // Position the icon absolutely  
    left: 16, // Adjust the right position to your preference  
    top: '50%', // Center the icon vertically  
    transform: [{ translateY: -10 }], // Adjust to align vertically with text  
  },  
  cardHeader: {
    backgroundColor: '#000', // Semi-transparent black background
    borderTopLeftRadius: 15, // Match card corner radius
    borderTopRightRadius: 15,
    padding: 10, // Add padding around the content
    alignItems: 'flex-start', // Center align text
  },
  businessName: {
    fontSize: 18, // Larger font size for emphasis
    fontWeight: 'bold', // Bold font for better visibility
    color: '#fff', // White text color for contrast
    marginBottom: 5, 
    right:70
  },
  packageType: {
    fontSize: 14, // Slightly smaller font size
    color: '#fff', // Light gray text color
    left:100,
    marginBottom:10
  },
  transactionCard: {
    flexDirection: 'row', // Ensure image and details are side by side
    marginBottom: 15, // Adjust as needed
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 2, // Optional for shadow effect
  },
  
  transactionImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15, // Space between image and text
  },
  
  transactionImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  
  transactionDetails: {
    flex: 1, // This will take the remaining space for the text content
    justifyContent: 'center', // Vertically center text
  },
  
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  transactionType: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  transactionDate: {
    fontSize: 12,
    color:"#000",
  },
  
  transactionBody: {
    marginTop: 5,
    justifyContent: 'space-between',
    flexDirection:'row'
  },
  
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  transactionStatus: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default styles;
