import React from 'react';
import {shallow} from 'enzyme';
import {ModalComic} from './../';

describe('<ModalComic />', () => {
  const comic = {
    data: {
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
      prices: [
        {
          type: '',
          price: ''
        }
      ],
      title: 'Spider-man',
      isFavorited: false
    }
  };

  it('Should render the character\'s name', () => {
    const wrapper = shallow(<ModalComic comic={comic} />);
    const actual = wrapper.find('.comic-title').text().trim();
    const expected = 'Spider-man';

    expect(actual).toEqual(expected);
  });

});
