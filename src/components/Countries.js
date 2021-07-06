import React, { useState, useEffect } from 'react';
import axios from "axios";
import Card from "./Card";

const Countries = () => {
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [playOnce, setPlayOnce] = useState(true);
    const [rangeValue, setRangeValue] = useState(40);
    const [selectedRadio, setSelectedRadio] = useState('');
    const radios = ['Africa', 'America', 'Asia', 'Europa', 'Oceania'];

    useEffect(() => {
        if (playOnce) {
            axios.get('https://restcountries.eu/rest/v2/all?fields=alpha3Code;name;population;region;region;capital;flag')
            .then(res => setData(res.data));
            setPlayOnce(false);
        }

        const sortCountries = () => {
            const countryObj = Object.keys(data).map((i) => data[i]);
            const sortedArray = countryObj.sort((a,b) => {
                return b.population - a.population
            });
            sortedArray.length = rangeValue;
            setSortedData(sortedArray);
        }

        sortCountries();
    }, [data, rangeValue, playOnce]);
    
    return (
        <div className="countries">
            <div className="sort-container">
                <input type="range" min="1" max="250" value={rangeValue} onChange={(e) => setRangeValue(e.target.value)}/>
                <ul>
                    {radios.map((radio) => {
                        return (
                            <li key={radio}>
                                <input type="radio" value={radio} id={radio}
                                    checked={radio === selectedRadio}
                                    onChange={(e) => setSelectedRadio(e.target.value)}
                                />
                                <label htmlFor={radio}>{radio}</label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            </div>
            <ul className="countries-list">
                {sortedData
                .filter((country) => country.region.includes(selectedRadio))
                .map((country) => (
                    <Card key={country.alpha3Code} country={country}/>
                ))}
            </ul>
        </div>
    );
};

export default Countries;