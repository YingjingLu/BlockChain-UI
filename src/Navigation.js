import React from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

/**
 * Props:
 * total_round: int exclusive
 * set_round: take in round int as argument
 */
class RoundNav extends React.Component {

    constructor(props) {
        super(props);
    }

    generate_button_list() {
        var button_list = [];
        for (var i = -1; i < this.props.total_round; i ++) {
            var text, val;
            if (i == -1) {
                text = 'init';
            } else {
                text = i.toString();
            }
            
            val = i;
            button_list.push(
                <Button variant="secondary" value={val} onClick={e => this.props.set_round(e.target.value)} key={i.toString() + 'round_bar'} >{text}</Button>
            );
        }
        return button_list;
    }

    render() {

        return (
            <ButtonToolbar aria-label="Toolbar with button groups">
                <ButtonGroup className="mr-2" aria-label="First group">
                <Button variant="secondary" >Rounds: </Button>
                    {this.generate_button_list().map((elem) => elem)}
                </ButtonGroup>
            </ButtonToolbar>
        );
    }
}

/**
 * Props:
 * total_player: int exclusive
 * set_player: take in round int as argument
 */
class PlayerNav extends React.Component {

    constructor(props) {
        super(props);
    }

    generate_button_list() {
        var button_list = [];
        for (var i = 0; i < this.props.total_player; i ++) {
            var text = i.toString();
            button_list.push(
                <Button variant="secondary" value={i} onClick={e => this.props.set_player(e.target.value)} >{text}</Button>
            );
        }
        return button_list;
    }

    render() {

        return (
            <>
            {/* <h4>Players: </h4> */}
            <ButtonToolbar aria-label="Toolbar with button groups">
                <ButtonGroup className="mr-2" aria-label="First group">
                    <Button variant="secondary" >Players: </Button>
                    {this.generate_button_list().map((elem) => elem)}
                </ButtonGroup>
            </ButtonToolbar>
            </>
        );
    }
}

export { RoundNav, PlayerNav };
