import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BlockChain from './BlockChain';
import Message from './Message';
import FileUpload from './FileUpload';
const IO = require('./IO');
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // current run states
      run_list: [],
      cur_run: -1,
      total_round: -1,
      total_player: -1,
      // Message component state
      message_cur_round: -1,
      message_data: undefined,
      message_collapsable_cur_round_open: false,
      message_collapsable_will_be_delay_open: false,
      message_collapsable_not_for_cur_open: false,
      vote_collapsable_cur_round_open: false,
      vote_collapsable_will_be_delay_open: false,
      vote_collapsable_not_for_cur_open: false,
      // blockchain componenet states
      blockchain_data: undefined,
      blockchain_cur_player_id: -1,
      blockchain_cur_round: -1
    };

    this.update_cur_run_index_handler = this.update_cur_run_index_handler.bind(this);
    this.message_set_round_handler = this.message_set_round_handler.bind(this);
    this.fetch_message_trace_update_state = this.fetch_message_trace_update_state.bind(this);
    this.message_collapsable_cur_round_open_handler = this.message_collapsable_cur_round_open_handler.bind(this);
    this.message_collapsable_will_be_delay_open_handler = this.message_collapsable_will_be_delay_open_handler.bind(this);
    this.message_collapsable_not_for_cur_open_handler = this.message_collapsable_not_for_cur_open_handler.bind(this);
    this.vote_collapsable_cur_round_open_handler = this.vote_collapsable_cur_round_open_handler.bind(this);
    this.vote_collapsable_will_be_delay_open_handler = this.vote_collapsable_will_be_delay_open_handler.bind(this);
    this.vote_collapsable_not_for_cur_open_handler = this.vote_collapsable_not_for_cur_open_handler.bind(this);
    this.blockchain_set_player_id_handler = this.blockchain_set_player_id_handler.bind(this);
    this.blockchain_set_round_handler = this.blockchain_set_round_handler.bind(this);
  }

  fetch_config_update_state(run_name) {
    fetch(IO.get_streamlet_config_request_str(run_name))
      .then(res => res.json())
      .then(
        data => {
          console.log(data.data);
          this.setState({
            total_round: data.data.round,
            total_player: data.data.num_total_player
          });
        }
      )
      .catch(err => {
        window.alert(err)
      })
  }

  fetch_config_update_state_using_index(run_index) {
    fetch(IO.get_streamlet_config_request_str(this.state.run_list[run_index]))
      .then(res => res.json())
      .then(
        data => {
          console.log(data.data);
          this.setState({
            total_round: data.data.round,
            total_player: data.data.num_total_player,
            cur_run: run_index
          });
        }
      )
      .catch(err => {
        window.alert(err)
      })
  }

  fetch_all_run_update_state() {
    fetch(IO.get_all_run_request_str())
      .then(res => res.json())
      .then(
        data => {
          console.log(data.data);
          if (data.data.length > 0) {
            this.setState({
              run_list: data.data,
              cur_run: 0
            });
            this.fetch_config_update_state(data.data[0]);
          }
        }
      )
      .catch(err => {
        window.alert(err)
      })
  }

  fetch_message_trace_update_state(round) {
    console.log(this.state);
    fetch(IO.get_message_request_str(this.state.run_list[this.state.cur_run], round))
      .then(res => res.json())
      .then(
        data => {
          console.log(data.data);
          this.setState({
            message_cur_round: round,
            message_data: data.data
          });
        }
      )
      .catch(err => {
        window.alert(err)
      })
  }

  fetch_player_state_update_state(run_name, player_id, round) {

    fetch(IO.get_state_request_str(run_name, round))
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            blockchain_cur_player_id: player_id,
            blockchain_cur_round: round,
            blockchain_data: data.data
          });
        }
      )
      .catch(err => {
        window.alert(err)
      })
  }

  blockchain_set_round_handler(round) {
    if (round !== this.state.cur_round && this.state.blockchain_cur_player_id != -1) {
      this.fetch_player_state_update_state(
        this.state.run_list[this.state.cur_run],
        this.state.blockchain_cur_player_id,
        round
      );
    }
    else if (round !== this.state.cur_round && this.state.blockchain_cur_player_id == -1) {
      this.fetch_player_state_update_state(
        this.state.run_list[this.state.cur_run],
        0,
        round
      );
    }
  }

  blockchain_set_player_id_handler(player_id) {
    if (player_id !== this.state.blockchain_cur_player_id && player_id != -1) {
      this.setState({ blockchain_cur_player_id: player_id });
    }
  }

  message_set_round_handler(round) {
    if (round !== this.state.cur_round) {
      this.fetch_message_trace_update_state(
        round
      );
    }
  }

  update_cur_run_index_handler(new_run_index) {
    if (new_run_index != this.state.cur_run) {
      this.fetch_config_update_state_using_index(this.state.run_list[new_run_index]);
    }
  }

  message_collapsable_cur_round_open_handler() {
    this.setState(
      { message_collapsable_cur_round_open: !this.state.message_collapsable_cur_round_open }
    );
  }

  message_collapsable_will_be_delay_open_handler() {
    this.setState(
      { message_collapsable_will_be_delay_open: !this.state.message_collapsable_will_be_delay_open }
    );
  }

  message_collapsable_not_for_cur_open_handler() {
    this.setState(
      { message_collapsable_not_for_cur_open: !this.state.message_collapsable_not_for_cur_open }
    );
  }

  vote_collapsable_cur_round_open_handler() {
    this.setState(
      { vote_collapsable_cur_round_open: !this.state.vote_collapsable_cur_round_open }
    );
  }

  vote_collapsable_will_be_delay_open_handler() {
    this.setState(
      { vote_collapsable_will_be_delay_open: !this.state.vote_collapsable_will_be_delay_open }
    );
  }

  vote_collapsable_not_for_cur_open_handler() {
    this.setState(
      { vote_collapsable_not_for_cur_open: !this.state.vote_collapsable_not_for_cur_open }
    );
  }

  componentDidMount() {
    this.fetch_all_run_update_state();
  }

  render() {
    return (
      <>
        {/* <Message
          cur_run={this.state.cur_run}
          run_list={this.state.run_list}
          total_round={this.state.total_round}
          message_cur_round={this.state.message_cur_round}
          message_data={this.state.message_data}
          message_collapsable_cur_round_open={this.state.message_collapsable_cur_round_open}
          message_collapsable_will_be_delay_open={this.state.message_collapsable_will_be_delay_open}
          message_collapsable_not_for_cur_open={this.state.message_collapsable_not_for_cur_open}
          vote_collapsable_cur_round_open={this.state.vote_collapsable_cur_round_open}
          vote_collapsable_will_be_delay_open={this.state.vote_collapsable_will_be_delay_open}
          vote_collapsable_not_for_cur_open={this.state.vote_collapsable_not_for_cur_open}
          fetch_message_trace_update_state={this.fetch_message_trace_update_state}
          message_set_round_handler={this.message_set_round_handler}
          message_collapsable_cur_round_open_handler={this.message_collapsable_cur_round_open_handler}
          message_collapsable_will_be_delay_open_handler={this.message_collapsable_will_be_delay_open_handler}
          message_collapsable_not_for_cur_open_handler={this.message_collapsable_not_for_cur_open_handler}
          vote_collapsable_cur_round_open_handler={this.vote_collapsable_cur_round_open_handler}
          vote_collapsable_will_be_delay_open_handler={this.vote_collapsable_will_be_delay_open_handler}
          vote_collapsable_not_for_cur_open_handler={this.vote_collapsable_not_for_cur_open_handler}
        /> */}


        <BlockChain
          run_list={this.state.run_list}
          cur_run={this.state.cur_run}
          total_round={this.state.total_round}
          total_player={this.state.total_player}
          blockchain_data={this.state.blockchain_data}
          blockchain_cur_player_id={this.state.blockchain_cur_player_id}
          blockchain_cur_round={this.state.blockchain_cur_round}
          blockchain_set_round_handler={this.blockchain_set_round_handler}
          blockchain_set_player_id_handler={this.blockchain_set_player_id_handler}
        />
      </>
    );
  }

}

export default App;
