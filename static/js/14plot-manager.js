function addPlotCollapse(){
	var collapseContainer =getWalkThroughCollapseContainerID(); 
    addCollapse(collapseContainer,'plot-collapse-label','plot-collapse-div','PLOTS','<i class="fa fa-crosshairs  mx-1" aria-hidden="true"></i>',true,``,'LEGEND of the layers displayed on the map')
    addAccordianContainer('plot-collapse-div','plots-accordian')
    // $('#legend-collapse-div').append(`<legend-list   id="legend"></legend-list>`)
    // $('#plot-collapse-div').append(`<select multiple class = 'form-control bg-black flexcroll' id="plot-list"></select>`);
    // $('#legend-collapse-div').append(`<div id="legend-reference-layer-list"></div>`)
}
function addPlotProjectAccordian(name){
	var nameID = name.replaceAll(' ','-');
	addSubAccordianCard('plots-accordian',nameID+'-accordian-label',nameID+'-accordian-div',name,`<select multiple class = 'bg-white flexcroll' id="${nameID}-plot-list"></select>`,false,``,'Click to expand plot project');
}
function addPlotgeoJSON(plotGeoJSONPath){
	map.data.loadGeoJson(plotGeoJSONPath);
	map.data.setStyle({fillOpacity: 0,strokeColor:'#F00'});
}
function loadPlots(plotProjectObj){
	if(plotProjectObj['plotIDField'] === null || plotProjectObj['plotIDField'] === undefined){plotProjectObj['plotIDField'] = 'PLOTID'}
	addPlotProjectAccordian(plotProjectObj.name)
	fetch(plotProjectObj.path)
  	.then(response => response.json())
  	.then(json => json.features.map(function(f){
  		f.name = plotProjectObj.name;
  		f.properties.PLOTID = f.properties[plotProjectObj['plotIDField']];
			addPlot(f)
  	}));
  	 addPlotgeoJSON(plotProjectObj.path)
}
function addPlot(obj){
	// console.log(obj);
	$('#'+obj.name.replaceAll(' ','-')+'-plot-list').append(`
		<option onclick = 'synchronousCenterObject(${JSON.stringify(obj.geometry)})'>${obj.properties.PLOTID}</option>
		`)
}

function loadAllPlots(){plotsGeoJSONs.map(function(p){
	loadPlots(p)
	})};
////////////////////////////////////////////////////////
var r4PlotsJson = {name:'Region 4',path:'./geojson/region4_sample_9strata_NEW_g_albers_30m_box.json','plotIDField':'PLOTID'};
var mls = {name:'Manti La Sal',path:'./geojson/LCMS_Sample_1000k_MLSNF_5km_g_albers_30m_box.json','plotIDField':'FID_1'};
var bt = {name:'Bridger-Teton',path:'./geojson/LCMS_Sample_1000k_BTNF_g_albers_30m_box.json','plotIDField':'FID_1'};
var fnf = {name:'Flathead',path:'./geojson/LCMS_Sample_1000k_FNF_GNP_g_albers_30m_box.json','plotIDField':'FID_1'};
var plotsGeoJSONs = [r4PlotsJson,mls,bt,fnf];

