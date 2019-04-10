import { shallow, mount } from 'enzyme';
import React from 'react';
import NavButtonLi from './NavButtonLi'


describe('NavButtonLi tests', () => {
    let wrapper;
    let mockRouteChange = jest.fn(val => val);
    const mockProps = {
        buttonLabel: 'test label',
        onRouteChange: mockRouteChange,
        route: 'test route',
        liClass: 'tc',
    }

    beforeEach(() => {
        wrapper = shallow(<NavButtonLi {...mockProps}/>)
    })

    it('Exists', () => {
        expect(wrapper.exists()).toBe(true);
    })

    it('Matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    it('Displays label correctly', () => {
        expect(wrapper.find('button').text()).toBe(mockProps.buttonLabel);
    })

    // simulate a click, make sure correct route value is returned with click.
    it('On Click is called and sends route prop', () => {
        let wrapClick = shallow(<NavButtonLi {...mockProps}/>)
        wrapClick.find('button').simulate('click');
        expect(mockRouteChange.mock.results[0].value).toBe('test route')
        expect(mockRouteChange).toHaveBeenCalledTimes(1);
    })
    
})