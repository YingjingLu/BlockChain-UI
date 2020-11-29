import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import useState from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { CollapsableProposalMessage, CollapsableVoteMessage } from './MessageComponents'
const IO = require('./IO');
/**
 * State attributes:
 * data: the message trace object
 * round: current round
 * player_id: the current selected player id
 * 
 */
class Message extends React.Component {

    constructor(props) {
        super(props);
    }

    fetch_data_and_update_state(run_name, player_id, round) {

        fetch(IO.get_message_request_str(run_name, round))
            .then(res => res.json())
            .then(
                data => {
                    console.log(data.data);
                    this.setState({
                        player_id: player_id,
                        cur_round: round,
                        data: data.data
                    });
                }
            )
            .catch(err => {
                window.alert(err)
            })
    }

    componentDidMount() {
        this.fetch_data_and_update_state('streamlet_n_3_f_1_r_6', 1, 1);
    }

    generate_block_proposal() {
        return (
            <Col>
                <Card bg='primary' style={{ width: '18rem' }}>
                    <Card.Header>Block Proposal</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Proposal Block: {this.state.data.proposal.round} Extends: {this.state.data.proposal.prev}
                        </Card.Text>
                        <Card.Text>
                            Proposer: {this.state.data.proposal.proposer_id}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        );
    }

    generate_proposal_message_component_array() {
        var cur_round_list = [];
        var will_be_delay_list = [];
        var not_for_cur_list = [];
        var cur_round = <br />;
        var will_be_delay = <br />;
        var not_for_cur = <br />;
        var list = this.state.data.proposal_task;
        for (var i = 0; i < list.length; i++) {
            if (list[i].message.round != this.state.cur_round) {
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
                text='Proposal Messages For Current Round Block'
                task_list={cur_round_list} key={3} />;
        }

        if (will_be_delay_list.length > 0) {
            will_be_delay = <CollapsableProposalMessage
                button_key={4}
                collapse_key={5}
                text='Will be Delayed Proposal Message'
                task_list={will_be_delay_list} key={6} />;
        }

        if (not_for_cur_list.length > 0) {
            not_for_cur = <CollapsableProposalMessage
                button_key={7}
                collapse_key={8}
                text='Not for Current Block Proposal Message'
                task_list={not_for_cur_list} key={9} />;
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
        var list = this.state.data.vote_task;
        for (var i = 0; i < list.length; i++) {
            if (list[i].message.round != this.state.cur_round) {
                not_for_cur_list.push(list[i]);
            }
            else if (list[i].delay != 0) {
                will_be_delay_list.push(list[i]);
            } else {
                cur_round_list.push(list[i]);
            }
        }

        if (cur_round_list.length > 0) {
            cur_round = <CollapsableVoteMessage
                button_key={6}
                collapse_key={7}
                text='Proposal Messages For Current Round Block'
                task_list={cur_round_list} />;
        }

        if (will_be_delay_list.length > 0) {
            will_be_delay = <CollapsableVoteMessage
                button_key={8}
                collapse_key={9}
                text='Will be Delayed Proposal Message'
                task_list={will_be_delay_list} />;
        }

        if (not_for_cur_list.length > 0) {
            not_for_cur = <CollapsableVoteMessage
                button_key={10}
                collapse_key={11}
                text='Not for Current Block Proposal Message'
                task_list={not_for_cur_list} />;
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
        if (this.state != undefined && this.state.data != undefined) {
            const layout = { name: 'dagre' };
            return (
                <>
                    <Container fluid>
                        <Row>
                            {this.generate_block_proposal()}
                            {this.generate_proposal_message_component_array()}
                            {this.generate_vote_message_component_array()}
                        </Row>
                    </Container>
                </>
            );
        }

        return (
            <h1>No available data</h1>
        );

    }

}

export default Message;
