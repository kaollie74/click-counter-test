import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() })

/** 
 * Factory Function to create a ShallowWrapper for the App Component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(< App {...props} />)

  if(state) wrapper.setState(state); 
  return wrapper; 
}


/**
 * Return ShallowWrapper containing node(s) with th egiven data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search
 * @return {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}



test('renders without an error', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)
});

test('renders button', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'increment-button')
  expect(button.length).toBe(1)
})

test('renders counter display', () => {
  const wrapper = setup()
  const display = findByTestAttr(wrapper, 'counter-display')
  expect(display.length).toBe(1)
})

test('counter starts at 0', () => {
  const wrapper = setup(); 
  const initialCounterState = wrapper.state('counter')
  expect(initialCounterState).toBe(0); 
})

test('clicking button increments counter DISPLAY', () => {
  const counter = 7; 
  const wrapper = setup(null, {counter}); // pass props to set state in setup(); 
  // find button and click
  const button = findByTestAttr(wrapper, 'increment-button')
  button.simulate('click')

  // find display then test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(counter + 1); 
})

test('click decrement button decreases counter Display', () => {
  const counter = 7;
  const wrapper = setup(null, {counter})

  // find button and click
  const button = findByTestAttr(wrapper, 'decrement-button')
  button.simulate('click')

  // find display then test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter - 1)
})

test('click decrement button decreases counter Display below 0', () => {
  const counter = 0;
  const wrapper = setup(null, {counter})

  const button = findByTestAttr(wrapper, 'decrement-button')
  button.simulate('click')
  const counterDisplay= findByTestAttr(wrapper, 'warning-display');
  expect(counterDisplay.text()).toContain('Counter cannot go below 0')
})