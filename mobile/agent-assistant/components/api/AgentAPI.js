import API from './API';

const url = "http://asi-17-ihme.insa-rouen.fr";

class AgentAPI extends API {

    static createDialog(text, resolve, reject) {
        console.log("createDialog");
        let endpoint = url + '/dialog/create';
        let body = JSON.stringify({'text': text});
        let fetchData = {
            method: 'POST',
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

    static addEntry(text, resolve, reject) {

    }
}


export default AgentAPI;