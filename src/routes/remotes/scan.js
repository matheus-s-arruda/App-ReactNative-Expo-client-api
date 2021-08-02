import React, { useState, useEffect } from 'react';
import { Text, Alert, View, SafeAreaView, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        Alert.alert("Code type: "+type,"Code: "+data, 
            [
                {text: "try again",onPress: () => setScanned(false),},
                {text: "Continue",onPress: () => navigation.navigate('create', {codebar: data, codetype: type} )}
            ]
        )
    };

    if (hasPermission === null) {  return <Text>Requesting for camera permission</Text> }
    if (hasPermission === false) { return <Text>No access to camera</Text> }

    return (
        <SafeAreaView style={styles.container}>
            <BarCodeScanner style={styles.scan} onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scan:{
        width:"100%",
        height:"100%"
    },
    btn:{
        position:'absolute',
        bottom:10
    }
})