module ModelUpdates::ModelExtensions
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def model_updates_broadcast_attributes(args)
      after_save do
        changes = {}

        args.fetch(:attributes).each do |attribute_name|
          method_changed = "#{attribute_name}_changed?"
          next unless __send__(method_changed)
          changes[attribute_name] = __send__(attribute_name)
        end

        if changes.any?
          ModelUpdates::ModelChannel.broadcast_to(
            self,
            id: id,
            model: self.class.name,
            changes: changes
          )
        end
      end
    end
  end

  def model_updates_data_attrs(key, more = {})
    {
      id: id,
      model: self.class.name,
      key: key
    }.merge(more)
  end
end
