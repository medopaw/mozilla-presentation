// Called in myFileInput.onchange or myForm.onsubmit
var file = myFileInput.files[0];
// Read in selected file
var reader = new FileReader();
reader.onload = function(evt) {
  myPreview.title = file.name;
  myPreview.src = evt.target.result;
  // Or as style
  var style = 'url(' + evt.target.result + ')';
  myPreview.style.backgroundImage = style;
};
reader.readAsDataURL(file);