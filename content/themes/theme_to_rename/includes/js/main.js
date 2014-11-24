/**
 * Site-specfic JS code
 *
 * @author Knowmad 
 */
_tk = function() {
  var init = function() {
    $( document ).ready( bindUIActions );
  };

/**
 * Bind all your event handlers in this function
 *
 * @author Knowmad 
 */
  var bindUIActions = function() {
    // add event bindings here

    // put the cursor at the end of the first text box
    var el = $("input:text").get(0);
    var elemLen = el.value.length;

    el.selectionStart = elemLen;
    el.selectionEnd = elemLen;
    el.focus();

  };

/**
 * Use this empty function template as a base to write your event handlers
 *
 * @author Knowmad 
 */
  var sample_function = function( event ) {
    event.preventDefault();
    // put your custom code here
  };

  return{
    init: init,
    bindUIActions: bindUIActions,
    sample_function: sample_function
  };

}();

_tk.init();
