var express = require('express');
var router = express.Router();
const mdisk = require('../providers/mdisk.me.providers');
const tinyurl = require('../providers/tinyurl.com.providers');
const rslinks = require("../providers/rslinks.net.providers");
const bitly = require('../providers/bit.ly.providers');
var supportedDomains = [
    {
        "domain": "mdisk.me",
        "provider": mdisk
    },
    {
        "domain": "tinyurl.com",
        "provider": tinyurl
    },
    {

        "domain": "rslinks.net",
        "provider": rslinks
    },
    {

        "domain": "bit.ly",
        "provider": bitly
    }
];
router.get('/:domain/:url', async function (req, res, next) {
    let domain = req.params.domain;
    let url = req.params.url;
    let supported = supportedDomains.find(x => x.domain === domain);
    if (!supported) {
        return res.status(404).json({
            status: '404',
            message: 'Unsupported Domain!'
        });
    } else {
        if (!isValidHttpUrl(url)) {
            return res.status(404).json({
                status: '404',
                message: 'Invalid URL!'
            });
        }
        else if (Buffer.from(url, 'base64').toString("ascii").toLocaleLowerCase().indexOf(domain.toLocaleLowerCase()) == -1) {
            return res.status(404).json({
                status: '500',
                message: 'Domain and url mismatch!'
            });
        }
        supported.provider.get(Buffer.from(url, 'base64').toString("ascii"), req, res);
    }
});

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(Buffer.from(string, 'base64').toString("ascii"));
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

module.exports = router;