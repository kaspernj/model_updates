class ApplicationCable::Channel < ActionCable::Channel::Base
private

  def authorize!(*_args)
    # Do nothing
  end

  def can?(*_args)
    true
  end
end
