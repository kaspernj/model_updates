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
.model-updates{data: model.model_updates_data_attrs(:updated_at)}
  = model.updated_at
```

Or like this in ERB:

```erb
<div class="model-updates" data-model-updates-model="Model" data-model-updates-id="1" data-model-updates-key="updated_at">
  <%= model.updated_at %>
</div>
```

Now that element should update automatically when the model is changed


## Contributing

Contribution directions go here.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
