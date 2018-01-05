// JavaScript functions on Object.prototype

// derives(Child, Parent) derives a Child class from Parent class
Object.prototype.derives = function derives(ChildClass, ParentClass) {
  if (ChildClass instanceof Function) {
    ChildClass.inherits(ParentClass);
  } else {
    throw new TypeError("ChildClass must be a Function.");
  }
}

// inherits(Parent) on Object.prototype
Object.prototype.inherits = function inheritsFromClass(Parent) {
  if (this instanceof Function) {
    if (Parent instanceof Function) {
      function F() {}
      F.prototype = Parent.prototype;
      this.prototype = new F();
      this.prototype.constructor = this;
      this.prototype.parentClass = Parent.prototype;
      this.parent = Parent.prototype;
    }
    else {
      throw new TypeError("Cannot inherit from a non-class (Function) object.");
    }
  } else {
    throw new TypeError("Only a class (Function object) can inherits.");
  }
}

// getMembers() on Object.prototype
Object.prototype.getMembers = function getInstanceMembers(byClass, byInstance, excludeFunction) {
  var members = [];
  for(var member in this) {
    var all = !byClass && !byInstance;
    var filtering = byClass || byInstance;
    var byInstanceOnly = this.hasOwnProperty(member);
    var byClassOnly = this.constructor.prototype.hasOwnProperty(member);

    if (filtering && !byClass && !byInstanceOnly) continue;
    if (filtering && !byInstance && !byClassOnly) continue;
    if (filtering && !byClassOnly && !byInstanceOnly) continue;

    if (!excludeFunction || typeof this[member] != 'function')
    {
      members.push(member);
    }
  }
  return members;
}

// hasProperty() on Object.prototype
Object.prototype.hasProperty = function hasProperty(prop, excludeFunction) {
  // this function can be simplified by just one line -
  //   return (prop in this) && (!excludeFunction || typeof this[prop] != 'function')
  // the following is for demonstration only
  var result = false;
  if (!prop) return false;
  if (this.hasOwnProperty(prop)) {
    result = true;
  } else {
    var constructor = this.constructor;
    do {
      if (constructor.hasOwnProperty(prop)) {
        result = true;
        break;
      }
    } while(constructor != Function.constructor);
  }
  return result && (!excludeFunction || typeof this[prop] != 'function');
}

// toClassType() on Object.prototype
Object.prototype.toClassType = function toClassType() {
  var matches = this.constructor.toString().match(/function (.+)\(/);
  return matches.length > 1 ? matches[1] : 'unknown';
}

// toType() on Object.prototype
Object.prototype.toType = function toType() {
  return ({}).toString.call(this).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

function toType(variable) {
  return ({}).toString.call(variable).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

// traverse() on Object.prototype
Object.prototype.traverse = function traverse(func) {
  if (toType(func) == 'function') {
    if (this.toType() == "object") {
      for(var key in this) {
        func.apply(this, [key, this[key]]);
        if (this[key] !== null && this[key].toType() == "object") {
          this[key].traverse(func);
        }
      }
    }
  }
}

// updateBy() on Object.prototype
Object.prototype.updateBy = function updateBy(data) {
  if (data != null && this !== data) {
    var sourceType = this.toType();
    var targetType = data.toType();

    if (sourceType != targetType) {
      var message = "Cannot update '" + sourceType + "' with different type " + targetType;
      throw new Error(message);
    }
    else if (sourceType == 'object') {
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          if (this.hasOwnProperty(key) && data[key] != null) {
            var thisType = toType(this[key]);
            var thatType = toType(data[key]);
            if (thisType == 'object' && thisType == thatType && this[key] != null) {
              console.log("updating this[" + key + "] object ... ");
              this[key].updateBy(data[key]);
            }
            else {
              console.log("updating this[" + key + "] = " + JSON.stringify(data[key]));
              this[key] = data[key];
            }
          }
          else if (!this.hasOwnProperty(key)) {
            this[key] = data[key];
          }
          else {
            delete this[key];
          }
        }
      }
      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          if (!data.hasOwnProperty(key) || data[key] == null) {
            delete this[key];
          }
        }
      }
    }
    else {
      throw new Error("Does not support updating type of " + thisType);
    }
  }
}

// JavaScript promise constructor
const createPromise = (apiURL, method, args) => new Promise(
  (resolves, rejects) => {
    const params = args.reduce((a, p) => (p == '' ? '' : '&') + `${a.key=a.val}`), '')
    const api = `${apiURL}?${params}`
    const req = new XMLHttpRequest()

    req.open(method, api)
    req.onload = () => (req.status === 200) ?
      resolves(JSON.parse(request.response).results) :
      reject(Error(req.statusText))
    req.onerror = (err) => rejects(err)
    req.send()
  })
