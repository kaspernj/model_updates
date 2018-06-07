//= require model_updates/model_updates_class
//= require model_updates/activator
//= require model_updates/create
//= require model_updates/events
//= require model_updates/formatters
//= require model_updates/update

(function() {
  ModelUpdates.update()
})()

document.addEventListener("turbolinks:load", function() {
  ModelUpdates.update()
})
