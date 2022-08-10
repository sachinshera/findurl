const http = require('supertest');
const get = async (url, req, res) => {
    http("https://bit.ly/").get(url.split('/').pop()).send().then(function (response) {
        let link = response.header.location;
        let data = {
            links: [
                {
                    link
                }
            ]
        }
        res.status(200).json({
            status: '200',
            message: 'Success',
            data: data
        })
    }).catch(function (error) {
        res.status(500).json({
            status: '500',
            message: 'Failed to find the link , it may removed or expired !',
        });
    })
}

module.exports = {
    get: get
}