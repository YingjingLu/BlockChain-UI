import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

class ProposalMessageCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var task = this.props.task;
        var index = this.props.index
        return (
            <Card style={{ width: '18rem' }} key={index + 'proposal'} className="mb-2" >
                <Card.Header>Proposal Message</Card.Header>
                <Card.Body>
                    <Card.Text key='11'>
                        Block ID: {task.message.round}
                    </Card.Text>
                    <Card.Text key='12'>
                        From Player: {task.message.from_player}
                    </Card.Text>
                    <Card.Text>
                        To Player: {task.message.to_player}
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
        if (task.message.approved == "1") {
            decision = <Card.Text>Vote: APPROVED</Card.Text>;
            border = 'success';
        } else {
            decision = <Card.Text>Vote: DENIED</Card.Text>;
            border = 'danger';
        }

        return (
            <Card border={border} style={{ width: '18rem' }} key={props.index + 'vote'} className="mb-2" >
                <Card.Header>Proposal Message</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Block ID: {task.message.round}
                    </Card.Text>
                    {decision}
                    <Card.Text>
                        From Player: {task.message.from_player}
                    </Card.Text>
                    <Card.Text>
                        To Player: {task.message.to_player}
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

export { CollapsableProposalMessage, CollapsableVoteMessage };
