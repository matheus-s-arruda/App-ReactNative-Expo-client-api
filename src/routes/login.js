import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useContext } from "react";
import { StackActions } from '@react-navigation/native';
import Contexto from '../service/contexto';

export default function({route, navigation}){
    const [user, setUser] = useState('')
    const { login }= useContext(Contexto)
    const [senha, setSenha] = useState('')
    const [status, setstatus] = useState('')
    const [desable, setbuton] = useState(false)
    const [btnCor, setBtnCor] = useState('#aa5')

    const logar = async ()=>{
        const result = await login(user, senha)

        if(result === "logado"){
            setstatus('logado')
            setbuton(false)
            navigation.dispatch( StackActions.replace('remoto') );
            
        }else{
            Alert.alert("Error",result)
            setBtnCor('#aa5')
            setbuton(false)
            setstatus('')
        }
    }

    return(
        <SafeAreaView style={styles.container} >

            <Text style={styles.title} >LOGIN</Text>

            <TextInput
            value={ user}
            maxLength={40}
            style={styles.input}
            placeholder=' usuario'
            onChangeText={setUser}
            textContentType='nickname'
            />

            <TextInput
            value={ senha}
            maxLength={40}
            placeholder=' senha'
            style={styles.input}
            secureTextEntry={true}
            onChangeText={setSenha}
            textContentType='password'
            />

            <Text style={{marginBottom:10}} >{status}</Text>
            
            <TouchableOpacity disabled={desable} 
            style={{
                backgroundColor:btnCor,
                alignItems:'center',
                paddingBottom:10,
                borderRadius:5,
                paddingTop:10,
                width:'60%',
            }} 
            
            onPress={()=>{
                setstatus("tentando se conectar ao servidor...")
                setBtnCor('#999')
                setbuton(true)
                logar()
            }}>
                <Text style={{fontSize:18, color:'white', }} >PROCEGUIR</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize:24,
    },
    input:{
        padding:5,
        margin:10,
        fontSize:16,
        borderWidth:1,
        borderRadius:5,
        borderColor:'grey',
        width:'60%',
    },
    button:{
        backgroundColor:'#aa5',
        alignItems:'center',
        paddingBottom:10,
        borderRadius:5,
        paddingTop:10,
        width:'60%',
    },
})