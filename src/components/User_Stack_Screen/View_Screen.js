import React, { Component } from "react";
import { View,TouchableOpacity,Text,Dimensions,ImageBackground,ToastAndroid,ScrollView} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Container,Content, Item, Input} from 'native-base'
import {Loader} from "../loader"
import { inject, observer } from "mobx-react"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

 
 
 class  View_Screen extends Component  {
  
      constructor(props) {
            super(props);
            this.state =
            {
            loader:false,
            dialogVisible:false,
            dialogClick:false,

            phone:"",
            city:"",
            name:"",
            
           flastlistR:false,
           index:props.route.params.index
            }
           
     
          }
 

   checkEmptyFields () 
{
  const {name }= this.state;

    if(name=="" ){
      return false;
    } else{
      return true;
    }
}
 
storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('contact', jsonValue)
  } catch (e) {
   console.log("storedata error")
  }
}


  onClickSave(){
const {contact} = this.props.store;
 this.setState({loader:true});
  
 const {name,phone,city,index}= this.state;
 const { editContact} = this.props.store;
 
 editContact(index,name,phone,city);
 
 setTimeout(() => {
  this.setState({loader:false});
   this.storeData(contact)
  ToastAndroid.showWithGravity(
    "Save",
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM)
 }, 800);
}
       
 
componentDidMount(){
  const{index}=this.state
  const { contact } = this.props.store;
  this.setState({
name:contact[index].name,
phone:contact[index].phone,
city:contact[index].city
  })
}


componentWillUnmount(){
  this.props.route.params.rf();
}
   
 
      RenderContacts  =   (index )  => {

        const{ name,phone,city}=this.state


        const check =  this.checkEmptyFields();
       let ButtonEnable=false
        if(check) 
        ButtonEnable=true 
 
        return (
         
          <View style={{marginTop:"5%"}}>
           
           
           <Ionicons size={120} color="black" style={{marginLeft:"8%"}}   name="person-circle-sharp" />
        
         

   <View  style={{margin:25,marginTop:"15%"}}>

 <Item style={{padding:5,borderColor:"black",backgroundColor:"white"}} rounded>
 <Ionicons   name= "person" color={"#307ecc"} size={20}  />
 <Input   
placeholder='Name'  value={name}    defaultValue={name}   onChangeText={(txt)=>this.setState({name:txt})} />
 </Item>

 <Item style={{padding:5,marginTop:25,borderColor:"black",backgroundColor:"white"}}  rounded>
 <Ionicons   name= "call" color={"#307ecc"} size={20}  />
 <Input  
 placeholder='Phone'  value={phone}  keyboardType="number-pad"   defaultValue={phone}   
 onChangeText={(txt)=>this.setState({phone:txt})} />
 </Item>

 <Item style={{padding:5,marginTop:25,borderColor:"black",backgroundColor:"white"}}  rounded>
 <Ionicons   name= "home" color={"#307ecc"} size={20} />
 <Input  
 placeholder='City'  value={city}    defaultValue={city}   onChangeText={(txt)=>this.setState({city:txt})} />
 </Item>
          
 </View>


 
{ButtonEnable? (
 <TouchableOpacity  
 style={{backgroundColor: "black",width:100,height:40,borderRadius:20,alignItems:"center",justifyContent:"center",alignSelf:"center",marginTop:40,elevation:5}} 
  onPress={()=>{this.onClickSave()}}>
<Text style={{color :"white"  ,fontSize:22}}>Update</Text>
</TouchableOpacity>

):(
  <View 
  style={{backgroundColor: "grey",width:100,height:40,borderRadius:20,alignItems:"center",justifyContent:"center",alignSelf:"center",marginTop:40,elevation:5}}>
 <Text style={{color :"silver"  ,fontSize:22}}>Update</Text>
 </View>
 
)  }

           
            </View>
   
          
        )
      }

    
render(){
 const { loader,index}= this.state;
 
 
return(
  <View style={{flex:1}}>

<ImageBackground style={{flex:1}} blurRadius={8}  source={require("../../assets/bc.jpg")}>
   <ScrollView>
   
         
    <Loader loader={loader}/>
      {this.RenderContacts(index)}
     
      </ScrollView>
      </ImageBackground>  
</View>
)
     }

  }

  export default inject("store")(observer(View_Screen));
 
    