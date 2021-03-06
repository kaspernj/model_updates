# ModelUpdates

Rails gem to push updates through models into the frontend through ActionCable easily like this:

JavaScript:
```js
ModelUpdates.connectModel("User", userId, "changed-name", function(args) {
  console.log("User changed his name to: " + args.new_name)
})
```

Ruby:
```ruby
user = User.find(user_id)
user.model_updates_call("changed-name", new_name: "test")
```

## Installation
Add this line to your application's Gemfile:

```ruby
gem 'model_updates'
```

And then execute:
```bash
$ bundle
```

Or install it yourself as:
```bash
$ gem install model_updates
```

Include it in your JavaScript:

```javascript
//= require model_updates
```

Include the helper in your models:

```ruby
class ApplicationRecord < ActiveRecord::Base
  include ModelUpdates::ModelExtensions
end
```

Add required CanCan access methods to your `ApplicationCable::Channel`:
```ruby
class ApplicationCable::Channel < ActionCable::Channel::Base
private

  # Used to authorize which resources the user can read from (security)
  def current_ability
    @_current_ability ||= CanCanAbility.new(user: current_user)
  end

  # Get user from Devise
  def current_user
    @_current_user ||= env["warden"].user
  end
end
```

In order to get the current user with Devise, you also have to add the following `config/initializers/warden_hooks.rb`:
```ruby
Warden::Manager.after_set_user do |user, auth, opts|
  scope = opts[:scope]
  auth.cookies.signed["#{scope}.id"] = user.id
  auth.cookies.signed["#{scope}.expires_at"] = 70.minutes.from_now
end
```

Choose which attributes should be broadcasted automatically:

```ruby
class Model < ApplicationRecord
  model_updates_broadcast_attributes attributes: [:updated_at]
end
```

If you also want creates broadcasted:
```ruby
class Model < ApplicationRecord
  model_updates_broadcast_attributes attributes: [:updated_at]
  model_updates_broadcast_created
end
```

Or destroys:
```ruby
class Model < ApplicationRecord
  model_updates_broadcast_attributes attributes: [:updated_at]
  model_updates_broadcast_destroyed
end
```

## Usage

Update content on page live automatically

Do like this in your views if you are using HAML to receive automatic updates:

```haml
.model-updates{data: {model_updates: model.model_updates_data_attrs(:updated_at)}}
  = model.updated_at
```

Or like this in ERB:

```erb
<div class="model-updates" data-model-updates-model="Model" data-model-updates-id="1" data-model-updates-key="updated_at">
  <%= model.updated_at %>
</div>
```

Now that element should update automatically when the model is changed

## Callbacks

### Updates

You can also do a callback, once the value is changed.

```erb
<div class="model-updates" data-model-updates-model="Model" data-model-updates-id="1" data-model-updates-key="updated_at" data-model-updates-callback="myCallback">
  <%= model.updated_at %>
</div>
```

```js
function myCallback(data) {
  if (data.value == "something") {
    data.element.innerText = "Test: " + data.value
  } else {
    data.element.innerText = data.value
  }
}
```

The data element is formatted like this:
```
data = {
  changes: "A hash of all the registered changes (multiple attributes might by updated than just the one subscribed to in the same update call)",
  element: "Your original element with the class 'model-updates'",
  id: "The ID of the model",
  key: "The key (attribute name) which was updated",
  value: "The new value of the attribute"
}
```

You can also do this with pure JavaScript instead of tags like this:

```js
ModelUpdates.connectChanged("Task", taskId, function(data) {
  $(".task-element").text(data.changes.name)
})
ModelUpdates.update()
```

### Creates

You can receive create callbacks like this:

```js
ModelUpdates.Create.connect({model: "MyModel", onCreated: function(data) {
  console.log("New MyModel was created with ID: " + data.id)
})
```

### Destroys

If you want an element automatically removed on destroy:
```erb
<div class="model-updates" data-model-updates-model="<%= model.class.name %>" data-model-updates-id="<%= model.id %>" data-model-updates-remove-on-destroy="true">
  <%= model.updated_at %>
</div>
```

You can also manually listen when a model gets destroyed:
```js
ModelUpdates.Destroy.connect({
  "id": data.id,
  "model": "BuildCommandExecution",
  "onDestroyed": function(data) {
    console.log("Model destroyed: " + data.id)
  }
})
```

### Live updating new elements added dynamically after page load

You can refresh elements with a simple call like this:

```js
ModelUpdates.update()
```

## Events

Call an event on a specific model:
```ruby
user = User.find(user_id)
user.model_updates_call("changed-name", new_name: "test")
```

Connect to a specific model:
```js
ModelUpdates.connectModel("User", userId, "changed-name", function(args) {
  console.log("User changed his name to: " + args.new_name)
})
```

Call an event on a model class:
```ruby
User.model_updates_call("changed-name", new_name: "test")
```

Connect to events called on a models class:
```js
ModelUpdates.connectModelClass("User", "changed-name", function(args) {
  console.log("Someone his name to: " + args.new_name)
})
```

Call this at the end of your JavaScript, which will actually connect to all the defined events in a batched way:
```js
ModelUpdates.connectEvents()
```

### Debugging

In case you want to enable debug output from ModelUpdates from JavaScript:
```js
ModelUpdates.configuration.debug = true
```

## Contributing

Contribution directions go here.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
