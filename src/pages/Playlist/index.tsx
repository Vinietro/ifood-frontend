import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
// import environment from '../../environment';
import queryString from 'query-string';
import moment from 'moment';

import './style.scss'

import logo from '../../assets/logo-white.png'

import { PlaylistInterface } from '../../interface/Playlist';
import environemnt from '../../environment';
import { Filter, QueryFilter } from '../../interface/Filters';

const Playlist = () => {
    const [token, setToken] = useState<String>('');
    const [playlist, setPlaylist] = useState<PlaylistInterface[]>([]);
    const [filters, setFilters] = useState<Filter[]>([]);
    const [currentFilters, setCurrentFilters] = useState<QueryFilter[]>([]);

    useEffect(() => {
        if (queryString.parse(window.location.hash) &&
            queryString.parse(window.location.hash).access_token) {
            setToken(queryString.parse(window.location.hash).access_token as String)
        }
    }, [])

    useEffect(() => {
        axios.get<any>(environemnt.urlApiSpotify, {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then(response => {
            setPlaylist(response.data.playlists.items);
        }).catch(error => {
            setPlaylist([]);
            console.log(`Erro: ${error}`)
        });
    }, [token])

    useEffect(() => {
        axios.get<any>(`${environemnt.urlApiSpotify}?${
            currentFilters.length > 0 ?
                currentFilters
                    .map((filter) => `${filter.field}=${filter.value}`)
                    .reduce((accumulator, current) => `${accumulator}&${current}`)
                : ''
            }`, {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then(response => {
            setPlaylist(response.data.playlists.items);
        }).catch(error => {
            setPlaylist([]);
            console.log(`Erro: ${error}`)
        });
    }, [currentFilters, token])

    useEffect(() => {
        axios.get<any>(environemnt.urlMock).then(response => {
            setFilters(response.data.filters);
        }).catch(error => {
            setFilters([]);
            console.log(`Erro: ${error}`)
        });
    }, [])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(name, value);
        const filtersAux = currentFilters.filter(filter => filter.field !== name);
        if (value && validateField(name, value)) {
            const convertedValue = convertDate(name, value);
            filtersAux.push({
                field: name,
                value: convertedValue
            });
        }
        setCurrentFilters(filtersAux);
    }

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log(event.target, name, value);
        const filtersAux = currentFilters.filter(filter => filter.field !== name);
        if (value && validateField(name, value)) {
            filtersAux.push({
                field: name,
                value
            });
        }
        setCurrentFilters(filtersAux);
    }

    const validateField = (field: string, value: string) => {
        const filter = filters.find(filter => filter.id = field);
        if (filter && filter.validation) {
            if (filter.validation.primitiveType && filter.validation.min && filter.validation.max) {
                return filter.validation.min <= Number(value) && filter.validation.max >= Number(value);
            } else if (filter.validation.entityType === 'DATE_TIME') {
                return moment(value).isValid();
            }
        } else if (filter) {
            return true;
        }

        return false;
    }

    const convertDate = (field: string, value: string) => {
        const currentFilter = filters.find(filter => filter.id === field);
        if (currentFilter &&
            currentFilter.validation &&
            currentFilter.validation.entityType &&
            currentFilter.validation.entityType === 'DATE_TIME') {
            return `${moment(value).format('yyyy-MM-ddTHH:mm:ss')}:00`;
        }
        return value;
    }

    return (
        <div id="page-playlist">
            <header>
                <img src={logo} alt="Ifood Music" />
                <div key="menu" className="menu">
                    {filters.map(filter => {
                        if (filter.values) {
                            return (
                                <div key={filter.id} className="menu__item">
                                    <label htmlFor={filter.id}>{filter.name}</label>
                                    <select key={filter.id} name={filter.id} id={filter.id} onChange={handleSelectChange}>
                                        {filter.values.map(option => (
                                            <option key={option.value} value={option.value}>{option.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )
                        } else {
                            if (filter.validation && filter.validation.primitiveType === 'STRING') {
                                return (
                                    <div key={filter.id} className="menu__item">
                                        <label htmlFor={filter.id}>{filter.name}</label>
                                        <input key={filter.id} type="datetime-local" name={filter.id} onChange={handleInputChange} />
                                    </div>
                                )
                            } else if (filter.validation && filter.validation.primitiveType === 'INTEGER') {
                                return (
                                    <div key={filter.id} className="menu__item">
                                        <label htmlFor={filter.id}>{filter.name}</label>
                                        <input key={filter.id} type="number" name={filter.id} onChange={handleInputChange} />
                                    </div>
                                )
                            }
                        }

                    })}
                </div>
            </header>
            <div className="content">
                <main>
                    <div className="playlist">
                        {playlist?.map(item => (
                            <div key={item.name} className="playlist__item">
                                <a href={item.external_urls.spotify} rel="noopener noreferrer" target="_blank">
                                    <img
                                        src={item.images[0].url}
                                        alt=""
                                    />
                                </a>
                                <span className="playlist__item-title">
                                    {item.name}
                                </span>
                                <span className="playlist__item-owner">
                                    {item.owner.display_name}
                                </span>
                                <span className="playlist__item-description">
                                    {item.description}
                                </span>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Playlist;