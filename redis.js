import redis from 'redis'


const redisSub = redis.createClient();
redisSub.on("error", function(error) {
  console.error(error);
  redisSub.end(true);
});
const redisPub = redis.createClient();
redisPub.on("error", function(error) {
  console.error(error);
  redisPub.end(true);
});

function redisSubscribe(channel){
  console.log('a');
  redisSub.subscribe(channel);
}
function redisPublish(channel, message){
  redisPub.publish(channel, message);
}
function redisListen(event, callback){
  redisSub.on(event, callback);
}


export default Object.freeze({
  redisSubscribe,
  redisPublish,
  redisListen
});
