import React, { Component } from "react";
import { View,TouchableOpacity,Text,Dimensions,TextInput ,Modal,StyleSheet,FlatList,ToastAndroid} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { Container,Content} from 'native-base'
import {Loader} from "../loader"
import { strLength } from "./strLength";
import  contactStore from "../../mobx/contactStore";
import { inject, observer } from "mobx-react"; 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const contactsData=[
//   {
//     id: 1,
//     name:"touseef",
//     phone:"03075839836",
//     city:"islamabad,Pakistan"
//   },
//   {
//     id: 2,
//     name:"Muhammad Umer Abdul",
//     phone:"03075839836",
//     city:"Gujrat"
//   },
//   {
//     id: 3,
//     name:"x2",
//     phone:"03075839836",
//     city:"islamabad"
//   },
  
// ]
 
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
 

  onClickAdd(){
 this.setState({loader:true});
  
 const {name,phone,city,flastlistR}= this.state;
 const {addContact } = this.props.store;
 
const obj={
name,
phone,
city,
 }
 
 addContact(obj)
 

 //contactsData.push(obj);
 this.clearfields();
 this.setState({flastlistR:!flastlistR})
 setTimeout(() => {
  this.setState({loader:false})
 }, 800);
 ToastAndroid.showWithGravity(
  "Add",
  ToastAndroid.SHORT,
  ToastAndroid.BOTTOM)

}
               

      render_Add_Contact()
      {
        const {loader,dialogVisible } = this.state;
     

        const check =  this.checkEmptyFields();
        let ButtonEnable=false
        if(check) 
        ButtonEnable=true 
        
        return(
        <Modal
          visible={dialogVisible}
          animationType = {"fade"}  
          transparent = {true}  
        >




<View style={styles.modal}>


<View style={{backgroundColor:"#307ecc",width:"100%",height:50,borderRadius:5,alignItems:"center",justifyContent:"center"}}>
<Text style={{fontSize:24,color:"white",fontWeight:"bold"}}>New Contact</Text>
</View>

        <View style={{padding:5,marginTop:15,alignSelf:"center",alignItems:"center"}}>

    
    <TextInput  style={{ backgroundColor:"white",width:230,height:45,fontSize:16,marginTop:17,borderColor:"black",borderWidth:0.4}}  
          onChangeText={text=> this.setState({name :text })}
          placeholder={"Name"} 
    />

<TextInput  style={{ backgroundColor:"white",width:230,height:45,fontSize:16,marginTop:17,borderColor:"black",borderWidth:0.4 }}  
         keyboardType={"phone-pad"}
         onChangeText={text=> this.setState({phone:text })}
          placeholder={"Phone"} 
    />
    

    <TextInput  style={{ backgroundColor:"white",width:230,height:45,fontSize:16,marginTop:17,borderColor:"black",borderWidth:0.4 }}  
          onChangeText={text=> this.setState({city:text })}
          placeholder={"City"} 
    />


  
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
 
  
        </Modal>
      
        )
      
      }

    
      renderTopBar(){

        return(
       
      <TouchableOpacity onPress={()=>{this.setState({dialogVisible:true,dialogClick:true})}}
      style={{backgroundColor:"#307ecc",borderBottomEndRadius:40,borderBottomLeftRadius:40,height:65, marginTop:10,width:"90%",alignSelf:"center",alignItems:"center",justifyContent:"center"}}
      >

   <View   style={{backgroundColor:"#307ecc",borderBottomEndRadius:40,borderBottomLeftRadius:40,alignItems:"center",flexDirection:"row",height:50,justifyContent:"center",width:"90%",alignSelf:"center",borderColor:"white",borderWidth:2.5}}>  
<Text style={{color:"white",fontSize:18,fontWeight:"bold"}}>Add New Contact</Text>
<Entypo style={{marginLeft:10}}  size={25} color="white" name="add-user" />
    </View>

    </TouchableOpacity>

                  
    
        )
      }
 
      RenderContacts  =   ({ item, index })  => {
        
        let name = item.name
        let phone = item.phone
        let city = item.city
    
       name  =   strLength(name,"name")
       phone =   strLength(phone,"phone")
       city  =   strLength(city,"city")

        const obj={name,phone,city,index}
    
        return (
         
          <View 
            onPress={()=>{this.props.navigate("View_Screen",{obj:obj})}}
            style={{width:150, backgroundColor:"white",height:125,marginLeft:10,borderRadius:7,marginTop:30,marginRight:10,elevation:10,padding:5 }}>

           <View style={{flexDirection:"row",alignItems:"center"}}>

          <Ionicons size={45} color="black" name="person-circle-sharp" />
           
          <View style={{flexShrink:1}}>
         <Text style={{color:"#307ecc",fontWeight:"bold",textTransform:"capitalize",fontSize:15}}>{name}</Text>    
          </View>


           </View>
           
           <View style={{marginTop:10}}>
           <Text style={{ textTransform:"capitalize",fontSize:14}}>{phone}</Text>
           <Text style={{ textTransform:"capitalize",fontSize:14,marginTop:5}}>{city}</Text>

           </View>
 
           
            </View>
          
          
          
          
        )
      }

    
render(){
 const {dialogClick,flastlistR,loader}= this.state;
 const { contact } = this.props.store;
 
 console.log("contact mobdstre", contact)

return(
      <Container style={{backgroundColor:"#f2f2f2"}}>   
      {this.renderTopBar()}
      <Content style={{backgroundColor:"#f2f2f2"}}>
          
<Loader loader={loader}/>
              {dialogClick && this.render_Add_Contact()} 

              {contact.length<=0  
              ?(
              <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
              )
             :(
              <FlatList
        numColumns={2}
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
 // export default Home_Screen
 
  const styles = StyleSheet.create({  
    modal: {    
    backgroundColor : "#e3e3e3",   
    height: 350 ,  
    width: '70%',  
    borderRadius:10,  
    borderWidth: 1,  
    borderColor: "#307ecc",    
    marginTop: "50%",  
    alignSelf:"center"   
     },  
  
  });  