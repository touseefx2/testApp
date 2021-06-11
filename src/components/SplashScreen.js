import React, { Component } from "react";
import {View,Text} from "react-native";
import LottieView from 'lottie-react-native';

const title= "Contact Diary"
const Lottie =  "../assets/lottie.json"
//colors
const containerBackgroundColor=  "white"  
 

 export default class SplashScreen extends Component {

  
 
  render() {
   

    return (
      <View style={{flex:1,backgroundColor:containerBackgroundColor}}>
 
 
  <Text style={{fontSize:37,color:"#307ecc" ,fontWeight:"bold",marginTop:"20%",alignSelf:"center",position:"absolute"}} >
         {title} 
    </Text>      
   


 <LottieView    source={require(Lottie)} autoPlay loop />
 
        

        </View>
    );
  }
}


 
 
 
 
  
  