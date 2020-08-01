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
import IntegerFilterInput from './components/IntegerFilterInput';
import SelectFilterInput from './components/SelectFilterInput';
import DateFilterInput from './components/DateFilterInput';
import PlaylistItem from './components/PlaylistItem';

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

    useEffect(() => {
        setTimeout(() => {
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
        }, 30000)
    });

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
        console.log(filters, event.target, name, value);
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
        const filter = filters.find(filter => filter.id === field);
        if (filter && filter.validation) {
            if (filter.validation.primitiveType && filter.validation.min && filter.validation.max) {
                return filter.validation.min <= Number(value) && filter.validation.max >= Number(value);
            } else if (filter.validation.entityType === 'DATE_TIME') {
                return moment(value).isValid();
            } else {
                return true;
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
                                <SelectFilterInput filter={filter} onChanged={handleSelectChange} />
                            )
                        } else {
                            if (filter.validation && filter.validation.primitiveType === 'STRING') {
                                return (
                                    <DateFilterInput filter={filter} onChanged={handleInputChange} />
                                )
                            } else if (filter.validation && filter.validation.primitiveType === 'INTEGER') {
                                return (
                                    <IntegerFilterInput filter={filter} onChanged={handleInputChange} />
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
                            <PlaylistItem item={item} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Playlist;