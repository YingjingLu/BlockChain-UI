import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import FormControl from 'react-bootstrap/FormControl';

/**
 * Props attributes
 * run_list
 * cur_run
 * 
 * update_cur_run_handler
 */
class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
    }


    generate_options() {
        var list = []
        if (this.props.run_list != undefined) {
            for (var i = 0; i < this.props.run_list.length; i ++) {
            list.push(<option>{this.props.run_list[i]}</option>)
            }
        }
        return list;
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Visualizer</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/chain">Streamlet Chain</Nav.Link>
                <Nav.Link href="/msg">Streamlet Messages</Nav.Link>
                <Nav.Link href="/dolev_strong">Dolev Strong</Nav.Link>
                <Nav.Link href="/file">Upload</Nav.Link>
                </Nav>
                <Form inline>
                <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select" defaultValue={this.props.cur_run} onChange={e => this.props.update_cur_run_handler(e.target.value)} >
                    {this.generate_options().map((elem) => elem)}
                </Form.Control>
                </Form.Group>
                </Form>
            </Navbar>
        );
    }
}

export default NavigationBar;
