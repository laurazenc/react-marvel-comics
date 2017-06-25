import React from 'react';
import {shallow} from 'enzyme';
import {Comic} from './../';

describe('<Comic />', () => {
  const comic = {
    thumbnail: {
      path: '',
      url: ''
    },
    creators: {
      items: []
    },
    dates: [
      {data: ''}
    ],
    title: 'Spider-man'
  };
  const id = 0;
  function openModal() {}

  it('Should render the character\'s name', () => {
    const wrapper = shallow(<Comic comic={comic} id={id} openModal={openModal()} />);
    const actual = wrapper.find('.comic-name').text().trim();
    const expected = 'Spider-man';

    expect(actual).toEqual(expected);
  });

});
