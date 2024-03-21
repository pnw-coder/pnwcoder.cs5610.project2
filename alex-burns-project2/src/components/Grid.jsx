import { useContext, useEffect, useState } from "react"
import { GridContext } from "./GridProvider"
import Box from './Box'
import '../styles/Grid.css'
import '../styles/Box.css'
import '../styles/App.css'
import NavBar from "./NavBar"
import '../styles/NavBar.css'

function Grid(props) {
    // Accesses the grid state and related functions from the context given my GridProvider
    const { gridState, updateGridSize, resetGrid, progressSimulation, livingCellsCount } = useContext(GridContext);
    
    // Local state variables for height, width, and autoplay
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [autoplayActive, setAutoPlayActive] = useState(false);

    /*
        The useEffect hook is implemented to handle the autoplay feature. It takes two arguments the first
        is the autoplayActive state if it is true then it will start the autoplay. The second argument takes 
        the dependencies, in this case it is dependent on autoplayActive and progressSimulation. Whenever either
        of these two change the effect will be triggered. It sets up an interval to progress the simulation one frame
        every 100 milliseconds, this continues until the user clicks autoplay again. 
    */
    useEffect(() => {
        let autoplayInterval;

        if (autoplayActive) {
            // Starts the autoplay
            autoplayInterval = setInterval(() => {
                progressSimulation();
            }, 100); // Sets the speed of the autoplay
        } else {
            // Stops the autoplay
            clearInterval(autoplayInterval);
        }

        return () => clearInterval(autoplayInterval);
    }, [autoplayActive, progressSimulation]);

    // Handler function to handle the form submission button to update grid size
    const handleSubmit = (e) => {
        e.preventDefault();
        updateGridSize(parseInt(height), parseInt(width));
        setHeight('');
        setWidth('');
    }

    // Handler function to handle the resetGrid function button
    const handleResetGrid = () => {
        resetGrid();
    }

    // Handler function to handle the progressSimulation button
    const handleProgressSimulation = () => {
        progressSimulation();
    }

    // Handler function to toggle the autoplay feature on and off
    const handleAutoplayClick = () => {
        setAutoPlayActive((prevAutoplayActive) => !autoplayActive);
    }

    // Maps the grdi state to JSX elements representing grid rows and cells and creates a grid made up of
    // Box components, used to pull some logic out of the return statement and make it simpler
    const gridRows = gridState.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
                <Box key={`${rowIndex}-${colIndex}`} row={rowIndex} col ={colIndex} />
            ))}
        </div>
    ))

    // Renders the grid component which includes the Navbar, form, living cells counter, grid and additional buttons
    return (
        <div>
            <NavBar />
            <div className="GridContainer">
                <form onSubmit={handleSubmit} className="GridForm">
                    <input
                        type="number"
                        placeholder="Enter height (3-40)"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Enter width (3-40)"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
                <div className="LivingCellsCount">Currently Living Cells: {livingCellsCount}</div>
                <div className="Grid">{gridRows}</div>
                <div className="ButtonContainer">
                    <button className="ButtonStyle" onClick={handleResetGrid}>Reset</button>
                    <button className="ButtonStyle" onClick={handleProgressSimulation}>Next Frame</button>
                    <button className="ButtonStyle" onClick={handleAutoplayClick}>Autoplay</button>
                </div>
            </div>
        </div>
    )
}

export default Grid;