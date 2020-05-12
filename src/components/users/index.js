import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../generals/Spinner";
import Fatal from "../generals/Fatal";
import Table from "./TableUser.js";

import * as usuariosActions from "../../actions/UserActions";
class Users extends Component {
  componentDidMount() {
    console.log("componentDidMount");
    if(!this.props.usuarios.length){
      this.props.bringAll();
    }
  }

  addData = () => {
    if (this.props.loading) {
      return <Spinner />;
    }
    if (this.props.error) {
      return <Fatal message={this.props.error} />;
    }
    return <Table></Table>;
  };

  render() {
		return (
			<div>
				<h1>Usuarios</h1>
				{ this.addData() }
			</div>
		)
	}

}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Users);
