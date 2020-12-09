const redis = require('redis');
const redisClient = redis.createClient();
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);





const script = () => {
    let accessToken = null;
    let accessToken = await client.hgetAsync(`${currentUser.uid}`, "accesstoken")
    return accessToken;
}
module.exports = script;