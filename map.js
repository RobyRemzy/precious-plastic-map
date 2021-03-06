// Leaflet Map

// set the map tiles layer aspect
var tileLayer = new L.TileLayer(
	'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		'attribution':
		'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}
);

// init the map params on map div
var map = new L.Map('map', {
	'center': [45.8, -5.8],
	'zoom': 3,
	'layers': [tileLayer]
});

// setup map options here

var ppIcon = L.icon({
	iconUrl: 'images/icon.png',
	// iconSize: [50, 50], // size of the icon
	popupAnchor:  [25, 0] // point from which the popup should open relative to the iconAnchor
});

var corePop = 'Capital Apartments.';
var poiPopupcss = {
	'className': 'uiconPopupcss' // see css/index.css
};

var marker = L.marker(
	[52.3707599, 4.889869200000021],
	{icon: ppIcon})
	.addTo(map)
	.bindPopup(corePop, poiPopupcss);


// locate module
var lc = L.control.locate({
	position: 'topleft',
	flyTo: true,
	drawCircle: false,
	drawMarker: false,
	locateOptions: {
		maxZoom: 12
	},
	strings: {
		title: "Locate Precious Plastic near me"
	}
}).addTo(map);
// on page load locate me
lc.start();

// geocoder
var geocoder = L.Control.geocoder({
	defaultMarkGeocode: false
})
.on('markgeocode', function(e) {
	var bbox = e.geocode.bbox;
	var poly = L.polygon([
		bbox.getSouthEast(),
		bbox.getNorthEast(),
		bbox.getNorthWest(),
		bbox.getSouthWest()
	])
.addTo(map);
	map.fitBounds(poly.getBounds());
})
.addTo(map);
