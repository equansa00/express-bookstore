import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={BookList} />
                <Route path="/add" component={AddBook} />
                <Route path="/edit/:id" component={EditBook} />
                {/* Add other routes as needed */}
            </Switch>
        </Router>
    );
};

export default App;