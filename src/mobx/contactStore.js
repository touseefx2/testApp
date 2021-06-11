import { observable,makeObservable  } from "mobx";

class contactStore {

  constructor(){
    makeObservable(this) //if use latest version of mobx it is must add to rerdr cmpnt aftr state chnge
  }

 
 @observable contact = []

 
  addContact =(obj)=>{
    if(obj){
      this.contact.push(obj)
    }
  }

  editContact =(index,name,phone,city)=>{
    if(index!=null){
      this.contact[index].name=name;
      this.contact[index].phone=phone;
      this.contact[index].city=city;
    }
  }
 
  removeContacts = (index)=> {
    this.contact.splice(index,1)
  }

}
 
 
 export default new contactStore();

 

 //another way to decorate variables with observable
// decorate(contactStore, {
//   contact: observable,
//   removeContacts: action,
//   addContact: action
// });