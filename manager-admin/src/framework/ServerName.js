export default (_name_) => (target, name, descriptor) => {
  let value = descriptor.initializer && descriptor.initializer.call(this)
  if (!target.constructor.__serverName__) {
    Object.defineProperty(target.constructor, '__serverName__', {
      value: {},
      enumerable: false,
      writeable: true,
      configurable: true
    })
  }
  target.constructor.__serverName__[name] = _name_
  return descriptor
}
