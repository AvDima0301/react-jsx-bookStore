
import './App.css';
import GetBooks from './components/get-books/get-books';
import AddBook from './components/add-book/add-book';
import EditBook from './components/edit-book/edit-book';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";
import GetAuthors from './components/get-author/get-author';
import AddAuthor from './components/add-author/add-author';
import EditAuthor from './components/edit-author/edit-author';

function App() {
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route exact path="/get-book">
            <GetBooks />
          </Route>
          <Route exact path="/add-book">
            <AddBook />
          </Route>
          <Route exact path="/edit-book/:id" component={EditBook} />
          <Route exact path="/get-author">
            <GetAuthors />
          </Route>
          <Route exact path="/add-author">
            <AddAuthor />
          </Route>
          <Route exact path="/edit-author/:id" component={EditAuthor} />
          <Route path="*" children={() => <h1>404 Not Found</h1>} />

        </Switch>
        <Route exact path="/">
          <Redirect to="/get-book" />
        </Route> 

      </Router>
    </div>
  );
}

export default App;
