if ($(".controller-tasks.action-index").length > 0) {
  ModelUpdates.Create.connect({model: "Task", onCreated: function(data) {
    $(".tasks-list").append($("<div/>", {
      "class": "task-element",
      "text": data.attributes.name,
      "data-task-id": data.id
    }))
  }})
}
