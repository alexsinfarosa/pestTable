import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import {
  BootstrapTable,
  TableHeaderColumn,
  DeleteButton
} from "react-bootstrap-table";
import "index.css";

const selectRow = {
  mode: "checkbox",
  clickToSelect: true
  // bgColor: "#D66475"
};

const cellEdit = {
  mode: "dbclick",
  blurToSave: true
};

@inject("store")
@observer
export default class StageTable extends Component {
  createCustomDeleteButton = onClick => {
    return (
      <DeleteButton
        btnText="Delete Stage"
        btnContextual="btn-danger"
        className="my-custom-class"
        btnGlyphicon="glyphicon-trash"
        style={{ marginLeft: "10px" }}
      />
    );
  };

  remote = remoteObj => {
    // Only cell editing, insert and delete row will be handled by remote store
    remoteObj.cellEdit = true;
    remoteObj.insertRow = true;
    remoteObj.dropRow = true;
    return remoteObj;
  };

  render() {
    const options = {
      insertText: "Add Stage",
      onAddRow: this.handleAddRow,
      deleteBtn: this.createCustomDeleteButton
    };

    if (this.props.data) {
      return (
        <BootstrapTable
          data={this.props.data}
          cellEdit={cellEdit}
          insertRow={true}
          deleteRow={true}
          selectRow={selectRow}
          options={options}
          remote={this.remote}
        >
          <TableHeaderColumn
            dataField="name"
            isKey={true}
            tdStyle={{ whiteSpace: "normal" }}
          >
            Phenological Stage
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="status"
            tdStyle={{ whiteSpace: "normal" }}
          >
            Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="ddlo" width="70" dataAlign="center">
            ddlo
          </TableHeaderColumn>
          <TableHeaderColumn dataField="ddhi" width="70" dataAlign="center">
            ddhi
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="phenologicalMarkers"
            tdStyle={{ whiteSpace: "normal" }}
          >
            Phenological Markers
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="scouting"
            editable={{ type: "textarea" }}
            tdStyle={{
              whiteSpace: "normal"
            }}
            editColumnClassName="class-for-editing-cell"
          >
            Scouting
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="management"
            tdStyle={{ whiteSpace: "normal" }}
          >
            Management
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="biologicalControl"
            tdStyle={{ whiteSpace: "normal" }}
          >
            Biological Control
          </TableHeaderColumn>
        </BootstrapTable>
      );
    } else {
      return <p>?</p>;
    }
  }
}
