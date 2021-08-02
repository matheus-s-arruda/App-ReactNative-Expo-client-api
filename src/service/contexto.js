import React, { createContext, useEffect, useState, } from 'react';

const URL = 'http://192.168.0.15:3000/'
const Contexto = createContext({});

export const Fornecedor = props => {
    
    const [token, setToken] = useState('')

    async function login(usuario, senha){
        try{
            const promise = await fetch( URL+'login',
                { 
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ usuario: usuario, senha: senha })
                }
            )
            const json = await promise.json()

            setToken(json.token)
            return "logado"
        } 
        catch (error) {
            return error.message
        }    
    }

    async function connectItens(method = 'GET' , body = null, local ='itens'){
        if(!token){
            console.log('not token')
            return null 
        }
        
        const header = {
            "x-access-token": token,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
        const data = JSON.stringify(body)
        
        const request = body?
        { method: method, headers: header, body: data }
        :{ method: method, headers: header }

        try {
            const promise = await fetch( URL+local, request )
            const json = await promise.json()
            return json
        }catch(error){ console.log(error) }
    }

    return(
        <Contexto.Provider value={{ token, connectItens, login }}>
            {props.children}
        </Contexto.Provider>
    )
}

export default Contexto