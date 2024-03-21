import { useContext, useEffect, useState } from "react"
import { GridContext } from "./GridProvider"
import Box from './Box'
import '../styles/Grid.css'
import '../styles/Box.css'
import '../styles/App.css'
import NavBar from "./NavBar"
import '../styles/NavBar.css'

function Grid(props) {
    const { gridState, updateGridSize, resetGrid, progressSimulation, livingCellsCount } = useContext(GridContext);
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [autoplayActive, setAutoPlayActive] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        updateGridSize(parseInt(height), parseInt(width));
        setHeight('');
        setWidth('');
    }

    const handleResetGrid = () => {
        resetGrid();
    }

    const handleProgressSimulation = () => {
        progressSimulation();
    }

    const handleAutoplayClick = () => {
        setAutoPlayActive((prevAutoplayActive) => !autoplayActive);
    }

    const gridRows = gridState.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
                <Box key={`${rowIndex}-${colIndex}`} row={rowIndex} col ={colIndex} />
            ))}
        </div>
    ))

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