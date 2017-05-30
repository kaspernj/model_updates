module ModelUpdates::ModelExtensions
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def model_updates_broadcast_attributes(args)
      after_save do
        changes = {}

        args.fetch(:attributes).each do |attribute_name|
          if Rails::VERSION::MAJOR >= 5 && Rails::VERSION::MINOR >= 1
            method_changed = "saved_change_to_#{attribute_name}?"
          else
            method_changed = "#{attribute_name}_changed?"
          end

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
