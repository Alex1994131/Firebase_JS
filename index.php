<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Image Gallery</title>

  <link rel = "stylesheet" href = "http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"/>

  <link rel="stylesheet" type="text/css" href="./assets/css/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="./assets/css/fontAwesome/font-awesome.min.css" />
  <link rel="stylesheet" type="text/css" href="./assets/css/custom.css" />
</head>
<body>
	<div class="content">
		<div class="container">
			<div class="row page-header">
				<div class="col-md-12">
					<h2 class="page-title">Image Gallery</h2>		
				</div>
			</div>
			<div class="row" id="gallery_list"></div>
			<div class="row">
				<div class="col-md-12">
					<input id="new_message_image" type="file" style="display:none" size="2000000" onchange="get_file(event)">
					<div class="form-group">
						<button id="image_upload" class="btn btn-primary" onclick="$('#new_message_image').focus().trigger('click');">Upload Image</button>	
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal" id="preview-modal">
	  	<div class="modal-dialog modal-xl">
		    <div class="modal-content">
				<div class="modal-header">
		        	<h4 class="modal-title" id="modal_title"></h4>
		        	<button type="button" class="close" data-dismiss="modal">&times;</button>
		      	</div>

		      	<div class="modal-body">
		        	<img src="" class="img_preview" id="img_preview" />
		      	</div>
		     	<div class="modal-footer">
		        	<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
		      	</div>
		    </div>
  		</div>
	</div>
</body>

<script src="./assets/js/jquery.min.js"></script>
<script src="./assets/js/bootstrap.min.js"></script>
<script src="./assets/js/jquery-ui.js"></script>

<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-analytics.js"></script>

<script src="./assets/script/gallery.js"></script>

<script src="./assets/script/firebase-init.js"></script>
</html>