import React from 'react'
import { Filter } from '../../../interface/Filters'
import { PlaylistInterface } from '../../../interface/Playlist';

type props = {
    item: PlaylistInterface,
}
export default function PlaylistItem(props: props) {
    const { item } = props;
    return (
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
    )
}
