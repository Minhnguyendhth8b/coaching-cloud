import Hateos from './hateos';

Hateos.registerLinkHandler("product", function (product) {
    return {
        "self": "/products/" + product["_id"]
    }
})

Hateos.registerLinkHandler("category", function(category) {
    return {
        "self": "/categories/" + category["_id"]
    }
})

const Response = (datas, type, page = 1, limit = 30) => {

    let result = {
        data: [],
        meta: {}
    }
    
    let getAttributes = function (data, notAllowed) {
        const keys = Object.keys(data.toJSON());
        return keys.filter(key => {
            return notAllowed.indexOf(key) === -1;
        }).reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
    }

    let buildData = function (data, type, isGetRel, isGetLink = false) {
        let attributes = {
            id: data.id.toString(),
            attributes: getAttributes(data, ["_id", "__v"]),
            type: type
        }
        
        if (isGetLink) {
            attributes["links"] = Hateos.link(type, data);
        }

        if (isGetRel)
            attributes["relationships"] = getRelationships(data);
        return attributes;
    }

    let getRelationships = function(data) {
        let rel = {};
        const ref = type.toLowerCase() === 'product' ? 'category' : 'product';
        const rs = data[ref === 'product' ? 'products' : ref];
        if (Array.isArray(rs)) {
            rel[ref] = [];
            rs.forEach(data => {
                rel[ref].push(buildData(data, ref, false, true));
            })
        } else {
            rel[ref] = buildData(rs, ref, false, true);
        }
        
        return rel;
    };

    if (Array.isArray(datas)) {
        datas.forEach(data => {
            const rs = buildData(data, type, true);

            result.data.push(rs);
        })
        result.meta.total_count = datas.length;
        result.meta.page = page;
        result.meta.per_page = limit;
        result.meta.page_count = parseInt(datas.length / limit) + 1;
    } else {
        result.data = buildData(datas, type, false);
    }

    return result;
}

export default Response;