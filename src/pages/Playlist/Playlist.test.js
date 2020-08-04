import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Playlist from './index';
configure({adapter: new Adapter()});

describe('Testando renderização do componente', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Playlist />);
    });

    it('Find page-playlist div', () => {
        expect(wrapper.find("#page-playlist").length).toBe(1)
    })

    it('Find header tag', () => {
        expect(wrapper.find("header").length).toBe(1)
    })

    it('Find menu div', () => {
        expect(wrapper.find(".menu").length).toBe(1)
    })

    it('Find content div', () => {
        expect(wrapper.find(".content").length).toBe(1)
    })

    it('Find playlist div', () => {
        expect(wrapper.find(".playlist").length).toBe(1)
    })
})