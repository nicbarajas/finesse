/*
* FINESSE
* Simple: Tweaks objects to fit on a standard pixel grid, for web design purposes
* Known Issue: Forces use of pixels
*/

//set to false to hide annoying alerts
var debug = false;


//checks if a doc is open
if ( app.documents.length > 0 ){
    main();
} else {
    alert("Please open a file before using Roundhouse")
}


//main loop
function main() {
    var docRef = app.activeDocument;

    //set units to pixels just to be safe
    with(docRef.viewPreferences){
        if (debug) alert(docRef.viewPreferences.horizontalMeasurementUnits);
        horizontalMeasurementUnits = MeasurementUnits.pixels;
        verticalMeasurementUnits = MeasurementUnits.pixels;
    }
        
    //loop through pageItems
    var myPageItems = app.selection;
    
    for (var j = 0; j < myPageItems.length; j++ ) {
        if (!(myPageItems[j].locked)) // Skip locked objects
            {
                var k = myPageItems[j].constructor.name;
                if (debug) alert(k);
                if (k == 'TextFrame') myPageItems[j].fit(FitOptions.frameToContent); // Fit text frame to content
                roundPageItem(myPageItems[j],k); // Round object dimensions
            }
    }
    
}


//main rounding function
function roundPageItem(pageItem,itemType) {
    
    if (debug) alert('Old dimensions\n'+ pageItem.visibleBounds);
    
    //get and round all pageItem points
    var y1 = Math.round(pageItem.visibleBounds[0]);
    var x1 = Math.round(pageItem.visibleBounds[1]);
    var y2 = Math.round(pageItem.visibleBounds[2]);
    var x2 = Math.round(pageItem.visibleBounds[3]);
    
    //update pageItem points
    
    pageItem.visibleBounds = [y1,x1,y2,x2];
    if (itemType == 'TextFrame' && pageItem.overflows) { pageItem.visibleBounds = [y1,x1,y2+1,x2+1] }
    if (debug) alert('New dimensions\n'+ pageItem.visibleBounds);
}
