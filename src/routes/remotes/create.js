import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { Octicons } from '@expo/vector-icons';
import Contexto from '../../service/contexto';
import moment from 'moment';

export default function({route, navigation}){
    
    const [FoundCodebar, setFoundCodebar]=useState('')
    const [disabled, setdisabled] = useState(false)
    const { connectItens } = useContext(Contexto)
    const [codetype, setcodetype] = useState('')
    const [codebar, setcodebar] = useState('')
    const [create, setcreate] = useState('')
    const [att, setAtt] = useState(false)
    const [quant, setquat] = useState('')
    const [preco,setpreco] = useState('')
    const [vali, setvali] = useState('')
    const [nome, setnome] = useState('')
    const [desc, setdesc] = useState('')

    useEffect(()=>{
        if(route.params?.item){
            setAtt(true)
            setcodebar(route.params.item.id)
            setcodetype(route.params.item.type)
            setvali(route.params.item.val)
            setnome(route.params.item.nome)
            setdesc(route.params.item.desc)
            setquat(route.params.item.quant)
            setpreco(route.params.item.preco)
            setcreate(route.params.item.create)
        }
    },[])

    useEffect(()=>{
        if(route.params?.codebar){
            setcodebar(route.params.codebar)
        }
        if(route.params?.codetype){setcodetype(route.params.codetype)}
    },[ route.params?.codebar, route.params?.codetype ])

    const navConfig = ()=>{ navigation.navigate('config') }
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:() => (
                <Octicons name="gear" size={24} color="black" onPress={navConfig} style={{top:3, right:15} }/>
                )
            })
        },[navigation]
    )
        
    const loadData = ()=>{
        const data = 
        {
            id: codebar,
            type: codetype,
            nome: nome,
            val: vali || '',
            desc: desc || '',
            quant: quant || '',
            preco: preco || '',
            create: create || moment().format("DD/MM/YYYY"),
            update: moment().format("DD/MM/YYYY"),
        }
        async function fetchData(){
            if(att){ 
                const response = await connectItens("PUT",data,"itens/"+codebar)
                if(!!response){ navigation.navigate('remoto') }
            }
            else{ 
                const response = await connectItens('POST',data)
                if(!!response){ navigation.navigate('remoto') }
            }
        }
        fetchData()
    }

    useEffect(()=>{ if(codebar){ checkCodebar() } },[codebar])

    const checkCodebar = async ()=>{
        setFoundCodebar('Buscando...')
        const response = await connectItens('GET',null,'itens/searsh/'+ codebar)
        if(!!response){
            if(att){setdisabled(false)}else{setdisabled(true)}
            setFoundCodebar("Codigo ja cadastrado!")
        }else{
            setdisabled(false)
            setFoundCodebar('')
        }
    }

    return(
        <SafeAreaView style={styles.container} >
            <ScrollView>
                <View style={{justifyContent: 'center', paddingTop:30, alignItems: 'center'}} >
            
                    <Text style={{marginBottom:3, fontSize:16, width:"75%" }} >{FoundCodebar || "Código de barras:"}</Text>
                    <TouchableOpacity disabled={att} onPress={()=>{ navigation.navigate('scan') }} 
                        style={
                            [
                                styles.btnScan,
                                (FoundCodebar&& !att )&& {borderColor:'#f00',backgroundColor:'#dfa7a7',borderWidth:2},
                                att&& {borderColor:'#666',backgroundColor:'#aaa',borderWidth:2},
                            ]
                        }
                    >
                        {codebar? 
                        <View style={{flexDirection:'row' }} >
                            <Text numberOfLines={1} style={{fontSize:18, width:'73%' }} >id: {codebar}</Text>
                            <Text numberOfLines={1} style={{fontSize:18, width:'27%' }} >tipo: {codetype}</Text>
                        </View>
                        :<Text style={{fontSize:18}} >Clique para adicionar o codigo de barras</Text> }
                    </TouchableOpacity>

                    <Text style={{marginBottom:3, fontSize:16, width:"75%" }} >nome do produto:</Text>
                    <TextInput
                    value={nome}
                    multiline={true}
                    onChangeText={setnome}
                    style={styles.inputTxt}
                    placeholder="shampoo marca1, banana nanica..."
                    />

                    <Text style={{marginBottom:3, fontSize:16, width:"75%" }} >Preço:</Text>
                    <TextInput
                    value={preco}
                    placeholder="19.99 ; 25,50"
                    keyboardType='numeric'
                    style={styles.inputTxt}
                    onChangeText={text => setpreco(text.replace(/[^\d,.-]/g,''))}
                    />

                    <Text style={{marginBottom:3, fontSize:16, width:"75%" }} >tags: (separe tags por vírgulas " , ")</Text>
                    <TextInput
                    value={desc}
                    multiline={true}
                    onChangeText={setdesc}
                    style={styles.inputTxt}
                    placeholder=" 10ml, com sal, ..."
                    />

                    <Text style={{marginBottom:3, fontSize:16, width:"75%" }} >quantidade: (opcional)</Text>
                    <TextInput
                    value={quant}
                    keyboardType='numeric'
                    style ={styles.inputTxt}
                    placeholder="apenas números"
                    onChangeText={ text => {if(/^\d+$/.test(text) || text === '') { setquat(text) }}}
                    />

                    <Text style={{marginBottom:3, fontSize:16, width:"75%" }} >validade: (opcional)</Text>
                    <TextInput
                    value={vali}
                    style={styles.inputTxt}
                    onChangeText = {setvali}
                    placeholder="dia/mês/ano ~ 01/08/2023"
                    />

                    <TouchableOpacity disabled={disabled} style={[styles.btnADD,(FoundCodebar&&!att)&&{borderColor:'#f00',backgroundColor:'#dfa7a7',borderWidth:2}]} 
                    onPress={()=>{
                        if(nome !== '' && codebar !== ''){
                            setdisabled(true)
                            loadData()
                        }else alert('Enter barcode and name to continue...')
                    }}>
                        <Text style={{ fontSize:20 }} >ADICIONAR</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    btnScan:{
        height:60,
        width:'80%',
        borderWidth:1,
        borderRadius:5,
        paddingLeft: 15,
        marginBottom: 10,
        borderColor:'#bbb',
        justifyContent:'center',
        backgroundColor:'#E2D5AA',
    },
    btnADD:{
        margin:30,
        height: 60,
        width:'80%',
        borderWidth:1,
        paddingLeft:15,
        borderRadius: 5,
        borderColor:'#bbb',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#5E594B',
    },
    inputTxt:{
        padding:10,
        width:'80%',
        fontSize: 18,
        borderWidth:1,
        borderRadius:5,
        paddingLeft: 15,
        marginBottom: 10,
        borderColor:'#bbb',
        justifyContent:'center',
        backgroundColor:'#E2D5AA',
    },
})