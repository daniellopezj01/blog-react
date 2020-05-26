import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../generals/Spinner";
import Fatal from "../generals/Fatal";
import {Link} from "react-router-dom";
import * as taskActions from "../../actions/TaskActions";
class Task extends Component {
  componentDidMount() {
    console.log(this.props)
    if(!Object.keys(this.props.tasks).length){
      this.props.bringAllTasks();
    }
  }

  putTasks = (usId) => {
    const { tasks } = this.props;
    const forUser = { ...tasks[usId] };
    return Object.keys(forUser).map((taskId) => (
      <div key={taskId}>
        <input type="checkbox" defaultChecked={forUser[taskId].completed} />
        {forUser[taskId].title}
      </div>
    ));
  };
  showData = () => {
    const { tasks, loading, error } = this.props;
    if (loading) {
      return <Spinner></Spinner>;
    }
    if (error) {
      return <Fatal message={error}></Fatal>;
    }
    return Object.keys(tasks).map((usId) => (
      <div key={usId}>
        <h2> Usuario {usId}</h2>
        <div className="contenedor_tareas">{this.putTasks(usId)}</div>
      </div>
    ));
  };

  render() {
    return <div>
      <button><Link to='/tareas/guardar'>add </Link> </button>
      {this.showData()}</div>;
  }
}

const mapStateToProps = ({ taskReducer }) => taskReducer;

export default connect(mapStateToProps, taskActions)(Task);
