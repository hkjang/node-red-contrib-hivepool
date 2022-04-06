const axios = require("axios");
const url = 'https://hiveon.net/api/v1';
module.exports = function (RED) {
    function FunctionNode(n) {
        RED.nodes.createNode(this, n);
        if (RED.nodes.getNode(n.creds)){
            this.miner = RED.nodes.getNode(n.creds).credentials.miner;
        } else {
            this.miner = "";
        }
        var node = this;
        this.name = n.name;

        for (var key in n) {
            node[key] = n[key] || "";
        }
        this.on('input', function (msg) {
            for (var i in msg) {
                if (i !== 'req' | i !== 'res' | i !== 'payload' | i !== 'send' | i !== '_msgid') {
                    node[i] = msg[i] || node[i];
                }
            }

            node.options = {};
            // node.options.headers = {};
            if(n.api && n.action){
                node.payload = {};
                node.payload.api = n.api;
                node.payload.action = n.action;
            }else{
                if(!node.payload.api){
                    msg.payload = 'need to msg.payload.api';
                    node.send(msg);
                }else if(!node.payload.action){
                    msg.payload = 'need to msg.payload.action';
                    node.send(msg);
                }
            }
            // https://hiveon.net/api/v1/stats/miner/xxxxxxxxxx/ETH
            // https://hiveon.net/api/v1/stats/miner/xxxxxxxxxx/1/workers
            // https://hiveon.net/api/v1/stats/miner/xxxxxxxxxx/ETH/billing-acc
            if(node.symbol === '' | typeof node.symbol === 'undefined'){
                node.symbol = 'ETH'
            }
            if(node.miner === '' | typeof node.miner === 'undefined'){
                node.error('have to set coin address');
            }else{
                node.miner = node.miner.toLowerCase().replace('0x','');
            }

            if(node.payload.api.toLowerCase() === 'stats'){
                if(node.payload.action === 'miner'){
                    node.url = url +  '/stats/miner/' + node.miner + '/' + node.symbol;
                }else if(node.payload.action === 'workers'){
                    node.url = url +  '/stats/miner/' + node.miner + '/' + node.symbol + '/workers';
                }else if(node.payload.action === 'billing-acc'){
                    node.url = url +  '/stats/miner/' + node.miner + '/' + node.symbol +'/billing-acc';
                }
            }else{
                node.payload.api = 'stats';
                node.url = url +  '/stats/miner/' + node.miner + '/ETH';
            }
            node.error(node.url);

            axios.get(node.url, node.options)
                .then(function (response){
                    msg.payload = response.data;
                    node.send(msg);
                }).catch(function (err){
                msg.payload = err;
                node.send(msg);
            });
        });
    }

    RED.nodes.registerType("hivepool", FunctionNode, {
        credentials: {
            miner: {type:"text"}
        }
    });

    function hivepoolMiner(n){
        RED.nodes.createNode(this, n);
        this.miner = n.miner;
    }

    RED.nodes.registerType("hivepool-miner", hivepoolMiner,{
        credentials: {
            miner: {type:"text"}
        }
    });
};
