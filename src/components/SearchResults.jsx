import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
    const query = useQuery().get('q');
    const type = useQuery().get('type');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query && type) {
            let url = `/api/search?q=${query}`;
            if (type === 'users') {
                url = `/api/search?q=${query}`;
            }
            axios.get(url)
                .then(response => setResults(response.data))
                .catch(error => console.error('Error fetching search results:', error));
        }
    }, [query, type]);

    return (
        <div>
            <h2>Resultados de búsqueda para "{query}"</h2>
            <ul>
                {results.map(result => (
                    <li key={result.email}>{result.first_name} {result.last_name} ({result.email})</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;
