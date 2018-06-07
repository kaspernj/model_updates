ModelUpdates.Update = class Update {
  static connect(args) {
    ModelUpdates.debug("Connecting to update channel for " + JSON.stringify(args.ids))

    App.cable.subscriptions.create(
      {channel: "ModelUpdates::UpdateChannel", ids: args.ids},
      {
        received: function(json) {
          if (ModelUpdates.current().activator().callbacks[json.model] && ModelUpdates.current().activator().callbacks[json.model][json.id]) {
            var callbacks = ModelUpdates.current().activator().callbacks[json.model][json.id]

            ModelUpdates.debug("Found callbacks for " + json.model + "(" + json.id + ")")

            for(var key in callbacks) {
              var callback = callbacks[key]
              ModelUpdates.debug("Calling callback: " + JSON.stringify(json))
              callback(json)
            }
          } else {
            console.log("No callbacks for " + json.model + "(" + json.id + ")")
          }

          if (json.type == "destroy") {
            var elements = document.querySelectorAll(".model-updates[data-model-updates-model='" + json.model + "'][data-model-updates-id='" + json.id + "'][data-model-updates-remove-on-destroy='true']")
            for(var element in elements) {
              element.parentNode.removeChild(element)
            }

            if (args.onDestroyed)
              args.onDestroyed(json)
          } else if (json.type == "update") {
            ModelUpdates.debug("Received update for " + json.model + "(" + json.id + ")")

            for(var key in json.changes) {
              var elements = document.querySelectorAll(".model-updates[data-model-updates-model='" + json.model + "'][data-model-updates-id='" + json.id + "'][data-model-updates-key='" + key + "']")
              for(i = 0; i < elements.length; i++) {
                var element = elements[i]

                if (element.dataset.modelUpdatesCallback) {
                  var function_to_call = element.dataset.modelUpdatesCallback

                  window[function_to_call]({
                    changes: json.changes,
                    element: element,
                    id: json.id,
                    key: key,
                    model: json.model,
                    value: json.changes[key]
                  })
                } else if(json.changes[key]) {
                  element.innerText = json.changes[key]
                } else {
                  // Needs to check if it has a value, else it will print out "null" instead of nothing.
                  element.innerText = ""
                }
              }
            }
          }
        }
      }
    )
  }
}
