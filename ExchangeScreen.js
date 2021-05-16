import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity , TextInput, KeyboardAvoidingView} from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
//import MyHeader from '../components/MyHeader';

export default class ExchangeScreen extends Component{
constructor(){
    super();
    this.state={
        userId : firebase.auth().currentUser.email,
      itemName : "",
      description : "",
      requestedItemName:"",
      exchangeId:"",
      itemStatus:"",
      docId: "",
      itemValue:"",
      currencyCode:""
    }
}
createUniqueId(){
    return Math.random().toString(36).substring(7);
  }
  
addItem=(name, descr)=>{
var userId = this.state.userId;
var exchangeId = this.createUniqueId()
db.collection('exchange_requests').add({
    'username':userId,
    'item_name': name,
    'description':descr,
    "exchangeId"  : exchangeId,
      "date"       : firebase.firestore.FieldValue.serverTimestamp()
})

this.setState({
    name:'',
    description:'',
})
}


getIsExchangeRequestActive(){
    db.collection('User')
    .where('user_name','==',this.state.userId)
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.setState({
          IsExchangeRequestActive:doc.data().IsExchangeRequestActive,
          userDocId : doc.id,
          currencyCode: doc.data().currency_code
        })
      })
    })
  }

  sendNotification=()=>{
    //to get the first name and last name
    db.collection('User').where('user_name','==',this.state.userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        var name = doc.data().first_name
        var lastName = doc.data().last_name

        // to get the donor id and item name
        db.collection('all_notifications').where('exchangeId','==',this.state.exchangeId).get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            var donorId  = doc.data().donor_id
            var bookName =  doc.data().item_name

            //targert user id is the donor id to send notification to the user
            db.collection('all_notifications').add({
              "targeted_user_id" : donorId,
              "message" : name +" " + lastName + " received the item " + itemName ,
              "notification_status" : "unread",
              "item_name" : itemName
            })
          })
        })
      })
    })
  }


render(){
    
        if (this.state.IsExchangeRequestActive === true){
          // status screen
          return(
            <View style = {{flex:1,justifyContent:'center'}}>
             <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
             <Text>Item Name</Text>
             <Text>{this.state.requestedItemName}</Text>
             </View>
             <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
             <Text> Item Value </Text>
    
             <Text>{this.state.itemValue}</Text>
             </View>
             <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
             <Text> Item Status </Text>
    
             <Text>{this.state.itemStatus}</Text>
             </View>
    
             <TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:"orange",width:300,alignSelf:'center',alignItems:'center',height:30,marginTop:30}}
             onPress={()=>{
               this.sendNotification()
               this.updateExchangeRequestStatus();
               this.receivedItem(this.state.requestedItemName)
             }}>
             <Text>I recieved the Item </Text>
             </TouchableOpacity>
           </View>
         )
    
        }
        else {
    return(
        <View>

            <KeyboardAvoidingView style={styles.keyBoardStyle}>
            <TextInput style = {styles.formTextInput}
            placeholder={"Item Name"}
            onChangeText={(text)=>{
                this.setState({name:text})
            }}
            value={this.state.name}
            />

            <TextInput style = {styles.formTextInput}
            placeholder={"Item description"}
            multiline 
            numberOfLines={8}
            onChangeText={(text)=>{
                this.setState({description:text})
            }}
            value={this.state.description}
            />

            <TouchableOpacity style={styles.button}
            onPress={()=>{this.addItem(this.state.name, this.state.description)}}
            >
            <Text>Add Item</Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}
}
}

const styles = StyleSheet.create({
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
      },
      button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:20
        },
        keyBoardStyle : {
            flex:1,
            alignItems:'center',
            justifyContent:'center'
          },
})