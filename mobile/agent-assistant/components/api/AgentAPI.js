const url = "http://asi-17-ihme.insa-rouen.fr";

class AgentAPI {

    static createDialog(text, resolve, reject) {
        let endpoint = `${url}/dialog/create`;
        AgentAPI.callAPI(endpoint, 'POST', text, resolve, reject);
    }

    static addEntry(sessionId, text, resolve, reject) {
        let endpoint = `${url}/dialog/${sessionId}/add`;
        AgentAPI.callAPI(endpoint, 'PUT', text, resolve, reject);
    }

    static callAPI(endpoint, method, text, resolve, reject) {
        let body = JSON.stringify({'text': text});
        let fetchData = {
            method: method,
            body: body,
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };
        fetch(endpoint, fetchData).then(function (response) {
            response.json().then(json => { resolve(json) });
        }).catch(function (error) {
            console.log(error);
            reject();
        });
    }
}

export default AgentAPI;