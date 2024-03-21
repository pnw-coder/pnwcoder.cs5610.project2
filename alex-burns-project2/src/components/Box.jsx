import { useContext } from 'react'
import { GridContext } from './GridProvider';
import "../styles/Box.css"

function Box(props) {
    const { gridState, setGridState, setLivingCellsCount, countLivingCells } = useContext(GridContext);
    const isAlive = gridState[props.row][props.col]; 

    const handleClick = () => {
        const newGridState = [...gridState]; // Creates a copy of the grid state
        newGridState[props.row][props.col] = !isAlive; // Toggle the state
        setGridState(newGridState); // Update the grid state
        const newLivingCellsCount = countLivingCells(newGridState);
        console.log("New living cells count:", newLivingCellsCount);
        setLivingCellsCount(newLivingCellsCount);
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