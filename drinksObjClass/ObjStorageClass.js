class ObjStorageClass {
    #storage;

    constructor() {
        this.storage = {};
    }

    addValue = function (key, value) {
        storage[key] = value;
    };

    getValue = function (key) {
        return storage.hasOwnProperty(key) ? storage[key] : undefined;
    };

    deleteValue = function (key) {
        if (storage.hasOwnProperty(key)) {
            delete storage[key];
            return true;
        }
        return false;
    };

    getKeys = function () {
        return Object.keys(storage);
    };
}