import { createContext, useContext, useState, useEffect } from "react"

export const GridContext = createContext();

function GridProvider(props) {
    const [gridState, setGridState] = useState([]);
    const [error, setError] = useState('');

    const initializeGrid = (height, width) => {
        const gridSize = [];
        for (let i = 0; i < height; i++){
            const row = [];
            for (let j = 0; j < width; j++) {
                // Randomly decide whether the cell is alive
                const isAlive = Math.random() < 0.05;
                row.push(isAlive);
            }
            gridSize.push(row);
        }
        setGridState(gridSize);
    }

    // Run the initialized function when the component mounts
    useEffect(() => {
        initializeGrid(20, 20);
    }, []);

    // Function to update grid size
    const updateGridSize = (height, width) => {
        if (height < 3 || height > 40 || width < 3 || width > 40) {
            setError('Invalid grid size. Height and width must be between 3 and 40');
            return;
        }
        initializeGrid(height, width);
        setError('');
    }

    return (
        <GridContext.Provider value={{gridState, setGridState, updateGridSize}}>
            {error && <div className="error">{error}</div>}
            {props.children}
        </GridContext.Provider>
    )
}

export default GridProvider