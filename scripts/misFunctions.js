require('dotenv').config(); // Load .env variables

const domain = process.env.domain;
const username = process.env.misUserName;
const password = process.env.misPassword;

async function getTeiData(tei){
    let returnData = {};
    console.log(domain);
    console.log(username);
    console.log(password);
    const headers = generateHeaders(username, password);
    let options = {headers: headers};
    let url = `${domain}/api/tracker/trackedEntities/${tei}?fields=*`;
    let response = await fetch(url, options);
    if (!response.ok){
        // console.log(response);
        returnData.status = "error";
        returnData.data = await response.json();
        return returnData;
    }
    let data = await response.json();
    returnData.status = "success";
    returnData.data = data;
    return returnData;
}

function generateToken(username, password) {
    // Concatenate username and password with a colon
    const credentials = `${username}:${password}`;
    // Encode the credentials using base64
    const encodedCredentials = btoa(credentials);
    console.log(encodedCredentials);
    return encodedCredentials;
}

function generateHeaders(username, password) {
    const token = generateToken(username, password);
    // Construct the Authorization header value
    const authHeader = `Basic ${token}`;
    // Construct headers object
    const headers = {
      "Content-Type": "application/json",
      Authorization: authHeader,
    };
    return headers;
}

module.exports = {
    getTeiData: getTeiData,
}