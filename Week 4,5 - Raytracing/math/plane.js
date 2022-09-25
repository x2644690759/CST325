/* A type representing an implicit plane.
 *
 * @param normal A Vector3 object representing the normal direction of the plane
 * @param validPoint A Vector3 object representing any point that lies on the plane (you choose)
 */
var Plane = function(normal, validPoint, color) {
  // sanity checks -----------
  if (!(this instanceof Plane)) {
    console.error("Plane constructor must be called with the new operator");
  }

  if (normal === undefined) {
    normal = new Vector3(0, 1, 0);
  }

  if (validPoint === undefined) {
    validPoint = new Vector3();
  }

  if(color === undefined){
	color = new Vector3(1,1,1);
  }

  if (!(normal instanceof Vector3)) {
    console.error("The plane normal must be a Vector3");
  }

  if (!(validPoint instanceof Vector3)) {
    console.error("The plane valid point must be a Vector3");
  }

	this.normal = normal.clone().normalize();
	this.validPoint = validPoint;
	this.color = color;
}

Plane.prototype = {
  //----------------------------------------------------------------------------- 
	raycast: function(ray) {
		var numerator = this.normal.dot(this.validPoint) - (this.normal.dot(ray.origin));
		var denominator = this.normal.dot(ray.direction);

		var alpha = numerator / denominator;

		if (alpha > 0 && this.normal.dot(ray.direction) < 0) {
			var hitPoint = ray.origin.clone().add(ray.direction.clone().multiplyScalar(alpha));
			return {
				hit: true,
				point: hitPoint,
				normal: this.normal,
				distance: alpha
			};
		} else {
			return { hit: false }
		}
	}
}

// EOF 00100001-10