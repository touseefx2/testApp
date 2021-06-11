import { decorate, observable, action } from "mobx";

class contactStore {

 @observable contact = []

 
  addContact =(obj)=>{
    if(obj){
      this.contact.push(obj)
    }
  }

 
  removeContacts (cntct) {
    this.contact = this.list.filter((l) => {
      return l.index !== cntct.index
    })
  }


//   addItem(item, name) {
//     this.list.forEach((l) => {
//       if (l.index === item.index) {
//         l.items.push(name)
//       }
//     })
//   }

}

//another way to decorate variables with observable
// decorate(contactStore, {
//   contact: observable,
//   removeContacts: action,
//   addContact: action
// });



 export default new contactStore();

 