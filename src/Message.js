import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { CollapsableProposalMessage, CollapsableVoteMessage } from './MessageComponents';
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
                <Col>
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
                </Col>
            );
        } else {
            return (
                <Col></Col>
            );
        }
        
    }

    generate_proposal_message_component_array() {
        var cur_round_list = [];
        var will_be_delay_list = [];
        var not_for_cur_list = [];
        var cur_round = <br />;
        var will_be_delay = <br />;
        var not_for_cur = <br />;
        var list = this.props.message_data.proposal_task;
        for (var i = 0; i < list.length; i++) {
            if (list[i].message.round != this.props.message_cur_round) {
                not_for_cur_list.push(list[i]);
            }
            else if (list[i].delay != 0) {
                will_be_delay_list.push(list[i]);
            } else {
                cur_round_list.push(list[i]);
            }
        }

        if (cur_round_list.length > 0) {
            cur_round = <CollapsableProposalMessage
                button_key={0}
                collapse_key={1}
                text='Current Round Block Proposals'
                task_list={cur_round_list} 
                key={3}
                open={this.props.message_collapsable_cur_round_open}
                set_open_handler={this.props.message_collapsable_cur_round_open_handler} />;
        }

        if (will_be_delay_list.length > 0) {
            will_be_delay = <CollapsableProposalMessage
                button_key={4}
                collapse_key={5}
                text='Will be Delayed Proposals'
                task_list={will_be_delay_list} 
                key={6}
                open={this.props.message_collapsable_will_be_delay_open}
                set_open_handler={this.props.message_collapsable_will_be_delay_open_handler} />;
        }

        if (not_for_cur_list.length > 0) {
            not_for_cur = <CollapsableProposalMessage
                button_key={7}
                collapse_key={8}
                text='Not for Current Block Proposals'
                task_list={not_for_cur_list} 
                key={9}
                open={this.props.message_collapsable_not_for_cur_open}
                set_open_handler={this.props.message_collapsable_not_for_cur_open_handler} />;
        }

        return (
            
            <Col>
                {cur_round}
                {will_be_delay}
                {not_for_cur}
            </Col>
        );
    }

    generate_vote_message_component_array() {
        var cur_round_list = [];
        var will_be_delay_list = [];
        var not_for_cur_list = [];
        var cur_round = <></>;
        var will_be_delay = <></>;
        var not_for_cur = <></>;
        var list = this.props.message_data.vote_task;
        for (var i = 0; i < list.length; i++) {
            if (list[i].message.round != this.props.message_cur_round) {
                not_for_cur_list.push(list[i]);
            }
            else if (list[i].delay != 0) {
                will_be_delay_list.push(list[i]);
            } else {
                cur_round_list.push(list[i]);
            }
        }

        console.log(not_for_cur_list);
        console.log(will_be_delay_list);
        console.log(cur_round_list);

        if (cur_round_list.length > 0) {
            cur_round = <CollapsableVoteMessage
                button_key={10}
                collapse_key={11}
                text='Current Round Block Votes'
                task_list={cur_round_list}
                key={12}
                open={this.props.vote_collapsable_cur_round_open}
                set_open_handler={this.props.vote_collapsable_cur_round_open_handler} />;
        }

        if (will_be_delay_list.length > 0) {
            will_be_delay = <CollapsableVoteMessage
                button_key={13}
                collapse_key={14}
                text='Will be Delayed Votes'
                task_list={will_be_delay_list}
                key={15}
                open={this.props.vote_collapsable_will_be_delay_open}
                set_open_handler={this.props.vote_collapsable_will_be_delay_open_handler} />;
        }

        if (not_for_cur_list.length > 0) {
            not_for_cur = <CollapsableVoteMessage
                button_key={16}
                collapse_key={17}
                text='Not for Current Block Votes'
                task_list={not_for_cur_list}
                key={18}
                open={this.props.vote_collapsable_not_for_cur_open}
                set_open_handler={this.props.vote_collapsable_not_for_cur_open_handler} />;
        }

        return (
            <Col>
                {cur_round}
                {will_be_delay}
                {not_for_cur}
            </Col>
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
                                    {this.generate_block_proposal()}
                                    {this.generate_proposal_message_component_array()}
                                    {this.generate_vote_message_component_array()}
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
