import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import CytoscapeComponent from './CyComponents/component';
import { RoundNav, PlayerNav } from './Navigation';
import cytoscape from 'cytoscape';
import avsdf from 'cytoscape-avsdf';
cytoscape.use( avsdf );

/**
 * Props attributes:
 * 
 * run_list: array<String> the array of all runs
 * total_round: int number of rounds for current run
 * total_player: int number of players for current run
 * blockchain_data
 * blockchain_cur_player_id
 * blockchain_cur_round
 * 
 * 
 * blockchain_set_round_handler
 * blockchain_set_player_id_handler
 * 
 */

class DolevStrong extends React.Component {

    constructor(props) {
        super(props);
        this.round_updater = this.round_updater.bind(this);
    }

    round_updater(round) {
        this.props.blockchain_set_round_handler(round);
        this.forceUpdate();
    }

    getElements() {
        var node_list = [];
        var edge_list = [];
        for (var i = 0; i < this.props.blockchain_data.length; i ++) {
            var player = this.props.blockchain_data[i];
            var bg_color = '#b3b3b3';
            if (player.extracted_set.length == 1) {
                if (player.extracted_set[0] == '0') {
                    bg_color = '#bc7dff'
                } else {
                    bg_color = '#22bae0';
                }
            }
            node_list.push(
                {
                    data: {
                        id: player.player_id.toString(),
                        label: player.player_id.toString(),
                        background_coloring: bg_color
                    }
                }
            );
        }
        var res = {
            nodes: node_list,
            edges: edge_list
        }
        return res;
    }

    generate_component(elements, key) {
        return(
        <Col>
            <CytoscapeComponent key={key} elements={CytoscapeComponent.normalizeElements(elements)} stylesheet={[
                    {
                        selector: 'node',
                        style: {
                        'label': 'data(label)',
                        'text-valign': 'center',
                        'color': '#000000',
                        'background-color': 'data(background_coloring)'
                        }
                    },
                    {
                        selector: 'edge',
                        style: {
                        'width': 2,
                        'line-color': '#b3b3b3',
                        'opacity': 0.8
                        }
                    }
                    ]} style={ { width: '500', height: '800px'} }  layout={{ name: 'avsdf' }} />
        </Col>
        );
    }

    render_illustrations() {
        return (
            <>
                <style type="text/css">
                    {`
                    .badge-flat {
                    background-color: #bc7dff;
                    color: white;
                    }
                    `}
                </style>
                <Badge pill variant="info">
                    BIT_1
                </Badge>
                <Badge pill variant="flat">
                    BIT_0
                </Badge>
                <Badge pill variant="secondary">
                    FLOOR
                </Badge>

            </>
        );
    }
    
    componentDidMount() {
        if (this.props.cur_run !== "" && this.props.run_list.length > 0) {
            this.props.fetch_player_state_update_state(this.props.cur_run, 0, 0);
        }
    }

    render() {
        if (this.props.cur_protocol == undefined || this.props.cur_protocol != 'dolev_strong') {
            return <Container><h2>Current Case is Not Dolev Strong, Please Select a Dolev Strong Case</h2></Container>;
        }
        var round_nav_bar, blockchain_vis;

        // round navigation
        if (this.props.total_round > -1) {
            round_nav_bar = <RoundNav 
                                total_round={this.props.total_round}
                                set_round={this.round_updater}
                            />;
        } else {
            round_nav_bar = <br />;
        }

        if (this.props.blockchain_cur_player_id != -1 && this.props.blockchain_data != undefined) {
            blockchain_vis = this.generate_component(this.getElements(), 0);
        } else {
            blockchain_vis = <>
            <CytoscapeComponent elements={[]} stylesheet={[
                    {
                      selector: 'node',
                      style: {
                        'label': 'data(label)',
                        'text-valign': 'center',
                        'color': '#000000',
                        'background-color': '#3a7ecf'
                      }
                    },
                    {
                      selector: 'edge',
                      style: {
                        'width': 2,
                        'line-color': '#3a7ecf',
                        'opacity': 0.5
                      }
                    }
                  ]} style={ { width: '1000px', height: '800px'} }  layout={{ name: 'avsdf' }} />
        </>;
        }
        

        return (
            <>
                <Container fluid>
                    <br/>
                    <Row>
                    {round_nav_bar}
                    </Row>
                    <Row>
                    {blockchain_vis}
                    </Row>
                    <Row>
                        <Col>
                        {this.render_illustrations()}
                        </Col>
                    </Row>
                    
                </Container>
                
            </>
        )
    }
}

export default DolevStrong;