import React, {Component} from 'react';
import ItemsList from "./ItemsList";
//import todoItems from "./todoItems";


class App extends Component {

    constructor(props) {
        super(props);

        //way of initialize state variable in class component.
        this.state = {
            update: false,
            id: null,
            key:null,
            done:false,
            text: "",
            addingTodoItem: [],
            newTodoItem: {},
            todoItems: []
        };

        this.addTodoItemToList = this.addTodoItemToList.bind(this);
    }

    //for add items to the list
    addTodoItemToList =() => {
        if(this._inputElement.value !== "") {

            let newlyAddedTodoItem = {
                text: this._inputElement.value,
                key: Date.now(),
                done: false
            };

            this.setState(() => {
                return {
                  //todoItems: previousTodoItem.todoItems.concat(newlyAddedTodoItem)
                    todoItems: [newlyAddedTodoItem,...this.state.todoItems]
                };
            });

            this._inputElement.value = "";

        }else{
            return <div className={"alert alert-danger"} role={"alert"}>
                        <strong>Warning!!</strong> This field is mandatory??
                        <button type={"button"} className={"close"} data-dismiss = "alert" aria-label={"Close"}>
                            <span aria-hidden={"true"}>&times;</span>
                        </button>
            </div>
        }

        //console.log(this.state.todoItems);


        //e.preventDefault();
    }

    //for delete items from todo list
    DeleteTodoItems = (keyOfDeletedTodoItem) => {
        let newTodoItem = this.state.todoItems.filter((todoItem) => {
            return todoItem !== keyOfDeletedTodoItem
        });

        this.setState({
            todoItems: newTodoItem
        });

       // alert('Todo Item deleted successfully!!')
        return (<div className={"alert alert-danger"} role={"alert"}>
            <strong>Delete!!</strong> Todo Item deleted successfully!!
            <button type={"button"} className={"close"} data-dismiss = "alert" aria-label={"Close"}>
                <span aria-hidden={"true"}>&times;</span>
            </button>
        </div>);

    }

    //for update item from todo list
    manageUpdate = (event, text, status) => {
        this.setState({
            update : true,
            key: event,
            text: text,
            done: status

        });
        //console.log(event);
        //console.log(key);
        //console.log(text);
    }

    UpdateTodoItems = (event) => {
        //event.preventDefault();

        this.setState({
            todoItems : this.state.todoItems.map(todoItem => {
                if(todoItem.key === this.state.key){
                    todoItem['text'] = event.target.updatedTodoItem.value;
                    //todoItem['done'] = false;
                    return todoItem;
                    //return <li key={todoItem.key}>{todoItem}</li>
                    //console.log(todoItem.key)
                    //console.log(this.state.key)
                    //console.log(event)
                }
                //console.log(todoItem.key)
                //console.log(this.state.key)
                //console.log(event)
                return todoItem;
                //return <li key={todoItem.key}>{todoItem}</li>
            })
        });

        this.setState({
            update: false
        });
    }

    renderUpdateForm = () => {
        if(this.state.update && this.state.done === false){
            return <form className={"md-5"} onSubmit={this.UpdateTodoItems.bind(this)} >
                        <input type={"text"} className={"form-control"} name="updatedTodoItem" defaultValue={this.state.text} /><br></br>
                        <button className={"btn btn-outline-success"} /*onClick={this.UpdateTodoItems.bind(this)}*/>Update</button>
            </form>
        } /*else {
            alert('You cannot update completed todo items!!')
        }*/
        /*else {
            return <div className={"alert alert-warning"} role={"alert"}>
                        <strong>Warning!!</strong> You can't update completed todo items!!
                        <button type={"button"} className={"close"} data-dismiss = "alert" aria-label={"Close"}>
                            <span aria-hidden={"true"}>&times;</span>
                        </button>
                </div>
        }*/
    }

    //for show completed todo items.
    completeTodoItem = (event) => {
        let itemId = event;

        this.setState({
            todoItems : this.state.todoItems.map(doneItem => {
                /*if(doneItem.key === itemId){
                    doneItem['done'] = true;
                    return doneItem;
                }*/
                if(doneItem.key === itemId){
                    if(doneItem['done'] === true){
                        doneItem['done'] = false;
                        return doneItem;
                    }else {
                        doneItem['done'] = true;
                        this.moveToBottomDoneItem(doneItem.key);
                    }
                    //return doneItem;

                }
                return doneItem;
            })
                
        });

       /* this.setState({
            todoItems : [...this.state.todoItems,this.state.done]
        })*/


        //console.log(event);
        //console.log(itemId);

    }

    //completed items move to bottom of the list.
    moveToBottomDoneItem = (keyOfCompletedItem) => {

        //console.log(keyOfCompletedItem);

        let nonCompletedTodoItems = this.state.todoItems.filter(text => text.key !== keyOfCompletedItem);
        let completedTodoItem = this.state.todoItems.find(text => text.key === keyOfCompletedItem);

        //console.log(nonCompletedTodoItems);
        //console.log(completedTodoItem);

        this.setState(() => {
            //console.log(nonCompletedTodoItems)
            //console.log(completedTodoItem)
            return {

                todoItems : [...nonCompletedTodoItems,completedTodoItem]

            };
        });
    }

  /* btnOnClick = () => {
       this.setState({
           addingItem : [
               ...this.state.addingItem, //for concatinate the new adding item to existing items of list.
               ...[this.state.newItem]
                ]
            }, () =>{
           console.log(this.state.addingItem);
       })
   }*/

    inputItemOnChange = (event) => {
        this.setState( {
            newTodoItem: {
                [event.target.name]: event.target.value
            }
        })
    };

    render() {
        return (
           <div className={"container"}>
               <div className={"row"}>
                   <div className={"col-md-12"}>
                       <div className={"text-center"}>
                           <h1> TODO APP </h1> <br></br>
                           <p>ToDoList is general-purpose, Windows-based software, which can be used for simple
                               “honey do” home lists or to manage complex multi-user projects for business.
                               In addition to tracking the status of tasks, ToDoList includes a powerful system
                               for logging and reporting time spent on tasks. </p>

                       </div>

                       <br></br><br></br>

                       {this.renderUpdateForm()}

                       <br></br>
                       <form className={"md-5"} name={"addItemForm"} >
                           <div className={"text-left"}>
                               <div className={"form-group"}>
                                   <div className={"input-group"}>
                                       <div className={"input-group-prepend"}>
                                           <div className={"input-group-text bg-primary text-white"}>
                                               <i className={"fas fa-book"}/>
                                           </div>
                                       </div>

                                       <input type = "text" className={"form-control"} name = {"item"} placeholder={"Add item"}
                                              onChange={(event) => this.inputItemOnChange(event)}
                                              ref={(a) => this._inputElement=a} required/>
                                   </div>
                               </div>

                               <div className={"form-group form-check"}>
                                   <input type = "checkbox" className={"form-check-input"} id = {"check"} required/>
                                   <label className={"form-check-label"} id={"check"}> Are you sure?</label>
                               </div>

                               <button type={"button"} className={"btn btn-primary btn-lg btn-block"}
                                       onClick={(event) => this.addTodoItemToList() /*this.manageAddItem()*/}>SUBMIT
                               </button>
                           </div>
                       </form>

                       <br></br><br></br>

                       <label className={"form-text-label"} id={"text"}><b>Todo Items List</b></label>

                       <div className={"text-left"}>
                           {
                               //this.props.adds = {this.state.items}
                               <ItemsList
                                   DeleteTodoItems = {this.DeleteTodoItems.bind(this)}
                                   manageUpdate = {this.manageUpdate.bind(this.state.todoItems)}
                                   completeTodoItem = {this.completeTodoItem.bind(this)}
                                   addTodo = {this.state.todoItems}
                               />
                               //return <div className={"alert alert-success"} role={"alert"}>
                               //Todo Item Added successfully!!</div>
                           }
                           <br></br><br></br>
                       </div>

                   </div>
               </div>
           </div>
        )
    }

}

export default App;
