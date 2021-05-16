import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config';

//import MyHeader from '../components/MyHeader';

export default class HomeScreen extends Component{
constructor(){
    super();
    this.state={
        allreq:[],
    }
    this.requestref=null;
}

getAllreq=()=>{
    this.requestref = db.collection('exchange_requests').onSnapshot((snapshot)=>{
        var allreq =[]
        snapshot.forEach((doc) => {
            allreq.push(doc.data())
        })
        this.setState({
            allreq:allreq,
        })
        console.log(allreq)
    })
}
componentDidMount(){
    this.getAllreq()
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
            onPress={()=>{
                this.props.navigation.navigate("UserDetailScreen",{"details":item})
                console.log("this are items ",item.item_name)
            }}
            ><Text styles={{color:'black'}}>View</Text></TouchableOpacity>
        }
        bottomDivider
        />
    )
}

render(){
    return(
        <View style={{flex:1}}>
            {
                this.state.allreq.length===0
                ?(
                    <View>
                        <Text style={{fontSize:20}}>List of all items</Text>
                    </View>
                ):
                (
                    <FlatList
                    keyExtractor = {this.keyExtractor}
                    data={this.state.allreq}
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
        width:"25%",
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
})