import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useLayoutEffect } from "react";
import { Octicons } from '@expo/vector-icons';

export default function({navigation}){

    const navConfig = ()=>{ navigation.navigate('config') }
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>( 
                <Octicons name="gear" size={24} color="black" onPress={navConfig} style={{top:3, right:15}} />
            )
        })
    },[navigation])

    return(
        <SafeAreaView style={styles.container} >

            <Text style={styles.title} >REMOTO</Text>

            <View style={{width:'100%', alignItems:'center'}} >

                <TouchableOpacity style={styles.button} onPress={()=>{ navigation.navigate('create') }} >
                    <Text style={styles.text_btn} >CREATE</Text>
                </TouchableOpacity >

                <TouchableOpacity style={styles.button} onPress={()=>{
                    navigation.navigate('read')
                }}
                >
                    <Text style={styles.text_btn} >PESQUISAR ITEM</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    title:{
        fontSize:24,
    },
    text_btn:{
        color:'white',
        fontSize:18,
    },
    button:{
        marginBottom:10,
        padding:20,
        width:"90%",
        backgroundColor:'#b7a777',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
})