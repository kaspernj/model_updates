ModelUpdates.Create = class Create {
  static connect(args) {
    console.log("ModelName: " + args.model)

    App.cable.subscriptions.create(
      {channel: "ModelUpdates::CreateChannel", model: args.model},
      {
        received: function(json) {
          console.log("GOT RECEIVED MODEL UPDATES CREATE!")

          args.onCreated.call()
        }
      }
    )
  }
}
