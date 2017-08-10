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
      ModelUpdates.Update.connect({
        "id": model_id,
        "model": model_type
      })
    }
  }
})
