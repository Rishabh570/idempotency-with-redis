const Shortlink = require('../models/url');

module.exports = ({ redlock }) => {
  async function findByLongURL(longURL) {
    return Shortlink.findOne({ longURL });
  }
  
  // Does not offer uniqueness guarantee currently
  function generateNewSlug(slugLen = 6) {
    let result = '';
    const sampleSpace = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const len = sampleSpace.length;
    
    // generate random string
    for (let i = 0; i < slugLen; i++) {
      result += sampleSpace.charAt(Math.floor(Math.random() * len));
    }
    return result;
  }
  
  async function saveToDB(slug, longURL) {
    return Shortlink.create({
      slug,
      longURL
    });
  }
  
  async function findBySlug(slug) {
    return Shortlink.findOne({ slug });
  }
  
  async function acquireLock(key, ttl = 1) {
    return redlock.acquire([key], ttl);
  }

  return {
    findByLongURL,
    generateNewSlug,
    saveToDB,
    findBySlug,
    acquireLock,
  }
}