/**
* @Params type: {String} iconName - A helper method to create symbols similar to icon using css. As of now 2 icons are created.
* More icons to be added.
* @return type { Node } arrowNode - Returns the left and right pointer long arrow icon[created with css].
*/

function createIcon(iconName) {

    if(iconName == 'left-arrow') {
      return createLeftArrowIcon();
    }
  
    if(iconName == 'right-arrow') {
      return createRightArrowIcon();
    }
  }
  
  function createLeftArrowIcon(iconName) {
    var arrowNode = document.createElement('div');
    arrowNode.setAttribute('class', "arrow");
    var lineNode = document.createElement('div');
    lineNode.setAttribute('class', "line");
    var pointNode = document.createElement('div');
    pointNode.setAttribute('class', "point-left");
    arrowNode.appendChild(lineNode);
    arrowNode.appendChild(pointNode);
    return arrowNode;
  }
  
  function createRightArrowIcon(iconName) {
    var arrowNode = document.createElement('div');
    arrowNode.setAttribute('class', "arrow");
    var lineNode = document.createElement('div');
    lineNode.setAttribute('class', "line");
    var pointNode = document.createElement('div');
    pointNode.setAttribute('class', "point-right");
    arrowNode.appendChild(lineNode);
    arrowNode.appendChild(pointNode);
    return arrowNode;
  }


  export default createIcon;