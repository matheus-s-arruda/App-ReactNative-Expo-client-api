import { FlatList, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useLayoutEffect, useEffect, useContext } from "react";
import { Octicons, MaterialIcons } from '@expo/vector-icons';
import Contexto from '../../service/contexto';

const modaltemplate = {
    id: "id",
    type:"tipo",
    nome: "nome",
    preco:"10,99",
    val: "validade",
    desc:"descrições",
    quant: "quantidade",
    create:"data de criação",
    update: "ultima atualização",
}

export default function({navigation}){

    const [list, getlist] = useState([])
    const [searshTxt, setsearsh]=useState('')
    const [dataItens, setdataitens]=useState([])
    const { connectItens } = useContext(Contexto)
    const [modalVisible, setmodal]=useState(false)
    const [statusList, setSlist]=useState('Carregando...')
    const [modalItens, setModalItens]=useState(modaltemplate)

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>( <Octicons name="gear" size={24} color="black" onPress={navConfig} style={{top:3,right:15} }/>)
        })
    },[navigation])

    useEffect(() => {
        async function fetchData() {
            const data = await connectItens()
            if(data){
                getlist(data)
                setdataitens(data)
                setSlist('')
            }
        }
        fetchData()
    },[])

    useEffect(()=>{
        if(searshTxt === ''){
            setdataitens(list)
        }else{
            setdataitens( list.filter(item=>(item.nome.toLowerCase().indexOf(searshTxt.toLowerCase()) > -1)))
        }
    },[searshTxt])
    
    const navConfig = ()=>{ navigation.navigate('config') }

    const modalBuild = (item)=>{
        setmodal(true)
        setModalItens(item)
    }
    
    const renderItem = ({ item }) => (
        <View style={styles.renderitem} >
            
            <TouchableOpacity style={{width:'100%',padding:10}} onPress={()=>{ modalBuild(item) }} >

                <Text numberOfLines={1} style={styles.itemTitulo} > {item.nome} </Text>
                <Text numberOfLines={1} style={styles.itemDesc} > {item.desc} </Text>
            </TouchableOpacity>

        </View>
    );

    return(
        <SafeAreaView style={styles.container}>

            <Text style={{position:'absolute', top:'40%' }} >{statusList}</Text>

            <View style={{width:'100%', padding:7 }} >
                <TextInput
                value={searshTxt}
                onChangeText={setsearsh}
                placeholder="Digite sua pesquisa"
                style={{paddingLeft:5, height:50, fontSize:20, borderWidth:1, borderColor:'grey', backgroundColor:"#dddddd" }}
                />
            </View>

            <View style={{width:'98%'}} >
                <FlatList
                data={dataItens}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                />
            </View>

            <Modal visible={modalVisible} statusBarTranslucent={true} transparent={true} >
                <SafeAreaView style={{width:'100%', height:'100%', backgroundColor:"rgba(0,0,0,0.5)", justifyContent:'center', alignItems:'center'}}>


                    <View style={{width:'80%', height:'50%', backgroundColor:'white'}}>

                        <Text style={{fontSize:18}} > nome: {modalItens.nome || '-------' }</Text>
                        
                        <Text> id: {modalItens.id || '-------' }</Text>
                        <Text> preço: {modalItens.preco || '-------' }</Text>
                        <Text style={styles.modaltxt1} > tipo: {modalItens.type || '-------'} </Text>

                        <Text > validade: {modalItens.val || '-------' }</Text>
                        <Text > quantidade: {modalItens.quant || '-------' }</Text>
                        <Text style={styles.modaltxt1} > tags: {modalItens.desc || '-------' }</Text>

                        <Text> data de criação: {modalItens.create || '-------' }</Text>
                        <Text> ultima atualização: {modalItens.update || '-------' }</Text>

                    </View>

                    <TouchableOpacity style={{backgroundColor:'white', borderRadius:30, position:'absolute', left:'20%', bottom:50 }} 
                        onPress={()=>{
                            navigation.navigate('create',{item: modalItens})
                            setmodal(false)}} 
                    >
                        <MaterialIcons name="edit" size={26} color="black" style={{margin:10}} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor:'white', borderRadius:30, position:'absolute', right:'20%', bottom:50 }} onPress={()=>{setmodal(false)}} >
                        <MaterialIcons name="close" size={26} color="black" style={{margin:10}} />
                    </TouchableOpacity>
                    
                </SafeAreaView>
            </Modal>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    renderitem:{
        flexDirection:'row',
        marginTop:3,
        backgroundColor:'#ddd',
        justifyContent:'space-between',
        alignContent:'space-around'
    },
    itemTitulo:{
        fontSize:22
    },
    itemDesc:{
        fontSize:16
    },
    itemid:{
        fontSize:14
    },
    modaltxt1:{
        borderBottomWidth:1,
        color:'black' 
    },
})