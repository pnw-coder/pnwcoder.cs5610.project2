// import { useContext, useState } from "react";
// import { GridContext } from "./GridProvider";
// import "./Box.css"

// function Box(props) {
//     const {gridSize, increaseBoxGridSize} = useContext(GridContext);
//     const {boxGrid, setBoxGrid} = gridSize;

//     const isAlive = boxGrid[props.x][props.y];
    

//     function onClick() {
//         const updatedBoxGrid = [...boxGrid];
//         updatedBoxGrid[props.x] = [...updatedBoxGrid[props.x]];
//         updatedBoxGrid[props.x][props.y] = !isAlive;
//         setBoxGrid(updatedBoxGrid);
//     }
    
//     let className= "Box";
//     if (isAlive) {
//         className += " Alive"
//     }
//     return (
//     <div className={className} onClick={onClick}></div>
//     )
// }

// export default Box