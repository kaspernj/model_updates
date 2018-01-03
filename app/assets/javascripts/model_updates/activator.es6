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

    for(var model in this.modelSubscriptions) {
      for(var id in this.modelSubscriptions[model]) {
        if (!this.connectedUpdates[model])
          this.connectedUpdates[model] = {}

        if (!this.connectedUpdates[model][id]) {
          this.connectedUpdates[model][id] = true

          ModelUpdates.debug("Add subscription for update of " + model + "(" + id + ")")

          ModelUpdates.Update.connect({
            "id": id,
            "model": model
          })
        }
      }
    }
  }

  updateSubscribedDestroys() {
    ModelUpdates.debug("Activator#updateSubscribedDestroys called")

    for(var model in this.modelDestroys) {
      for(var id in this.modelDestroys[model]) {
        if (!this.connectedDestroyes[model])
          this.connectedDestroyes[model] = {}

        if (!this.connectedDestroyes[model][id]) {
          this.connectedDestroyes[model][id] = true

          ModelUpdates.debug("Add subscription for destruction of " + model + "(" + id + ")")

          ModelUpdates.Destroy.connect({
            "id": id,
            "model": model
          })
        }
      }
    }
  }
}
