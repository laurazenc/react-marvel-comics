import React from 'react';
import {shallow} from 'enzyme';
import {NotFound} from './../';

describe('<NotFound />', () => {

  it('Should render the not found message', () => {
    const wrapper = shallow(<NotFound />);
    const actual = wrapper.find('h4').text().trim();
    const expected = '404 Page Not Found';

    expect(actual).toEqual(expected);
  });

});
