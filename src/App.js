import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { Footer } from "./MyComponents/Footer";
import { TodoItem } from "./MyComponents/TodoItem";
import { AddTodo } from "./MyComponents/AddTodo";
import React, { useEffect, useState } from "react";
import { About } from "./MyComponents/About";

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  // Its not HTML, its JSE (JS Syntax Extension)
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    // DELETING THIS WAY IN REACT DOESN'T WORKK
    // console.log("I'm ondelete of todo :",todo);
    // let ind = todos.indexOf(todo);
    // todos.splice(ind,1);
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  };

  const addTodo = (title, desc) => {
    console.log("I'm adding todo", title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 1;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  };

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); //wheneva todo changes this method is called

  return (
    <>
      <Router>
        <Header title="My TodoList" />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <>
                  <AddTodo addTodo={addTodo} />
                  <Todos todos={todos} onDelete={onDelete} />
                </>
              );
            }}
          ></Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </>
  );
}

export default App;

// Dad(App)->todos,ondelete, Putra(Todos)->props k andar dono ko lelega, Daughter(TodoItem)->todo,ondelete

// {
//   sno:1,
//   title:"React Series",
//   desc:"Start Watching Youtube Video"
// },
// {
//   sno:2,
//   title:"AIML Lects",
//   desc:"Make sure to end it by this month end"
// },
// {
//   sno:3,
//   title:"Labs",
//   desc:"Check Moodle"
// },
// {
//   sno:4,
//   title:"Assignments",
//   desc:"Check Moodle"
// },
// {
//   sno:5,
//   title:"Coding",
//   desc:"Check Moodle"
// },
