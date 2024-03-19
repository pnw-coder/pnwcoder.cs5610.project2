import { useContext } from 'react'
import { GridContext } from './GridProvider';
import "./Box.css"

function Box(props) {
    const { gridState, setGridState } = useContext(GridContext);
    const isAlive = gridState[props.row][props.col];

    const handleClick = () => {
        const newGridState = [...gridState]; // Creates a copy of the grid state
        newGridState[props.row][props.col] = !isAlive; // Toggle the state
        setGridState(newGridState); // Update the grid state
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