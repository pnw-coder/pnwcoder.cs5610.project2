import { useContext, useEffect, useState } from "react"
import { GridContext } from "./GridProvider"
import Box from './Box'
import './Grid.css'
import './Box.css'

function Grid(props) {
    const { gridState, updateGridSize, resetGrid, progressSimulation } = useContext(GridContext);
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
            <div className="Grid">{gridRows}</div>
            <div className="ButtonContainer">
                    <button className="ButtonSyle" onClick={handleResetGrid}>Reset</button>
                    <button className="ButtonSyle" onClick={handleProgressSimulation}>Next Frame</button>
                    <button className="ButtonSyle" onClick={handleAutoplayClick}>Autoplay</button>
            </div>
        </div>
    )
}

export default Grid;