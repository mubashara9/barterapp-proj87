import * as React from 'react';
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config'

export default class UserDetailScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            userName  :'',
            recieverId:this.props.navigation.getParam('details')["username"],
            exchangeId:this.props.navigation.getParam('details')["exchangeId"],
            itemname:this.props.navigation.getParam('details')["item_name"],
            description:this.props.navigation.getParam('details')["description"],
            receiverName    : '',
            receiverContact : '',
            receiverAddress : '',
            receiverRequestDocId : ''
            
        }
    }

    getUserDetails=(userId)=>{
      db.collection("User").where('user_name','==', userId).get()
      .then((snapshot)=>{
        snapshot.forEach((doc) => {
          console.log(doc.data().first_name);
          this.setState({
            userName  :doc.data().first_name + " " + doc.data().last_name
          })
        })
      })
    }


getreceiverDetails(){
  console.log("receiver ",this.state.recieverId);
  db.collection('User').where('user_name','==',this.state.recieverId).get()
  .then(snapshot=>{
    snapshot.forEach(doc=>{
      this.setState({
        receiverName    : doc.data().first_name,
        receiverContact : doc.data().mobile_number,
        receiverAddress : doc.data().Address,
      })
    })
  });

  db.collection('exchange_requests').where('exchangeId','==',this.state.exchangeId).get()
  .then(snapshot=>{
    snapshot.forEach(doc => {
      this.setState({receiverRequestDocId:doc.id})
   })
})}

componentDidMount(){
    this.getUserDetails(this.state.userId);
    this.getreceiverDetails();
}

addBarters=()=>{
    db.collection('all_Barters').add({
      item_name           : this.state.itemname,
      exchange_id          : this.state.exchangeId,
      requested_by        : this.state.receiverName,
      donor_id            : this.state.userId,
      request_status      :  "Donor Interested"
    })
}
addNotification=()=>{
  console.log("in the function ",this.state.rec)
  var message = this.state.userName + " has shown interest in exchanging the item"
  db.collection("all_notifications").add({
    "targeted_user_id"    : this.state.recieverId,
    "donor_id"            : this.state.userId,
    "exchangeId"          : this.state.exchangeId,
    "item_name"           : this.state.itemname,
    "date"                : firebase.firestore.FieldValue.serverTimestamp(),
    "notification_status" : "unread",
    "message"             : message
  })
}


render(){
    return(
        <View style ={styles.container}>
            <View style={{flex:0.5}}>
            <Card
              title={"Item Information"}
              titleStyle= {{fontSize : 20}}
            >
            <Card >
              <Text style={{fontWeight:'bold'}}>Name : {this.state.itemname}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Reason : {this.state.description}</Text>
            </Card>
          </Card>
        </View>
        <View style={{flex:0.3}}>
          <Card
            title={"Exchanger Information"}
            titleStyle= {{fontSize : 20}}
            >
            <Card>
              <Text style={{fontWeight:'bold'}}>Name: {this.state.receiverName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Contact: {this.state.receiverContact}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Address: {this.state.receiverAddress}</Text>
            </Card>
          </Card>
          <View style={styles.buttonContainer}>
          {
            this.state.recieverId !== this.state.userId
            ?(
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.addBarters();
                    this.addNotification()
                    this.props.navigation.navigate('MyBarters')
                  }}>
                <Text>I want to Exchange</Text>
              </TouchableOpacity>
            )
            : (
              <View><Text>your stuff</Text>
                </View>
            )
          }
        </View>
            </View>
            
        </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    buttonContainer : {
      flex:0.3,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:200,
      height:50,
      justifyContent:'center',
      alignItems : 'center',
      borderRadius: 10,
      backgroundColor: 'orange',
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    }
  })