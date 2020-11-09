import React, { useState } from 'react';
import './HomePage.css';
import listName from '../../data/namesChampions.json';

function HomePage() {

    const [names, setNames] = useState([]);
    const [input, setInput] = useState("");

    const handleInputChange = ({ target }) => {
        setInput(target.value);
        if(target.value.length){
            setNames( listName["names"].filter(item => ( item.toLowerCase().includes(target.value.toLowerCase()))).splice(0,5) );
        }else{
            setNames([]);
        }
    }

    const handleClickName = (e) =>{
        setInput(e.currentTarget.innerText);
        setNames([]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="top-10 center-text">
                <div>
                    <h1 className="color-blue same-line">
                        Diego
                    </h1>
                    <h1 className="color-orange same-line">
                        Alpha
                    </h1>
                </div>
                <div className="main-input top-1">
                    <input
                        className={`main-input ${names.length!==0 && "focus-input"}`}
                        onChange={handleInputChange}
                        value={input}
                    />
                    {
                        (names.length!==0) && 
                        <ul className="suggestions">
                            {
                                names.map((item,i) => {
                                    return (
                                    <li 
                                        className="suggestion-active" 
                                        onClick={handleClickName} 
                                        key={i}
                                    >
                                        {item}
                                    </li>)
                                })
                            }
                        </ul>
                    }
                </div>
            </form>
        </div>
    )
}
export default HomePage;
