AFRAME.registerSystem('kastiovr', {

  init: function () {

    this.broadcastingEntities = {};
    this.entities = {};
    this.interval = config.interval || 10;
    
    this.viewerUUID = Math.random().toString(36).substring(7);
    
    this.pubnub = new PubNub({
      publishKey : 'pub-c-0a3a4a02-9bcf-4bf6-afc8-8f295146b7b6',
      subscribeKey : 'sub-c-879b184a-f4df-11e5-8916-0619f8945a4f',
      uuid: this.viewerUUID,
      presenceTimeout: 10,
      heartbeatInterval: 5
    })
  },

  spawnViewer: function (color, uuid, firstPerson = false) {
    var viewerEl = document.createElement('a-entity');

    viewerEl.setAttribute("geometry", "primitive: sphere; radius: 0.5;");
    viewerEl.setAttribute("id", uuid);
    viewerEl.setAttribute("color", color);
    viewerEl.setAttribute("position", "0 3.91 -7.96");

    viewerEl.setAttribute("viewer", "");
    
    if(firstPerson){
      viewerEl.setAttribute("camera", "");
      viewerEl.setAttribute("wasd-controls", "");
      viewerEl.setAttribute("look-controls", "");
    }
    scene.appendChild(viewerEl);
  },

  spawnCurrentViewer: function () {
    this.spawnViewer("blue", this.viewerUUID, true);
  }

  // /**
  //  * Broadcast.
  //  */
  // tick: function (time) {
  //   if (!this.firebase) { return; }

  //   var broadcastingEntities = this.broadcastingEntities;
  //   var firebaseWrapper = this.firebaseWrapper;
  //   var sceneEl = this.sceneEl;

  //   if (time - this.time < this.interval) { return; }
  //   this.time = time;

  //   Object.keys(broadcastingEntities).forEach(function broadcast (id) {
  //     var el = broadcastingEntities[id];
  //     var components = el.getAttribute('firebase-broadcast').components;
  //     var data = {};

  //     // Add components to broadcast once.
  //     if (!el.firebaseBroadcastOnce && el.getAttribute('firebase-broadcast').componentsOnce) {
  //       components = components.concat(el.getAttribute('firebase-broadcast').componentsOnce);
  //       el.firebaseBroadcastOnce = true;
  //     }

  //     // Parent.
  //     if (el.parentNode !== sceneEl) {
  //       var broadcastData = el.parentNode.getAttribute('firebase-broadcast');
  //       if (!broadcastData) { return; }  // Wait for parent to initialize.
  //       data.parentId = broadcastData.id;
  //     }

  //     // Build data.
  //     components.forEach(function getData (componentName) {
  //       data[componentName] = getComponentProperty(el, componentName, '|');
  //     });

  //     // Update entry.
  //     firebaseWrapper.updateEntity(id, data);
  //   });
  // }
});