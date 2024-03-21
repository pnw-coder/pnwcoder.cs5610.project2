import { createContext, useContext, useState, useEffect } from "react"

export const GridContext = createContext();

function GridProvider(props) {
    const [gridState, setGridState] = useState([]);
    const [livingCellsCount, setLivingCellsCount] = useState(0);
    const [error, setError] = useState('');

    // Function to count living cells
    const countLivingCells = (grid) => {
        let count = 0;
        grid.forEach((row) => {
            row.forEach((cell) => {
                if (cell) {
                    count++;
                }
            })
        })
        return count;
    }

    const initializeGrid = (height, width) => {
        const gridSize = [];
        for (let i = 0; i < height; i++){
            const row = [];
            for (let j = 0; j < width; j++) {
                // Randomly decide whether the cell is alive
                // const isAlive = Math.random() < 0.05;
                row.push(false);
            }
            gridSize.push(row);
        }

        // Creates clusters of alive cells
        const totalCells = height * width;
        const clusterCells = Math.round(totalCells * 0.05); // 5% of toal cells
        for (let i = 0; i < clusterCells; i++) {
            const randomRow = Math.floor(Math.random() * height);
            const randomCol = Math.floor(Math.random() * width);
            gridSize[randomRow][randomCol] = true;
        }

        setGridState(gridSize);
        setLivingCellsCount(countLivingCells(gridSize));
    }

    // Run the initialized function when the component mounts
    useEffect(() => {
        initializeGrid(20, 20);
    }, []);

    // Function to update grid size
    const updateGridSize = (height, width) => {
        if (!height || !width || height < 3 || height > 40 || width < 3 || width > 40) {
            setError('Invalid grid size. Height and width must be between 3 and 40');
            return;
        }
        initializeGrid(height, width);
        setError('');
        setLivingCellsCount(countLivingCells(gridSize));
    }

    // Function to reset the grid
    const resetGrid = () => {
        //Re-initiate the grid with the same size
        const [currentHeight, currentWidth] = [gridState.length, gridState[0].length];
        initializeGrid(currentHeight, currentWidth);
        setLivingCellsCount(countLivingCells(gridSize));
    }

    // Function to progress the game by one frame 
    const progressSimulation = () => {
        // Clone current grid state
        const newGridState = JSON.parse(JSON.stringify(gridState));
        // Iteratae through each cell and apply the rules of Conway's Game of Life
        for (let i = 0; i < gridState.length; i++) {
            for (let j = 0; j < gridState[i].length; j++) {
                const neighbors = countNeighbors(gridState, i, j);

                if (gridState[i][j]) {
                    if (neighbors < 2 || neighbors > 3) {
                        // Any live cell with fewer than two live neighbors dies
                        // Any live cell with more than three neighbors dies
                        newGridState[i][j] = false;
                    }
                } else {
                    if (neighbors === 3) {
                        // Any dead cell with exactly three live neighbors becomes a live cell
                        newGridState[i][j] = true;
                    }
                }
            }
        }

        // Updates the grid state with the new state
        setGridState(newGridState);
        setLivingCellsCount(countLivingCells(newGridState));
    }

    // Helper function to count live neighbors of a cell
    const countNeighbors = (grid, row, col) => {
        const offsets = [-1, 0, 1];
        let count = 0;
        offsets.forEach((offsetRow) => {
            offsets.forEach((offsetCol) => {
                if (!(offsetRow === 0 && offsetCol === 0)) {
                    const neighborRow = row + offsetRow;
                    const neighborCol = col + offsetCol;
                    if (
                        neighborRow >= 0 &&
                        neighborRow < grid.length &&
                        neighborCol >= 0 &&
                        neighborCol < grid[0].length
                    ) {
                        count += grid[neighborRow][neighborCol] ? 1 : 0;
                    }
                }
            })
        })
        return count;
    }

    return (
        <GridContext.Provider value={{gridState, setGridState, updateGridSize, resetGrid, progressSimulation, livingCellsCount, setLivingCellsCount, countLivingCells}}>
            {error && <div className="error">{error}</div>}
            {props.children}
        </GridContext.Provider>
    )
}

export default GridProvider