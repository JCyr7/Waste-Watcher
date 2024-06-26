/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react';
//import ArcGISMap from '../src/Pages/ArcGISMap'
import ForgotPassword from '../src/Pages/ForgotPassword'
import HomePage from '../src/Pages/HomePage'
//import LeaderBoardPage from '../src/Pages/LeaderboardPage'
import LogoutPage from '../src/Pages/LogoutPage'
import ProfilePage from '../src/Pages/ProfilePage'

jest.mock('@react-native-async-storage/async-storage')

test('renders correctly', () => {
  const tree = renderer.create(<LogoutPage />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly', () => {
  const tree = renderer.create(<ForgotPassword />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly', () => {//
  const tree = renderer.create(<HomePage />).toJSON()
  expect(tree).toMatchSnapshot()
})


/*test('renders correctly', () => {
  const tree = renderer.create(<LeaderBoardPage />).toJSON()
  expect(tree).toMatchSnapshot()
})*/

const mockObject = {
  getItem: jest.fn()
};

/*describe('HomePage', () => {
  it('calls getItem on the object', () => {
    // Render the component
    renderer.create(<HomePage object={mockObject} />);

    expect(mockObject.getItem).toMatchSnapshot();
  }); 
});*/

test('renders correctly', () => {
  const tree = renderer.create(<ProfilePage />).toJSON()
  expect(tree).toMatchSnapshot()
})
