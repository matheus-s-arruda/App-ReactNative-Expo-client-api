import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

import create from './src/routes/remotes/create';
import { Fornecedor } from './src/service/contexto';
import read from './src/routes/remotes/read';
import scan from './src/routes/remotes/scan';
import remoto from './src/routes/remoto';
import config from './src/routes/config';
import login from './src/routes/login';
import home from './src/routes/home';


const Stack = createStackNavigator();

export default function App() {

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // useEffect(() => {
  //   AppState.addEventListener('change', _handleAppStateChange );
  //   return () => {
  //     AppState.removeEventListener('change', _handleAppStateChange );
  //   };
  // }, []);

  // const _handleAppStateChange  = (nextAppState) => {
  //   appState.current = nextAppState;
  //   setAppStateVisible(appState.current);
    
  //   if(appState.current === "background"){
  //     api.Storage.setToken('')
  //   }

  //   console.log("AppState", appState.current);
  // };

  return (
    <Fornecedor>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home" >

          <Stack.Screen name="home" component={home} options={{headerShown: false}} />
          <Stack.Screen name="remoto" component={remoto} options={{ headerLeft:null }} />
          <Stack.Screen name="scan" component={scan} options={{headerShown: false}} />
          <Stack.Screen name="read" component={read}/>
          <Stack.Screen name="login" component={login}/>
          <Stack.Screen name="create" component={create} options={{title:"Adicionar produto"}} />
          <Stack.Screen name="config" component={config}/>

        </Stack.Navigator>
      </NavigationContainer>
    </Fornecedor>
  );
}

