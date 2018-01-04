ModelUpdates.Destroy = class Destroy {
  static connect(args) {
    ModelUpdates.debug("Connecting to destroy channel for " + JSON.stringify(args.ids))

    App.cable.subscriptions.create(
      {channel: "ModelUpdates::DestroyChannel", ids: args.ids},
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
