ModelUpdates.Destroy = class Destroy {
  static connect(args) {
    ModelUpdates.debug("Connecting to destroy channel for " + args.model + "(" + args.id + ")")

    App.cable.subscriptions.create(
      {channel: "ModelUpdates::DestroyChannel", id: args.id, model: args.model},
      {
        received: function(json) {
          var elements = $(".model-updates[data-model-updates-model='" + json.model + "'][data-model-updates-id='" + json.id + "'][data-model-updates-remove-on-destroy='true']")
          elements.remove()

          if (args.onDestroyed)
            args.onDestroyed(json)
        }
      }
    )
  }
}
