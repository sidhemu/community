import React from "react";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class PageNo extends React.Component {

    render(){
      return(
        <PaginationItem>
          <PaginationLink href="#">
           {this.props.pgno}
          </PaginationLink>
        </PaginationItem>
      );
    }


}
