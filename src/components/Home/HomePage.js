import React, { useRef, useState } from 'react';
import './HomePage.css';
import listName from '../../data/namesChampions.json';
import comp from '../../data/comp.json';
import info from '../../data/dateChampions.json';

function HomePage() {

    const [names, setNames] = useState([]);
    const [input, setInput] = useState("");
    const [temp, setTemp] = useState("");
    const inputSearch = useRef();
    const [mouseOver, setMouseOver] = useState(true);
    const [compositions, setCompositions] = useState([]);

    const handleKeyPress = (e) => {
        if (names.length === 0) return;
        if (e.keyCode === 40) {
            const index = names.indexOf(input);
            if (index > (names.length - 2)) {
                setInput(temp);
            } else if (index === -1) {
                setTemp(input);
                setInput(names[0]);
            } else {
                setInput(names[names.indexOf(input) + 1]);
            }
        } else if (e.keyCode === 38) {
            e.preventDefault();
            const index = names.indexOf(input);
            if (index === -1) {
                setTemp(input);
                setInput(names[names.length - 1]);
            } else if (index === 0) {
                setInput(temp);
            } else {
                setInput(names[names.indexOf(input) - 1]);
            }
        }
    }

    const handleInputChange = ({ target }) => {
        setInput(target.value);
        if (target.value.length) {
            setNames(listName["names"].filter(item => (item.toLowerCase().includes(target.value.toLowerCase()))).splice(0, 5));
        } else {
            setNames([]);
        }
    }

    const handleClickName = (e) => {
        setInput(e.currentTarget.innerText);
        LoadComps(e.currentTarget.innerText);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        LoadComps(e.target[0].value);
    }

    const LoadComps = (campeonName) => {
        setMouseOver(true);
        if (listName["names"].indexOf(campeonName) !== -1) {
            setNames([]);
            setCompositions(comp["summary"].filter(comp => comp.includes(campeonName)));
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={(compositions.length > 0 ? `top-3` : `top-10`) + ` animation center-text`}>
                <div>
                    <h1 className="color-blue same-line">
                        TeamFightTactics
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
                            onMouseEnter={() => setMouseOver(false)}
                            onMouseLeave={() => setMouseOver(true)}
                        >
                            {
                                names.map((item, i) => {
                                    return (
                                        <li
                                            className={`suggestion-active ${(item === input && mouseOver === true) && "select"}`}
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
            <div className="top-1"/>
            {
                compositions &&
                compositions.map((item, i) => {
                    return (
                        <div
                            key={i}
                            className="center-text"
                        >
                            <span>
                                <b>
                                    Title
                                </b>
                            </span>
                            <ul
                                className="padd-0"
                            >
                                {item.map((nameChampeon, i) => {
                                    return (
                                        <li
                                            key={i}
                                            className="same-line"
                                        >
                                            <div
                                                className="same-line tooltip"
                                            >
                                                <img
                                                    width="60px"
                                                    src={info["champios"][nameChampeon.trim().replace(/\s/g, '').toLowerCase()]["image_url"]}
                                                    alt={nameChampeon.trim().toLowerCase()}
                                                />
                                                <span className="tooltiptext">{nameChampeon.trim()}</span>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default HomePage;