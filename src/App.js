import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import NavigationBar from './NavigationBar';
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
      cur_run: "",
      total_round: -1,
      total_player: -1,
      // Message component state
      message_cur_round: -1,
      message_data: undefined,
      message_collapsable_cur_round_open: false,
      message_collapsable_will_be_delay_open: false,
      input_echo_cur_open: false,
      vote_collapsable_cur_round_open: false,
      vote_collapsable_will_be_delay_open: false,
      message_echo_cur_open: false,
      // blockchain componenet states
      blockchain_data: undefined,
      blockchain_cur_player_id: -1,
      blockchain_cur_round: -1,
      block_chain_display_all_players: true,
      // File upload states
      upload_file: undefined,
      upload_file_name: 'No zip file chosen',
      exec_file: undefined,
      exec_file_name: 'Config zip file here'
    };

    this.update_cur_run_handler = this.update_cur_run_handler.bind(this);
    this.message_set_round_handler = this.message_set_round_handler.bind(this);
    this.fetch_player_state_update_state = this.fetch_player_state_update_state.bind(this);
    this.fetch_message_trace_update_state = this.fetch_message_trace_update_state.bind(this);
    this.message_collapsable_cur_round_open_handler = this.message_collapsable_cur_round_open_handler.bind(this);
    this.message_collapsable_will_be_delay_open_handler = this.message_collapsable_will_be_delay_open_handler.bind(this);
    this.input_echo_open_handler = this.input_echo_open_handler.bind(this);
    this.vote_collapsable_cur_round_open_handler = this.vote_collapsable_cur_round_open_handler.bind(this);
    this.vote_collapsable_will_be_delay_open_handler = this.vote_collapsable_will_be_delay_open_handler.bind(this);
    this.message_echo_cur_open_handler = this.message_echo_cur_open_handler.bind(this);
    this.blockchain_set_player_id_handler = this.blockchain_set_player_id_handler.bind(this);
    this.blockchain_set_round_handler = this.blockchain_set_round_handler.bind(this);
    this.set_upload_file_handler = this.set_upload_file_handler.bind(this);
    this.fetch_all_run_update_state = this.fetch_all_run_update_state.bind(this);
    this.blockchain_set_display_all_player_handler = this.blockchain_set_display_all_player_handler.bind(this);
    this.set_exec_file_handler = this.set_exec_file_handler.bind(this);
  }

  fetch_config_update_state(run_name) {
    fetch(IO.get_streamlet_config_request_str(run_name))
      .then(res => res.json())
      .then(
        data => {
          console.log(data.data);
          this.setState({
            total_round: data.data.round,
            total_player: data.data.num_total_player,
            cur_run: run_name
          });
          this.fetch_message_trace_update_state(0);
          this.fetch_player_state_update_state(this.state.cur_run, 0, -1);
        }
      )
      .catch(err => {
        console.log(err);
        console.log(err.response);
        window.alert(err.response.data.message);
      })
  }

  fetch_all_run_update_state() {
    var new_cur_run = this.state.cur_run;
    fetch(IO.get_all_run_request_str())
      .then(res => res.json())
      .then(
        data => {
          console.log(data.data);
          if (new_cur_run == "") {
            new_cur_run = data.data[0];
          }
          if (data.data.length > 0) {
            this.setState({
              run_list: data.data,
              cur_run: new_cur_run
            });
            if (this.state.total_round == -1) {
              this.fetch_config_update_state(data.data[0]);
            }
          }
        }
      )
      .catch(err => {
        window.alert(err.response.data.message);
      })
  }

  fetch_message_trace_update_state(round) {
    console.log(this.state);
    fetch(IO.get_message_request_str(this.state.cur_run, round))
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
        window.alert(err.response.data.message);
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
        window.alert(err.response.data.message);
      })
  }

  blockchain_set_round_handler(round) {
    if (round !== this.state.cur_round && this.state.blockchain_cur_player_id != -1) {
      this.fetch_player_state_update_state(
        this.state.cur_run,
        this.state.blockchain_cur_player_id,
        round
      );
    }
    else if (round !== this.state.cur_round && this.state.blockchain_cur_player_id == -1) {
      this.fetch_player_state_update_state(
        this.state.cur_run,
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

  blockchain_set_display_all_player_handler() {
    this.setState({ block_chain_display_all_players: !this.state.block_chain_display_all_players });
  }

  message_set_round_handler(round) {
    if (round !== this.state.cur_round) {
      this.fetch_message_trace_update_state(
        round
      );
    }
  }

  update_cur_run_handler(run_name) {
    if (run_name != this.state.cur_run) {
      this.fetch_config_update_state(run_name);
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

  input_echo_open_handler() {
    this.setState(
      { input_echo_cur_open: !this.state.input_echo_cur_open }
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

  message_echo_cur_open_handler() {
    this.setState(
      { message_echo_cur_open: !this.state.message_echo_cur_open }
    );
  }
  set_upload_file_handler(file, file_name) {
    this.setState({
      upload_file: file,
      upload_file_name: file_name
    });
  }

  set_exec_file_handler(file, file_name) {
    this.setState({
      exec_file: file,
      exec_file_name: file_name
    });
  }

  componentDidMount() {
    this.fetch_all_run_update_state();
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <NavigationBar 
            run_list={this.state.run_list}
            cur_run={this.state.cur_run}
            update_cur_run_handler={this.update_cur_run_handler}
          /> 
          <Switch>
            <Route path="/" exact strict children={<Home />} />
            <Route path="/file" children={
              <FileUpload 
                set_upload_file_handler={this.set_upload_file_handler}
                upload_file={this.state.upload_file}
                upload_file_name={this.state.upload_file_name}
                exec_file={this.state.exec_file}
                exec_file_name={this.state.exec_file_name}
                fetch_all_run_update_state={this.fetch_all_run_update_state}
                set_exec_file_handler={this.set_exec_file_handler}
              />} 
            />
            <Route path="/chain" children={
                <BlockChain
                run_list={this.state.run_list}
                cur_run={this.state.cur_run}
                total_round={this.state.total_round}
                total_player={this.state.total_player}
                blockchain_data={this.state.blockchain_data}
                blockchain_cur_player_id={this.state.blockchain_cur_player_id}
                blockchain_cur_round={this.state.blockchain_cur_round}
                block_chain_display_all_players={this.state.block_chain_display_all_players}
                blockchain_set_round_handler={this.blockchain_set_round_handler}
                blockchain_set_player_id_handler={this.blockchain_set_player_id_handler}
                fetch_player_state_update_state={this.fetch_player_state_update_state}
                blockchain_set_display_all_player_handler={this.blockchain_set_display_all_player_handler}
              />
            } />
            <Route path="/msg" children={
              <Message
                cur_run={this.state.cur_run}
                run_list={this.state.run_list}
                total_round={this.state.total_round}
                message_cur_round={this.state.message_cur_round}
                message_data={this.state.message_data}
                message_collapsable_cur_round_open={this.state.message_collapsable_cur_round_open}
                message_collapsable_will_be_delay_open={this.state.message_collapsable_will_be_delay_open}
                input_echo_cur_open={this.state.input_echo_cur_open}
                vote_collapsable_cur_round_open={this.state.vote_collapsable_cur_round_open}
                vote_collapsable_will_be_delay_open={this.state.vote_collapsable_will_be_delay_open}
                message_echo_cur_open={this.state.message_echo_cur_open}
                fetch_message_trace_update_state={this.fetch_message_trace_update_state}
                message_set_round_handler={this.message_set_round_handler}
                message_collapsable_cur_round_open_handler={this.message_collapsable_cur_round_open_handler}
                message_collapsable_will_be_delay_open_handler={this.message_collapsable_will_be_delay_open_handler}
                input_echo_open_handler={this.input_echo_open_handler}
                vote_collapsable_cur_round_open_handler={this.vote_collapsable_cur_round_open_handler}
                vote_collapsable_will_be_delay_open_handler={this.vote_collapsable_will_be_delay_open_handler}
                message_echo_cur_open_handler={this.message_echo_cur_open_handler}
              />
            } />
          </Switch>
        </BrowserRouter>
      </>
    );
  }

}

export default App;
