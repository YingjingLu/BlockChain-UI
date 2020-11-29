import {
    SERVER,
    UPLOAD
} from './Global';


function get_upload_addr() {
    return SERVER + UPLOAD;
}

function get_state_request_str(run_name,  round) {
    return SERVER +'player_state/run_id/' + run_name + '/round/' + round;
}

function get_message_request_str(run_name, round) {
    return SERVER +'message/run_id/' + run_name + '/round/' + round;
}


export {
    get_upload_addr,
    get_state_request_str,
    get_message_request_str
};
