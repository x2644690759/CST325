/*
 * A simple object to encapsulate the data and operations of object rasterization
 */
function WebGLGeometryJSON (gl) {
	this.gl = gl;
	this.worldMatrix = new Matrix4();
	this.alpha = 1;

	// -----------------------------------------------------------------------------
	this.getPosition = function() {
		// todo #9 - return a vector4 of this object's world position contained in its matrix
		var e = this.worldMatrix.elements;
		//console.log(this.worldMatrix);
		return new Vector4(e[0],e[5],e[10],e[15]);
	}

	// -----------------------------------------------------------------------------
	this.create = function(jsonFileData, rawImage) {
		// fish out references to relevant data pieces from 'data'
		var verts = jsonFileData.meshes[0].vertices;
		var normals = jsonFileData.meshes[0].normals;
		var texcoords = jsonFileData.meshes[0].texturecoords[0];
		var indices = [].concat.apply([], jsonFileData.meshes[0].faces);

		// create the position and color information for this object and send it to the GPU
		this.vertexBuffer = gl.createBuffer();
		this.gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

		this.normalBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
		this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

		this.texcoordBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
		this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);

		this.indexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		this.gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

		// store all of the necessary indexes into the buffer for rendering later
		this.indexCount = indices.length;

		if (rawImage) {
			// todo #6
			// 1. create the texture (uncomment when ready)
			// this.texture = ?

			// 2. todo bind the texture
			var image = new Image();
			image.src = "data/uvgrid.png";			
			// todo #6 - create the texture (uncomment when ready)
			// 1.
			this.texture = gl.createTexture();

			// 2. bind the texture
			gl.bindTexture(gl.TEXTURE_2D, this.texture);

			// needed for the way browsers load images, ignore this
			this.gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		
			// 3. set wrap modes (for s and t) for the texture
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			// 4. set filtering modes (magnification and minification)
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			// 5. send the image WebGL to use as this texture
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);


			// We're done for now, unbind
			this.gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}

	// -------------------------------------------------------------------------
	this.render = function(camera, projectionMatrix, shaderProgram) {
		gl.useProgram(shaderProgram);

		var attributes = shaderProgram.attributes;
		var uniforms = shaderProgram.uniforms;

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		gl.vertexAttribPointer(
			attributes.vertexPositionAttribute,
			3,
			gl.FLOAT,
			gl.FALSE,
			0,
			0
		);
		gl.enableVertexAttribArray(attributes.vertexPositionAttribute);

		if (attributes.hasOwnProperty('vertexNormalsAttribute')) {
			gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
			gl.vertexAttribPointer(
				attributes.vertexNormalsAttribute,
				3,
				gl.FLOAT,
				gl.FALSE,
				0,
				0
			);
			gl.enableVertexAttribArray(attributes.vertexNormalsAttribute);
		}

		if (attributes.hasOwnProperty('vertexTexcoordsAttribute')) {
			gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
			gl.vertexAttribPointer(
				attributes.vertexTexcoordsAttribute,
				2,
				gl.FLOAT,
				gl.FALSE,
				0,
				0
			);
			gl.enableVertexAttribArray(attributes.vertexTexcoordsAttribute);
		}

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

		if (this.texture) {
			// todo #6
			// uncomment when ready
			gl.activeTexture(gl.TEXTURE0);
		    gl.bindTexture(gl.TEXTURE_2D, this.texture);
		}

		// Send our matrices to the shader
		gl.uniformMatrix4fv(uniforms.worldMatrixUniform, false, this.worldMatrix.clone().transpose().elements);
		gl.uniformMatrix4fv(uniforms.viewMatrixUniform, false, camera.getViewMatrix().clone().transpose().elements);
		gl.uniformMatrix4fv(uniforms.projectionMatrixUniform, false, projectionMatrix.clone().transpose().elements);
		gl.uniform1f(uniforms.alphaUniform, this.alpha);

		gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);

		this.texture && gl.bindTexture(gl.TEXTURE_2D, null);
		gl.disableVertexAttribArray(attributes.vertexPositionAttribute);
		attributes.vertexNormalsAttribute && gl.disableVertexAttribArray(attributes.vertexNormalsAttribute);
		attributes.vertexTexcoordsAttribute && gl.disableVertexAttribArray(attributes.vertexTexcoordsAttribute);
	}
}

// EOF 00100001-10