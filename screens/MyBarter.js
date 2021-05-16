import * as React from 'react';
import {View,Text, TouchableOpacity, FlatList,StyleSheet} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { ListItem } from 'react-native-elements'

export default class MyBarters extends React.Component{
    static navigationOptions={header:null};

    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            donorName:'',
            allExchange:[]
        }
        this.requestref=null;
    }

    getAllExchange=()=>{
        this.requestref = db.collection('all_Barters').where('donor_Id','==',this.state.userId).get()
        .onSnapshot((snapshot)=>{
            var allExchange = snapshot.docs.map(document=>document.data());
            this.setState({
                allExchange:allExchange
            })
        })
    }

    sendItem = (notifDetails) => {
        if (notifDetails.request_status === "Donor Interested") {
          var requestStatus = "Donor has sent Item";
          db.collection("all_Barters").doc(notifDetails.doc_id).update({
            request_status: "Donor has sent Item",
          });
          this.sendNotification(notifDetails, requestStatus);
        } else {
          var requestStatus = "Donor Interested";
          db.collection("all_Barters").doc(notifDetails.doc_id).update({
            request_status: "Donor Interested",
          });
          this.sendNotification(notifDetails, requestStatus);
        }
      };
    
      sendNotification = (notifDetails, requestStatus) => {
        var requestId = notifDetails.exchange_id;
        var donorId = notifDetails.donor_id;
        db.collection("all_notifications")
          .where("donor_id", "==", donorId)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              var message = "";
              if (requestStatus === "Donor interested") {
                message = this.state.donorName + " sent you item";
              } else {
                message =
                  this.state.donorName + " has shown interest in exchanging the item";
              }
              db.collection("all_notifications").doc(doc.id).update({
                message: message,
                notification_status: "unread",
                date: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
          });
      };

      getDonorDetails = (donorId) => {
        db.collection("User")
          .where("user_name", "==", donorId)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              this.setState({
                donorName: doc.data().first_name + " " + doc.data().last_name,
              });
            });
          });
      };
      getAllDonations = () => {
        var allExchange = [];
        this.requestRef = db
          .collection("all_Barters")
          .where("donor_id", "==", this.state.userId)
          .onSnapshot((snapshot) => {
            
            snapshot.docs.map((doc) => {
              var donation = doc.data();
              donation["doc_id"] = doc.id;
              allExchange.push(donation);
            });
            this.setState({
              allExchange: allExchange,
            });
          });
      };

      componentDidMount() {
        this.getDonorDetails(this.state.userId);
        this.getAllDonations();
      }

    keyExtractor=(item,index)=>index.toString();

    renderItem =({item,i})=>{
        console.log(item.item_name)
        return(
            
            <ListItem
            key={i}
            title={item.item_name}
            subtitle={item.description}
            titleStyle={{color:'black', fontWeight:'bold'}}
            rightElement={
                <TouchableOpacity style={styles.button}
                onPress={() => {
                    this.sendItem(item);
                  }}
                ><Text styles={{color:'black'}}>Exchange</Text></TouchableOpacity>
            }
            bottomDivider
            />
        )
    }
render(){
    return(
        <View style={{flex:1}}>
            {
                this.state.allExchange.length===0
                ?(
                    <View style={styles.subtitle}>
                        <Text style={{fontSize:20}}>List of all Barters</Text>
                    </View>
                ):
                (
                    <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allExchange}
                    renderItem={this.renderItem}
                    />
                )
            }
        </View>
    )
}
}
const styles = StyleSheet.create({
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    },
    subtitle :{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    }
  })