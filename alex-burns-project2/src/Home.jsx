import './Home.css'

function Home() {


    return (
        <div className="HomeContainer">
            <h1>Welcome to the Conway's Game of Life Simulator!</h1>
            <div className="RulesContainer">
                <p className="Text">The rules of the game are simple: the game is played based on a grid system. 
                    Every individual location on the grid can be thought of as a cell. The game, occurs over
                    iterations, or generations. After each iteration, a cell may change from living to dead based on 
                    how many neighbors it had. A neighbor is any direclty adjacent spot on the grid. The simulation
                    aims to create unique patterns through mathematical formulas!
                </p>
                <ol id ="Rules" className="Text">Rules:
                    <li>A living cell with less than two living neighbours dies</li>
                    <li>A living cell with two or three live neighbours lives</li>
                    <li>A living cell with more than three live neighbours dies</li>
                    <li>A dead cell with exactly three live neighbours becomes a live cell</li>
                    <li>Click on the "Simulation" link to get started</li>
                    <li>You can alter the height and width of the grid at the top of the page</li>
                    <li>Press the "Next Frame" button at the bottom to see the next iteration</li>
                    <li>Cick the "Autoplay" button to start and stop iterations</li>
                    <li>Clikc the "Reset" button to reset the grid pattern</li>
                    <li>Have fun!</li>
                </ol>           
            </div>
            <div className="LogoContainer">
                <img src="/logo.png" alt="Logo" className="Logo"/>
            </div>
        </div>
    )
}

export default Home