import { useContext, useState } from "react"
import { GridContext } from "./GridProvider"
import Box from './Box'
import './Grid.css'
import './Box.css'

function Grid(props) {
    const { gridState, updateGridSize } = useContext(GridContext);
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        updateGridSize(parseInt(height), parseInt(width));
        setHeight('');
        setWidth('');
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
        </div>
    )
}

export default Grid;