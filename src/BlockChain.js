import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
var { get_state_request_str } = require('./IO');
const cytoscape = require('cytoscape');
const dagre = require('cytoscape-dagre');
cytoscape.use( dagre );

/**
 * Props attributes:
 * run_name: the root folder directory of the config and trace
 * 
 * State attributes:
 * cur_player: the id of current player, -1 if nothing
 * cur_round the current round number
 * honest: whether the cur_player is honest
 * display_state: the state data currently being displayed
 * data: the message trace data
 * 
 * 
 * Other data:
 * bool run_name_changed
 * bool cur_player_changed
 * bool cur_round
 * 
 * String selected_run_name
 * String selected_player_id,
 * int selected_round
 * 
 */

class BlockChain extends React.Component {

    constructor(props) {
        super(props);
    }

    fetch_data_and_update_state(run_name, player_id, round) {
        
        fetch(get_state_request_str(run_name, round))
        .then(res => res.json())    
        .then(
                data => {
                    console.log(typeof data.data);
                    this.setState({
                        player_id: player_id,
                        cur_round: round, 
                        data: data.data
                    });
                }
            )
        .catch( err => {
            window.alert(err)
        })
    }

    getElements() {
        var node_list = [];
        var edge_list = [];
        var player_list = this.state.data.honest;
        console.log(this.state.data.honest[0]);
        var player = undefined;
        // find the player needed
        for (var i = 0; i < player_list.length; i ++) {
            if (this.state.player_id === player_list[i].player_id) {
                player = player_list[i];
                break;
            }
        }
        
        player_list = this.state.data.corrupt;
        for(var i = 0; i < player_list.length; i++) {
            if (this.state.player_id === player_list[i].player_id) {
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
        console.log(res);
        return res;
	}

    create_elements() {
        return {
            nodes: null,
            edges: null
        }
    }

    
    componentDidMount() {
        this.fetch_data_and_update_state('streamlet_n_3_f_1_r_6', 1, 5);
    }

    componentDidUpdate() {

    }

    render() {
        if (this.state != null && this.state.data != null) {
            const layout = { name: 'dagre' };
            return (
                <>
                    <CytoscapeComponent elements={CytoscapeComponent.normalizeElements(this.getElements())} stylesheet={[
                            {
                              selector: 'node',
                              style: {
                                'label': 'data(id)',
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
                          ]} style={ { width: '1080px', height: '1920px'} }  layout={layout} />
                </>            
            );
        }
        
        return (
            <h1>No available data</h1>
        );
        
    }
}

export default BlockChain;
