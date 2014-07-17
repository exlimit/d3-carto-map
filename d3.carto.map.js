!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.d3||(f.d3={})).carto=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports={
  "name": "d3-carto-map",
  "version": "0.2.0",
  "description": "easy layer-based maps for d3",
  "main": "d3.carto.map.js",
  "directories": {
    "example": "examples"
  },
  "scripts": {
    "test": "make test"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/emeeks/d3-carto-map"
  },
  "keywords": [
    "d3",
    "map",
    "cartography",
    "topojson",
    "geojson",
    "csv",
    "svg",
    "canvas"
  ],
  "dependencies": {
    "d3": "^3.4.10"
  },
  "browserify": {
    "transform": [
      "browserify-shim"
    ]
  },
  "browserify-shim": {
    "d3": "global:d3"
  },
  "author": "Elijah Meeks",
  "license": "Unlicense",
  "bugs": {
    "url": "https://github.com/emeeks/d3-carto-map/issues"
  },
  "homepage": "https://github.com/emeeks/d3-carto-map",
  "devDependencies": {
    "browserify": "^4.2.0",
    "browserify-shim": "^3.6.0",
    "casper-chai": "^0.2.1",
    "casperjs": "^1.1.0-beta3",
    "chai": "^1.9.1",
    "glob": "^4.0.4",
    "jshint": "^2.5.2",
    "mocha": "^1.20.1",
    "mocha-casperjs": "^0.5.0",
    "uglify-js": "^2.4.15",
    "watchify": "^0.10.2"
  }
}

},{}],2:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  map: _dereq_("./map"),
  layer: _dereq_("./layer"),
  minimap: _dereq_("./minimap"),
  version: _dereq_("../package.json").version
};

},{"../package.json":1,"./layer":3,"./map":4,"./minimap":5}],3:[function(_dereq_,module,exports){
(function (global){
"use strict";

var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);

var Layer = module.exports = function() {
    var layerPath = "";
    var layerType = "";
    var layerVisibility = true;
    var layerActive = true;
    var layerRenderMode = "canvas";
    var layerClass = "default";
    var layerLabel = "unlabeled";
    var layerXCoord = "x";
    var layerYCoord = "y";
    var layerG;
    var layerObject;
    var layerFeatures;
    var layerTileType = "mapbox";
    var layerSpecific = "all";
    var layerMarkerSize = 5;
    
    var layerDispatch = d3.dispatch('load');
    
    var layer = function() {
	
    }
    
    layer.path = function(newPath) {
	if (!arguments.length) return layerPath;
	layerPath = newPath;
	return this;
    }

    layer.type = function(newType) {
	if (!arguments.length) return layerType;
	layerType = newType;
	return this;
	
    }

    layer.visibility = function(newVisibility) {
    	if (!arguments.length) return layerVisibility;
	layerVisibility = newVisibility;
	return this;
    }

    layer.renderMode = function(newMode) {
    	if (!arguments.length) return layerRenderMode;
	layerRenderMode = newMode;
	return this;
    }

    layer.x = function(newX) {
    	if (!arguments.length) return layerXCoord;
	layerXCoord = newX;
	return this;
    }
    
    layer.y = function(newY) {
    	if (!arguments.length) return layerYCoord;
	layerYCoord = newY;
	return this;
    }
    
    layer.markerSize = function(newSize) {
    	if (!arguments.length) return layerMarkerSize;
	layerMarkerSize = newSize;
	return this;
    }

    layer.cssClass = function(newClass) {
    	if (!arguments.length) return layerClass;
	layerClass = newClass;
	return this;
    }
    
    layer.g = function(newG) {
    	if (!arguments.length) return layerG;
	layerG = newG;
	return this;
    }

    layer.object = function(newObject) {
    	if (!arguments.length) return layerObject;
	layerObject = newObject;
	layerDispatch.load();
	return this;
    }

    layer.features = function(newFeatures) {
    	if (!arguments.length) return layerFeatures;
	layerFeatures = newFeatures;
	return this;
    }
    layer.tileType = function(newType) {
    	if (!arguments.length) return layerTileType;
	layerTileType = newType;
	return this;
    }
    layer.label = function(newLabel) {
    	if (!arguments.length) return layerLabel;
	layerLabel = newLabel;
	return this;
    }
    layer.specificFeature = function(newSpecific) {
    	if (!arguments.length) return layerSpecific;
	layerSpecific = newSpecific;
	return this;
    }
    
    d3.rebind(layer, layerDispatch, "on");
    return layer;
}

Layer.topojson = function() {
    return Layer().type("topojson");
}

Layer.geojson = function() {
    return Layer().type("geojson");
}

Layer.csv = function() {
    return Layer().type("csv");
}

Layer.xyArray = function() {
    return Layer().type("xyarray");
}

Layer.featureArray = function() {
    return Layer().type("featurearray");
}

Layer.tile = function() {
    return Layer().type("tile");
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(_dereq_,module,exports){
(function (global){
"use strict";

var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null),
    Layer = _dereq_("./layer");

var Map = module.exports = function() {
    var mapSVG;
    var reprojectDiv;
    var tileSVG;
    var mapDiv;
    var canvasCanvas;
    var layerBox;
    var zoomBox;
    var mapProjection;
    var mapZoom;
    var mapCenter = [12,42];
    var mapHeight = 10;
    var mapWidth = 10;
    
    var setProjection = d3.geo.mollweide()
    .scale(450)
    .translate([600,600]);
    
    var d3MapZoomed;
    var d3MapZoomInitialize;
    var d3MapZoomComplete;
    var renderCanvas;
    
    var d3MapMode = "transform";

    var d3MapCanvasG;
    var d3MapCanvasImage;
    
    var d3MapAllLayers = [];
    
    var d3MapTileG = [];
    var d3MapTileLayer = [];
    
    var d3MapCanvasPointsData = [];

    var d3MapSVGPointsG = [];
    var d3MapSVGPointsLayer = [];

    var d3MapRasterPointsG = [];
    var d3MapRasterPointsLayer = [];
    
    var d3MapRasterFeatureG = [];
    var d3MapRasterFeatureLayer = [];

    var d3MapSVGFeatureG = [];
    var d3MapSVGFeatureLayer = [];
            
    var d3MapTile = d3.geo.tile()
    .size([10, 10]);

    var d3MapProjection;

    var d3MapPath = d3.geo.path();
    
    var d3MapZoom = d3.behavior.zoom();
    
    var tandemMapArray = [];

    function map(selectedDiv) {

    mapDiv = selectedDiv;
    
    reprojectDiv = selectedDiv.append("div").attr("id", "reprojectDiv").style("height", "100%").style("width", "100%").style("position", "absolute");
    //Multiple SVGs because we draw the tiles underneath and sandwich a canvas layer between the tiles and the interactive SVG layer
    tileSVG = selectedDiv.append("svg").attr("id", "d3TileSVG").style("height", "100%").style("width", "100%").style("position", "absolute").style("z-index", -1);
    canvasCanvas = selectedDiv.append("canvas").attr("id", "d3MapCanvas").style("height", "100%").style("width", "100%").style("pointer-events", "none")
    .attr("height", 5).attr("width", 5).style("position", "absolute").style("z-index", 0);
    mapSVG = selectedDiv.append("svg").attr("id", "d3MapSVG").style("height", "100%").style("width", "100%")
    .style("position", "absolute").style("z-index", 1)
    .call(d3MapZoom);

    d3MapCanvasImage = mapSVG.append("g").attr("id","d3MapCanvasG").append("image");
    
    layerBox = selectedDiv.insert("div", "svg").attr("id", "d3MapLayerBox");
    layerBox.append("div").attr("id", "layerBoxContent");

    zoomBox = selectedDiv.insert("div", "svg").attr("id", "d3MapZoomBox");
    
    zoomBox.selectAll("button").data(["in", "out"]).enter().append("button")
    .on("click", manualZoom).html(function(d) {return d=="in" ? "+" : "-"})
    
    map.mode("transform");
    
    updateLayers();

        //TO DO: Change this so that it appends the functionality and doesn't overwrite it
        //Or find a viable solution that recognizes <div> resizing
        var existingOnResize = d3.functor(window.onresize);
        window.onresize = function(event) {
            map.refresh();
            existingOnResize();
        }
        map.refresh();
	map.centerOn(mapCenter,"latlong",0)
	
	return this;
    }
    
    //Internal Functions

    function updateLayers() {
        layerBox.select("#layerBoxContent").selectAll("*").remove();

        var newLines = layerBox.select("#layerBoxContent").append("ul");
        
        newLines.selectAll("li.nothing").data(d3MapTileLayer).enter().append("li")
        .on("click", showHideLayer).attr("id", function(d) {return d.id});

        newLines.selectAll("li.nothing").data(d3MapSVGPointsLayer).enter().append("li")
        .on("click", showHideLayer).attr("id", function(d) {return d.id});

        newLines.selectAll("li.nothing").data(d3MapRasterPointsLayer.filter(function(d) {return !d.mixed})).enter().append("li")
        .on("click", showHideLayer).attr("id", function(d) {return d.id});

	newLines.selectAll("li.nothing").data(d3MapSVGFeatureLayer).enter().append("li")
        .on("click", showHideLayer).attr("id", function(d) {return d.id});

        newLines.selectAll("li.nothing").data(d3MapRasterFeatureLayer).enter().append("li")
        .on("click", showHideLayer).attr("id", function(d) {return d.id});
        
        newLines.selectAll("li").append("input").attr("type", "checkbox").property("checked", function(d) {return d.active});
        newLines.selectAll("li").append("span").html(function(d) {return d.name})
        
    }
    
    function showHideLayer(d,i,sentNode) {
    
    var n = sentNode || this;

    var imgUrl = canvasCanvas.node().toDataURL("image/png");
    d3MapCanvasImage.attr("xlink:href", imgUrl).style("opacity", 1);

        //TO DO: Put transitions back in by adding a transition Canvas Image
        if (!d.active) {
            d.visible = true;
            d.active = true;
	    if (d.mixed) {
		d3MapRasterPointsLayer.forEach(function(p) {
		    if (p.id == d.mixedupDup) {
			p.active = true;
			p.visible = true;
		    }
		})
	    }
	    renderTiles();
            mapDiv.select("g#" + d.id).style("opacity", 0).transition().duration(1000).style("opacity", 1);
            d3.select(n).select("input").property("checked", true);
        }
        else {
            mapDiv.select("g#" + d.id).transition().duration(1000).style("opacity", 0);
            d3.select(n).select("input").property("checked", false);
            d.visible = false;
            d.active = false;
	    if (d.mixed) {
		d3MapRasterPointsLayer.forEach(function(p) {
		    if (p.id == d.mixedupDup) {
			p.active = false;
			p.visible = false;
		    }
		})
	    }
        }
	renderCanvas("zoomcomplete");
	    d3MapCanvasImage.transition().duration(1000).style("opacity", 0);
    }

    function rebuildAttributes() {
	    for (var x in d3MapSVGPointsG) {
            d3MapSVGPointsG[x].selectAll("circle,rect,path,polygon,ellipse")
	    .each(function(d) {
		if (!d._d3Map) {
		    var sw = parseFloat(d3.select(this).style("stroke-width")) || 0;
		    var r = parseFloat(d3.select(this).attr("r")) || 0;
		    var height = parseFloat(d3.select(this).attr("height")) || 0;
		    var width = parseFloat(d3.select(this).attr("width")) || 0;
		    var x = parseFloat(d3.select(this).attr("x")) || parseFloat(d3.select(this).attr("cx")) || 0;
		    var y = parseFloat(d3.select(this).attr("y")) || parseFloat(d3.select(this).attr("cy")) || 0;
		    var fontSize = parseFloat(d3.select(this).style("font-size")) || 0;
		    var fontWeight = parseFloat(d3.select(this).style("font-weight")) || 100;
		    d._d3Map = {};
		    d._d3Map.strokeWidth = sw;
		    d._d3Map.size = r;
		    d._d3Map.height = height;
		    d._d3Map.width = width;
		    d._d3Map.x = x;
		    d._d3Map.y = y;
		    d._d3Map.fontSize = fontSize;
		    d._d3Map.fontWeight = fontWeight;
		}
	    })
            }
    }
    
    // MAP ZOOMING
    
    //Projection Zoom
    function d3MapZoomedProjection() {
	
	d3MapProjection.scale(d3MapZoom.scale()).translate(d3MapZoom.translate());
	      ///POINTS
      for (var x in d3MapSVGPointsG) {
        if (d3MapSVGPointsLayer[x].renderFrequency == "drawAlways" && d3MapSVGPointsLayer[x].active) {
            renderSVGPointsProjected(x);
        }
    }
    
        // FEATURES
        for (var x in d3MapSVGFeatureG) {
            if (d3MapSVGFeatureLayer[x].renderFrequency == "drawAlways"  && d3MapSVGFeatureLayer[x].active) {
            renderSVGFeaturesProjected(x);
            }
        }
	
	renderCanvas("zoom");

    }

    function d3MapZoomInitializeProjection() {
	for (var x in d3MapSVGPointsG) {
	    if (d3MapSVGPointsLayer[x].renderFrequency == "drawEnd" || !d3MapSVGPointsLayer[x].active) {
	        d3MapSVGPointsG[x].style("display", "none");
	    }
        }
        
        for (var x in d3MapSVGFeatureG) {
            if (d3MapSVGFeatureLayer[x].renderFrequency == "drawEnd" || !d3MapSVGFeatureLayer[x].active) {
            renderSVGFeaturesProjected[x].style("display", "none");
            }
        }
    
    mapDiv.select("#reprojectDiv").selectAll("div").remove();
	renderCanvas("zoomstart");
    
    }

    function d3MapZoomCompleteProjection() {
        
        for (var x in d3MapSVGPointsG) {
            if ((d3MapSVGPointsLayer[x].renderFrequency == "drawEnd" || d3MapSVGPointsLayer[x].renderFrequency == "drawAlways")  && d3MapSVGPointsLayer[x].active) {
            d3MapSVGPointsG[x].style("display", "block");
            renderSVGPointsProjected(x);
            }
        }

        for (var x in d3MapSVGFeatureG) {
            if ((d3MapSVGFeatureLayer[x].renderFrequency == "drawEnd" || d3MapSVGFeatureLayer[x].renderFrequency == "drawAlways")  && d3MapSVGFeatureLayer[x].active) {
            d3MapSVGFeatureG[x].style("display", "block");
            renderSVGFeaturesProjected(x);
            }
        }
	
	renderProjectedTiles();
	renderCanvas("zoomend");
     }


    function renderCanvasProjected(zoomMode) {
	var context = canvasCanvas.node().getContext("2d");
        context.clearRect(0,0,mapWidth,mapHeight);
    
        for (var x in d3MapRasterFeatureG) {
          if ((d3MapRasterFeatureLayer[x].renderFrequency == "drawAlways" || (d3MapRasterFeatureLayer[x].renderFrequency == "drawDuring" && zoomMode == "zoom")) && d3MapRasterFeatureLayer[x].active) {
            renderCanvasFeaturesProjected(x, context);
          }	
        }

        for (var x in d3MapRasterPointsG) {
	    d3MapRasterPointsLayer
          if ((d3MapRasterPointsLayer[x].renderFrequency == "drawAlways" || (d3MapRasterPointsLayer[x].renderFrequency == "drawDuring" && zoomMode == "zoom")) && d3MapRasterPointsLayer[x].active) {
            renderCanvasPointsProjected(x, context);
          }
        }
    }

        function renderCanvasFeaturesProjected(i,context) {

	var topoData = d3MapRasterFeatureG[i]

	var canvasPath = d3MapPath;
    
	for (var x in topoData) {
	    context.strokeStyle = topoData[x]._d3Map.stroke;
	    context.fillStyle = topoData[x]._d3Map.color;
	    context.lineWidth = topoData[x]._d3Map.strokeWidth;
	    context.beginPath(), canvasPath.context(context)(topoData[x]);
	    if (topoData[x]._d3Map.stroke != "none") {
		context.stroke()
	    }
	    if (topoData[x]._d3Map.color != "none") {
		context.fill();
	    }
	}
    }
    
        function renderCanvasPointsProjected(i,context) {
        for (var y in d3MapRasterPointsG[i]) {

        var projectedPoint = d3MapProjection([d3MapRasterPointsG[i][y].x,d3MapRasterPointsG[i][y].y])
        var projX = projectedPoint[0];
        var projY = projectedPoint[1];

        //Transform fill and opacity to rgba        
        var rgbMarker = d3.rgb(d3MapRasterPointsG[i][y]._d3Map.color)
        var rgbaMarker = "rgba(" + rgbMarker.r + "," + rgbMarker.g + "," + rgbMarker.b + "," + d3MapRasterPointsG[i][y]._d3Map.opacity + ")";
        
        context.beginPath();
        context.arc(projX,projY,d3MapRasterPointsG[i][y]._d3Map.size,0,2*Math.PI);
        context.fillStyle = rgbaMarker;
        context.strokeStyle = d3MapRasterPointsG[i][y]._d3Map.stroke;
        context.lineWidth = parseFloat(d3MapRasterPointsG[i][y]._d3Map.strokeWidth);
        context.stroke();
        context.fill();

      }
    }
     
    //Transform Zoom
    function d3MapZoomedTransform() {

    renderTiles();
      
      ///POINTS
      for (var x in d3MapSVGPointsG) {
        if (d3MapSVGPointsLayer[x].renderFrequency == "drawAlways" && d3MapSVGPointsLayer[x].active) {
            renderSVGPoints(x);
        }
    }
    // FEATURES
        for (var x in d3MapSVGFeatureG) {
            if (d3MapSVGFeatureLayer[x].renderFrequency == "drawAlways"  && d3MapSVGFeatureLayer[x].active) {
            renderSVGFeatures(x);
            }
        }
	
    //CANVAS RENDERING
    renderCanvas("zoom");

    for (var x in tandemMapArray) {
	if (tandemMapArray[x].type == "minimap") {
	    tandemMapArray[x].mini.updateBoundingBox(map.screenBounds());
	}
    }
    }

    function d3MapZoomInitializeTransform() {
        //TO DO: Split out the rendering into separate functions and call those with renderVector("always") or renderVector("once") and the like
        for (var x in d3MapSVGPointsG) {
        if (d3MapSVGPointsLayer[x].renderFrequency == "drawEnd" || !d3MapSVGPointsLayer[x].active) {
            d3MapSVGPointsG[x].style("display", "none");
        }
        }
        
        for (var x in d3MapSVGFeatureG) {
            if (d3MapSVGFeatureLayer[x].renderFrequency == "drawEnd" || !d3MapSVGFeatureLayer[x].active) {
            d3MapSVGFeatureG[x].style("display", "none");
            }
        }
    
    renderCanvas("zoom");

    }
    
    
    function d3MapZoomCompleteTransform() {

    renderTiles();
    renderCanvas("zoomcomplete")
        
        for (var x in d3MapSVGPointsG) {
            if ((d3MapSVGPointsLayer[x].renderFrequency == "drawEnd" || d3MapSVGPointsLayer[x].renderFrequency == "drawAlways")  && d3MapSVGPointsLayer[x].active) {
            d3MapSVGPointsG[x].style("display", "block");
            renderSVGPoints(x);
            }
        }

        for (var x in d3MapSVGFeatureG) {
            if ((d3MapSVGFeatureLayer[x].renderFrequency == "drawEnd" || d3MapSVGFeatureLayer[x].renderFrequency == "drawAlways")  && d3MapSVGFeatureLayer[x].active) {
            d3MapSVGFeatureG[x].style("display", "block");
            renderSVGFeatures(x);
            }
        }

    }
    
    function renderCanvasTransform(zoomMode) {
	var context = canvasCanvas.node().getContext("2d");
        context.clearRect(0,0,mapWidth,mapHeight);
    
        for (var x in d3MapRasterFeatureG) {
          if ((d3MapRasterFeatureLayer[x].renderFrequency == "drawAlways" || (d3MapRasterFeatureLayer[x].renderFrequency == "drawDuring" && zoomMode == "zoom")) && d3MapRasterFeatureLayer[x].active) {
            renderCanvasFeatures(x, context);
          }	
        }

        for (var x in d3MapRasterPointsG) {
	    d3MapRasterPointsLayer
          if ((d3MapRasterPointsLayer[x].renderFrequency == "drawAlways" || (d3MapRasterPointsLayer[x].renderFrequency == "drawDuring" && zoomMode == "zoom")) && d3MapRasterPointsLayer[x].active) {
            renderCanvasPoints(x, context);
          }
        }
    }
    
    function renderSVGPoints(i) {
        d3MapSVGPointsG[i]
            .attr("transform", "translate(" + d3MapZoom.translate() + ")scale(" + d3MapZoom.scale() + ")");

        d3MapSVGPointsG[i].selectAll("circle")
            .attr("r", function(d) {return d._d3Map ? scaled(d._d3Map.size) * 7.8 : 0});
            
        d3MapSVGPointsG[i].selectAll("rect,ellipse")
	    .attr("x", function(d) {return scaled(d._d3Map.x) * 7.8})
            .attr("y", function(d) {return scaled(d._d3Map.y) * 7.8})
            .attr("height", function(d) {return scaled(d._d3Map.height) * 15.6})
            .attr("width", function(d) {return scaled(d._d3Map.width) * 15.6});

	mapSVG.selectAll("text")
//	    .attr("x", function(d) {return scaled(d._d3Map.x) * 7.8})
//          .attr("y", function(d) {return scaled(d._d3Map.y) * 7.8})
            .style("font-size", function(d) {return scaled(d._d3Map.fontSize) * 7.8})
            .style("font-weight", function(d) {return scaled(d._d3Map.fontWeight) * 7.8});

    }
    
    function renderSVGFeatures(i) {
        d3MapSVGFeatureG[i]
            .attr("transform", "translate(" + d3MapZoom.translate() + ")scale(" + d3MapZoom.scale() + ")");
    }

    function renderCanvasFeatures(i,context) {

	var topoData = d3MapRasterFeatureG[i]

	var canvasProjection = d3.geo.mercator().scale(d3MapProjection.scale() * d3MapZoom.scale()).translate(d3MapZoom.translate());
	var canvasPath = d3.geo.path().projection(canvasProjection);
    
	for (var x in topoData) {
	    context.strokeStyle = topoData[x]._d3Map.stroke;
	    context.fillStyle = topoData[x]._d3Map.color;
	    context.lineWidth = topoData[x]._d3Map.strokeWidth;
	    context.beginPath(), canvasPath.context(context)(topoData[x]);
	    if (topoData[x]._d3Map.stroke != "none") {
		context.stroke()
	    }
	    if (topoData[x]._d3Map.color != "none") {
		context.fill();
	    }
	}
    }
    
    function renderCanvasPoints(i,context) {
        for (var y in d3MapRasterPointsG[i]) {

        var projectedPoint = d3MapProjection([d3MapRasterPointsG[i][y].x,d3MapRasterPointsG[i][y].y])
        var projX = projectedPoint[0] * d3MapZoom.scale() + d3MapZoom.translate()[0];
        var projY = projectedPoint[1] * d3MapZoom.scale() + d3MapZoom.translate()[1];

        //Transform fill and opacity to rgba        
        var rgbMarker = d3.rgb(d3MapRasterPointsG[i][y]._d3Map.color)
        var rgbaMarker = "rgba(" + rgbMarker.r + "," + rgbMarker.g + "," + rgbMarker.b + "," + d3MapRasterPointsG[i][y]._d3Map.opacity + ")";
        
        context.beginPath();
        context.arc(projX,projY,d3MapRasterPointsG[i][y]._d3Map.size,0,2*Math.PI);
        context.fillStyle = rgbaMarker;
        context.strokeStyle = d3MapRasterPointsG[i][y]._d3Map.stroke;
        context.lineWidth = parseFloat(d3MapRasterPointsG[i][y]._d3Map.strokeWidth);
        context.stroke();
        context.fill();

      }
    }
    
    function renderTiles() {
          //Tile drawing needs to only draw the topmost baselayer, or designate base layers through the layer control dialogue
	  if (d3MapTileLayer.length == 0) {
	    return;
	  }
  var tiles = d3MapTile
      .scale(d3MapZoom.scale())
      .translate(d3MapZoom.translate())
      ();

      for (var x in d3MapTileG) {
        if (d3MapTileLayer[x].visible) {
  var image = d3MapTileG[x]
      .attr("transform", "scale(" + tiles.scale + ")translate(" + tiles.translate + ")")
    .selectAll("image")
      .data(tiles, function(d) { return d; });

  image.exit()
      .remove();

  image.enter().append("image")
      .attr("xlink:href", function(d) { return "http://" + ["a", "b", "c", "d"][Math.random() * 4 | 0] + ".tiles.mapbox.com/v3/"+d3MapTileLayer[x].path+"/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
      .attr("width", 1)
      .attr("height", 1)
      .attr("x", function(d) { return d[0]; })
      .attr("y", function(d) { return d[1]; });
      }
      }
    }
    
    //PROJECTED RENDERING
    
        function renderSVGPointsProjected(i) {
        d3MapSVGPointsG[i]
            .attr("transform", "translate(0,0)scale(1)");
	    
	d3MapSVGPointsG[i].selectAll("g.pointG").attr("transform", function(d) {return "translate(" + d3MapProjection([d.x,d.y])+")"})

        d3MapSVGPointsG[i].selectAll("circle")
            .attr("r", function(d) {return d._d3Map ? d._d3Map.size : 0});
            
        d3MapSVGPointsG[i].selectAll("rect,ellipse")
	    .attr("x", function(d) {return d._d3Map.x})
            .attr("y", function(d) {return d._d3Map.y})
            .attr("height", function(d) {return d._d3Map.height})
            .attr("width", function(d) {return d._d3Map.width});
    }
    
        function renderSVGFeaturesProjected(i) {
        d3MapSVGFeatureG[i]
            .attr("transform", "translate(0,0) scale(1)");

        d3MapSVGFeatureG[i].selectAll("path")
	    .attr("d", d3MapPath)
    }
    
    function renderProjectedTiles() {
	  if (d3MapTileLayer.length == 0) {
	    return;
	  }
      for (var x in d3MapTileG) {
        if (d3MapTileLayer[x].visible) {

    mapDiv.select("#reprojectDiv").selectAll("div").remove();

    var layer = mapDiv.select("#reprojectDiv")
	.style("width", mapWidth + "px")
	.style("height", mapHeight + "px")
  .append("div")
    .style(prefix + "transform-origin", "0 0 0")
    .call(d3.geo.raster(d3MapProjection)
      .url("//{subdomain}.tiles.mapbox.com/v3/"+ d3MapTileLayer[x].path +"/{z}/{x}/{y}.png"));
	}
      }
    }
function manualZoom(zoomDirection) {


  if (zoomDirection == "in") {
    if (d3MapZoom.scale() >= d3MapZoom.scaleExtent()[1]) {
      return;
    }
        var newZoom = d3MapZoom.scale() * 1.5;
        var newX = ((d3MapZoom.translate()[0] - (mapWidth / 2)) * 1.5) + mapWidth / 2;
        var newY = ((d3MapZoom.translate()[1] - (mapHeight / 2)) * 1.5) + mapHeight / 2;
  }

  else {
    if (d3MapZoom.scale() <= d3MapZoom.scaleExtent()[0]) {
      return;
    }
        var newZoom = d3MapZoom.scale() * .75;
        var newX = ((d3MapZoom.translate()[0] - (mapWidth / 2)) * .75) + mapWidth / 2;
        var newY = ((d3MapZoom.translate()[1] - (mapHeight / 2)) * .75) + mapHeight / 2;    
    }

        mapSVG.call(d3MapZoom.translate([newX,newY]).scale(newZoom).event);
      }
      
      function scaled(incomingNumber) {
          return parseFloat(incomingNumber) / d3MapZoom.scale();
        }

	function cssFromClass(incomingClass) {
	    var marker = {};
        var dummyMarker = mapSVG.append("circle").attr("class", incomingClass);
        marker.markerStroke = dummyMarker.style("stroke") || "black";
        marker.markerStrokeWidth = dummyMarker.style("stroke-width") || 1;
        marker.markerFill = dummyMarker.style("fill") || "white";
        marker.markerOpacity = dummyMarker.style("opacity") || 1;
        marker.fontSize = dummyMarker.style("font-size") || 1;
        marker.fontWeight = dummyMarker.style("font-weight") || 1;
        dummyMarker.remove();
	return marker;
	}

    function processFeatures(featureData, featureLayerName, featureLayerClass, renderType, renderFrequency,cartoLayer) {
	if (!cartoLayer) {
	    cartoLayer = Layer()
	    .type("featurearray")
	    .features(featureData)
	    .label(featureLayerName)
	    .cssClass(featureLayerClass)
	    .features(featureData)
	}
	    var marker = cssFromClass(featureLayerClass);

	for (var x in featureData) {
                      featureData[x]._d3Map = {};
                      featureData[x]._d3Map.color = marker.markerFill;
		      //Override Fill for lines?
		      if (featureData[x].geometry.type == "LineString") {
                          featureData[x]._d3Map.color = "none";
		      }
                      featureData[x]._d3Map.stroke = marker.markerStroke;
                      featureData[x]._d3Map.opacity = marker.markerOpacity;
                      featureData[x]._d3Map.strokeWidth = marker.markerStrokeWidth;
	      }
	      
	      cartoLayer.features(featureData);

		    if (renderType == "canvas") {
			d3MapRasterFeatureG.push(featureData);
			var layerObj = {id: "to" + d3MapRasterFeatureLayer.length, drawOrder: d3MapRasterFeatureLayer.length, path: "", visible: true, name: featureLayerName, active: true, renderFrequency: "drawAlways"}
			d3MapRasterFeatureLayer.push(layerObj);

		    }

		    else {

                    var layerG = mapSVG.insert("g", ".points").attr("class", "features").attr("id", "to" + d3MapSVGFeatureLayer.length);
                    d3MapSVGFeatureG.push(layerG);
                    var layerObj = {id: "to" + d3MapSVGFeatureLayer.length, drawOrder: d3MapSVGFeatureLayer.length, path: "", visible: true, name: featureLayerName, active: true, renderFrequency: "drawAlways"}
                    d3MapSVGFeatureLayer.push(layerObj)
                    layerG.attr("transform", "translate(" + d3MapZoom.translate() + ")scale(" + d3MapZoom.scale() + ")");
		    cartoLayer.g(layerG);
  
                  layerG.selectAll("g")
                  .data(featureData)
                  .enter()
                  .append("g")
                  .attr("class", featureLayerClass)
		  .append("path")
                  .attr("class", featureLayerClass)
                  .attr("d", d3MapPath)
		    }
		    d3MapAllLayers.push(cartoLayer)
		    cartoLayer.object(layerObj);
            d3MapZoomComplete();
	    updateLayers();
	    
	}

    function processXYFeatures(points, newCSVLayerName, newCSVLayerClass, markerSize, renderType, xcoord, ycoord, renderFrequency,cartoLayer) {
    	var rFreq = renderFrequency || "mixed";
        var cName = newCSVLayerName || "CSV " + d3Layer.length
        var cID = "cps" + d3MapSVGPointsLayer.length;
        var ccID = "cpc" + d3MapRasterPointsLayer.length;

	if (!cartoLayer) {
	    cartoLayer = Layer()
	    .type("xyarray")
	    .features(points)
	    .label(newCSVLayerName)
	    .cssClass(newCSVLayerClass)
	    .markerSize(markerSize)
	    .x(xcoord)
	    .y(ycoord)
	}
	
        if (renderType == "canvas") {
        var pointsObj = {id: ccID, drawOrder: d3MapRasterPointsLayer.length, path: "", visible: true, name: cName, active: true, renderFrequency: "drawAlways", mixed: false}
            d3MapRasterPointsLayer.push(pointsObj);
        }
        else if (renderType == "svg") {
        var pointsObj = {id: cID, drawOrder: d3MapSVGPointsLayer.length, path: "", visible: true, name: cName, active: true, renderFrequency: "drawAlways", mixed: false}
            d3MapSVGPointsLayer.push(pointsObj);
        }
        else if (renderType == "mixed") {
        var pointsObj = {id: ccID, path: "",drawOrder: d3MapRasterPointsLayer.length, visible: true, name: cName, active: true, renderFrequency: "drawDuring", mixed: true, mixedDup: cID}
            d3MapRasterPointsLayer.push(pointsObj);
        var pointsObj = {id: cID, path: "",drawOrder: d3MapSVGPointsLayer.length, visible: true, name: cName, active: true, renderFrequency: "drawEnd", mixed: true, mixedDup: ccID}
            d3MapSVGPointsLayer.push(pointsObj);
        }

            //To access CSS properties
	    var marker = cssFromClass(newCSVLayerClass);
        
          for (var x in points) {
            if(points[x]) {
              //Create and store fixed display data in the _d3Map object
              points[x]._d3Map = {};
              points[x]._d3Map.color = marker.markerFill;
              points[x]._d3Map.stroke = marker.markerStroke;
              points[x]._d3Map.opacity = marker.markerOpacity;
              points[x]._d3Map.strokeWidth = marker.markerStrokeWidth;
              points[x]._d3Map.fontSize = marker.fontSize;
              points[x]._d3Map.fontWeight = marker.fontWeight;
              points[x]._d3Map.size = markerSize;
              points[x]._d3Map.x = points[x][xcoord];
              points[x]._d3Map.y = points[x][ycoord];
            }
          }

	  cartoLayer.features(points);
        if (renderType == "canvas" || renderType == "mixed") {
            d3MapRasterPointsG.push(points);
        }
        if (renderType == "svg" || renderType == "mixed") {
        var pointsG = mapSVG.append("g").attr("class", "points").attr("id", cID);
        d3MapSVGPointsG.push(pointsG);
	cartoLayer.g(pointsG);
	pointsG.attr("transform", "translate(" + d3MapZoom.translate() + ")scale(" + d3MapZoom.scale() + ")");
  
  var appendedPointsEnter = pointsG.selectAll("g.blank")
  .data(points)
  .enter()
  .append("g")
  .attr("id", function(d,i) {return newCSVLayerClass + "_g_" + i})
  .attr("class", newCSVLayerClass + " pointG")
  .attr("transform", function(d) {return "translate(" + d3MapProjection([d._d3Map.x,d._d3Map.y]) + ")scale(" + d3MapProjection.scale() + ")"})
  .style("cursor", "pointer")

  .each(function(d) {
    d._d3Map.originalTranslate = "translate(" + d3MapProjection([d._d3Map.x,d._d3Map.y]) + ")scale(" + d3MapProjection.scale() + ")";
  });
  
  appendedPointsEnter
  .append("circle")
  .attr("class", newCSVLayerClass);
        }

	    d3MapAllLayers.push(cartoLayer)
	    cartoLayer.object(pointsObj);
            d3MapZoomed();        
	    updateLayers();
    }

    function d3MapAddTileLayer(newTileLayer, newTileLayerName, tileType, disabled, cartoLayer) {
        
	var tName = newTileLayerName || "Raster " + d3MapTileLayer.length
        var tPosition = d3MapTileLayer.length;
        var tID = "tl" + d3MapTileLayer.length;
        var tObj = {id: tID, drawOrder: d3MapTileLayer.length, path: newTileLayer, visible: true, name: tName, active: true, renderFrequency: "drawAlways"};
	var tG = tileSVG.insert("g", tID).attr("class", "tiles").attr("id", tID);
        d3MapTileLayer.push(tObj);
        d3MapTileG.push(tG);

        if (disabled) {
            updateLayers();
            showHideLayer(tObj,tPosition,mapDiv.select("li#" + tID).node())
        }
        else {
            d3MapZoomed();
        }
        updateLayers();
	
	if (cartoLayer) {
	    cartoLayer.g(tG);
	    cartoLayer.object(tObj);
	}
	else {
	    cartoLayer = Layer()
	    .path(newTileLayer)
	    .label(tName)
	    .tileType(tileType)
	    .visibility(disabled)
	    .g(tG)
	    .object(tObj);
	}
	d3MapAllLayers.push(cartoLayer);
    }
    
    function d3MapAddCSVLayer(newCSVLayer, newCSVLayerName, newCSVLayerClass, markerSize, renderType, xcoord, ycoord, renderFrequency,cartoLayer) {

	if (!cartoLayer) {
	    cartoLayer = Layer()
	    .type("csv")
	    .path(newCSVLayer)
	    .label(newCSVLayerName)
	    .cssClass(newCSVLayerClass)
	}
	
	d3.csv(newCSVLayer, function(error, points) {
	    processXYFeatures(points, newCSVLayerName, newCSVLayerClass, markerSize, renderType, xcoord, ycoord, renderFrequency,cartoLayer)
        })
	}

    function d3MapAddTopoJSONLayer(newTopoLayer, newTopoLayerName, newTopoLayerClass, renderType, specificFeature, renderFrequency,cartoLayer) {

	
        d3.json(newTopoLayer, function(error, topoData) {

	    var layerDataType = "topojson";

            for (var x in topoData.objects) {
                if (x == specificFeature || specificFeature == "all") {
	if (!cartoLayer) {
	    cartoLayer = Layer()
	    .type("topojson")
	    .path(newTopoLayer)
	    .label(newTopoLayerName)
	    .cssClass(newTopoLayerClass)
	}
		    
		    var topoLayerData = topojson.feature(topoData, topoData.objects[x]).features;
		    processFeatures(topoLayerData, newTopoLayerName, newTopoLayerClass, renderType, renderFrequency,cartoLayer);
		    
                }
            }
        })
}

	function d3MapAddGeoJSONLayer(newGeoLayer, newGeoLayerName, newGeoLayerClass, renderType, specificFeature, renderFrequency,cartoLayer){
	var layerDataType = "geojson";

	if (!cartoLayer) {
	    cartoLayer = Layer()
	    .type("geojson")
	    .path(newGeoLayer)
	    .label(newGeoLayerName)
	    .cssClass(newGeoLayerClass)
	}

        d3.json(newGeoLayer, function(error, geoData) {
	    processFeatures(geoData.features, newGeoLayerName, newGeoLayerClass, renderType, renderFrequency,cartoLayer);
        })
	}

    //Exposed Functions
    
    map.aFunction = function (incomingData) {
        if (!arguments.length) return false;
        
        return this;
    }
    map.addCartoLayer = function (cartoLayer) {
	switch (cartoLayer.type()) {
	    case "tile":
		d3MapAddTileLayer(cartoLayer.path(),cartoLayer.label(),cartoLayer.tileType(),!cartoLayer.visibility(),cartoLayer)
		break;
	    case "csv":
		d3MapAddCSVLayer(cartoLayer.path(), cartoLayer.label(), cartoLayer.cssClass(), cartoLayer.markerSize(), cartoLayer.renderMode(), cartoLayer.x(), cartoLayer.y(), "drawAlways",cartoLayer) 
		break;
	    case "topojson":
		d3MapAddTopoJSONLayer(cartoLayer.path(), cartoLayer.label(), cartoLayer.cssClass(), cartoLayer.renderMode(), cartoLayer.specificFeature(), "drawAlways",cartoLayer)
		break;
	    case "geojson":
		d3MapAddGeoJSONLayer(cartoLayer.path(), cartoLayer.label(), cartoLayer.cssClass(), cartoLayer.renderMode(), cartoLayer.specificFeature(), "drawAlways",cartoLayer)
		break;
	    case "xyarray":
		processXYFeatures(cartoLayer.features(), cartoLayer.label(), cartoLayer.cssClass(), cartoLayer.markerSize(), cartoLayer.renderMode(), cartoLayer.x(), cartoLayer.y(), "drawAlways",cartoLayer)
		break;
	    case "featurearray":
		processFeatures(cartoLayer.features(), cartoLayer.label(), cartoLayer.cssClass(),cartoLayer.renderMode(), "drawAlways",cartoLayer)
		break;
	    default:
	    return false;
	}
	for (var x in tandemMapArray) {
	    var newCartoLayer = new d3.carto.layer;
	    var layerFunctions = ["path","type","visibility","renderMode","x","y","markerSize","cssClass","g","object","features","tileType","specificFeature"];
	    for (var i in layerFunctions) {
		newCartoLayer[layerFunctions[i]](cartoLayer[layerFunctions[i]]());
	    }
	    if (tandemMapArray[x].forceCanvas) {
		newCartoLayer.renderMode("canvas")
	    }
	    tandemMapArray[x].map.addCartoLayer(newCartoLayer);
	}
	return this;
    }

    map.addTileLayer = function (newTileLayer, newTileLayerName, tileType, disabled) {
        if (!arguments.length) return false;

        var tDisabled = disabled || false;
	
	d3MapAddTileLayer(newTileLayer, newTileLayerName, tileType, tDisabled);
        return this;
    }
    
    map.addCSVLayer = function (newCSVLayer, newCSVLayerName, newCSVLayerClass, markerSize, renderType, xcoord, ycoord, renderFrequency) {
        //TO DO: Render Type "mixed" creates two layers, a canvas layer drawnAlways and an SVG layer drawnOnce
        if (!arguments.length) return false;

	d3MapAddCSVLayer(newCSVLayer, newCSVLayerName, newCSVLayerClass, markerSize, renderType, xcoord, ycoord, renderFrequency);
	return this;
    
    }
    
    map.addXYLayer = function (dataArray, newCSVLayerName, newCSVLayerClass, markerSize, renderType, xcoord, ycoord, renderFrequency) {
        //TO DO: Render Type "mixed" creates two layers, a canvas layer drawnAlways and an SVG layer drawnOnce
        if (!arguments.length) return false;

	processXYFeatures(dataArray, newCSVLayerName, newCSVLayerClass, markerSize, renderType, xcoord, ycoord, renderFrequency)
	
	return this;
    
    }

    map.addTopoJSONLayer = function (newTopoLayer, newTopoLayerName, newTopoLayerClass, renderType, specificFeature, renderFrequency) {
        if (!arguments.length) return false;
	d3MapAddTopoJSONLayer(newTopoLayer, newTopoLayerName, newTopoLayerClass, renderType, specificFeature, renderFrequency);
	return this;    
    }    

    map.addGeoJSONLayer = function (newGeoLayer, newGeoLayerName, newGeoLayerClass, renderType, specificFeature, renderFrequency) {
	if (!arguments.length) return false;
	d3MapAddGeoJSONLayer(newGeoLayer, newGeoLayerName, newGeoLayerClass, renderType, specificFeature, renderFrequency)
	return this;	
    }

    map.addFeatureLayer = function (featureArray, newLayerName, newLayerClass, renderType, renderFrequency) {
	    var layerDataType = "featurearray";

	    processFeatures(featureArray, newLayerName, newLayerClass, renderType, renderFrequency);
	    
    }
    // #map.getLayerAttributes("layerName")
    
    map.center = function (newCenter) {
        if (!arguments.length) return mapCenter;
        mapCenter = newCenter;
        return this;
    }
    
    map.centerOn = function (newSetCenter, type, transitionSpeed) {
        var tSpeed = transitionSpeed || 0;
        if (!arguments.length) return false;

	var projectedCenter = newSetCenter;

	if (type == "latlong") {
            var projectedCenter = d3MapProjection(newSetCenter);
	}

        var s = d3MapZoom.scale();
        var t = [mapWidth / 2 - (s * projectedCenter[0]), mapHeight / 2 - (s * projectedCenter[1])];

        if (tSpeed == 0) {
        mapSVG
            .call(d3MapZoom.translate(t).scale(s).event);
        }
        else {
        mapSVG.transition()
            .duration(tSpeed)
            .call(d3MapZoom.translate(t).scale(s).event);            
        }

        return this;
    }
    
    map.zoomTo = function (boundingBox, type, margin, transitionSpeed) {

        if (!arguments.length) return false;

	var m = margin || .9;
        var tSpeed = transitionSpeed || 0;

	if (type == "latlong") {
            boundingBox = [d3MapProjection(boundingBox[0]),d3MapProjection(boundingBox[1])];
	}
	
      var dx = boundingBox[1][0] - boundingBox[0][0],
      dy = boundingBox[1][1] - boundingBox[0][1],
      x = (boundingBox[0][0] + boundingBox[1][0]) / 2,
      y = (boundingBox[0][1] + boundingBox[1][1]) / 2,
      s = m / Math.max(dx / mapWidth, dy / mapHeight),
      t = [mapWidth / 2 - s * x, mapHeight / 2 - s * y];

        if (tSpeed == 0) {
            mapSVG
                .call(d3MapZoom.translate(t).scale(s).event);
        }
        else {
	    mapSVG.transition()
              .duration(transitionSpeed)
              .call(d3MapZoom.translate(t).scale(s).event);
	}
        return this;
    }

    map.screenBounds = function () {

    var s = d3MapZoom.scale(),
    t = d3MapZoom.translate();
    
    var b1 = map.projection().invert([-t[0]/s,-t[1]/s])
    var b2 = map.projection().invert([(mapWidth- t[0]) / s,-(t[1] - mapHeight) / s])

    return [b1,b2]

    }

    map.zoom = function (newZoom) {
        if (!arguments.length) return d3MapZoom;
        d3MapZoom = newZoom;
        return this;
    }

    map.projection = function (newProjection) {
        if (!arguments.length) return d3MapProjection;
	var newScale = newProjection.scale();
	var newTranslate = newProjection.translate();	
        d3MapProjection = newProjection;
	d3MapZoom.scale(newScale).translate(newTranslate);
	d3MapPath.projection(d3MapProjection);
        return this;
    }
    
    map.refresh = function() {
	mapHeight = parseFloat(mapSVG.node().clientHeight || mapSVG.node().parentNode.clientHeight);
	mapWidth = parseFloat(mapSVG.node().clientWidth || mapSVG.node().parentNode.clientWidth);
	d3MapTile.size([mapWidth, mapHeight]);
        canvasCanvas.attr("height", mapHeight).attr("width", mapWidth).style("height",mapHeight + "px").style("width", mapWidth + "px")
        d3MapCanvasImage.attr("height", mapHeight).attr("width", mapWidth).style("height",mapHeight + "px").style("width", mapWidth + "px")
	rebuildAttributes();
        d3MapZoomComplete();
	return this;
    }
    
    map.setScale = function(newScale) {
        if (!arguments.length) return d3MapZoom.scale();
	
	newScale += 9;

	var s = (1 << newScale) / d3MapZoom.scale();
	var newZoom = d3MapZoom.scale() * s;
        var newX = ((d3MapZoom.translate()[0] - (mapWidth / 2)) * s) + mapWidth / 2;
        var newY = ((d3MapZoom.translate()[1] - (mapHeight / 2)) * s) + mapHeight / 2;    

        mapSVG.call(d3MapZoom.translate([newX,newY]).scale(newZoom).event);
	return this;

    }
    
    map.mode = function(newMode) {
	if (!arguments.length) return d3MapMode;
	if (newMode == "projection") {
	    d3MapProjection = setProjection;
	    
	    d3MapPath
		.projection(d3MapProjection);
		
	    d3MapZoom
		.scale(d3MapProjection.scale())
		.scaleExtent([1, 15052461])
		.translate(d3MapProjection.translate());
		
	    d3MapZoomed = d3MapZoomedProjection;
	    d3MapZoomInitialize = d3MapZoomInitializeProjection;
	    d3MapZoomComplete = d3MapZoomCompleteProjection;
	    renderCanvas = renderCanvasProjected;
	    //Adjust g and so on
	    mapSVG.selectAll("g.features,g.points").attr("transform", "translate(0,0) scale(1)")
	    
	    tileSVG.style("display", "none");
	    //rescale stroke-width and size
	}
	else if (newMode == "transform") {
	    d3MapZoomed = d3MapZoomedTransform;
	    d3MapZoomInitialize = d3MapZoomInitializeTransform;
	    d3MapZoomComplete = d3MapZoomCompleteTransform;
	    renderCanvas = renderCanvasTransform;
	    
	    d3MapProjection = d3.geo.mercator()
		.scale((1 << 13) / 2 / Math.PI)
		.scale(4096)
		.translate([5, 5]);

	    d3MapPath
		.projection(d3MapProjection);

	    var c = d3MapProjection(mapCenter);
    
	    d3MapZoom
		.scale(d3MapProjection.scale() * 2 * Math.PI)
		.scaleExtent([700, 15052461])
		.translate([mapWidth - c[0], mapHeight - c[1]]);
    
	    d3MapProjection
		.scale(1 / 2 / Math.PI)
		.translate([0, 0]);
		
	    tileSVG.style("display", "block");
	}
	else {
	    return false;
	}
	d3MapZoom
	    .on("zoom", d3MapZoomed)
	    .on("zoomstart", d3MapZoomInitialize)
	    .on("zoomend", d3MapZoomComplete)
	    
	d3MapMode = newMode;
	map.refresh();
	return this;

    }
    
    map.layers = function() {
	return d3MapAllLayers;
    }
    
    map.zoomable = function(_on) {
	if(_on) {
	    if (d3MapMode == "transform") {
		d3MapZoomed = d3MapZoomedTransform;
		d3MapZoomInitialize = d3MapZoomInitializeTransform;
		d3MapZoomComplete = d3MapZoomCompleteTransform;
	    }
	    else {
		d3MapZoomed = d3MapZoomedProjection;
		d3MapZoomInitialize = d3MapZoomInitializeProjection;
		d3MapZoomComplete = d3MapZoomCompleteProjection;
	    }
	    d3MapZoom
	    .on("zoom", d3MapZoomed)
	    .on("zoomstart", d3MapZoomInitialize)
	    .on("zoomend", d3MapZoomComplete)
	}
	else{
	    d3MapZoom
	    .on("zoom", null)
	    .on("zoomstart", null)
	    .on("zoomend", null)
	    }
	    return this;
    }
    
    map.div = function() {
	return mapDiv;
    }
    
    map.pushLayers = function(otherMap, miniMap, forceCanvas, otherType) {
	tandemMapArray.push({map: otherMap, mini: miniMap, forceCanvas: forceCanvas, type: otherType});
	return this;
    }

    return map;
}
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./layer":3}],5:[function(_dereq_,module,exports){
(function (global){
"use strict";

var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null),
    Map = _dereq_("./map"),
    Layer = _dereq_("./layer");

var minimap = module.exports = function() {
    
    var d3Minimap,
	d3MiniDiv;
    
    
    function d3CartoMiniMap(selectedDiv) {
	var newD3Minimap = d3.carto.map();
	d3MiniDiv = selectedDiv;
	d3MiniDiv.call(newD3Minimap);
	
	d3Minimap = newD3Minimap;
	
	newD3Minimap
	.zoomable(false)
	.setScale(2)
	.refresh();
	
	d3MiniDiv.select("#d3MapSVG").append("rect")
	.attr("height", 20)
	.attr("width", 50)
	.attr("x", 20)
	.attr("y", 20)
	.attr("class", "minimap-extent")

	d3CartoMiniMap.hideControls(true);
    }

    d3CartoMiniMap.map = function(newMap) {
	if (!arguments.length) return d3Minimap;
	d3Minimap = newMap;
	return this;

    }
    
    d3CartoMiniMap.tandem = function(cartoMap) {
	cartoMap.pushLayers(d3Minimap, d3CartoMiniMap, true, "minimap");
	return this;
    }

    d3CartoMiniMap.duplicate = function(cartoMap) {
	var incLayers = cartoMap.layers();
	for (var x in incLayers) {
	    var cartoLayer = incLayers[x]
		console.log(cartoLayer.type());
	    switch(cartoLayer.type()) {
		case "tile":
		d3Minimap.addTileLayer(cartoLayer.path(),cartoLayer.label(),cartoLayer.tileType(),!cartoLayer.visibility(),cartoLayer)
		break;
	    case "csv":
		d3Minimap.addXYLayer(cartoLayer.features(), cartoLayer.label(), cartoLayer.cssClass(), cartoLayer.markerSize(), "canvas", cartoLayer.x(), cartoLayer.y(), "drawAlways",cartoLayer)
		break;
	    case "topojson":
		d3Minimap.addFeatureLayer(cartoLayer.features(), cartoLayer.label(), cartoLayer.cssClass(),"canvas", "drawAlways",cartoLayer)
		break;
	    case "geojson":
		d3Minimap.addFeatureLayer(cartoLayer.features(), cartoLayer.label(), cartoLayer.cssClass(),"canvas", "drawAlways",cartoLayer)
		break;
	    case "xyarray":
		d3Minimap.addXYLayer(cartoLayer.features(), cartoLayer.label(), cartoLayer.cssClass(), "canvas", cartoLayer.renderMode(), cartoLayer.x(), cartoLayer.y(), "drawAlways",cartoLayer)
		break;
	    case "featurearray":
		d3Minimap.addFeatureLayer(cartoLayer.features(), cartoLayer.label(), cartoLayer.cssClass(),"canvas", "drawAlways",cartoLayer)
		break;
	    default:
		break;
	    }
	}
	d3Minimap.refresh();
	return this;
    }
    
    d3CartoMiniMap.hideControls = function(hide) {
	if (hide) {
	    d3Minimap.div().select("#d3MapLayerBox").style("display", "none");
	    d3Minimap.div().select("#d3MapZoomBox").style("display", "none");
	}
	else {
	    d3Minimap.div().select("#d3MapLayerBox").style("display", "none");
	    d3Minimap.div().select("#d3MapZoomBox").style("display", "none");	    
	}
	return this;
    }
    
    d3CartoMiniMap.updateBoundingBox = function(bounds) {
	
	var b1 = d3Minimap.projection()(bounds[0]);
	var b2 = d3Minimap.projection()(bounds[1]);
	var s = d3Minimap.zoom().scale();
	var t = d3Minimap.zoom().translate();

	var x = (b1[0] * s) + t[0];
	var y = (b1[1] * s) + t[1];
	var x2 = (b2[0] * s) + t[0];
	var y2 = (b2[1] * s) + t[1];
	var w = x2 - x;
	var h = y2 - y;

	d3MiniDiv.select("rect.minimap-extent")
	.attr("x", x)
	.attr("y", y)
	.attr("width", w)
	.attr("height", h);

	return this;
    }
    
    return d3CartoMiniMap;
}
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./layer":3,"./map":4}]},{},[2])
(2)
});