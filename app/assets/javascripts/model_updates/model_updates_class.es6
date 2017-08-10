class ModelUpdates {
  static debug(message) {
    if (ModelUpdates.configuration.debug) {
      console.log("ModelUpdates: " + message)
    }
  }
}

ModelUpdates.configuration = {
  "debug": false
}
