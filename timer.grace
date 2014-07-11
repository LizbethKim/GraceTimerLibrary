import "control" as control

inherits delegateTo(control)

// An action which uses local state to determine whether a timer should
// continue.
type Predicate = Action<Boolean>

// An action which uses local state to decide how long a timer should run for.
type TimeBlock = Action<Number>

// The type of this module.
type Animator = {
  // Repeatedly execute action while condition is true, pausing pauseTime
  // milliseconds between iterations
  while (condition : Predicate) pausing (pauseTime : Number) do (action : Action) -> Done

  // Repeatedly execute action while condition is true, pausing pauseTime between
  // iterations. When condition fails, execute endblock
  while (condition : Predicate) pausing (pauseTime : Number) do (action : Action)
      finally(endAction : Action) -> Done

  // Repeatedly execute action while condition is true pausing variable amoutns of
  // time (obtained by evaluating timeBlock) between iterations. When condition
  // fails, execute endAction
  while (condition : Predicate) pauseVarying (timeBlock) do (action : Action) -> Done

  // Repeatedly execute action for each value in range while condition is true
  for (range : Range) pausing (pauseTime : Number) do (action : Action<Number, Done>) -> Done

  // Repeatedly executes action for each value in range while condition is true.
  // When condition fails, execute endAction
  for (range : Range) pausing (pauseTime : Number) do (action : Action<Number, Done>)
      finally (endAction : Action) -> Done

  // Executes the action after a given time interval
  //
  // Requesting stop on the timer will stop the timer.
  after (time : Number) do (action : Action) -> Timer

  // Executes the action every given time interval
  //
  // Requesting stop on the timer will stop the timer.
  every (time : Number) do (action : Action) -> Timer
}


// Repeatedly execute action every pauseTime milliseconds between iterations
// while condition is true
method while (condition : Predicate)
    pausing (pauseTime : Number) do (action : Action) -> Done {
  def timed = control.every(pauseTime) do {
    if (condition.apply) then {
      action.apply
    } else {
      timed.stop
    }
  }
}

// Repeatedly execute action while condition is true, pausing by pauseTime
// between iterations. When condition fails, execute endAction
method while (condition : Predicate) pausing (pauseTime : Number) do (action : Action)
    finally (endAction : Action) -> Done {
  def timed = control.every(pauseTime) do {
    if (condition.apply) then {
      action.apply
    } else {
      timed.stop
      endAction.apply
    }
  }
}

// Repeatedly execute action while condition is true, evaluating timeBlock and
// pausing between iterations. When condition fails, executes endAction
method while (condition : Predicate) pauseVarying (timeBlock : TimeBlock) do
    (action : Action) -> Done {
  if (condition.apply) then {
    action.apply
    control.after(timeBlock.apply) do {
      while (condition) pauseVarying (timeBlock) do (action)
    }
  }
}

// Repeatedly execute action for each value in range, pausing pauseTime between
// iterations. Action should take a numeric value as a parameter.
method for(range : Range)
    pausing(pauseTime : Number) do(action : Function<Number, Done>) -> Done {
  def it = range.iterator
  while {it.hasMore} pausing (pauseTime) do {action.apply(it.next)}
}

// Repeatedly execute action for each value in range, pausing pauseTime between
// iterations. Action should take a numeric value as a parameter. When condition
// fails, execute endAction
method for(range : Range) pausing (pauseTime) do (action : Function<Number, Done>)
    finally (endAction : Action) -> Done {
  def it = range.iterator
  while {it.hasMore} pausing (pauseTime) do {action.apply(it.next)}
    finally(endAction)
  }
def asString : String = "timer"

