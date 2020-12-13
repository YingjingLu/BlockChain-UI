import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

class InputMessageCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var task = this.props.task;
        var index = this.props.index;
        var border;
        if (task.delay == 1) {
            border = 'success';
        } else {
            border = 'danger';
        }

        return (
            <Card border={border} style={{ width: '14rem' }} key={index + 'Input'} className="mb-2" >
                <Card.Header>Input Message</Card.Header>
                <Card.Body>
                    <Card.Text>
                        To Player: {task.message.to_player_id}
                    </Card.Text>
                    <Card.Text key='13'>
                        Transactions: {task.message.message.join()}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

class ProposalMessageCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var task = this.props.task;
        var index = this.props.index;
        var border;
        if (task.delay == 1) {
            border = 'success';
        } else {
            border = 'danger';
        }
        return (
            <Card border={border} style={{ width: '14rem' }} key={index + 'proposal'} className="mb-2" >
                <Card.Header>Proposal Message</Card.Header>
                <Card.Body>
                    <Card.Text key='11'>
                        Block ID: {task.message.round}
                    </Card.Text>
                    <Card.Text key='12'>
                        From Player: {task.message.from_player_id}
                    </Card.Text>
                    <Card.Text>
                        To Player: {task.message.to_player_id}
                    </Card.Text>
                    <Card.Text key='13'>
                        Delay: {task.delay}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

class VoteMessageCard extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;
        var task = props.task;
        var border;
        var decision;
        if (task.delay == 1) {
            border = 'success';
        } else {
            border = 'danger';
        }
        decision = <Card.Text>Vote: APPROVED</Card.Text>;
        return (
            <Card border={border} style={{ width: '14rem' }} key={this.props.index + 'vote'} className="mb-2" >
                <Card.Header>Vote Message</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Block ID: {task.message.round}
                    </Card.Text>
                    {decision}
                    <Card.Text>
                        From Player: {task.message.from_player_id}
                    </Card.Text>
                    <Card.Text>
                        To Player: {task.message.to_player_id}
                    </Card.Text>
                    <Card.Text>
                        Delay: {task.delay}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

/**
 * Props
 * 
 * collapse_key
 * button_key
 * task_list
 * open
 * 
 * set_open_handler
 * 
 */
class CollapsableProposalMessage extends React.Component {

    constructor(props) {
        super(props);
    }

    return_component() {
        return this.props.task_list.map((task, index) => <ProposalMessageCard task={task} index={index} />);
    }

    return_button() {
        return (
        <Button
            onClick={this.props.set_open_handler}
            aria-controls="example-collapse-text"
            aria-expanded={this.props.open}
            key={this.props.button_key}
            variant="secondary"
        >
            {this.props.text}
        </Button>);
    }

    render() {
        return (
            <>
                {this.return_button()}
                <Collapse in={this.props.open} key={this.props.collapse_key}>
                    <div>
                    {this.return_component()}
                    </div>
                </Collapse>
            </>
        );
    }
    
};

class CollapsableVoteMessage extends CollapsableProposalMessage {
    constructor(props) {
        super(props);
    }

    return_component() {
        return this.props.task_list.map((task, index) => <VoteMessageCard task={task} index={index} />);
    }
}

class CollapsableEchoMessage extends CollapsableProposalMessage {
    constructor(props) {
        super(props);
    }

    return_component() {
        var comp_array = [];
        for (var i = 0; i < this.props.task_list.length; i++) {
            var task = this.props.task_list[i];
            if (task.round == -2) {
                comp_array.push(<InputMessageCard task={task} index={index} />);
            } else if (task.is_vote == true) {
                comp_array.push(<VoteMessageCard task={task} index={index} />);
            } else {
                comp_array.push(<ProposalMessageCard task={task} index={index} />);
            }
        }
        return comp_array.map((e) => e);
    }
}

export { CollapsableProposalMessage, CollapsableVoteMessage, CollapsableEchoMessage };
