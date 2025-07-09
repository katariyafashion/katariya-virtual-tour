var viewer = new Marzipano.Viewer(document.getElementById('pano'));

var scenes = {};

function createScene(id, title) {
  var source = Marzipano.ImageUrlSource.fromString("scenes/" + id + ".jpg");
  var geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
  var limiter = Marzipano.RectilinearView.limit.traditional(1024, 100 * Math.PI / 180);
  var view = new Marzipano.RectilinearView(null, limiter);
  var scene = viewer.createScene({
    source: source,
    geometry: geometry,
    view: view,
    pinFirstLevel: true
  });
  scenes[id] = {
    id: id,
    title: title,
    scene: scene,
    view: view
  };
}

var sceneList = [
  "outside",
  "mainhall",
  "dress_material",
  "pant_set_reception",
  "pant_set_department",
  "kurtis_upstairs",
  "kurti_downstairs"
];

sceneList.forEach(function(id) {
  createScene(id, id);
});

// Load first scene
scenes["outside"].scene.switchTo();

// Make navigation function global
window.gotoScene = function(id) {
  if (scenes[id]) {
    scenes[id].scene.switchTo();
  } else {
    alert("Scene not found: " + id);
  }
};
