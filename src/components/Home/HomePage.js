import React, { useRef, useState } from 'react';
import './HomePage.css';
import listName from '../../data/namesChampions.json';

function HomePage() {

    const [names, setNames] = useState([]);
    const [input, setInput] = useState("");
    const [temp, setTemp] = useState("");
    const inputSearch = useRef();
    const [mouseOver, setMouseOver] = useState(true);
    const handleKeyPress = (e) => {
        setMouseOver(true);
        if( e.keyCode ===40 ){
            const index = names.indexOf(input);
            if( index > (names.length - 2) ){
                setInput(temp);
            }else if(index===-1){
                setTemp(input);
                setInput(names[0]);
            }else{
                setInput(names[ names.indexOf(input) + 1 ]);
            }
        }else if( e.keyCode === 38 ){
            e.preventDefault();
            const index = names.indexOf(input);
            if(index===-1){
                setTemp(input);
                setInput(names[names.length - 1]);
            }else if(index===0){
                setInput(temp);
            }else{
                setInput(names[ names.indexOf(input) - 1 ]);
            }
        }
    }

    const handleInputChange = ({target}) => {
        setInput(target.value);
        if (target.value.length) {
            setNames(listName["names"].filter(item => (item.toLowerCase().includes(target.value.toLowerCase()))).splice(0, 5));
        } else {
            setNames([]);
        }
    }

    const handleClickName = (e) => {
        setInput(e.currentTarget.innerText);
        setNames([]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
    }

    const handleMouseOver = (e) =>{
        setMouseOver(false);
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
                <div className="top-1 searchBar">
                    <input
                        className={`main-input ${names.length !== 0 && "focus-input"}`}
                        onChange={handleInputChange}
                        value={input}
                        onKeyDown={handleKeyPress}
                        ref={inputSearch}
                    />
                    {
                        (names.length !== 0) &&
                        <ul className="suggestions"
                            onMouseOver={handleMouseOver}
                        >
                            {
                                names.map((item, i) => {
                                    return (
                                        <li
                                            className={`suggestion-active ${(item===input && mouseOver === true ) && "select"}`}
                                            onClick={handleClickName}
                                            key={i}
                                        >
                                            <span>
                                                <b>
                                                    {item}
                                                </b>
                                            </span>
                                        </li>)
                                })
                            }
                            <li></li>
                        </ul>
                    }
                </div>
            </form>
        </div>
    )
}
export default HomePage;
