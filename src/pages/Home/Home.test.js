import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Home from './index';
configure({adapter: new Adapter()});

describe('Testando renderização do componente', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Home />);
    });

    it('Find page-playlist div', () => {
        expect(wrapper.find("#page-home").length).toBe(1)
    })

    it('Find content div', () => {
        expect(wrapper.find(".content").length).toBe(1)
    })
    
    it('Find main tag', () => {
        expect(wrapper.find("main").length).toBe(1)
    })

    it('Find login button', () => {
        expect(wrapper.find("button").text()).toBe('Entrar')
    })
})