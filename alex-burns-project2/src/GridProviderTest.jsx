// import { createContext, useState } from "react";

// export const GridContext = createContext();

// function GridProvider(props) {
//     const [gridSize, setGridSize] = useState({height: 20, width: 20});


//     function increaseBoxGridSize(height, width) {
//         setGridSize({...gridSize, height, width})
//     }

//     const gridContextProviderValue = {
//         gridSize,
//         increaseBoxGridSize,
//     }

//     // props.children = <App />
//     return (
//         <GridContext.Provider value={gridContextProviderValue}>
//             {props.children}
//         </GridContext.Provider>
//     )
// }

// export default GridProvider