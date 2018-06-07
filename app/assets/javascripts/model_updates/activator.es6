ModelUpdates.Activator = class Activator {
  constructor() {
    ModelUpdates.debug("Activator constructor")

    this.modelSubscriptions = {}
    this.callbacks = {}
    this.connectedUpdates = {}
    this.connectedDestroyes = {}
  }

  connectUpdate(model, id, callback) {
    if (!this.modelSubscriptions[model])
      this.modelSubscriptions[model] = {}

    this.modelSubscriptions[model][id] = true

    if (!this.callbacks[model])
      this.callbacks[model] = {}

    if (!this.callbacks[model][id])
      this.callbacks[model][id] = []

    this.callbacks[model][id].push(callback)
  }

  update() {
    ModelUpdates.debug("Update was called")
    this.updateFoundElements()
    this.updateSubscribedUpdates()
  }

  updateFoundElements() {
    ModelUpdates.debug("Activator#updateFoundElements called")

    var elements = document.querySelectorAll(".model-updates")

    for(i = 0; i < elements.length; i++) {
      var element = elements[i]

      var model = element.dataset.modelUpdatesModel
      var id = element.dataset.modelUpdatesId

      ModelUpdates.debug("Model found: " + model + "(" + id + ")")

      if (!this.modelSubscriptions[model])
        this.modelSubscriptions[model] = {}

      this.modelSubscriptions[model][id] = true
    }
  }

  updateSubscribedUpdates() {
    ModelUpdates.debug("Activator#updateSubscribedUpdates called")

    var connectToModels = {}
    for(var model in this.modelSubscriptions) {
      var ids = []
      connectToModels[model] = ids

      for(var id in this.modelSubscriptions[model]) {
        if (!this.connectedUpdates[model])
          this.connectedUpdates[model] = {}

        if (!this.connectedUpdates[model][id]) {
          this.connectedUpdates[model][id] = true
          ids.push(id)
        }
      }
    }

    if (Object.keys(connectToModels).length > 0)
      ModelUpdates.Update.connect({"ids": connectToModels})
  }
}
