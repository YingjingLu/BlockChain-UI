import React from 'react';
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
                    node_list.push(
                        {
                            data: {
                                id: level_list[i][j].round.toString(),
                                label: level_list[i][j].round.toString()
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

        if (this.props.blockchain_cur_player_id != -1 && this.props.blockchain_data != undefined) {
            const layout = { name: 'dagre' };
            blockchain_vis = (
                <>
                    <CytoscapeComponent elements={CytoscapeComponent.normalizeElements(this.getElements())} stylesheet={[
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
                          ]} style={ { width: '600px', height: '800px'} }  layout={layout} />
                </>            
            );
        } else {
            blockchain_vis = <h1>No available data</h1>;
        }
        

        return (
            <>
                {round_nav_bar}
                {player_nav_bar}
                {blockchain_vis}
            </>
        )
    }
}

export default BlockChain;
