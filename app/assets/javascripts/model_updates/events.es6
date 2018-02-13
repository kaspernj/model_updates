ModelUpdates.Events = class Events {
  constructor() {
    this.modelCallbacks = {}
    this.modelClassCallbacks = {}
    this.callbackData = {
      "connect_model_class": [],
      "connect_model": {}
    }
  }

  connectModel(args, callback) {
    if (!this.modelCallbacks[args.model]) {
      this.modelCallbacks[args.model] = {}
      this.callbackData["connect_model"][args.model] = []
    }

    if (!this.modelCallbacks[args.model][args.id]) {
      this.modelCallbacks[args.model][args.id] = []
      this.callbackData["connect_model"][args.model].push(args.id)
    }

    this.modelCallbacks[args.model][args.id].push(args)
  }

  connectModelClass(args, callback) {
    if (!this.modelClassCallbacks[args.model]) {
      this.modelClassCallbacks[args.model] = []
    }

    this.modelClassCallbacks[args.model].push(args)
    this.callbackData["connect_model_class"].push(args.model)
  }

  connect() {
    var events = this
    App.cable.subscriptions.create(
      {channel: "ModelUpdates::EventsChannel", callback_data: this.callbackData},
      {
        received: function(json) {
          ModelUpdates.debug("Incoming event: " + JSON.stringify(json))

          if (json.callback_type == "model") {
            events.callModelCallbacks(json)
          } else if(json.callback_type == "model_class") {
            events.callModelClassCallbacks(json)
          } else {
            console.log("Didnt know how to handle: " + JSON.stringify(json))
          }
        }
      }
    )
  }

  callModelCallbacks(args) {
    var modelClass = args.model
    var modelId = args.id
    var callbacks = this.modelCallbacks[modelClass][modelId]

    for(callbackNumber in callbacks) {
      var callback = callbacks[callbackNumber]

      if (!callback.name || callback.name == args.event_name) {
        callback.callback(args)
      }
    }
  }

  callModelClassCallbacks(args) {
    var modelClass = args.model
    var callbacks = this.modelClassCallbacks[modelClass]

    for(callbackNumber in callbacks) {
      var callback = callbacks[callbackNumber]

      if (!callback.name || callback.name == args.event_name) {
        callback.callback(args)
      }
    }
  }
}
