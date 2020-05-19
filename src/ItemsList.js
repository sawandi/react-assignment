import React, {Component} from "react";
import "./itemsList.css";
//import App from "./App";


class ItemsList extends Component{

    addTodoItem = (todoItem) => {

        return <li id={"list"} className={todoItem.done ? 'done' : 'hidden'} key={todoItem.key}>{todoItem.text}
            <button type="button" id="dlt" className="btn btn-outline-danger" aria-label={"Right Align"}
                    onClick={this.props.DeleteTodoItems.bind(null, todoItem)}>
                Delete
                <span className="mx-2 text-danger" aria-hidden="true">
                    <i className={"fas fa-trash"}/>
                </span>
            </button>

            <button type="button" id={"edit"} className="btn btn-outline-success" aria-label={"Right Align"}
                    onClick={this.props.manageUpdate.bind(this, todoItem.key, todoItem.text, todoItem.done)}>
                Edit
                <span className="mx-2 text-success" aria-hidden="true">
                    <i className={"fas fa-edit"}/>
                </span>
            </button>

            <button type="button" id={"complete"} className="btn btn-outline-primary" aria-label={"Right Align"}
                    onClick={this.props.completeTodoItem.bind(null, todoItem.key)}>
                Complete
                <span className="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
            </button>

            <br></br>
            <div className={"alert alert-success"} role={"alert"}>
                <strong>Added!!</strong> Todo Item Added Successfully!!
                <button type={"button"} className={"close"} data-dismiss = "alert" aria-label={"Close"}>
                    <span aria-hidden={"true"}>&times;</span>
                </button>
            </div>

            <br></br>
        </li>
    }

    render() {

        let todoItemAdded = this.props.addTodo;
        //let todoItemUpdated = this.props.UpdateTodoItems;
        let todoItemsList = todoItemAdded.map(this.addTodoItem);
        //let updateTodoItem = todoItemUpdated(this.updateTodoItem);
        return (
            <ul className={"list-group-item list-group-item-action"}>
                {
                    todoItemsList
                }
                {
                    //updateTodoItem
                }
            </ul>

        );

    }
}

export default ItemsList;