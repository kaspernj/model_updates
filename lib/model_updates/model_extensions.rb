module ModelUpdates::ModelExtensions
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def model_updates_data
      @_model_updates ||= {}
    end

    def model_updates_broadcast_attributes(args)
      model_updates_data[:attributes] = args.fetch(:attributes)

      # Need to remember what changes before callbacks, since it might get changed by gems like AwesomeNestedSet before after_commit is called
      before_save on: :update do
        attribute_changes = {}

        args.fetch(:attributes).each do |attribute_name|
          method_changed = "#{attribute_name}_changed?"
          next if respond_to?(method_changed) && !__send__(method_changed)
          attribute_changes[attribute_name] = __send__(attribute_name)
        end

        @_model_updates_changes = attribute_changes
      end

      after_commit on: :update do |model|
        attribute_changes = @_model_updates_changes
        @_model_updates_changes = nil

        if attribute_changes.any?
          ModelUpdates::UpdateChannel.broadcast_to(
            model,
            id: id,
            model: model.class.name,
            changes: attribute_changes
          )
        end
      end
    end

    def model_updates_broadcast_created
      after_commit on: :create do |model|
        channel_name = "ModelUpdatesCreate#{model.class.name}"

        attributes = {}
        model.class.model_updates_data[:attributes].each do |attribute_name|
          attributes[attribute_name] = __send__(attribute_name)
        end

        ActionCable.server.broadcast(
          channel_name,
          id: id,
          attributes: attributes
        )
      end
    end

    def model_updates_broadcast_destroyed
      after_commit on: :destroy do |model|
        attributes = {}
        model.class.model_updates_data[:attributes].each do |attribute_name|
          attributes[attribute_name] = __send__(attribute_name)
        end

        ModelUpdates::DestroyChannel.broadcast_to(
          model,
          id: id,
          model: model.class.name,
          attributes: attributes
        )
      end
    end
  end

  def model_updates_attrs(key, more = {})
    attrs = {
      model_updates_id: id,
      model_updates_model: self.class.name,
      model_updates_key: key
    }

    more.each do |hash_key, hash_value|
      attrs["model_updates_#{hash_key}"] = hash_value
    end

    attrs
  end

  def model_updates_data_attrs(key, more = {})
    {
      id: id,
      model: self.class.name,
      key: key
    }.merge(more)
  end
end
