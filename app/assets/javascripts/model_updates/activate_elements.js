$(document).ready(function() {
  // Find all models that should be subscribed to
  modelSubscriptions = {}
  modelDestroys = {}

  $(".model-updates").each(function() {
    element = $(this)

    model = element.data("model-updates-model")
    id = element.data("model-updates-id")

    if (!modelSubscriptions[model])
      modelSubscriptions[model] = {}

    if (element.data("model-updates-key"))
      modelSubscriptions[model][id] = true

    if (element.data("model-updates-remove-on-destroy")) {
      if (!modelDestroys[model])
        modelDestroys[model] = {}

      modelDestroys[model][id] = true
    }
  })

  // Subscribe to the found models
  for(var model in modelSubscriptions) {
    for(var id in modelSubscriptions[model]) {
      ModelUpdates.Update.connect({
        "id": id,
        "model": model
      })
    }
  }

  for(var model in modelDestroys) {
    for(id in modelDestroys[model]) {
      ModelUpdates.Destroy.connect({
        "id": id,
        "model": model
      })
    }
  }
})
