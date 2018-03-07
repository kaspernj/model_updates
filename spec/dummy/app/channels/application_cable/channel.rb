class ApplicationCable::Channel < ActionCable::Channel::Base
private

  def current_ability
    @current_ability ||= Ability.new
  end
end
