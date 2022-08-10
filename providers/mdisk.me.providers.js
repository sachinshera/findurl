const axios = require('axios');
const get = async (url, req, res) => {
    axios.get("https://diskuploader.entertainvideo.com/v1/file/cdnurl?param=" + url.split('/').pop()).then(function (response) {
        let data = {
            links: [
                {
                    download: response.data.download
                },
                {
                    download: response.data.source
                }
            ]
        }
        res.status(200).json({
            status: '200',
            message: 'Success',
            data: data
        });
    }).catch(function (error) {
        res.status(500).json({
            status: '500',
            message: 'Failed to find the link , it may removed or expired !',
        });
    })
}

module.exports = {
    get: get
};