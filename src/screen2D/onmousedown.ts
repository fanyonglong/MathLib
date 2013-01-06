// ### Screen.prototype.onmousedown()
// Handles the mousedown event
//
// *@param {event}*
onmousedown(evt) {
  // Only start the action if the left mouse button was clicked
  if (evt.button !== 0) {
    return;
  }


  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;

  // Pan mode
  if(this.interaction.allowPan) {
    this.interaction.type = 'pan'
    this.interaction.startPoint = this.getEventPoint(evt);
    this.interaction.startTransformation = this.transformation.copy();
  }
}