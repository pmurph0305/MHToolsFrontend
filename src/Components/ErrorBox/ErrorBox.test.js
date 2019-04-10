import { shallow } from 'enzyme';
import React from 'react';
import ErrorBox from './ErrorBox'


describe('ErrorBox tests', () => {
    let wrapper;
    beforeEach(() => {
        let mockError = 'Error'
        wrapper = shallow(<ErrorBox error={mockError}/>)
    })
    
    it('Exists', () => {
        expect(wrapper.exists()).toBe(true);
    })

    it('Matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('Displays error', () => {
        expect(wrapper.text()).toEqual('Error');
    })

    it('Splits error display', () => {
        // Error that error box splits.
        const mockErrorSplit = 'This is a test error error: Actual Error'
        // wrapper to test.
        const wrapperSplit = shallow(<ErrorBox error={mockErrorSplit}/>)
        // make sure displayed error is correctly split.
        expect(wrapperSplit.text()).toEqual("This is a test error");
    })

    it('Handles null and undefined error', () => {
        // Mocks for null and undefined.
        let mockNull = null;
        let mockUndefined = undefined;
        // wrapper for null error
        const wrapNull = shallow(<ErrorBox error={mockNull}/>)
        // make sure the box still exists but has no error displayed
        expect(wrapNull.exists()).toBe(true);
        expect(wrapNull.text()).toEqual("");
        // wrapper for undefined error.
        const wrapUndefined = shallow(<ErrorBox error={mockUndefined}/>)
         // make sure the box still exists but has no error displayed
        expect(wrapUndefined.exists()).toBe(true);
        expect(wrapUndefined.text()).toEqual("");
    })
})