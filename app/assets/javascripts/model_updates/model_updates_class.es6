class ModelUpdates {
  static connectChanged(model, id, callback) {
    ModelUpdates.current().activator().connectUpdate(model, id, callback)
  }

  static connectModel(modelName, modelId, eventName, callback) {
    ModelUpdates.current().events().connectModel({"model": modelName, "id": modelId, "name": eventName, "callback": function(args) {
      callback(args.args)
    }})
  }

  static connectModelClass(modelName, eventName, callback) {
    ModelUpdates.current().events().connectModelClass({"model": modelName, "name": eventName, "callback": function(args) {
      callback(args.args)
    }})
  }

  static connectEvents() {
    ModelUpdates.current().events().connect()
  }

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

  events() {
    if (!this.eventsElement)
      this.eventsElement = new ModelUpdates.Events()

    return this.eventsElement
  }

  update() {
    ModelUpdates.debug("Instance method update called")
    this.activator().update()
  }
}

ModelUpdates.configuration = {
  "debug": false
}
