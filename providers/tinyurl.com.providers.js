const http = require('supertest');
const get = async (url, req, res) => {
    try {
        let response = await http("https://tinyurl.com/").get(url.split('/').pop()).send();
        let link = response.header.location;
        let data = {
            links: [
                {
                    link
                }
            ]
        }
        res.json({
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