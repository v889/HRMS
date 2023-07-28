import { StyleSheet, Text, View,TouchableOpacity,FlatList,Image } from 'react-native'
import React,{useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ContainerImage from '../component/ContainerImage';
const link="https://chawla-hrms-bucket1.s3.amazonaws.com/uploads/675a20fa-74c9-4748-93b4-5fa16f27ba86-e36fc922-b20a-4ab3-b370-5552cfef1103-sample (1).pdf"
  
  
const Training = ({navigation}) => {
  const { isLogin } = useContext(AuthContext);
  
  
   if(isLogin){
    return (
    <View style={{flex:1}}>

          <View style={styles.container}>
        <View  style={{paddingTop:15}}>
        <View style={{flexDirection:"row"}} >
         
              
         <TouchableOpacity onPress={()=>navigation.navigate("Assessment")}>
         <Text style={[styles.btntextStyle]}>Attempt Assessment Quiz</Text>
         </TouchableOpacity>
         <View style={{alignItems:"flex-end",marginLeft:"10%"}}>
         <Icon onPress={()=>navigation.navigate("Assessment")} name="arrow-right" color="#46327d"  size={35}/>
         </View>
         
     
     </View>
            </View>
            </View>
      
      <Text style={styles.HeadingStyle}>Training Resources</Text>
    
    <FlatList
    numColumns={2}
    data={[1,2,3,4,5,6,7,8,9,10]}
    style={styles.grid}
    renderItem={({item, index}) => (
  
      <View style={styles.card}>
        <View style={{overflow:"hidden",alignItems:"center",position:"relative"}}>
         
              <ContainerImage link={link}/>
          
          </View>
          <View style={{marginTop:30}}>
        <View style={styles.DocConatiner}>
          <TouchableOpacity onPress={()=>navigation.navigate("FileView",{"link":link})}>
          
          <Text style={{color:"#080a80"}}>ReactNative Course</Text>
          </TouchableOpacity>
          </View>
          </View>
          </View>
         
    
    )}
    />
    </View>
    
  )
    }
    else{
      return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <Text style={{fontSize:20}}>Login First</Text>
         
        </View>
      )
    }
}

export default Training

const styles = StyleSheet.create({
    btntextStyle:{
        fontSize:20,
        color:"#46327d",
        fontWeight:"800",
        marginLeft:10
    },
    HeadingStyle:
      {fontSize:25,
        fontWeight:"700",
        color:"black",
        marginLeft:20,
        marginTop:30}

    ,
     textStyle:{
        fontSize:15,
        color:"",
        fontWeight:"500"
    },
    container: {
      width:"90%", 
      alignSelf:"center",
      backgroundColor:"#ECEDFE",
      marginTop:"10%",
      borderRadius:10,
      elevation:1,
      flexDirection:"column",
      
      height:60,
      },
      grid: {
        margin: 12,
        marginBottom:"15%"
      },
      card: {
        height: 150,
        width: '45%',
        margin:5,
        flex:1,
        flexDirection:"column",
        
    
      
        borderRadius:10,
    
        borderWidth: 1,
        borderColor: '#bbe9ed',
      },
      DocConatiner:{
        backgroundColor:"#bbe9ed",
                      
                      height:30,
                      width:"100%",

                      justifyContent:"center",
                      alignItems:"center",
                      paddingLeft:10,
                      paddingRight:10,
                         paddingTop:5,

                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      overflow: 'hidden',
                      
                   

      }
})