import React from 'react';
import {shallow} from 'enzyme';
import {Character} from './../';

describe('<Character />', () => {

  const character = {
    thumbnail: {
      path: '',
      url: ''
    },
    name: 'Spider-man'
  };

  it('Should render the character\'s name', () => {
    const wrapper = shallow(<Character character={character} />);
    const actual = wrapper.find('.character-name').text().trim();
    const expected = 'Spider-man';

    expect(actual).toEqual(expected);
  });

});
