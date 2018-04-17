const fs = require('fs');
const path = require('path');
const axios = require('axios');

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let preloadData = require('../data/throwaway_list.json');

/**
 * Scanner object, uses default list if none is supplied as a paramater.
 */
class DomainScanner {
    /**
     * Create a new scanning object, optionally takes a DomainList as a paramater
     * @param {DomainList} domainList - List object to test email domain against.
     */
    constructor(domainList) {
        if (!domainList) this.domainList = new DomainList();
        else this.domainList = domainList;
    }

    /**
     * Returns the DomainList object associated with this scanner
     * @return {DomainList} - The domain list
     */
    get database() {
        return this.domainList;
    }

    /**
     * Returns the ready status of the domain list
     * @return {Boolean} - If the associated domain list has finished loading.
     */
    get ready() {
        return this.domainList.finishedLoading || false;
    }

    /**
     * Test the email address against the domain list
     * @param {String} email - Email address
     * @return {boolean} - The result of weather the email address was in the database.
     */
    scan(email) {
        return this.domainList.testDomain(email) || false;
    }
}

/**
 * Used to store the list of scam email domains.
 */
class DomainList {
    /**
     * Create a new list, returns the default list if no url is supplied
     * @param {String} listUrl - The url of the JSON formatted domain list
     */
    constructor(listUrl) {
        this.domains = [];
        this.usedDefault = false;
        this.finishedLoading = false;

        if (!listUrl) {
            this.usedDefault = true;
            try {
                preloadData.forEach(domain => {
                    // Sanity checking
                    if (!listUrl.includes(domain) || !emailRegex.test(domain)) {
                        this.domains.push(domain);
                    }
                });
                this.finishedLoading = true;
            } catch (err) {
                throw "Unable to parse preloaded JSON data from throwaway_list.json!";
            }
        } else this.listUrl = listUrl;
    }

    get listSize(){
        return this.domains.length;
    }

    async loadExternal() {
        try {
            if (!this.finishedLoading) {
                let res = await axios.get(this.listUrl);

            }
        } catch (err) {
            throw "Unable to load external domains!";
        }
    }

    testDomain(email) {
        if (!this.finishedLoading) throw "Haven't finished loading complete list!";
        if (!email) return false;
        return this.domains.some(domain => {
            return email.includes(domain);
        })
    }
}

module.exports = {
    DomainScanner, DomainList
}