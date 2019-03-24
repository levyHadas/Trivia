const Axios = require('axios')
const Cheerio = require('cheerio')


module.exports = {
    suggestImgs
}

async function suggestImgs(searchTerm) {
    const res = await Axios.get(`http://www.istockphoto.com/il/photos/${searchTerm}`)
    var siteData = await Cheerio.load(res.data)
    var imgURL = await siteData('img.srp-asset-image').attr('src')
    return imgURL
}