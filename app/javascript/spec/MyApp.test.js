import React from 'react';
import MyApp from '../components/MyApp.jsx';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


test('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  Enzyme.configure({ adapter: new Adapter() })
  const app = shallow(<MyApp />);
  expect(app.text()).toEqual('Super Guardant');
  app.find('input').simulate('change');
  expect(app.text()).toEqual('renamed');
});
