import React from "react";
import SplashScreen from "./src/components/SplashScreen"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {user_Stack} from "./src/Stack/user_Stack";
 
 
const RootStack = createStackNavigator();

export default  class App extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
 
componentDidMount() {
  
  setTimeout(() => {
    this.setState({loading:false})
  }, 1700);
render()
{
  const {loading} = this.state;
 
  if (loading) 
  {
    return  <SplashScreen />
  }

  else if (!loading) 
  {

   return (  
   <NavigationContainer>
 <RootStack.Navigator headerMode="none">

      
      <RootStack.Screen name='user_Stack' component={user_Stack}/> 
    
 

</RootStack.Navigator>
    </NavigationContainer>

   )
  }

}}

 