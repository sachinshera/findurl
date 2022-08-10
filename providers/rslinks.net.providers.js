const http = require('supertest');
const get = async (url, req, res) => {
    try {
        let response = await http("https://rslinks.net/").get(url.split('/').pop()).send();
        let redirectUrl = atob(response.headers.location.split("data=")[1]).split("ulink=")[1];
        let data = {
            links: [
                {
                    redirectUrl
                }
            ]
        }
        console.log(redirectUrl);
        res.status(200).json({
            status: '200',
            message: 'Success',
            data: data
        });
    } catch (e) {
        res.status(500).json({
            status: '500',
            message: 'Failed to find the link , it may removed or expired !',
        });
    }

}

module.exports = {
    get: get
}