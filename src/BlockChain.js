import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

    getElements() {
        var node_list = [];
        var edge_list = [];
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
        if (player !== undefined) {
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
                    node_list.push(
                        {
                            data: {
                                id: level_list[i][j].round.toString(),
                                label: label_text
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
            edges: edge_list
        }
        return res;
    }
    
    componentDidMount() {
        if (this.props.cur_run !== "" && this.props.run_list.length > 0) {
            this.props.fetch_player_state_update_state(this.props.cur_run, 0, 0);
        }
    }

    render() {
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
                            />;
        } else{
            player_nav_bar = <br />;
        }
        const layout = { name: 'dagre' };
        if (this.props.blockchain_cur_player_id != -1 && this.props.blockchain_data != undefined) {
            
            blockchain_vis = (
                <>
                    <CytoscapeComponent elements={CytoscapeComponent.normalizeElements(this.getElements())} stylesheet={[
                            {
                              selector: 'node',
                              style: {
                                'label': 'data(label)',
                                'text-valign': 'center',
                                'color': '#000000',
                                'background-color': '#22bae0'
                              }
                            },
                            {
                              selector: 'edge',
                              style: {
                                'width': 2,
                                'line-color': '#22bae0',
                                'opacity': 0.5
                              }
                            }
                          ]} style={ { width: '600px', height: '800px'} }  layout={layout} />
                </>            
            );
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
                  ]} style={ { width: '1000px', height: '800px'} }  layout={layout} />
        </>;
        }
        

        return (
            <>
                <Container>
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
                    
                </Container>
                
            </>
        )
    }
}

export default BlockChain;
