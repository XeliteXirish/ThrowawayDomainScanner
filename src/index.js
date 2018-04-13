const fs = require('fs');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let preloadData = fs.readFileSync('../data/throwaway_list.json');

class DomainScanner {
    constructor(listUrls = [], options = {loadUrlLists: false}) {
        this.listUrls = listUrls || [];
        if(!Array.isArray(listUrls) && options.loadUrlLists) throw "Parameter must be an array of list URLS!";

        if (!options.loadUrlLists) {
            try {
                preloadData = JSON.parse(preloadData);
                preloadData.forEach(domain => {
                    // Sanity checking
                    if (!listUrls.includes(domain) || !emailRegex.test(domain));

                    this.listUrls.push(domain);
                    
                });

            } catch (err) {
                throw "Unable to parse preloaded JSON data from throwaway_list.json!";
            }
        }

        this.listUrls = listUrls;

    }
}