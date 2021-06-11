import React  from 'react';
import Home_Screen   from "../components/User_Stack_Screen/Home_Screen";
import  View_Screen from "../components/User_Stack_Screen/View_Screen";
import { createStackNavigator } from '@react-navigation/stack';

 
const Stack = createStackNavigator();

 export  const user_Stack =()=> (
    <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          animationEnabled: false
        }}
        
    >
        <Stack.Screen name="Home"  component={Home_Screen} options={headerStyles} />
        <Stack.Screen name="Edit Details" component={View_Screen}  options={headerStyles}/>
    </Stack.Navigator>
 )


 

const headerColor="#307ecc"
const headerTextColor="white"


 const headerStyles={

  headerStyle: {
    backgroundColor: headerColor, //Set Header color
},
headerTintColor: headerTextColor, //Set Header text color
headerTitleStyle: {
    fontWeight: 'bold', //Set Header text style
},
 
}