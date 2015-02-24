$(document).ready(function() {
//Check to see if we are on a record page.
  if ($('div.additionalCopies table#bib_items').length || $('div.bibDisplayItemsMain table#bib_items').length) {
// Get all the locations and put them in the variable sptest.
	  var spTest = '';
	  $('tr.bibItemsEntry td:nth-child(1) a').each(function() {
		  spTest = spTest + (this);
	  });
// Get the values from the page that we will need to build the URL parameters for Aeon.
	  var aeonBase = 'https://aeon.library.ucsc.edu/Logon/?Action=10&Form=30&ItemTitle=' ;
	  var aeonTitle = ( $('div#bibTitle td.bibInfoData').text().replace(/&/g, 'and').replace(/[^\w',.:;\- ]/g, '') );
	  var aeonAuthor = ( $('div#bibAuthor td.bibInfoData').text().replace(/&/g, 'and').replace(/[^\w',.:;\- ]/g, '') );
	  var aeonPub = ( $('div#bibPublisher td.bibInfoData').text().replace(/&/g, 'and').replace(/[^\w',.:;\- ]/g, '') );
	  var aeonEdition = ( $('div#bibEdition td.bibInfoData:eq(0)').text().replace(/[^\w',.:;\- ]/g, '') );
	  var aeonBibnum = ($('#recordnum').attr('href').slice(0,-3).split('='));
	  aeonBibnum = aeonBibnum[1] + 'a';
	  var oacLink = ( $('div.bibDisplayUrls td').text() );
// If one or more of the locations contains a Spec Coll URL...
	  if (spTest.indexOf('http://library.ucsc.edu/locations/spec-coll') >= 0 && oacLink.indexOf('OAC finding aid') < 1) {
// ...add table cells to acommodate the Aeon link.
		  $( '<th>Request&nbsp;&nbsp;</th>' ).insertAfter( 'tr.bibItemsHeader th:last-child' );
		  $( '<td></td>' ).insertAfter( 'tr.bibItemsEntry td:last-child' );
// Then, for each tr that contains the Spec Coll URL... 
		  $( 'tr.bibItemsEntry td:nth-child(1) a' ).each(function( ) {
			  var locUrl = ( $(this).attr('href') );
			  var aeonLoc = ( $(this).text() );
			  if(locUrl == 'http://library.ucsc.edu/locations/spec-coll') {
// ... add the parameters to the Aeon URL...
				  var aeonUrl = aeonBase + aeonTitle ;
				  var aeonCallnum = ( $(this).closest('tr').children('td:nth-child(2)').text().replace(/[^\w',.:;\- ]/g, '') ); 
				  if (aeonAuthor) { var aeonUrl = aeonUrl + "&" + "author=" + aeonAuthor; };
				  if (aeonPub) { var aeonUrl = aeonUrl + "&" + "ItemPlace=" + aeonPub; };
				  if (aeonEdition) { var aeonUrl = aeonUrl + "&" + "ItemEdition=" + aeonEdition; };
				  if (aeonBibnum) { var aeonUrl = aeonUrl + "&" + "ReferenceNumber=" + aeonBibnum; };
				  if (aeonLoc) { var aeonUrl = aeonUrl + "&" + "Location=" + aeonLoc; };
				  if (aeonCallnum) { var aeonUrl = aeonUrl + "&" + "CallNumber=" + aeonCallnum; };
// ...and put the Aeon URL in the newly created td for each Spec Coll tr.
				  $(this).closest('tr').children().last().html( '<a target="_blank" href="' + aeonUrl + '">Spec Coll Request</a>' );
			  }
		  });
	  }
  }
});