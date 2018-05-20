import Config from '../config';

class Hateos {
    options = {
        baseUrl: Config.baseUrl + Config.port + '/'
    };

    linkHandlers = {};

    collectionLinkHandlers = {};

    constructor(options) {
        this.options = { ...this.options, ...options };
    }

    registerLinkHandler(type, handler) {
        if (!this.linkHandlers[type]) {
            this.linkHandlers[type] = [];
        }
        this.linkHandlers[type].push(handler);
    }

    registerCollectionLinkHandler(type, handler) {
        if (!this.collectionLinkHandlers[type]) {
            this.collectionLinkHandlers[type] = [];
        }

        this.collectionLinkHandlers[type].push(handler);
    }

    prefix = function(link) {
        if (!link.length || link[0] !== "/") {
            return link;
        }

        return this.options.baseUrl + link;
    }

    getLinksGeneric(handlers, type, data) {
        const that = this;
        if (handlers[type]) {
            var links = handlers[type].reduce(function (links, handler) {
                return { ...links, ...handler(data, type, links) };
            }, {});
            return Object.keys(links).reduce(function (prefixedLinks, linkName) {
                prefixedLinks[linkName] = that.prefix(links[linkName]);
                return prefixedLinks;
            }, {});
        } else {
            return [];
        }
    }

    getLinks(type, data) {
        return this.getLinksGeneric(this.linkHandlers, type, data);
    };

    getCollectionLinks(type, data) {
        return this.getLinksGeneric(this.collectionLinkHandlers, type, data);
    }

    linkCollection(type, collection) {
        let result = {
            data: collection.map(link.bind(null, type))
        };

        const links = this.getCollectionLinks(type, collection);

        if (this.options.propName) {
            result[options.propName] = links;
        } else {
            result = { ...result, ...links}
        }

        return result;

    }

    link(type, data) {
        data = data.toJSON();
        data = {
            _id: data["_id"]
        }
        if (Array.isArray(data)) {
            return this.linkCollection(type, data);
        }
        const links = this.getLinks(type, data);
        console.log(links);
        if (this.options.propName) {
            data[this.options.propName] = links;
        } else {
            data = { ...data, ...links };
        }

        return data;
    }

}

export default new Hateos();