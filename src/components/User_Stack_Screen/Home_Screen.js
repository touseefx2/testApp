import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,Modal,StyleSheet,ScrollView,Animated ,ToastAndroid,Alert,ImageBackground} from "react-native";
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Item, Input, Label } from 'native-base'
import {Loader} from "../loader"
import { strLength } from "./strLength";
import { inject, observer } from "mobx-react"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
const cardWidth=windowWidth-35;
const cardHeight=120;

  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }


function  Home_Screen(props)  {
  const listViewRef = useRef(); 
  const [name, setname] = useState("")
  const [phone, setphone] = useState("")
  const [city, setcity] = useState("")
  const [loader, setloader] = useState(true)
  const [dialogVisible, setdialogVisible] = useState(false)
  const [dialogClick, setdialogClick] = useState(false)
  const forceUpdate = useForceUpdate();
  const { contact } = props.store;
  const scrollY= useRef(new Animated.Value(0)).current;

 
  useEffect(()=>{
getData();
setTimeout(() => {
  setloader(false)
}, 800);
  },[])

  const clearfields =()=>{
    setdialogClick(false);
    setname("");
    setphone("");
    setcity("") 
}

const checkEmptyFields=()=>
{
 
    if(name=="" || phone=="" || city==""    ){
      return false;
    } else{
      return true;
    }
}
 
const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('contact', jsonValue)
  } catch (e) {
   console.log("storedata error")
  }
}

const getData = async () => {
  try {
    const {setContact } =  props.store;
    const jsonValue = await AsyncStorage.getItem('contact')
    return jsonValue != null ? setContact(JSON.parse(jsonValue)) : null;
 
  } catch(e) {
   console.log("readt data eroor ",e);
  }
}

 
const onClickAdd=()=>{
 setloader(true)
 const {addContact,contact} =  props.store;
const obj={
name,
phone,
city,
 }
 addContact(obj)
 clearfields();
 setTimeout(() => {
  setloader(false)
 }, 800);
  storeData(contact)
 ToastAndroid.showWithGravity(
  "Add",
  ToastAndroid.SHORT,
  ToastAndroid.BOTTOM)
  }

  const removeContact=(index)=>{
const {removeContacts,contact}=props.store;

Alert.alert(
  "",
  "Are you sure ?  you want to delete contact ?",
  [
    {
      text: "No",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "Yes", onPress: () => {removeContacts(index),storeData(contact)}
    }
  ]
);


}
               

const    render_Add_Contact=()=>
      {
 
        const check =   checkEmptyFields();
        let ButtonEnable=false
        if(check) 
        ButtonEnable=true 
 
        
        return(
        <Modal
          visible={dialogVisible}
          animationType = {"fade"}  
          transparent = {true}  
        >




<View style={styles.modalContainer}>

  <View style={styles.modal}>


  


<View style={{backgroundColor:"black",width:"100%",height:50,alignItems:"center",justifyContent:"center"}}>
<Text style={{fontSize:24,color:"white",fontWeight:"bold"}}>New Contact</Text>
</View>

        <View style={{padding:5,marginTop:20,alignSelf:"center",alignItems:"center"}}>

    
        <Item floatingLabel
        style={{ width:230,height:45,fontSize:16,borderColor:"black",borderWidth:0.4}}
        >
              <Label>Name</Label>
              <Input onChangeText={text=>setname(text)} />
            </Item>

            <Item floatingLabel
        style={{ width:230,height:45,fontSize:16,borderColor:"black",borderWidth:0.4,marginTop:10}}
        >
              <Label>Phone</Label>
              <Input keyboardType="number-pad" onChangeText={text=> setphone(text)} />
            </Item>

            <Item floatingLabel
        style={{ width:230,height:45,fontSize:16,borderColor:"black",borderWidth:0.4,marginTop:10}}
        >
              <Label>City</Label>
              <Input onChangeText={text=> setcity(text)} />
            </Item>
            

  
       </View>


<View style={{flexDirection:"row",position:"absolute",bottom:0,width:"100%",marginBottom:5,padding:10,margin:10}}>

<TouchableOpacity  style={{backgroundColor:!ButtonEnable ? "#307ecc" : "white",width:100,height:40,borderRadius:10,alignItems:"center",justifyContent:"center"}}  onPress={()=>{clearfields()}}>
<Text style={{color:!ButtonEnable ? "white" : "black",fontSize:22}} >Cancel</Text>
</TouchableOpacity>


{ButtonEnable ? (
  <TouchableOpacity   style={{backgroundColor:!ButtonEnable ?"white":"#307ecc",width:100,height:40,borderRadius:10,alignItems:"center",justifyContent:"center",marginLeft:10}} onPress={() => {onClickAdd()}} >
<Text style={{color:!ButtonEnable ? "silver":"white",fontSize:22}} >Add</Text>
</TouchableOpacity>

) :(
  <View  style={{backgroundColor:!ButtonEnable ?"white":"#307ecc",width:100,height:40,borderRadius:10,alignItems:"center",justifyContent:"center",marginLeft:10}}   >
  <Text style={{color:!ButtonEnable ? "silver":"white",fontSize:22}} >Add</Text>
  </View >
)}


</View>

</View>

  </View>
 
  
        </Modal>
      
        )
      
      }

      const    renderUp=()=>{
        return(
          <View  style={{width:"100%",height:30}}>
   
<TouchableOpacity  style={{alignSelf:"flex-end",marginRight:12,marginTop:5}} onPress={()=>{
  listViewRef.current?.scrollTo({
    offset: 0,
    animated: true,
});
  }} >
     <FontAwesome5  style={{opacity:.7}}    size={25} color="black" name="angle-double-up" />
    </TouchableOpacity>
   
         </View>
        )
      } 

      const    renderDown=()=>{
        return(
          <View  style={{width:"100%",height:30,bottom:0}}>
 
    <TouchableOpacity  style={{alignSelf:"flex-end",marginRight:12,marginBottom:5}} onPress={()=>{
       listViewRef.current?.scrollToEnd({ animated: true })
    }} >
     <FontAwesome5   style={{opacity:.7}}   size={25} color="black" name="angle-double-down" />
    </TouchableOpacity>
   
         </View>
        )
      }

    
      const    renderAddButton=()=>{
        return(
          <View  style={{ position: 'absolute',flex:1,right: 10,bottom: 70}}>


          
    <TouchableOpacity onPress={()=>{setdialogClick(true);setdialogVisible(true)}} 
    style={{ opacity:.8,backgroundColor:"black",width:80,height:80,borderRadius:40,alignItems:"center",justifyContent:"center"}}>
     <MaterialIcons onPress={()=>{setdialogClick(true);setdialogVisible(true)}}   size={70} color="white" name="add" />
    </TouchableOpacity>
   
         </View>
        )
      }

       
      const    RenderContacts  = ()=> { 
   
    let item  =   contact.map((item,index)=>{

        let name = item.name
        let phone = item.phone
        let city = item.city
    
       name  =   strLength(name,"name")
       phone =   strLength(phone,"phone")
       city  =   strLength(city,"city")

       const scale = scrollY.interpolate({
        inputRange :[
          -1,0,
          cardHeight * index,
          cardHeight * (index+2)
        ]
        ,  
        outputRange:[1, 1, 1, 0]
      })

      const opacity = scrollY.interpolate({
        inputRange :[
          -1,0,
          cardHeight * index,
          cardHeight * (index+0.9)
        ]
        ,  
        outputRange:[1, 1, 1, 0]
      })


       return (
 
        <Animated.View style={[styles.card,
          {
          opacity,
          transform:[{scale}]
          }
        ]}>

<TouchableOpacity 
style={{position:"absolute",right:0,marginRight:5}}
onPress={()=>{removeContact(index)}}>
<Entypo size={26} color="#de5050" style={{opacity:0.8}} name="cross" />

</TouchableOpacity>


       <TouchableOpacity style={{flexDirection:"row",marginTop:10}}
        onPress={()=>{props.navigation.navigate("Edit Details",{index:index,rf:()=> forceUpdate()})}} >

      <Ionicons size={70} color="black" name="person-circle-sharp" />
       
      <View style={{flexShrink:1,marginTop:10}}>
       <Text style={{color:"#307ecc",fontWeight:"bold",textTransform:"capitalize",fontSize:15}}>{name}</Text>    
       <Text style={{ textTransform:"capitalize",fontSize:14,marginTop:10}}>{phone}</Text>
       <Text style={{ textTransform:"capitalize",fontSize:14,marginTop:5}}>{city}</Text>   
      </View>


       </TouchableOpacity>
       
     
       
    </Animated.View>  
      
 
    )

       })
    
  return  item;

      }
       
     
return(
  <View style={{flex:1}}>
 
 <ImageBackground style={{flex:1}} blurRadius={8}  source={require("../../assets/bc.jpg")} >   
 {renderUp()} 
 <Loader loader={loader}/>
 <ScrollView ref={listViewRef}
  onScroll={Animated.event([
    {
      nativeEvent: {
        contentOffset: {
          y: scrollY
        }
      }
    }
  ])}
  scrollEventThrottle={1}
 >
        
        
         {dialogClick &&  render_Add_Contact()} 

              {contact.length<=0 && !loader   
              ?(
              <Text style={{fontSize:38,color:"white",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
              )
             :(
             RenderContacts()
              ) 

            }

</ScrollView>  
{renderDown()}    
</ImageBackground> 

 {renderAddButton()} 
 
</View>   
)
     }
 
     export default  inject("store")(observer(Home_Screen));
 
  const styles = StyleSheet.create({  
  
    modalContainer: {    
      backgroundColor : 'rgba(0,0,0,0.8)', 
      justifyContent: 'center', 
      alignItems: 'center',
      flex:1,        
       },
    modal: {    
    backgroundColor : "#e3e3e3",   
    height: 350 ,  
    width: '70%',         
     },  
     card:
     {
      marginTop:30,alignSelf:"center", width:cardWidth, backgroundColor:"white",
      height:cardHeight,borderRadius:10,padding:10,borderRadius:10,
      shadowColor:"black",
      shadowOffset:{width:0,height:10},
      shadowOpacity:.3,
      shadowRadius:20,
      elevation:5,
    }
  
  });  