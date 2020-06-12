import React, { Component } from "react";
import { FormContainer } from "./components/FormContainer";
import Items from "./components/Items";
import Item from './components/Item';
import { ItemProvider } from "./components/ItemContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

class App extends Component {
    render() {
        return (
            <Router>
                <ItemProvider>
                    <div className='App'>
                        <Switch>
                            <Route exact path="/item/:id" component={Item} />
                            <Route path="/" render={() => <div>
                                <FormContainer />
                                <Items />
                            </div>} />
                        </Switch>
                    </div>{" "}
                </ItemProvider>
            </Router>
        );
    }
}
export default App;
