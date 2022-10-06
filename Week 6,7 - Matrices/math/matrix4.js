/*
 * An object representing a 4x4 matrix
 */

var Matrix4 = function(x, y, z) {
	this.elements = new Float32Array(16);

	if (!(this instanceof Matrix4)) {
		console.error("Matrix4 constructor must be called with the new operator");
	}

	return this.makeIdentity();
}

//=============================================================================  
Matrix4.prototype = {

	// -------------------------------------------------------------------------
	clone: function() {
		var newMatrix = new Matrix4();
		for (var i = 0; i < 16; ++i) {
			newMatrix.elements[i] = this.elements[i];
		}
		return newMatrix;
	},

	// -------------------------------------------------------------------------
	copy: function(m) {
		for (var i = 0; i < 16; ++i) {
			this.elements[i] = m.elements[i];
		}

		return this;
	},

	// -------------------------------------------------------------------------
	getElement: function(row, col) {
		return this.elements[row * 4 + col];
	},

	// -------------------------------------------------------------------------
	set: function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
		var e = this.elements;

		e[0] = n11; e[1] = n12; e[2] = n13; e[3] = n14;
		e[4] = n21; e[5] = n22; e[6] = n23; e[7] = n24;
		e[8] = n31; e[9] = n32; e[10] = n33; e[11] = n34;
		e[12] = n41; e[13] = n42; e[14] = n43; e[15] = n44;

		return this;
	},

	// -------------------------------------------------------------------------
	makeIdentity: function() {
		var e = this.elements;
		
		// todo make this matrix be the identity matrix
		e[0] = 1; e[1] = 0; e[2] = 0; e[3] = 0;
		e[4] = 0; e[5] = 1; e[6] = 0; e[7] = 0;
		e[8] = 0; e[9] = 0; e[10] = 1; e[11] = 0;
		e[12] = 0; e[13] = 0; e[14] = 0; e[15] = 1;
		return this;
	},

	// -------------------------------------------------------------------------
	multiplyScalar: function(s) {
		for (var i = 0; i < 16; ++i) {
			this.elements[i] = this.elements[i] * s;
		}
	},

	// -------------------------------------------------------------------------
	multiplyVector: function(v) {
		// safety check
		if (!(v instanceof Vector4)) {
			console.error("Trying to multiply a 4x4 matrix with an invalid vector value");
		}

		var result = new Vector4();
		// todo
		// set the result vector values to be the result of multiplying the
		// vector v by 'this' matrix
		
        result.x = this.elements[0]*v.x + this.elements[1]*v.y + this.elements[2]*v.z + this.elements[3]*v.w;
		result.y = this.elements[4]*v.x + this.elements[5]*v.y + this.elements[6]*v.z + this.elements[7]*v.w;
		result.z = this.elements[8]*v.x + this.elements[9]*v.y + this.elements[10]*v.z + this.elements[11]*v.w;
		result.w = this.elements[12]*v.x + this.elements[13]*v.y + this.elements[14]*v.z + this.elements[15]*v.w;

		return result;
	},

	// -------------------------------------------------------------------------
	multiply: function(rightSideMatrix) {
		// safety check
		if (!(rightSideMatrix instanceof Matrix4)) {
			console.error("Trying to multiply a 4x4 matrix with an invalid matrix value");
		}
		var e = this.elements;
		var re = rightSideMatrix.elements;		//0,4,8,12  1,5,9,13  2,6,10,14  3,7,11,15

		var el0 = e[0]*re[0] + e[1]*re[4] + e[2]*re[8] + e[3]*re[12];
		
		var el4 = e[4]*re[0] + e[5]*re[4] + e[6]*re[8] + e[7]*re[12];
		var el1 = e[0]*re[1] + e[1]*re[5] + e[2]*re[9] + e[3]*re[13];

		var el8 = e[8]*re[0] + e[9]*re[4] + e[10]*re[8] + e[11]*re[12];
		var el5 = e[4]*re[1] + e[5]*re[5] + e[6]*re[9] + e[7]*re[13];
		var el2 = e[0]*re[2] + e[1]*re[6] + e[2]*re[10] + e[3]*re[14];
		
		var el12 = e[12]*re[0] + e[13]*re[4] + e[14]*re[8] + e[15]*re[12];
		var el9 = e[8]*re[1] + e[9]*re[5] + e[10]*re[9] + e[11]*re[13];
		var el6 = e[4]*re[2] + e[5]*re[6] + e[6]*re[10] + e[7]*re[14];
		var el3 = e[0]*re[3] + e[1]*re[7] + e[2]*re[11] + e[3]*re[15];
		
		var el13 = e[12]*re[1] + e[13]*re[5] + e[14]*re[9] + e[15]*re[13];
		var el10 = e[8]*re[2] + e[9]*re[6] + e[10]*re[10] + e[11]*re[14];
		var el7 = e[4]*re[3] + e[5]*re[7] + e[6]*re[11] + e[7]*re[15];
		
		var el14 = e[12]*re[2] + e[13]*re[6] + e[14]*re[10] + e[15]*re[14];
		var el11 = e[8]*re[3] + e[9]*re[7] + e[10]*re[11] + e[11]*re[15];
		
		var el15 = e[12]*re[3] + e[13]*re[7] + e[14]*re[11] + e[15]*re[15];

		this.elements = [el0, el1, el2, el3, el4, el5, el6, el7, el8, el9, el10, el11, el12, el13, el14, el15];

		// todo - multiply 'this' * rightSideMatrix
		return this;
	},

	// -------------------------------------------------------------------------
	premultiply: function(leftSideMatrix) {
		// ignore this, the implementation will be distributed with the solution
		return this;
	},

	// -------------------------------------------------------------------------
	makeScale: function(x, y, z) {
		// todo make this matrix into a pure scale matrix based on (x, y, z)
		var e = this.elements;
		
		this.makeIdentity();
		e[0] *= x;
		e[5] *= y;
		e[10] *= z;
		
		this.elements = e;		
		return this;
	},

	// -------------------------------------------------------------------------
	makeRotationX: function(degrees) {
		// todo - convert to radians
		var radians = degrees * Math.PI/180;
		var cosRad = Math.cos(radians);
		var sinRad = Math.sin(radians);
								
		// shortcut - use in place of this.elements
		var e = this.elements;
		e[5] = cosRad;
		e[6] = -1*sinRad;
		e[9] = sinRad;
		e[10] = cosRad;
		
		// todo - set every element of this matrix to be a rotation around the x-axis
		this.elements = e;
		//this.log();
		return this;
	},

	// -------------------------------------------------------------------------
	makeRotationY: function(degrees) {
		// todo - convert to radians
		// var radians = ...
		var radians = degrees * Math.PI/180;
		var cosRad = Math.cos(radians);
		var sinRad = Math.sin(radians);

								
		// shortcut - use in place of this.elements
		var e = this.elements;
		e[0] = cosRad;
		e[2] = sinRad;
		e[8] = -1*sinRad;
		e[10] = cosRad;
		this.elements = e;
		//this.log();
		return this;
	},

	// -------------------------------------------------------------------------
	makeRotationZ: function(degrees) {
		// todo - convert to radians
		var radians = degrees * Math.PI/180;
		var cosRad = Math.cos(radians);
		var sinRad = Math.sin(radians);

								
		// shortcut - use in place of this.elements
		var e = this.elements;
		e[0] = cosRad;
		e[1] = -1*sinRad;
		e[4] = sinRad;
		e[5] = cosRad;
		// todo - set every element of this matrix to be a rotation around the z-axis
		//this.log();
		return this;
	},

	// -------------------------------------------------------------------------
	makeTranslation: function(arg1, arg2, arg3) {
		// todo - wipe out the existing matrix and make it a pure translation
		//      - If arg1 is a Vector3 or Vector4, use its components and ignore
		//        arg2 and arg3. O.W., treat arg1 as x, arg2 as y, and arg3 as z
		if (arg1 instanceof Vector4) {
			//...
			this.makeIdentity();
			this.elements[3] = arg1.x;
			this.elements[7] = arg1.y;
			this.elements[11] = arg1.z;
		} else if (arg1 instanceof Vector3) {
			//...
			this.makeIdentity();
			this.elements[3] = arg1.x;
			this.elements[7] = arg1.y;
			this.elements[11] = arg1.z;
		} else {
			//...
			this.elements[3] = arg1;
			this.elements[7] = arg2;
			this.elements[11] = arg3;

		}
		return this;
	},

	// -------------------------------------------------------------------------
	makePerspective: function(fovy, aspect, near, far) {
		// todo - convert fovy to radians
		
	    var fovyRads = fovy * Math.PI/180;

	    var negOneOverFarMinusNear = -1/(far - near);
		// todo -compute t (top) and r (right)
		var top = near*Math.tan(fovyRads*0.5);
		//console.log("top: "+top);

		var r = aspect/top;
		//console.log("r: "+r);

		// shortcut - use in place of this.elements
		var e = this.elements;
		e[0] = near/r;
		e[5] = near/top;
		e[10] = (far + near)*negOneOverFarMinusNear;
		e[11] = 2*near*far*negOneOverFarMinusNear;
		e[14] = -1;
		e[15] = 0;


		// todo - set every element to the appropriate value
		this.elements = e;
		//this.log();
		return this;
	},

	// -------------------------------------------------------------------------
	makeOrthographic: function(left, right, top, bottom, near, far) {
		// shortcut - use in place of this.elements
		var oneOverRightMinusLeft = 1/(right - left);
		var oneOverTopMinusBottom = 1/(top - bottom);
		var negOneOverFarMinusNear = -1/(far - near);

		this.makeIdentity();
		var e = this.elements;
		e[0] = 2*oneOverRightMinusLeft;
		e[5] = 2*oneOverTopMinusBottom;
		e[10] = 2*negOneOverFarMinusNear;

		e[3] = -1*(right + left)*oneOverRightMinusLeft;
		e[7] = -1*(top + bottom)*oneOverTopMinusBottom;
		e[11] = (far + near)*negOneOverFarMinusNear;

		// todo - set every element to the appropriate value
		//console.log(e);
		//this.elements = e;
		//this.log();
		return this;
	},

	// -------------------------------------------------------------------------
	// @param moonRotationAngle A scalar value representing the rotation angle around Earth
	// @param moonOffsetFromEarth A Vector3 representing the space between the earth and the moon
	// @param earthWorldMatrix The world transformation of the Earth composed of both rotation and translation
	createMoonMatrix: function(moonRotationAngle, offsetFromEarth, earthWorldMatrix) {

		// todo - create the world matrix for the moon given the supplied function arguments.
		//        See "Application - Earth & Moon" under lecture

		// Note: Do NOT change earthWorldMatrix but do use it, it already contains the rotation and translation for the earth

		var moonMatrix = new Matrix4();
		//moonMatrix.makeTranslation(offsetFromEarth);
		moonMatrix = earthWorldMatrix.clone().multiply(moonMatrix.makeRotationZ(moonRotationAngle)).multiply(moonMatrix.makeTranslation(offsetFromEarth)); //
		
		//moonMatrix.makeRotationZ(moonRotationAngle).multiply(moonMatrix.makeTranslation(offsetFromEarth));
		//moonMatrix.elements = earthWorldMatrix.elements;
		
		//console.log(earthWorldMatrix);
		//console.log(moonMatrix);

		// todo - create and combine all necessary matrices necessary to achieve the desired effect

		return moonMatrix;
	},

	// -------------------------------------------------------------------------
	determinant: function() {
		var e = this.elements;

		// laid out for clarity, not performance
		var m11 = e[0]; var m12 = e[1]; var m13 = e[2]; var m14 = e[3];
		var m21 = e[4]; var m22 = e[5]; var m23 = e[6]; var m24 = e[7];
		var m31 = e[8]; var m32 = e[8]; var m33 = e[9]; var m34 = e[10];
		var m41 = e[12]; var m42 = e[13]; var m43 = e[14]; var m44 = e[15];

		var det11 = m11 * (m22 * (m33 * m44 - m34 * m43) +
			m23 * (m34 * m42 - m32 * m44) +
			m24 * (m32 * m43 - m33 * m42));

		var det12 = -m12 * (m21 * (m33 * m44 - m34 * m43) +
			m23 * (m34 * m41 - m31 * m44) +
			m24 * (m31 * m43 - m33 * m41));

		var det13 = m13 * (m21 * (m32 * m44 - m34 * m42) +
			m22 * (m34 * m41 - m31 * m44) +
			m24 * (m31 * m42 - m32 * m41));

		var det14 = -m14 * (m21 * (m32 * m43 - m33 * m42) +
			m22 * (m33 * m41 - m31 * m43) +
			m23 * (m31 * m42 - m32 * m41));

		return det11 + det12 + det13 + det14;
	},

	// -------------------------------------------------------------------------
	transpose: function() {
		var te = this.elements;
		var tmp;

		tmp = te[1]; te[1] = te[4]; te[4] = tmp;
		tmp = te[2]; te[2] = te[8]; te[8] = tmp;
		tmp = te[6]; te[6] = te[9]; te[9] = tmp;

		tmp = te[3]; te[3] = te[12]; te[12] = tmp;
		tmp = te[7]; te[7] = te[13]; te[13] = tmp;
		tmp = te[11]; te[11] = te[14]; te[14] = tmp;

		return this;
	},


	// -------------------------------------------------------------------------
	inverse: function() {
		// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
		var te = this.elements,
			me = this.clone().elements,

			n11 = me[0], n21 = me[1], n31 = me[2], n41 = me[3],
			n12 = me[4], n22 = me[5], n32 = me[6], n42 = me[7],
			n13 = me[8], n23 = me[9], n33 = me[10], n43 = me[11],
			n14 = me[12], n24 = me[13], n34 = me[14], n44 = me[15],

			t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
			t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
			t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
			t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

		var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

		if (det === 0) {
			var msg = "can't invert matrix, determinant is 0";
			console.warn(msg);
			return this.makeIdentity();
		}

		var detInv = 1 / det;

		te[0] = t11 * detInv;
		te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
		te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
		te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;

		te[4] = t12 * detInv;
		te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
		te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
		te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;

		te[8] = t13 * detInv;
		te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
		te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
		te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;

		te[12] = t14 * detInv;
		te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
		te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
		te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;

		return this;
	},

	// -------------------------------------------------------------------------
	log: function() {
		var te = this.elements;
		console.log('[ ' +
			'\n ' + te[0] + ', ' + te[1] + ', ' + te[2] + ', ' + te[3] +
			'\n ' + te[4] + ', ' + te[5] + ', ' + te[6] + ', ' + te[7] +
			'\n ' + te[8] + ', ' + te[9] + ', ' + te[10] + ', ' + te[11] +
			'\n ' + te[12] + ', ' + te[13] + ', ' + te[14] + ', ' + te[15] +
			'\n]'
		);

		return this;
	}
};

// EOF 00100001-10