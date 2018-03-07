if ($(".controller-tasks.action-events").length > 0) {
  console.log("Connecting to event")

  var eventContent = $(".event-content")

  ModelUpdates.connectModel("Task", eventContent.data("task-id"), "test-event", function(data) {
    eventContent.append($("<div/>", {
      "class": "task-element",
      "data-task-id": data.id,
      "text": data.text
    }))
  })
  ModelUpdates.connectEvents()
}
