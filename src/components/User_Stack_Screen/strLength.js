

const assignL = (type)=>{
if(type=="name"){  
    return 25
}
else if(type=="phone"){   
    return 25
}
else if(type=="city"){
    return 30
}
}

export const  strLength =  (str,type)=>{
 let length= assignL(type)
 
 let strng= str;
 if (str.length > length){
  strng =  str.substring(0, length)+".."
 } 
     return strng
 

}