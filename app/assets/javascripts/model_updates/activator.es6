ModelUpdates.Activator = class Activator {
  constructor() {
    ModelUpdates.debug("Activator constructor")

    this.modelSubscriptions = {}
    this.modelDestroys = {}
    this.connectedUpdates = {}
    this.connectedDestroyes = {}
  }

  update() {
    ModelUpdates.debug("Update was called")
    this.updateFoundElements()
    this.updateSubscribedUpdates()
    this.updateSubscribedDestroys()
  }

  updateFoundElements() {
    ModelUpdates.debug("Activator#updateFoundElements called")

    // Find all models that should be subscribed to
    var that = this
    $(".model-updates").each(function() {
      var element = $(this)

      var model = element.data("model-updates-model")
      var id = element.data("model-updates-id")

      ModelUpdates.debug("Model found: " + model + "(" + id + ")")

      if (!that.modelSubscriptions[model])
        that.modelSubscriptions[model] = {}

      if (element.data("model-updates-key"))
        that.modelSubscriptions[model][id] = true

      if (element.data("model-updates-remove-on-destroy")) {
        if (!that.modelDestroys[model])
          that.modelDestroys[model] = {}

        that.modelDestroys[model][id] = true
      }
    })
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

    ModelUpdates.debug("Add subscription for update of " + JSON.stringify(connectToModels))

    ModelUpdates.Update.connect({
      "ids": connectToModels
    })
  }

  updateSubscribedDestroys() {
    ModelUpdates.debug("Activator#updateSubscribedDestroys called")

    var connectToModels = {}
    for(var model in this.modelDestroys) {
      var ids = []
      connectToModels[model] = ids

      for(var id in this.modelDestroys[model]) {
        if (!this.connectedDestroyes[model])
          this.connectedDestroyes[model] = {}

        if (!this.connectedDestroyes[model][id]) {
          this.connectedDestroyes[model][id] = true
          ids.push(id)
        }
      }
    }

    ModelUpdates.debug("Add subscription for destruction of " + JSON.stringify(connectToModels))

    ModelUpdates.Destroy.connect({
      "ids": connectToModels
    })
  }
}
