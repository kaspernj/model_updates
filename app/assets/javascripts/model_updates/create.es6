ModelUpdates.Create = class ModelUpdatesCreate {
  static connect(args) {
    App.cable.subscriptions.create(
      {channel: "ModelUpdates::CreateChannel", model: args.model},
      {
        received: function(json) {
          args.onCreated(json)
        }
      }
    )
  }
}
