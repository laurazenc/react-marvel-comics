import React from 'react';
import {shallow} from 'enzyme';
import {Pagination} from './../';


describe('<Pagination />', () => {

  function setPage() { }

  it('should render ', () => {
    const wrapper = shallow(<Pagination setPage={setPage} />);
    expect(wrapper).toMatchSnapshot();

  });
});
