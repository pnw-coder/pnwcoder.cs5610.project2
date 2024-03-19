// import { useContext, useState } from 'react'
// import { GridContext } from './GridProvider'
// import Box from "./Box"
// import GridForm from './GridForm'
// import "./Box.css"

// function App() {
//   const { gridSize } = useContext(GridContext);
//   const {height, width} = gridSize;

//   const renderGrid = () => {
//     const grid = [];
//     for (let i = 0; i < height; i++) {
//       const row = [];
//       for (let j = 0; j < width; j++) {
//         row.push(<Box x={i} y ={j} />);
//       }
//       grid.push(<div key={i}>{row}</div>)
//     }
//     return grid;
//   }

//   return (
//     <div>
//       <GridForm />
//       {renderGrid()}
//     </div>
//   )

//   /*return (
//     <div className="App">
//       <h1>Single Box Test</h1>
//       <Box />
//     </div>
//   )
//   */
// }

// export default App
