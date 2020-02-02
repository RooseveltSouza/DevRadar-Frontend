import React, { useEffect, useState } from 'react';
import api from './services/api'

import DevItem from './components/DevItem/'
import DevForm from './components/DevForm/'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'



function App() {
  
    const [Devs, setDevs] = useState([])
  
    async function fetchDev() {
        const response = await api.get('/devs')

        setDevs(response.data)
    }

    useEffect(() => {
        fetchDev()
    }, [])

    async function handleAddDev(data){
        const response = await api.post('/devs', data)

        setDevs([...Devs, response.data])
    }
    return (
        <div id="App">
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev} />
            </aside>
            <main>
                <ul>
                {Devs.map(dev => (
                    <DevItem key={dev._id} dev={dev} />
                ))}
                </ul>
            </main>
        </div>
    );
}

export default App;