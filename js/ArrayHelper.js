function ArrayHelper() {
    this.getValue = function (array, key, defaultValue = null) {
        if (is_object(array) || is_array(array)) {
            return array[key] || defaultValue;
        }

        return defaultValue;
    };
}
