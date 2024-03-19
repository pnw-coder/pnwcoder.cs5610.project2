import { useContext, useState } from "react"
import { GridContext } from "./GridProvider";

function GridForm() {
    const {gridSize, updateGridSize} = useContext(GridContext);
    const [newHeight, setNewHeight] = useState(gridSize.height);
    const [newWidth, setNewWidth] = useState(gridSize.width);
    const [error, setError] = useState("");

    const handleUpdate = (event) => {
        const {name, value} = event.target;
        if (value < 3 || value > 40){
            setError("Height and width must be between 3 and 40.");
        } else {
            setError("");
            name === "height" ? setNewHeight(value) : setNewWidth(value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!error) {
            increaseBoxGridSize(parseInt(newHeight), parseInt(newWidth));
        }
    }

    return (
        <div>
            <form className="Form" onSubmit={handleSubmit}>
                <label className="Label">
                    Height: 
                    <input id="input"
                        type="number"
                        name="height"
                        value={newHeight}
                        onChange={handleUpdate}
                    />
                </label>
                <label className="Label">
                    Width:
                    <input id="input"
                        type="number"
                        name="width"
                        value={newWidth}
                        onChange={handleUpdate}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

export default GridForm