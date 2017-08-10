class ModelUpdates {
  static debug(message) {
    if (ModelUpdates.configuration.debug) {
      console.log(message)
    }
  }
}

ModelUpdates.configuration = {
  "debug": false
}
