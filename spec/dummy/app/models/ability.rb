class Ability
  include CanCan::Ability

  def initialize
    can :read, Task
  end
end
