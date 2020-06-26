

function screenCap(){
	console.log("should take a screencap");
	var c = document.querySelector('.distortion');
	var t = c.getContext('2d');
	window.open('', document.getElementById('the_canvas_element_id').toDataURL());
}