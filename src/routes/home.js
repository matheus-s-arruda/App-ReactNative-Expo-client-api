import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useLayoutEffect, useEffect, useContext } from "react";
import { Octicons } from '@expo/vector-icons';
import Contexto from '../service/contexto';

export default function({navigation}){

    const { token } = useContext(Contexto)
    const navRemoto = ()=>{
        
        if(token){
            navigation.navigate('remoto')
        }else{
            navigation.navigate('login')
        }
    }

    return(
        <SafeAreaView style={styles.container} >

            <View>
                <Text style={styles.title} >HOME</Text>
            </View>

            <View>
                <View style={{flexDirection:'row' }} >

                    <TouchableOpacity style={[styles.button, { backgroundColor:'#aac' } ]} >
                        <Text>local</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, { backgroundColor:'#abc' } ]} onPress={navRemoto} >
                        <Text>remoto</Text>
                    </TouchableOpacity>

                </View>
                
                <View style={{flexDirection:'row' }} >

                    <TouchableOpacity style={[styles.button, { backgroundColor:'#cba' } ]} >
                        <Text>local</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, { backgroundColor:'#caa' } ]} >
                        <Text>remoto</Text>
                    </TouchableOpacity>

                </View>
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
button:{
    width:150,
    height:150,
    borderRadius:20,
    margin:10,
    justifyContent:'center',
    alignItems:'center',
},
})