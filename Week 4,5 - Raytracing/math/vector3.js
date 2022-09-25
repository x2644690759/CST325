/*
 * An "object" representing a 3d vector to make operations simple and concise.
 *
 * Similar to how we work with plain numbers, we will work with vectors as
 * an entity unto itself.  Note the syntax below: var Vector3 = function...
 * This is different than you might be used to in most programming languages.
 * Here, the function is meant to be instantiated rather than called and the
 * instantiation process IS similar to other object oriented languages => new Vector3()
 */

var Vector3 = function(x, y, z) {


  this.x = x; this.y = y; this.z = z;

  // Sanity check to prevent accidentally using this as a normal function call
  if (!(this instanceof Vector3)) {
    console.error("Vector3 constructor must be called with the 'new' operator");
  }

  // todo - make sure to set a default value in case x, y, or z is not passed in
  if(x==undefined){
    this.x=0;
  }else{
    this.x=x;
  }

  if(y==undefined){
    this.y=0;
  }else{
    this.y=y;
  }

  if(z==undefined){
    this.z=0;
  }else{
    this.z=z;
  }
}

Vector3.prototype = {

  //----------------------------------------------------------------------------- 
  set: function(x, y, z) {
    // todo set 'this' object's values to those from x, y, and z
    this.x=x;
    this.y=y;
    this.z=z;
    return this;
  },

  //----------------------------------------------------------------------------- 
  clone: function() {
    return new Vector3(this.x, this.y, this.z);
  },

  //----------------------------------------------------------------------------- 
  copy: function(other) {
    // copy the values from other into 'this'
    this.x=other.x;
    this.y=other.y;
    this.z=other.z;
    return this;
  },

  //----------------------------------------------------------------------------- 
  negate: function() {
    // multiply 'this' vector by -1
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x=-this.x;
    this.y=-this.y;
    this.z=-this.z;
    return this;
  },

  //----------------------------------------------------------------------------- 
  add: function(v) {
    // todo - add v to 'this' vector
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x+=v.x;
    this.y+=v.y;
    this.z+=v.z;

    return this;
  },

  //----------------------------------------------------------------------------- 
  subtract: function(v) {
    // todo - subtract v from 'this' vector
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x-=v.x;
    this.y-=v.y;
    this.z-=v.z;

    return this;
  },

  //----------------------------------------------------------------------------- 
  multiplyScalar: function(scalar) {
    // multiply 'this' vector by "scalar"
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x*=scalar;
    this.y*=scalar;
    this.z*=scalar;

    return this;
  },

  //----------------------------------------------------------------------------- 
  length: function() {
    // todo - return the magnitude (A.K.A. length) of 'this' vector
    // This should NOT change the values of this.x, this.y, and this.z
    n=Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2);
    m=Math.sqrt(n);
    return m;

    return 0;
  },

  //----------------------------------------------------------------------------- 
  lengthSqr: function() {
    // todo - return the squared magnitude of this vector ||v||^2
    // This should NOT change the values of this.x, this.y, and this.z

    // There are many occasions where knowing the exact length is unnecessary 
    // and the square can be substituted instead (for performance reasons).  
    // This function should not have to take the square root of anything.
    n=Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2);
    return n;

    return 0;
  },

  //----------------------------------------------------------------------------- 
  normalize: function() {
    // todo - Change the components of this vector so that its magnitude will equal 1.
    // This SHOULD change the values of this.x, this.y, and this.z
    n=this.length();
    this.x/=n;
    this.y/=n;
    this.z/=n;

    return this;
  },

  //----------------------------------------------------------------------------- 
  dot: function(other) {
    // todo - return the dot product betweent this vector and "other"
    // This should NOT change the values of this.x, this.y, and this.z
    return this.x*other.x+this.y*other.y+this.z*other.z;

    return 0;
  },


  //============================================================================= 
  // The functions below must be completed in order to receive an "A"

  //----------------------------------------------------------------------------- 
  fromTo: function(fromPoint, toPoint) {
    if (!(fromPoint instanceof Vector3) || !(toPoint instanceof Vector3)) {
      console.error("fromTo requires to vectors: 'from' and 'to'");
    }

    // todo - return the vector that goes from "fromPoint" to "toPoint"
    //        NOTE - "fromPoint" and "toPoint" should not be altered

    this.x=toPoint.x-fromPoint.x;
    this.y=toPoint.y-fromPoint.y;
    this.z=toPoint.z-fromPoint.z;

    return this;
  },

  //----------------------------------------------------------------------------- 
  project: function(vectorToProject, otherVector) {
    // todo - return a vector that points in the same direction as "otherVector"
    //        but whose length is the projection of "vectorToProject" onto "otherVector"
    //        NOTE - "vectorToProject" and "otherVector" should NOT be altered (i.e. use clone)
    //        See class slides or visit https://en.wikipedia.org/wiki/Vector_projection for more detail.

    n=(vectorToProject.x*otherVector.x + vectorToProject.y*otherVector.y + vectorToProject.z*otherVector.z)/otherVector.lengthSqr();
    a=n*otherVector.x;
    b=n*otherVector.y;
    c=n*otherVector.z;

    return newVec = new Vector3(a,b,c);
  },

  getX: function(){
    return this.x;
  },

  getY: function(){
    return this.y;
  },

  getZ: function(){
    return this.z;
  }
};

// EOF 00100001-10
