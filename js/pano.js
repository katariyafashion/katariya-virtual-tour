// Katariya Fashion Virtual Tour - pano.js
// Requires marzipano.js in the HTML

var viewer = new Marzipano.Viewer(document.getElementById('pano'));

var scenes = {};

function createScene(id, title) {
  var source = Marzipano.ImageUrlSource.fromString(
    "scenes/" + id + ".jpg"
  );
  var geometry = new Marzipano.EquirectGeometry([{
    width: 4000
  }]);
  var limiter = Marzipano.RectilinearView.limit.traditional(1024, 100*Math.PI/180);
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

createScene("outside", "Outside View");
createScene("mainhall", "Main Hall");
createScene("dress_material", "Dress Material Section");
createScene("pant_set_reception", "Pant Set Reception");
createScene("pant_set_department", "Pant Set Department");
createScene("kurtis_upstairs", "Short Kurtis (Upstairs)");
createScene("kurti_downstairs", "Long Kurtis (Downstairs)");

// Start with 'outside'
scenes["outside"].scene.switchTo();

// ✅ Global scene switch function for navigation buttons
window.gotoScene = function(id) {
  if (scenes[id]) {
    scenes[id].scene.switchTo();
  } else {
    console.warn("Scene not found:", id);
  }
};
