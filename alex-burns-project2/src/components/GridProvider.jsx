import { createContext, useContext, useState, useEffect } from "react"

export const GridContext = createContext();

function GridProvider(props) {
    // State variables for the grid to use
    const [gridState, setGridState] = useState([]);
    const [livingCellsCount, setLivingCellsCount] = useState(0);
    const [error, setError] = useState('');

    // Function to count living cells, this function is applied to the end of each function that alters the state of the grid
    // e.g. initializeGrid, resetGrid, progressSimulation
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

    // Function that initializes the grid with the given height and width, initial set to 20x20
    const initializeGrid = (height, width) => {
        const gridSize = [];
        // Creates the grid with specified height and width
        for (let i = 0; i < height; i++){
            const row = [];
            for (let j = 0; j < width; j++) {
                // Initialize cells to be dead (false)
                row.push(false);
            }
            gridSize.push(row);
        }

        // This logic attempts to randomly populate the grid with alive cells
        const totalCells = height * width;
        const clusterCells = Math.round(totalCells * 0.05); // 5% of toal cells
        for (let i = 0; i < clusterCells; i++) {
            const randomRow = Math.floor(Math.random() * height);
            const randomCol = Math.floor(Math.random() * width);
            gridSize[randomRow][randomCol] = true;
        }

        // Sets the grid state and counts the living number of cells
        setGridState(gridSize);
        setLivingCellsCount(countLivingCells(gridSize));
    }

    // Run the initializedGrid function when the component first renders
    useEffect(() => {
        initializeGrid(20, 20); // Sets the default size to be 20x20
    }, []);

    // Function to update grid size
    // Checks that the input is within acceptable parameters then runs the initializeGrid function with new height and width vlues
    const updateGridSize = (height, width) => {
        if (!height || !width || height < 3 || height > 40 || width < 3 || width > 40) {
            setError('Invalid grid size. Height and width must be between 3 and 40');
            return;
        }
        // Initialize the grid with new height and width
        initializeGrid(height, width);
        // Runs the setError function if an invalid input is detected
        setError('');
        // Updates the living cells count
        setLivingCellsCount(countLivingCells(gridSize));
    }

    // Function to reset the grid
    const resetGrid = () => {
        //Re-initiate the grid with the same size
        const [currentHeight, currentWidth] = [gridState.length, gridState[0].length];
        initializeGrid(currentHeight, currentWidth);
        // Updates the living cells count
        setLivingCellsCount(countLivingCells(gridSize));
    }

    /*
        This function acts as the main logic behind Conway's Game of Life. It works in tandem 
        with the helper function countNeighbors to implement the rules of the game. It begins
        by creating a "deep" clone of the gridState to include styling and position. It then iterates
        through each cell and applies the rules, counting the number of live neighbors a cell has. 
        It then sets the new grid state based on the rules of the game.
    */
    const progressSimulation = () => {
        // Deep clone current grid state
        const newGridState = JSON.parse(JSON.stringify(gridState));
        // Iteratae through each cell and apply the rules of Conway's Game of Life
        for (let i = 0; i < gridState.length; i++) {
            for (let j = 0; j < gridState[i].length; j++) {
                // Count number of live neighbors for the current box
                const neighbors = countNeighbors(gridState, i, j);

                // Applies the rules of the game
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
        // Iterates through each neighboring cell
        offsets.forEach((offsetRow) => {
            offsets.forEach((offsetCol) => {
                if (!(offsetRow === 0 && offsetCol === 0)) {
                    const neighborRow = row + offsetRow;
                    const neighborCol = col + offsetCol;
                    // Checks if the neighboring cell is within the grid's boundaries
                    if (
                        neighborRow >= 0 &&
                        neighborRow < grid.length &&
                        neighborCol >= 0 &&
                        neighborCol < grid[0].length
                    ) {
                        // Increments the count variable if the neighboring cell is alive
                        count += grid[neighborRow][neighborCol] ? 1 : 0;
                    }
                }
            })
        })
        return count;
    }

    // Returns the GridProvider component along with the context values used by other components
    return (
        <GridContext.Provider value={{gridState, setGridState, updateGridSize, resetGrid, progressSimulation, livingCellsCount, setLivingCellsCount, countLivingCells}}>
            {error && <div className="error">{error}</div>}
            {props.children}
        </GridContext.Provider>
    )
}

export default GridProvider