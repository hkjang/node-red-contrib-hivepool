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
// msg.payload.symbol = 'ETH'; // symbol

return msg;
```
## Sample flows
```json
[{"id":"8782baa2.6c2c18","type":"inject","z":"2422d0a1.5c053","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":100,"y":620,"wires":[["b799d376.f39dc"]]},{"id":"b799d376.f39dc","type":"function","z":"2422d0a1.5c053","name":"","func":"msg.payload = {};\nmsg.payload.api = 'stats';\nmsg.payload.action = 'workers';\nmsg.payload.symbol = 'ETH';\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":240,"y":620,"wires":[["7b6e124a.5dcb2c"]]},{"id":"10611bd1.25bbc4","type":"debug","z":"2422d0a1.5c053","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":590,"y":620,"wires":[]},{"id":"7b6e124a.5dcb2c","type":"hivepool","z":"2422d0a1.5c053","name":"","api":"","action":"","sort":"","start":"","creds":"f91373fd.3e0e","x":380,"y":620,"wires":[["10611bd1.25bbc4"]]},{"id":"f91373fd.3e0e","type":"hivepool-miner","name":"mining address"}]
```
