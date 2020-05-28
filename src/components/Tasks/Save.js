import React, { Component } from "react";
import { connect } from "react-redux";
import * as taskActions from "../../actions/TaskActions";
import Spinner from "../generals/Spinner";
import Fatal from "../generals/Fatal";
import { Redirect } from "react-router-dom";
export class Save extends Component {
  componentDidMount() {
    console.log(this.props);
    const {
      match: {
        params: { usId, taskId },
      },
      tasks,
      changeTitle,
      changeUserId,
    } = this.props;
    if (usId && taskId) {
      const task = tasks[usId][taskId];
      changeUserId(task.userId);
      changeTitle(task.title);
    }
  }
  changeUserId = (event) => {
    this.props.changeUserId(event.target.value);
  };
  changeTitle = (event) => {
    this.props.changeTitle(event.target.value);
  };

  save = () => {
    const {
      user_id,
      title,
      add,
      match: {
        params: { usId, taskId },
      },
      tasks,
      updateTask,
    } = this.props;
    const newTask = { userId: user_id, title, completed: false };
    if (usId && taskId) {
      const task = tasks[usId][taskId];
      const uploadTask = { ...newTask, completed: task.completed, id: task.id };
      updateTask(uploadTask);
    } else {
      add(newTask);
    }
  };

  disabledButton = () => {
    const { title, user_id, loading } = this.props;
    if (loading) {
      return true;
    }
    if (!user_id || !title) {
      return true;
    }
    return false;
  };

  showAction = () => {
    const { error, loading } = this.props;
    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return <Fatal message={error} />;
    }
  };
  render() {
    return (
      <div>
        {this.props.become ? <Redirect to="/tareas" /> : ""}
        <h1>Guardar Tarea</h1>
        Usuario Id:
        <input
          type="number"
          value={this.props.user_id}
          onChange={this.changeUserId}
        />
        <br />
        <br />
        Titulo:
        <input
          type="text"
          value={this.props.title}
          onChange={this.changeTitle}
        />
        <br />
        <br />
        <button onClick={this.save} disabled={this.disabledButton()}>
          Guardar
        </button>
        {this.showAction()}
      </div>
    );
  }
}

const mapStateToProps = ({ taskReducer }) => taskReducer;

export default connect(mapStateToProps, taskActions)(Save);
