import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCharacterQuery } from '../app/services/RickAndMortyApi';
import "../css/main-style5.scss";
// _____________________________________________________________________

const RickMortyList = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const { data: characters, isLoading, isFetching, isError, error } = useGetCharacterQuery(pageNumber);
    const [characterList, setCharacterList] = useState([]);

    // Fill CharactersList
    useEffect(() => {

        if (!isFetching) {
            setCharacterList(characters.results)
        }

    }, [characters]);

    // Search Characters
    const changeSearchHandler = (event) => {
        const q = event.target.value;

        setTimeout(() => {
            if (q !== "") {
                const temp = characters.results.filter(ch => ch.name.toLowerCase().includes(q.toLowerCase()));
                setCharacterList(temp)
            } else {
                setCharacterList(characters.results)
            }
        }, 2000)
    };

    // Get Status and Species
    const getStatusAndSpeciesCharacters = () => {
        let temp_characters = []
        if (!isFetching) {
            temp_characters = characters.results;
        }

        const temp_status = [];
        for (const item of temp_characters) {
            if (!temp_status.includes(item.status.trim())) {
                temp_status.push(item.status)
            }
        };

        const temp_species = [];
        for (const item of temp_characters) {
            if (!temp_species.includes(item.species.trim())) {
                temp_species.push(item.species)
            }
        }

        return { temp_status, temp_species }
    }

    // Filter Status and Species
    const changeHandlerFilter = (e) => {
        const name = e.target.name;

        if (name === "status-character") {
            const status = e.target.value;

            if (status === "All") {
                setCharacterList(characters.results)
            } else {
                const temp_status = characters.results.filter(ch => ch.status == status);
                setCharacterList(temp_status)
            }
        }

        if (name === "species-character") {
            const species = e.target.value;
            if (species === "All") {
                setCharacterList(characters.results)
            } else {
                const temp_species = characters.results.filter(ch => ch.species == species);
                setCharacterList(temp_species)
            }
        }

    }

    // =============================================================

    const { temp_status, temp_species } = getStatusAndSpeciesCharacters()

    if (isFetching || isLoading) {
        return <h3>Loading ...</h3>
    }

    if (error || isError) {
        return <h2>Error is: {error.message}</h2>

    }

    return (
        <div>
            <div className='img-slider'></div>
            <div className='container'>
                <div className='search-box'>

                    <input type="text" id='q' name='q' onChange={(e) => changeSearchHandler(e)} placeholder='Character Name Search ...' minLength={2} maxLength={50} />
                    <button type="button"><i className="fa-solid fa-magnifying-glass"></i>Search</button>
                </div>
                <div className='rickmorty-container'>
                    <div className='characters-filter'>
                        <h2>Filter in Characters</h2>
                        <div>
                            <label htmlFor="status-character">status: </label>
                            <select name="status-character" id="status-character" onChange={(e) => changeHandlerFilter(e)}>
                                <option value="All">All</option>
                                {temp_status.map((status, index) => (
                                    <option key={index} value={status}>{status}</option>
                                ))}

                            </select>
                        </div>
                        <div>
                            <label htmlFor="species-character">species: </label>
                            <select name="species-character" id="species-character" onChange={(e) => changeHandlerFilter(e)}>
                                <option value="All">All</option>
                                {temp_species.map((species, index) => (
                                    <option key={index} value={species}>{species}</option>
                                ))}
                            </select>
                        </div>
                        <hr className='hr-morty'/>
                        <div className='page-filter'>
                            <h3>Filter Page</h3>
                            <div>
                                <button disabled={pageNumber <= 1} onClick={() => setPageNumber(prev => prev - 1)}><i className="fa-solid fa-angles-left"></i> Prev</button>
                                <span>page {pageNumber}</span>
                                <button disabled={pageNumber >= characters.info.pages} onClick={() => setPageNumber(prev => prev + 1)}>Next <i className="fa-solid fa-angles-right"></i></button>
                            </div>
                        </div>

                    </div>
                    <div className='characters-container'>
                        {characterList.map(ch => (
                            <div className='character-box' key={ch.id}>
                                <div className='character-img'>
                                    <img src={ch.image} alt={ch.name} />
                                </div>
                                <div>
                                    <h2>{ch.name}</h2>
                                    <div>
                                        <span>
                                            {(() => {
                                                if (ch.status === "Alive") {
                                                    return <i className="fa-solid fa-circle fa-2xs" style={{ color: "green" }}></i>
                                                } else if (ch.status === "Dead") {
                                                    return <i className="fa-solid fa-circle fa-2xs" style={{ color: "red" }}></i>
                                                } else {
                                                    return <i className="fa-solid fa-circle fa-2xs" style={{ color: "gray" }}></i>
                                                }
                                            })()}&ensp;

                                            {ch.status}</span> - <span>{ch.species}
                                        </span>
                                    </div>
                                    <p><span>Location: </span> <strong>{ch.location.name}</strong></p>
                                    <p><span>Origin: </span> <strong>{ch.origin.name}</strong></p>
                                    <Link to={`character/${ch.id}/${pageNumber}`}>Details</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RickMortyList