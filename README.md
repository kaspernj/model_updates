# ModelUpdates

Rails gem to push updates to models into the frontend through ActionCable.


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


## Usage

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

Choose which attributes should be broadcasted automatically:

```ruby
class Model < ApplicationRecord
  model_updates_broadcast_attributes attributes: [:updated_at]
end
```

Do like this in your views if you are using HAML:

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

You can also do a callback, once the value is changed.

```erb
<div class="model-updates" data-model-updates-model="Model" data-model-updates-id="1" data-model-updates-key="updated_at" data-model-updates-callback="myCallback">
  <%= model.updated_at %>
</div>
```

```js
function myCallback(data) {
  if (data.value == "something") {
    data.element.text("Test: " + data.value)
  } else {
    data.element.text(data.value)
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

## Contributing

Contribution directions go here.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
