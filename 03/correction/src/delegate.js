export function delegate(container, eventType, targetSelector, handler) {
  function delegatedHandler(event) {
    let target = event.target

    if (!target.matches(targetSelector)) {
      return
    }

    handler(event)
  }

  container.addEventListener(eventType, delegatedHandler)

  function off() {
    container.removeEventListener(eventType, delegatedHandler)
  }

  return off
}
