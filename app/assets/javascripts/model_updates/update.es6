ModelUpdates.Update = class Update {
  static connect(args) {
    ModelUpdates.debug("ModelUpdates: Connecting to " + args.model + "(" + args.id + ")")

    App.cable.subscriptions.create(
      {channel: "ModelUpdates::UpdateChannel", id: args.id, model: args.model},
      {
        received: function(json) {
          ModelUpdates.debug("ModelUpdates: Received update for " + json.model + "(" + json.id + ")")

          for(var key in json.changes) {
            var elements = $(".model-updates[data-model-updates-model='" + json.model + "'][data-model-updates-id='" + json.id + "'][data-model-updates-key='" + key + "']")
            elements.each(function() {
              var element = $(this)

              if (element.data("model-updates-callback")) {
                var function_to_call = element.data("model-updates-callback")

                window[function_to_call]({
                  changes: json.changes,
                  element: element,
                  id: json.id,
                  key: key,
                  model: json.model,
                  value: json.changes[key]
                })
              } else if(json.changes[key]) {
                element.text(json.changes[key])
              } else {
                // Needs to check if it has a value, else it will print out "null" instead of nothing.
                element.text("")
              }
            })
          }
        }
      }
    )
  }
}
