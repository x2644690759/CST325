precision mediump float;

uniform sampler2D uTexture;
uniform float uAlpha;

// todo #3 - receive texture coordinates and verify correctness by 
// using them to set the pixel color 
varying vec2 vTexcoord;

void main(void) {    
    
    // todo #3
    //gl_FragColor = vec4(vTexcoord.x, vTexcoord.y, 0.0, uAlpha);

    // todo #5
    gl_FragColor = texture2D(uTexture, vTexcoord);
    gl_FragColor.a = uAlpha;
}

// EOF 00100001-10
