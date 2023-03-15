import "./App.css";
import Header from "./components/Header";

import Stack from "react-bootstrap/Stack";
import TodoList from "./components/TodoList";
const App = () => {
  return (
    <div className="App">
      <div class="container min-vh-100">
        <div class="row h-100 justify-content-center align-items-center">
          <Header></Header>
          <TodoList></TodoList>
        </div>
      </div>
    </div>
  );
};

export default App;
