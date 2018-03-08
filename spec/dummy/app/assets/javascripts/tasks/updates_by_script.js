if ($(".controller-tasks.action-updates-by-script").length > 0) {
  var taskElement = $(".task-element")
  var taskId = taskElement.data("task-id")

  ModelUpdates.connectChanged("Task", taskId, function(data) {
    $(".task-element").text(data.changes.name)
  })
  ModelUpdates.update()
}
