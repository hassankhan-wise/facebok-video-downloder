async function fbVideoDownload() {
	var vid_url = jQuery('#fb_url').val();

	if(vid_url != '' && vid_url.replace(/\s/g, "") != "") {

		jQuery('#result').hide();
		jQuery('#download').attr('disabled', 'disabled');
		jQuery('#download .spinner-grow').show();
		jQuery('#download .text').text('Download ...');
		
		var formData = new FormData();
		formData.append('url', vid_url);

		var response = await fetch('system/fb.php', {
			method: 'POST',
			body: formData
		});

		var res = await response.json();
		console.log(res);
		var links = res.links;

		if (res.success) {

			if(res.title) {
				jQuery('#video-title').html(res.title);
			}

			jQuery('#result').show();

			links !== undefined && Object.keys(links).forEach(function (key) {
				if(key == 'Download Low Quality') {

					jQuery('#download-normal').attr('href', links[key]);
					jQuery('.video').html(`<source src="${links[key]}" type="video/mp4" />`);
					// jQuery('.video source').attr('src', links[key])
				} else if(key == 'Download High Quality') {

					jQuery('#download-high').attr('href', links[key]);
					jQuery('.video').html(`<source src="${links[key]}" type="video/mp4" />`);
					// jQuery('.video source').attr('src', links[key])
				}
			})
		} else {
			jQuery('#result').hide()
			alert(res.message)
		}

		jQuery('#download').removeAttr('disabled');
		jQuery('#download .spinner-grow').hide();
		jQuery('#download .text').text('Download');
	}
}