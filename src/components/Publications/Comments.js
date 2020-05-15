import React from "react";
import { connect } from "react-redux";
import Spinner from "../generals/Spinner";
import Fatal from "../generals/Fatal";

const comments = (props) => {
  if (props.commentsError) {
    return <Fatal message={props.commentsError} />;
  }
  if (props.commentsLoading && !props.comments?.length) {
    return <Spinner />;
  }

  const putComments = () =>
    props.coments.map((comment) => (
      <li key={comment.id}>
        <b>
          <u>{comment.email}</u>
        </b>
        <br />
        <p className="pub-description"> {comment.body}</p>
      </li>
    ));

  return <ul>{putComments()}</ul>;
};

const mapStateToProps = ({ publicationsReducer }) => publicationsReducer;

export default connect(mapStateToProps)(comments);
