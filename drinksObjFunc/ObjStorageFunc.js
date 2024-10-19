function ObjStorageFunc() {
    const storage = {};

    this.addValue = function (key, value) {
        storage[key] = value;
    };

    this.getValue = function (key) {
        return storage.hasOwnProperty(key) ? storage[key] : undefined;
    };

    this.deleteValue = function (key) {
        if (storage.hasOwnProperty(key)) {
            delete storage[key];
            return true;
        }
        return false;
    };

    this.getKeys = function () {
        return Object.keys(storage);
    };
}