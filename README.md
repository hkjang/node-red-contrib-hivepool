node-red-contrib-hivepool
================

Node-RED node for hivepool


## Install

To install the stable version use the `Menu - Manage palette - Install`
option and search for node-red-contrib-hivepool, or run the following
command in your Node-RED user directory, typically `~/.node-red`

    npm install node-red-contrib-hivepool

## Wrapper hivepool  API  
- https://cryptocointracker.com/api/hiveon/all-endpoints

## Sample parameters
```js
// msg.payload = {};
// msg.payload.api = 'stats'; //stats
// msg.payload.action = 'miner'; // miner or workers or billing-acc
// msg.payload.action = 'workers'; // miner or workers or billing-acc
// msg.payload.action = 'billing-acc'; // miner or workers or billing-acc

return msg;
```
## Sample flows
```json

```
