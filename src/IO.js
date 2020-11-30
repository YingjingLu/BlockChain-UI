import {
    SERVER
} from './Global';


function get_upload_addr() {
    return SERVER + 'upload';
}

function get_state_request_str(run_name,  round) {
    return SERVER +'player_state/run_id/' + run_name + '/round/' + round;
}

function get_message_request_str(run_name, round) {
    return SERVER +'message/run_id/' + run_name + '/round/' + round;
}

function get_all_run_request_str() {
    return SERVER + 'list_run';
}

function get_streamlet_config_request_str(run_name) {
    return SERVER + 'streamlet_config/run_id/' + run_name;
}

export {
    get_upload_addr,
    get_state_request_str,
    get_message_request_str,
    get_all_run_request_str,
    get_streamlet_config_request_str
};
