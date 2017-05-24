class ModuleUpdates::AttributeGenerator
  def self.generate(args)
    data_attributes = {
      "model-updates-id" => args.fetch(:model).id,
      "model-updates-key" => args.fetch(:key),
      "model-updates-model" => args.fetch(:model).class.name
    }

    data_attributes.merge!(args.fetch(:attributes)) if args[:attributes]
    data_attributes
  end

  def self.short(args)
    data_attributes = {
      "id" => args.fetch(:model).id,
      "key" => args.fetch(:key),
      "model" => args.fetch(:model).class.name
    }

    data_attributes.merge!(args.fetch(:attributes)) if args[:attributes]
    data_attributes
  end
end
