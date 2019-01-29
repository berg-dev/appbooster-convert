import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import RatesScreen from '../RatesScreen/RatesScreen';
import ConvertScreen from '../ConvertScreen/ConvertScreen';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/convert" />} />
            <Route path="/convert" component={ConvertScreen} />
            <Route path="/rates" component={RatesScreen} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);
