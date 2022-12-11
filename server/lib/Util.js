class Util {

    static reqToObj(req) {
        let obj = {}
        for (const [key, value] of Object.entries(req.body)) {
            obj[key] = value;
        }
        return obj;
    }

}

module.exports = Util;