const Axios = require('axios')
const Cheerio = require('cheerio')


module.exports = {
    suggestImgs
}

async function suggestImgs(searchTerm) {
    const res = await Axios.get(`http://www.istockphoto.com/il/photos/${searchTerm}`)
    const siteData = await Cheerio.load(res.data)
    const imgURL = await siteData('img.srp-asset-image').attr('src')
    return imgURL
}