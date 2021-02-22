
function get_file(event) {
    var file = event.target.files;

    var file_name = file[0].name;
    var file_size = file[0].size;
    var file_type = file[0].type;

    
	const name = file_name;
	const metadata = {
	  	contentType: file_type
	};

	var storage_ref = firebase.storage().ref();
	var database_ref = firebase.database().ref('gallery');

	const task = storage_ref.child('gallery/' + name).put(file[0], metadata);

	task
	  .then(snapshot => snapshot.ref.getDownloadURL())
	  .then((url) => {
	    	console.log(url);
	    	database_ref.push({
	      		name: file_name,
	      		size: file_size,
	      		type: file_type,
	      		url: url
	    	}).then(function() {
	      		
	    	}.bind(this)).catch(function(error) {
	      		console.error('Error writing new message to Firebase Database', error);
	    	});

	  })
	  .catch(console.error);
}


function view_image(obj) {
	var file_name = $(obj).data('name');
	var file_url = $(obj).data('url');
	var file_size = $(obj).data('size');

	$("#modal_title").empty().text(file_name + '  (' + file_size + 'KB)')
	$("#img_preview").attr('src', file_url);

	$("#preview-modal").modal();
}

function delete_image(obj) {
	var image_id = $(obj).data('key');
	var image_name = $(obj).data('name');

	if (confirm("Are you sure you are going to delete image?")) {

		var del_storage_ref = firebase.storage().ref('gallery/' + image_name);
		del_storage_ref.delete().then(function() {
		  	var deleteRef = firebase.database().ref('gallery/' + image_id);
    		deleteRef.remove()
		}).catch(function(error) {
		  
		});
	}
}
var Gallery = function(){
	return {
		init: function() {
			var storage_ref = firebase.storage().ref();
			var database_ref = firebase.database().ref('gallery');

			database_ref.on('value', function(snapshot) {
			    var html = ''
			    snapshot.forEach(function(childSnapshot) {
			      	var childData = childSnapshot.val();
			      	var key = childSnapshot.key;

			      	html += '<div class="col-md-3">'+
						'<div class="gallery_wrapper">'+
							'<img src="'+ childData.url+'" data class="gallery_item img-thumbnail round" />'+
							'<div class="gallery_tool">'+
						    	'<button class="btn btn-pill" onclick="view_image(this)" data-url="'+ childData.url +'" data-name="'+ childData.name +'" data-size="'+ childData.size +'"><span><i class="fa fa-search"></i></span></button>'+
						    	'<button class="btn btn-pill" onclick="delete_image(this)" data-key="'+ childSnapshot.key +'" data-name="'+ childData.name +'"><span><i class="fa fa-trash"></i></span></button>'+
						  	'</div>'+
						'</div>'+
					'</div>';
			    });

			    $("#gallery_list").html(html);
			});
		}


	}
}();

$(document).ready(function() {
	Gallery.init();
});