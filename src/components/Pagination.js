import React, { Component } from 'react';


class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
          pager: {
            totalItems: 1485,
            currentPage: 0,
            pageSize: 20,
            totalPages: 74
          }
        };

    }

    componentWillMount() {
      this.setPage(this.props.currentPage);
    }



    setPage(page) {
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(page);
        // update state
        this.setState({ pager: pager });


        // call change page function in parent component
        this.props.setPage(pager.currentPage);
    }

    range(start) {
      return Array.apply(0, Array(10))
        .map(function (element, index) {
          return index + start;
      });
    }



    getPager(currentPage) {

        currentPage = currentPage || 1;
        let pageSize = 10;
        let totalPages = this.state.pager.totalPages;

        let startPage, endPage;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }


        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = endPage;
        let pages = this.range(startPage);
        return {
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        let pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            return null;
        }

        return (
            <ul className="pagination">
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(1)}>«</a>
                </li>
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage - 1)}>⟨</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <a onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage + 1)}>⟩</a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.totalPages)}>»</a>
                </li>
            </ul>
        );
    }
}

export default Pagination;
