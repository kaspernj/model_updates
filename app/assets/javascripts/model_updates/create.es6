ModelUpdates.Create = class Create {
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
