import logo from './logo.svg';
// import './App.css';
import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Navigation from './Navigation';
import BlockChain from './BlockChain';
import Message from './Message';
import FileUpload from './FileUpload'
class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cur_run_name: 'No Run Selected',
      cur_message_round: -1,
      cur_state_round : -1,
      cur_message_data: null,
      cur_state_data: null
    };
  }

  app_update_run_name(new_name) {
    this.setState({cur_run_name : new_name});
  }

  app_update_message(data, round) {
    this.setState(
      {
        cur_message_round: round,
        cur_message_data: data
      }
    );
  }

  app_update_player_state(data, round) {
    this.setState(
      {
        cur_state_round: round,
        cur_state_data: data
      }
    );
  }

  render() {
    return (
      <>
        <Message />
      </>
    );
  }

}

export default App;
