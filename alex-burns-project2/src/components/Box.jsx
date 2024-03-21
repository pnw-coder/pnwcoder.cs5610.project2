import { useContext } from 'react'
import { GridContext } from './GridProvider';
import "../styles/Box.css"

function Box(props) {
    // Retrieves necessary context values from GridProvider
    const { gridState, setGridState, setLivingCellsCount, countLivingCells } = useContext(GridContext);
    // Determines if a cell is currently alive
    const isAlive = gridState[props.row][props.col]; 

    const handleClick = () => {
        const newGridState = [...gridState]; // Creates a copy of the grid state
        newGridState[props.row][props.col] = !isAlive; // Toggle the state
        setGridState(newGridState); // Update the grid state
        const newLivingCellsCount = countLivingCells(newGridState); // Calculate the new count of living cells
        setLivingCellsCount(newLivingCellsCount); // Updates teh living cell count
    }

    let className = "Box";
    
    if (isAlive) {
        className += " Alive";
    }

    return (
        <div className={className} onClick={handleClick}></div>
    )
}

export default Box