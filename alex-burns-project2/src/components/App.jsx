import { useContext, useState } from 'react'
import Box from "./Box"
import "../styles/Box.css"
import GridProvider from './GridProvider'
import Grid from './Grid'
import "../styles/App.css"
import "../styles/Grid.css"

function App() {
    return (
        <div>
            <GridProvider>
                <Grid />
            </GridProvider>
        </div>
    )
}

export default App