import React, { Component } from "react";
import {View,Text,ImageBackground} from "react-native";
import LottieView from 'lottie-react-native';

const title= "Contact Diary"
const Lottie =  "../assets/lottie.json"
//colors
const containerBackgroundColor=  "white"  
 

 export default class SplashScreen extends Component {

  
 
  render() {
   
    return(

    <View style={{flex:1}}>


 <ImageBackground style={{flex:1}} blurRadius={8}  source={require("../assets/bc.jpg")}>
 
  <Text style={{fontSize:37,color:"black" ,fontWeight:"bold",marginTop:"20%",alignSelf:"center",position:"absolute"}} >
         {title} 
    </Text>      
   


 <LottieView    source={require(Lottie)} autoPlay loop />
 
        
 </ImageBackground>  
 
</View>  
    )
  }
}


 
 
 
 
  
  