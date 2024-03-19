import { useContext, useState } from 'react'
import Box from "./Box"
import "./Box.css"
import GridProvider from './GridProvider'
import Grid from './Grid'
import "./Grid.css"

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