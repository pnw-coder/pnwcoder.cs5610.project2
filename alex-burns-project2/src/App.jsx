import { useContext, useState } from 'react'
import Box from "./Box"
import Home from "./Home"
import Credits from "./Credits"
import "./Box.css"
import GridProvider from './GridProvider'
import Grid from './Grid'
import "./App.css"
import "./Grid.css"

function App() {
    return (
        <div>
            {/* <Home /> */}
            <Credits />
            {/* <GridProvider>
                <Grid />
            </GridProvider> */}
        </div>
    )
}

export default App