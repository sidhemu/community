import React from "react";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PageNo from '../layout/Pagenumber';

export default class Pagetn extends React.Component {
  render() {
    var ttlCountPg = this.props.ttlPage;
    var pgrow = [];

    for (var i = 1; i <= ttlCountPg; i++) {
        pgrow.push(<PageNo key={i} pgno={i}/>);
    }
    return (
      <Pagination size="sm">
            <PaginationItem>
              <PaginationLink previous href="#" />
            </PaginationItem>

              {pgrow}

            <PaginationItem>
              <PaginationLink next href="#" />
            </PaginationItem>
      </Pagination>
    );
  }
}
