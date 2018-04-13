const fs = require('fs');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');

let preloadData = fs.readFileSync('../data/throwaway_list.json');

class DomainScanner {
    constructor(listUrls = [], options = {loadUrlLists: false}) {
        if(!Array.isArray(listUrls) && options.loadUrlLists) throw "Parameter must be an array of list URLS!";

        if (!options.loadUrlLists) {
            try {
                preloadData = JSON.parse(preloadData);
            } catch (err) {
                throw "Unable to parse preloaded JSON data from throwaway_list.json!";
            }
        }

        this.listUrls = listUrls;

    }
}