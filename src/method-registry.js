
// # resigtry state
if (!global._k_app_methods_methods_state) {
    global._k_app_methods_methods_state = {
        methods: {},
        ord: []
    }
}

function _getMethods() {
    return global._k_app_methods_methods_state.methods
}

function _getMethodsOrd() {
    return global._k_app_methods_methods_state.ord
}

function _getApp() {
    return global._k_app_methods_containerApp
}

function _setApp(app) {
    global._k_app_methods_containerApp = app
}

// # method side - regitration
function registerMethod(methodKey, implementation) {
    _getMethods()[methodKey] = implementation
    _getMethodsOrd().push(methodKey)

    return implementation
}

// # app side - querying
function _filterMethodKeys(filter) {
    if (!filter) return _getMethodsOrd()

    return _getMethodsOrd().filter(methodKey =>
        filter(_getMethods()[methodKey], methodKey),
    )
}

function getMethodsKeys(filter, sort) {
    const filteredMethods = _filterMethodKeys(filter)
    if (!sort) return filteredMethods

    return filteredMethods.sort(sort)
}

function getMethod(methodKey) {
    return _getMethods()[methodKey]
}

// # app side - registration
function registerContainerApp(containerApp) {
    _setApp(containerApp)
    return containerApp
} 

// # app services

// Method start/stop
function runMethod(methodKey, parameters) {
    if (!_getApp())
        throw new Error("runMethod: no container app available")
    
    return _getApp().runMethod(methodKey, parameters)
}

module.exports = {
    registerMethod,
    getMethodsKeys,
    getMethod,
    registerContainerApp,
    runMethod,
}
