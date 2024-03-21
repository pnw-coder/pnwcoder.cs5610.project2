import "./App.css"
import "./Credits.css"

function Credits() {
    return (
        <div className="CreditsContainer">
            <h2 className="Header">Credits</h2>
            <div className="Content">
                <p>Created by Alex Burns</p>
                <p>GitHub: <a href="https://github.com/pnw-coder/pnwcoder.cs5610.project2">CS5610 Project 2</a></p>
            </div>
            <div className="Footer">Thanks for playing!</div>
        </div>
    )
}

export default Credits