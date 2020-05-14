import React, { Component } from "react";
import { connect } from "react-redux";
import * as usuariosActions from "../../actions/UserActions";
import * as publicationsActions from "../../actions/PublicationsActions";
import Spinner from "../generals/Spinner";
import Fatal from "../generals/Fatal";
import Comments from "./Comments";
const { bringAll: bringAllUsers } = usuariosActions;
const {
  bringForUser: bringPublicationsForUser,
  openClose,
  bringComments
} = publicationsActions;

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
      match: {
        params: { key },
      },
    } = this.props;

    if (usuariosReducer.error) {
      return <Fatal message={usuariosReducer.error} />;
    }
    if (!usuariosReducer.usuarios.length || usuariosReducer.loading) {
      return <Spinner />;
    }
    const nombre = usuariosReducer.usuarios[key].name;
    return <h1> Publicaciones de nombre {nombre} </h1>;
  };

  putPublications = () => {
    const {
      usuariosReducer,
      usuariosReducer: { usuarios },
      publicationsReducer,
      publicationsReducer: { publications },
      match: {
        params: { key },
      },
    } = this.props;

    if (!usuarios.length || usuariosReducer.error) return;
    if (publicationsReducer.loading) return <Spinner />;
    if (publicationsReducer.error)
      return <Fatal message={publicationsReducer.error} />;
    if (publicationsReducer.loading) return <Spinner />;
    if (!publications.length) return;

    if (!("publications_key" in usuarios[key])) return;
    const { publications_key } = usuarios[key];
    return this.showInfo(publications[publications_key], publications_key);
  };

  showInfo = (publications, pub_key) =>
    publications.map((publicacion, com_key) => (
      <div
        key={publicacion.id}
        onClick={() =>
          this.showComments(pub_key, com_key, publicacion.comments)
        }
      >
        <h2 className="pub_title">{publicacion.title}</h2>
        <h3>{publicacion.body}</h3>
        {publicacion.isOpen ? <Comments  coments={publicacion.comments}/> : ""}
      </div>
    ));

  showComments = (pub_key, com_key, commentsPub) => {
    console.log(commentsPub);
    this.props.openClose(pub_key, com_key)
    if(!commentsPub?.length){
      this.props.bringComments(pub_key, com_key)
    }
  };
  render() {
    console.log(this.props);
    return (
      <div>
        {this.putUser()}
        {this.putPublications()}
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
  openClose,
  bringComments
};

export default connect(mapStateToProps, dispatchToProps)(Publications);
