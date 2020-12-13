import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { CollapsableProposalMessage, CollapsableVoteMessage, CollapsableEchoMessage } from './MessageComponents';
import { RoundNav } from './Navigation';
const IO = require('./IO');
/**
 * Props:
 * cur_run: int index of current run 
 * run_list: array<String> the list of run names
 * total_round: int total number of rounds for current run
 * message_cur_round: int the current round message is selecting
 * message_data: 
 * 
 * message_collapsable_cur_round_open: false
 * message_collapsable_will_be_delay_open: false,
    message_collapsable_not_for_cur_open: false,
    vote_collapsable_cur_round_open: false,
    vote_collapsable_will_be_delay_open: false,
    vote_collapsable_not_for_cur_open: false
 *  

 Handlers:

 * fetch_message_trace_update_state: function to fetch the message trace needed for
 * message_set_round_handler: handler to change round
 * 
 * message_collapsable_cur_round_open_handler
 * message_collapsable_will_be_delay_open_handler
 * message_collapsable_not_for_cur_open_handler
 * vote_collapsable_cur_round_open_handler
 * vote_collapsable_will_be_delay_open_handler
 * vote_collapsable_not_for_cur_open_handler
 */
class Message extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.message_cur_run !== "" && this.props.run_list.length > 0) {
            this.props.fetch_message_trace_update_state(this.props.cur_run, 0, 0);
        }
    }

    generate_block_proposal() {
        if (this.props.message_data.proposal != undefined) {
            return (
                    <Card border='info' style={{ width: '14rem' }}>
                        <Card.Header>Block Proposal</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Proposal Block: {this.props.message_data.proposal.round} Extends: {this.props.message_data.proposal.prev}
                            </Card.Text>
                            <Card.Text>
                                Proposer: {this.props.message_data.proposal.proposer_id}
                            </Card.Text>
                        </Card.Body>
                    </Card>
            );
        } else {
            return (
                <h4>No Proposal This Round</h4>
            );
        }
        
    }

    generate_input_message() {
        if (this.props.message_data.input_echo != undefined && this.props.message_data.input_echo.length > 0) {
            return (<CollapsableEchoMessage
            button_key={22}
            collapse_key={23}
            text='Input Echos from Receiver'
            task_list={this.props.message_data.input_echo} 
            key={24}
            open={this.props.input_echo_cur_open}
            set_open_handler={this.props.input_echo_open_handler} />);
        } else {
            return <></>;
        }
    }

    generate_echo_message() {
        if (this.props.message_data.message_echo != undefined && this.props.message_data.message_echo.length > 0) {
            return (<CollapsableEchoMessage
            button_key={25}
            collapse_key={26}
            text='Implicit Message Echos'
            task_list={this.props.message_data.message_echo} 
            key={27}
            open={this.props.message_echo_cur_open}
            set_open_handler={this.props.message_echo_cur_open_handler} />);
        } else {
            return <></>;
        }
    }

    generate_proposal_message_component_array() {
        var cur_round_list = [];
        var will_be_delay_list = [];
        var cur_round = <br />;
        var will_be_delay = <br />;
        var list = this.props.message_data.proposal_task;
        for (var i = 0; i < list.length; i++) {
            if (list[i].delay != 1) {
                will_be_delay_list.push(list[i]);
            } else {
                cur_round_list.push(list[i]);
            }
        }

        if (cur_round_list.length > 0) {
            cur_round = <CollapsableProposalMessage
                button_key={0}
                collapse_key={1}
                text='Proposals Not Delayed'
                task_list={cur_round_list} 
                key={3}
                open={this.props.message_collapsable_cur_round_open}
                set_open_handler={this.props.message_collapsable_cur_round_open_handler} />;
        }

        if (will_be_delay_list.length > 0) {
            will_be_delay = <CollapsableProposalMessage
                button_key={4}
                collapse_key={5}
                text='Proposals Will be Delayed'
                task_list={will_be_delay_list} 
                key={6}
                open={this.props.message_collapsable_will_be_delay_open}
                set_open_handler={this.props.message_collapsable_will_be_delay_open_handler} />;
        }

        return (
            
            <>
                {cur_round}
                <br />
                {will_be_delay}
            </>
        );
    }

    generate_vote_message_component_array() {
        var cur_round_list = [];
        var will_be_delay_list = [];
        var cur_round = <></>;
        var will_be_delay = <></>;
        var not_for_cur = <></>;
        var list = this.props.message_data.vote_task;
        for (var i = 0; i < list.length; i++) {
            if (list[i].delay != 1) {
                will_be_delay_list.push(list[i]);
            } else {
                cur_round_list.push(list[i]);
            }
        }

        if (cur_round_list.length > 0) {
            cur_round = <CollapsableVoteMessage
                button_key={10}
                collapse_key={11}
                text='Votes Not Delayed'
                task_list={cur_round_list}
                key={12}
                open={this.props.vote_collapsable_cur_round_open}
                set_open_handler={this.props.vote_collapsable_cur_round_open_handler} />;
        }

        if (will_be_delay_list.length > 0) {
            will_be_delay = <CollapsableVoteMessage
                button_key={13}
                collapse_key={14}
                text='Votes Will be Delayed'
                task_list={will_be_delay_list}
                key={15}
                open={this.props.vote_collapsable_will_be_delay_open}
                set_open_handler={this.props.vote_collapsable_will_be_delay_open_handler} />;
        }

        return (
            <>
                {cur_round}
                <br/>
                {will_be_delay}
            </>
        );
    }

    render() {
        var nav_bar, message_content;
        // create 
        if (this.props.total_round > -1) {
            nav_bar = <RoundNav 
                            total_round={this.props.total_round} 
                            set_round={this.props.message_set_round_handler} 
                      />;
        } else {
            nav_bar = <br />;
        }
        // message content
        if (this.total_round !== -1 && this.props.message_data != undefined) {
            message_content = <>
                                <Row>
                                    <Col>
                                    {this.generate_block_proposal()}
                                    <br />
                                    {this.generate_input_message()}
                                    <br />
                                    {this.generate_echo_message()}
                                    </Col>
                                    <Col>
                                    {this.generate_proposal_message_component_array()}
                                    </Col>
                                    <Col>
                                    {this.generate_vote_message_component_array()}
                                    </Col>
                                    
                                </Row>
                            </>;
        } else {
            message_content = <h1>No available data</h1>;
        }

        return (
            <Container>
                <br />
                {nav_bar}
                <br />
                {message_content}
            </Container>
        );

    }

}

export default Message;
