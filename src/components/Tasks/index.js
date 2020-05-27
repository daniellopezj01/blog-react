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
    const { tasks , changeCheck} = this.props;
    const forUser = { ...tasks[usId] };
    return Object.keys(forUser).map((taskId) => (
      <div key={taskId}>
        <input type="checkbox" defaultChecked={forUser[taskId].completed} 
        onChange={()=> changeCheck(usId, taskId)}
        />
       
        {forUser[taskId].title}
        <button className="m_left button-edit">
        <Link to={`/tareas/guardar/${usId}/${taskId}`}>Edit </Link>
        </button>
        <button className="m_left button-delete">delete</button>
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
