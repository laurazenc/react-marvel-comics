import React from 'react';
import {shallow} from 'enzyme';
import {Loading} from './../';


describe('<Loading />', () => {
  it('should render ', () => {
    const wrapper = shallow(<Loading />);
    const actual = wrapper.find('h1').text();
    const expected = '...';

    expect(actual).toEqual(expected);

  });
});
