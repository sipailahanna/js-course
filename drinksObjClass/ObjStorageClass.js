class ObjStorageClass {

    constructor() {
        this.storage = {};
    }

    addValue = function (key, value) {
        this.storage[key] = value;
    };

    getValue = function (key) {
        return this.storage.hasOwnProperty(key) ? this.storage[key] : undefined;
    };

    deleteValue = function (key) {
        if (this.storage.hasOwnProperty(key)) {
            delete this.storage[key];
            return true;
        }
        return false;
    };

    getKeys = function () {
        return Object.keys(this.storage);
    };
}