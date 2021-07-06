import React, { useState, useEffect } from 'react';
import axios from "axios";
import Card from "./Card";

const Countries = () => {
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [playOnce, setPlayOnce] = useState(true);

    useEffect(() => {
        if (playOnce) {
            console.log('call axios');
            axios.get('https://restcountries.eu/rest/v2/all?fields=alpha3Code;name;population;region;region;capital;flag')
            .then(res => setData(res.data));
            setPlayOnce(false);
        }

        const sortCountries = () => {
            const countryObj = Object.keys(data).map((i) => data[i]);
            const sortedArray = countryObj.sort((a,b) => {
                return b.population - a.population
            });
            sortedArray.length = 30;
            setSortedData(sortedArray);
        }

        console.log('sortCountries()');
        sortCountries();

    }, [data, playOnce]);
    
    return (
        <div className="countries">
            <ul className="countries-list">
                {sortedData.map((country) => (
                    <Card key={country.alpha3Code} country={country}/>
                ))}
            </ul>
        </div>
    );
};

export default Countries;