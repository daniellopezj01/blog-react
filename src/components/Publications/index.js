import React, { Component } from "react";
import { connect } from "react-redux";
import * as usuariosActions from "../../actions/UserActions";
import * as publicationsActions from "../../actions/PublicationsActions";
import Spinner from "../generals/Spinner";
import Fatal from "../generals/Fatal";
const { bringAll: bringAllUsers } = usuariosActions;
const { bringForUser: bringPublicationsForUser } = publicationsActions;

class Publications extends Component {
  async componentDidMount() {
    const {
      bringAllUsers,
      bringPublicationsForUser,
      match: {
        params: { key },
      },
    } = this.props;
    if (!this.props.usuariosReducer.usuarios.length) {
      await bringAllUsers();
    }
    if (this.props.usuariosReducer.error) {
      return;
    }
    if (!("publicacion_key" in this.props.usuariosReducer.usuarios[key])) {
      bringPublicationsForUser(key);
    }
  }

  putUser = () => { 
    const {
      usuariosReducer,
      match: {params: { key }},
    } = this.props;

    if(usuariosReducer.error){
      return <Fatal message="Algo salio mal "/>
    }
    if(!usuariosReducer.usuarios.length ||usuariosReducer.loading){
      return <Spinner/>
    }
    const nombre =  usuariosReducer.usuarios[key].name
    return(
      <h1> Publicaciones de nombre {nombre} </h1> 
    )
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.match.params.key}
        {this.putUser()}
      </div>
    );
  }
}

const mapStateToProps = ({ usuariosReducer, publicationsReducer }) => {
  return { usuariosReducer, publicationsReducer };
};

const dispatchToProps = {
  bringAllUsers,
  bringPublicationsForUser,
};

export default connect(mapStateToProps, dispatchToProps)(Publications);
