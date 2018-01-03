class ModelUpdates {
  static debug(message) {
    if (ModelUpdates.configuration.debug) {
      console.log("ModelUpdates: " + message)
    }
  }

  static current() {
    if (!this.currentElement)
      this.currentElement = new ModelUpdates()

    return this.currentElement
  }

  static update() {
    ModelUpdates.debug("Static update called")
    ModelUpdates.current().update()
  }

  activator() {
    if (!this.activatorElement)
      this.activatorElement = new ModelUpdates.Activator()

    return this.activatorElement
  }

  update() {
    ModelUpdates.debug("Instance method update called")
    this.activator().update()
  }
}

ModelUpdates.configuration = {
  "debug": false
}
