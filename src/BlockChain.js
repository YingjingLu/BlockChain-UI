import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import CytoscapeComponent from './CyComponents/component';
import { RoundNav, PlayerNav } from './Navigation';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
cytoscape.use( dagre );

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

class BlockChain extends React.Component {

    constructor(props) {
        super(props);
        this.round_updater = this.round_updater.bind(this);
    }

    round_updater(round) {
        this.props.blockchain_set_round_handler(round);
        this.forceUpdate();
    }

    generate_player_elements(player) {
        var node_list = [];
        var edge_list = [];
        if (player !== undefined && player !== null) {
            // find nodes
            var level_list = player.chains;
            for (var i = 0; i < level_list.length; i ++) {
                for (var j = 0; j < level_list[i].length; j ++) {
                    var label_text;
                    if (level_list[i][j].round == -1) {
                        label_text = 'G';
                    } else {
                        label_text = level_list[i][j].round.toString();
                    }
                    var bg_color = '#22bae0';
                    if (level_list[i][j].finalized) {
                        bg_color = '#b3b3b3';
                    } else if (level_list[i][j].notarized) {
                        bg_color = '#bc7dff';
                    }
                    node_list.push(
                        {
                            data: {
                                id: level_list[i][j].round.toString(),
                                label: label_text,
                                background_coloring: bg_color
                            }
                        }
                    );
                }
                
            }
            // find edges
            for (var i = 0; i < level_list.length; i ++) {
                for (var j = 0; j < level_list[i].length; j ++) {
                    if (level_list[i][j].round !== -1) {
                        edge_list.push(
                            {
                                data: {
                                    source: level_list[i][j].round.toString(),
                                    target: level_list[i][j].prev.toString(),
                                    label: 'dd'
                                }
                            }
                        );
                    }
                }
            }
        }
        var res = {
            nodes: node_list,
            edges: edge_list,
            player_id: player.player_id
        }
        return res;
    }

    getElements() {
        var player_list = this.props.blockchain_data.honest;
        var player = undefined;
        // find the player needed
        for (var i = 0; i < player_list.length; i ++) {
            if (this.props.blockchain_cur_player_id == player_list[i].player_id) {
                player = player_list[i];
                break;
            }
        }
        
        player_list = this.props.blockchain_data.corrupt;
        for(var i = 0; i < player_list.length; i++) {
            if (this.props.blockchain_cur_player_id == player_list[i].player_id) {
                player = player_list[i];
                break;
            }
        }
        return this.generate_player_elements(player);
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
                    ]} style={ { width: '500', height: '800px'} }  layout={{ name: 'dagre' }} />
            <h4>Player: {elements.player_id}</h4>
        </Col>
        );
    }

    generate_all_player_components() {
        var component_list = [];
        var cur_list = this.props.blockchain_data.honest;
        var cur_key = 0;
        if (cur_list !== undefined) {
            for (var i = 0; i < cur_list.length; i ++) {
                component_list.push(this.generate_component(this.generate_player_elements(cur_list[i]), cur_key));
                cur_key ++;
            }
        } 
        cur_list = this.props.blockchain_data.corrupt;
        if (cur_list !== undefined) {
            for (var i = 0; i < cur_list.length; i ++) {
                component_list.push(this.generate_component(this.generate_player_elements(cur_list[i]), cur_key));
                cur_key ++;
            }
        }
        return component_list;
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
                    Not Notarized
                </Badge>
                <Badge pill variant="flat">
                    Notarized
                </Badge>
                <Badge pill variant="secondary">
                    Finalized
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
        if (this.props.cur_protocol == undefined || this.props.cur_protocol != 'streamlet') {
            return <Container><h2>No Player States for Streamlet to Display, Please Select a Streamlet Case</h2></Container>;
        }
        var round_nav_bar, player_nav_bar, blockchain_vis;

        // round navigation
        if (this.props.total_round > -1) {
            round_nav_bar = <RoundNav 
                                total_round={this.props.total_round}
                                set_round={this.round_updater}
                            />;
        } else {
            round_nav_bar = <br />;
        }

        // player navigation
        if (this.props.total_player > -1) {
            player_nav_bar = <PlayerNav
                                total_player={this.props.total_player}
                                set_player={this.props.blockchain_set_player_id_handler}
                                blockchain_set_display_all_player_handler={this.props.blockchain_set_display_all_player_handler}
                            />;
        } else{
            player_nav_bar = <br />;
        }

        if (this.props.blockchain_cur_player_id != -1 && this.props.blockchain_data != undefined) {
            if (this.props.block_chain_display_all_players) {
                blockchain_vis = this.generate_all_player_components();
            } else {
                blockchain_vis = this.generate_component(this.getElements(), 0);
            }
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
                  ]} style={ { width: '1000px', height: '800px'} }  layout={{ name: 'dagre' }} />
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
                    {player_nav_bar}
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

export default BlockChain;
