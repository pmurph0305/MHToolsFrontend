import { shallow } from 'enzyme';
import React from 'react';
import DMDateNav from './DMDateNav'


describe('DMDateNav tests', () => {
    let wrapper;
    let mockDate = '01-01-0101'
    beforeEach(() => {
        wrapper = shallow(<DMDateNav date={mockDate}/>)
    })

    it('Exists', () => {
        expect(wrapper.exists()).toBe(true);
    })

    it('Matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('Displays date correctly', () => {
        expect(wrapper.find('p').text()).toBe(mockDate)
    })

    it('On Click works', () => {
        let mockClick = jest.fn();
        let wrapClick = shallow(<DMDateNav onClick={mockClick}/>)
        wrapClick.find('button').first().simulate('click');
        expect(mockClick).toHaveBeenCalledTimes(1);
        wrapClick.find('button').last().simulate('click');
        expect(mockClick).toHaveBeenCalledTimes(2);
    })
})