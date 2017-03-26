var m = require('mithril');
var vm = require('./tasks');

//an empty Mithril component
var taskList = {
    controller: function() {},
    view: function() {}
}

m.mount(document.body, vm)

//
// m.mount(document.body, {
//   view: function() { return m('p', 'Hello, world.') }
// });
