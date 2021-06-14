import React, { Component } from "react";
import { View,TouchableOpacity,Text,Dimensions,TextInput ,Modal,StyleSheet,FlatList,ToastAndroid,Alert,ImageBackground} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { Container,Content, Form, Item, Input, Label } from 'native-base'
import {Loader} from "../loader"
import { strLength } from "./strLength";
import { inject, observer } from "mobx-react"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
 
 class  Home_Screen extends Component  {
  
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
            flastlistR:false
            }
           
     
          }
 
 
clearfields(){
    this.setState(
      {
        dialogVisible:false,
        phone:"",
        city:"",
        name:""
      }
    ) 
}

checkEmptyFields () 
{
  const {name,phone,city}= this.state;

    if(name=="" || phone=="" || city==""    ){
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

getData = async () => {
  try {
    const {setContact } = this.props.store;
    const jsonValue = await AsyncStorage.getItem('contact')
    return jsonValue != null ? setContact(JSON.parse(jsonValue)) : null;
 
  } catch(e) {
   console.log("readt data eroor ",e);
  }
}

componentDidMount(){
  this.getData()
}
 
  onClickAdd(){
 this.setState({loader:true});
  
 const {name,phone,city,flastlistR}= this.state;
 const {addContact,contact} = this.props.store;
 
const obj={
name,
phone,
city,
 }
 
 addContact(obj)
 
 this.clearfields();
 this.setState({flastlistR:!flastlistR})
 setTimeout(() => {
  this.setState({loader:false})
 }, 800);
 this.storeData(contact)
 ToastAndroid.showWithGravity(
  "Add",
  ToastAndroid.SHORT,
  ToastAndroid.BOTTOM)
  }

removeContact(index){
const {removeContacts,contact}=this.props.store;

Alert.alert(
  "",
  "Are you sure ?  you want to delete contact ?",
  [
    {
      text: "No",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "Yes", onPress: () => {removeContacts(index),this.storeData(contact)}
    }
  ]
);


}
               

      render_Add_Contact()
      {
        const { dialogVisible } = this.state;
     

        const check =  this.checkEmptyFields();
        let ButtonEnable=false
        if(check) 
        ButtonEnable=true 

        console.log(check);
        
        return(
        <Modal
          visible={dialogVisible}
          animationType = {"fade"}  
          transparent = {true}  
        >




<View style={styles.modalContainer}>

  <View style={styles.modal}>


  


<View style={{backgroundColor:"#307ecc",width:"100%",height:50,borderRadius:5,alignItems:"center",justifyContent:"center"}}>
<Text style={{fontSize:24,color:"white",fontWeight:"bold"}}>New Contact</Text>
</View>

        <View style={{padding:5,marginTop:20,alignSelf:"center",alignItems:"center"}}>

    
        <Item floatingLabel
        style={{ width:230,height:45,fontSize:16,borderColor:"black",borderWidth:0.4}}
        >
              <Label>Name</Label>
              <Input onChangeText={text=> this.setState({name :text })} />
            </Item>

            <Item floatingLabel
        style={{ width:230,height:45,fontSize:16,borderColor:"black",borderWidth:0.4,marginTop:10}}
        >
              <Label>Phone</Label>
              <Input keyboardType="number-pad" onChangeText={text=> this.setState({phone:text })} />
            </Item>

            <Item floatingLabel
        style={{ width:230,height:45,fontSize:16,borderColor:"black",borderWidth:0.4,marginTop:10}}
        >
              <Label>City</Label>
              <Input onChangeText={text=> this.setState({city:text })} />
            </Item>
            

  
       </View>


<View style={{flexDirection:"row",position:"absolute",bottom:0,width:"100%",marginBottom:5,padding:10,margin:10}}>

<TouchableOpacity  style={{backgroundColor:!ButtonEnable ? "#307ecc" : "white",width:100,height:40,borderRadius:10,alignItems:"center",justifyContent:"center"}}  onPress={()=>{this.clearfields()}}>
<Text style={{color:!ButtonEnable ? "white" : "black",fontSize:22}} >Cancel</Text>
</TouchableOpacity>


{ButtonEnable ? (
  <TouchableOpacity   style={{backgroundColor:!ButtonEnable ?"white":"#307ecc",width:100,height:40,borderRadius:10,alignItems:"center",justifyContent:"center",marginLeft:10}} onPress={() => {this.onClickAdd()}} >
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

    
      renderTopBar(){

        return(
       
      <TouchableOpacity onPress={()=>{this.setState({dialogVisible:true,dialogClick:true})}}
      style={{backgroundColor:"#307ecc",borderRadius:10,height:50, marginTop:10,width:"90%",alignSelf:"center",alignItems:"center",justifyContent:"center"}}
      >

   <View   style={{backgroundColor:"#307ecc" ,alignItems:"center",flexDirection:"row",height:40,justifyContent:"center",width:"90%",alignSelf:"center",borderColor:"white",borderWidth:1.5}}>  
<Text style={{color:"white",fontSize:18,fontWeight:"bold"}}>Add New Contact</Text>
<Entypo style={{marginLeft:10}}  size={25} color="white" name="add-user" />
    </View>

    </TouchableOpacity>

                  
    
        )
      }

      rf(){
        this.forceUpdate()
      }
 
      RenderContacts  =   ({ item, index })  => {
        
        let name = item.name
        let phone = item.phone
        let city = item.city
    
       name  =   strLength(name,"name")
       phone =   strLength(phone,"phone")
       city  =   strLength(city,"city")

        
    
        return (

          <View style={{marginTop:25}}>

<TouchableOpacity 
style={{position:"absolute",right:0,marginRight:5}}
onPress={()=>{this.removeContact(index)}}>
<AntDesign size={27} color="red" name="deleteuser" />
</TouchableOpacity>

            <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate("Edit Details",{index:index,rf:()=>this.rf()})}}
            style={{width:windowWidth-50, backgroundColor:"white",height:100,borderRadius:10,marginTop:30,elevation:5,padding:5 }}>




           <View style={{flexDirection:"row"}}>

          <Ionicons size={70} color="black" name="person-circle-sharp" />
           
          <View style={{flexShrink:1,marginTop:10}}>
           <Text style={{color:"#307ecc",fontWeight:"bold",textTransform:"capitalize",fontSize:15}}>{name}</Text>    
           <Text style={{ textTransform:"capitalize",fontSize:14,marginTop:10}}>{phone}</Text>
           <Text style={{ textTransform:"capitalize",fontSize:14,marginTop:5}}>{city}</Text>   
          </View>


           </View>
           
         
           
            </TouchableOpacity>
          
        
      

          </View>
         
        
          
          
        )
      }

    
render(){
 const {dialogClick,flastlistR,loader}= this.state;
 const { contact } = this.props.store;
  

return(
 <Container style={{backgroundColor:"#ebebeb"}}>   
 
      {this.renderTopBar()}

      <Content style={{backgroundColor:"#ebebeb"}}>
      



       <Loader loader={loader}/>

              {dialogClick && this.render_Add_Contact()} 

              {contact.length<=0    
              ?(
              <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
              )
             :(
              <FlatList
        numColumns={1}
        data={contact}
        extraData={flastlistR} //true/fasle
        renderItem={this.RenderContacts}
        ListFooterComponent={<View style={{ height:10}} />}
        keyExtractor={(item, index) => { return index.toString() }}
        showsVerticalScrollIndicator={false}
        style={{marginTop:"10%",alignSelf:"center"}}
      />
              ) 
            }


         
      </Content>

           </Container>
       
)
     }

  }

  export default inject("store")(observer(Home_Screen));
 
  const styles = StyleSheet.create({  
  
    modalContainer: {    
      backgroundColor : 'rgba(0,0,0,0.7)', 
      justifyContent: 'center', 
      alignItems: 'center',
      flex:1,        
       },
    modal: {    
    backgroundColor : "#e3e3e3",   
    height: 350 ,  
    width: '70%',  
    borderRadius:5,       
     },  
  
  });  