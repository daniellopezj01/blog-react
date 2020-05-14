import React from "react";
import { connect } from "react-redux";
import Spinner from "../generals/Spinner";
import Fatal from "../generals/Fatal";

const comments = (props) => {
    console.log("entre a comments",props)
    if(props.loading){
        return <Spinner/>
    }
    if(props.error){
        return <Fatal message={props.error.message}/>
    }
  const putComments = () =>
    props.coments.map((comment) => (
      <li key={comment.id}>
        <b>
          <u>{comment.email}</u>
        </b>
        <br />
        {comment.body}
      </li>
    ));

  return <ul>{putComments()}</ul>;
};

const mapStateToProps = ({ publicationsReducer }) => publicationsReducer;

export default connect(mapStateToProps)(comments);
