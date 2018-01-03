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
    ModelUpdates.current().update()
  }

  activator() {
    if (!this.activatorElement)
      this.activatorElement = new ModelUpdates.Activator()

    return this.activatorElement
  }

  update() {
    this.activator().update()
  }
}

ModelUpdates.configuration = {
  "debug": true
}
