import React, { Component } from "react";
import { FormContainer } from "./components/FormContainer";
import Items from "./components/Items";
import Item from './components/Item';
import Nav from './components/navbar';

import { ItemProvider } from "./components/ItemContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

class App extends Component {
    render() {
        return (
            <Router>
                <ItemProvider>
                    <div className='App'>
                        <Nav />
                        <Switch>
                            <Route exact path="/item/:id" component={Item} />
                            <Route path="/" render={() => <React.Fragment>
                                <FormContainer />
                                <Items />
                            </React.Fragment>} />
                        </Switch>
                    </div>{" "}
                </ItemProvider>
            </Router>
        );
    }
}
export default App;
