import logo from './logo.svg';
import './App.css';
import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Navigation from './Navigation';
import BlockChain from './BlockChain';
import Proposal from './Proposal';
import ProposalMessage from './ProposalMessage';
import VoteMessage from './VoteMessage';
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
      const elements = [
        { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
        { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
        { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
    ];

    return (
      <>
        <BlockChain />
        {/* <Container>
          <Row>
            <CytoscapeComponent elements={elements} style={ { width: '1080px', height: '1920px' } } />
          </Row>
        </Container> */}
      </>
    );
  }

}

export default App;
