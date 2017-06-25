$(document).ready(function() {
  // Find all models that should be subscribed to
  model_subscriptions = {}

  $(".model-updates").each(function() {
    model_type = $(this).data("model-updates-model")
    model_id = $(this).data("model-updates-id")

    if (!model_subscriptions[model_type])
      model_subscriptions[model_type] = {}

    model_subscriptions[model_type][model_id] = {}
  })

  // Subscribe to the found models
  for(var model_type in model_subscriptions) {
    for(var model_id in model_subscriptions[model_type]) {
      console.log("Subscribing " + model_type + "(" + model_id + ")")

      App.cable.subscriptions.create(
        {channel: "ModelUpdates::ModelChannel", id: model_id, model: model_type},
        {
          received: function(json) {
            console.log("Update from: " + json.model + "(" + json.id + ")")

            for(key in json.changes) {
              elements = $(".model-updates[data-model-updates-model='" + json.model + "'][data-model-updates-id='" + json.id + "'][data-model-updates-key='" + key + "']")
              elements.each(function() {
                element = $(this)

                if (element.data("model-updates-callback")) {
                  function_to_call = element.data("model-updates-callback")

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
})
