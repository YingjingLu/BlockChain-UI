import {
    SERVER
} from './Global';


function get_upload_addr() {
    return SERVER + 'upload';
}

function get_exec_addr() {
    return SERVER + 'exec';
}

function get_exec_file_download(zip_name) {
    return SERVER + 'get_run/' + zip_name;
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

function get_config_request_str(run_name) {
    return SERVER + 'config/run_id/' + run_name;
}

export {
    get_upload_addr,
    get_exec_addr,
    get_state_request_str,
    get_message_request_str,
    get_all_run_request_str,
    get_config_request_str,
    get_exec_file_download
};
