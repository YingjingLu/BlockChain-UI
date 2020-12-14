import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/Jumbotron';
class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <br />
                <Row>
                    <Col>
                        <h1>Visualizer Tutorial</h1>
                    </Col>  
                    
                </Row>
                <Row>
                    <Col>
                        <Jumbotron>
                            <h3>Streamlet Chain Page</h3>
                            <p>
                                Display the current Streamlet Protocol Case's chain of players in the selected round
                            </p>
                        </Jumbotron>
                    </Col>
                    <Col>
                        <Jumbotron>
                            <h3>Dolev Strong Page</h3>
                            <p>
                                Display the current Dolev Strong Protocol Case's states in the selected round
                            </p>
                        </Jumbotron>
                    </Col>
                    <Col>
                        <Jumbotron>
                            <h3>Message Page</h3>
                            <p>
                                Display current Protocol Case's messages in a given round
                            </p>
                        </Jumbotron>
                    </Col>
                    
                </Row>

                <Row>
                    <Col>
                        <Jumbotron>
                            <h3>Upload Page</h3>
                            <p>
                                Upload Streamlet case for visualization and backend simulation
                            </p>
                        </Jumbotron>
                    </Col>
                    <Col>
                        <Jumbotron>
                            <h3>Switch Between Cases</h3>
                            <p>
                                Choose the case you want to visualize 
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
            
        );
    }
}

export default Home;
