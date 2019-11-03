<template>
<v-container>
<v-layout row>
  <v-btn @click = "render" color="blue-grey">render</v-btn>
</v-layout>
<v-layout row>
  <script id="shader-vs" type="x-shader/x-vertex">
attribute vec4 aVertexColor;
attribute vec3 aVertexPosition;
varying vec4 vColor;
void main(void) {
    gl_Position = vec4(aVertexPosition, 1.0);
    vColor = aVertexColor;
}
</script>
<script id="shader-fs" type="x-shader/x-fragment">
precision mediump float;
varying vec4 vColor;
void main(void) {
        gl_FragColor = vColor;
 }
</script>
  <canvas id="myGLCanvas" width=500 height=500></canvas>
</v-layout>
</v-container>
</template>


<script>
/* eslint-disable no-console*/
import warehouseService from '../services/WarehouseService'
  export default {
    name: 'viz',
    props: {
      warehouse: {type: Object, required: true}
    },
    data() {
      return ({
        gl: null,
        canvas: null,
        shaderProgram: null,
        vertexPositionBuffer: null,
        vertexColorBuffer: null,
        Length: null,
        width: null,
        pLength: null,
        pWidth: null,
        numCol: null,
        pNum: null,
        numRow: null,
        verticesData: [],
        colorsData: []
      });
    },
    methods: {
      createGLContext(canvas) {
        var context = null;
        context = canvas.getContext("webgl");
        if (context) {
          context.viewportWidth = canvas.width;
          context.viewportHeight = canvas.height;
        } else {
          alert("Failed to create WebGL context!");
        }
        return context;
      },
      loadShaderFromDOM(id) {
        var shaderScript = document.getElementById(id);
        // console.log("FOund ", shaderScript)

        // If we don't find an element with the specified id
        // we do an early exit 
        if (!shaderScript) {
          return null;
        }

        // Loop through the children for the found DOM element and
        // build up the shader source code as a string
        var shaderSource = "";
        var currentChild = shaderScript.firstChild;
        while (currentChild) {
          if (currentChild.nodeType == 3) { // 3 corresponds to TEXT_NODE
            shaderSource += currentChild.textContent;
          }
          currentChild = currentChild.nextSibling;
        }

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
          shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
          shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        } else {
          return null;
        }

        this.gl.shaderSource(shader, shaderSource);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
          alert(this.gl.getShaderInfoLog(shader));
          return null;
        }
        return shader;
      },
      setupShaders() {
        this.vertexShader = this.loadShaderFromDOM("shader-vs");
        this.fragmentShader = this.loadShaderFromDOM("shader-fs");

        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, this.vertexShader);
        this.gl.attachShader(this.shaderProgram, this.fragmentShader);
        this.gl.linkProgram(this.shaderProgram);

        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
          alert("Failed to setup shaders");
        }

        this.gl.useProgram(this.shaderProgram);
        this.shaderProgram.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");

        this.shaderProgram.vertexColorAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexColor");
      },
      setupBuffers() {
        let gl = this.gl
        this.vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verticesData), gl.STATIC_DRAW);
        this.vertexPositionBuffer.itemSize = 3;
        this.vertexPositionBuffer.numberOfItems = this.pNum * 2 * 3;
        this.vertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colorsData), gl.STATIC_DRAW);
        this.vertexColorBuffer.itemSize = 4;
        this.vertexColorBuffer.numItems = this.pNum * 2 * 3;
        this.gl = gl
      },
      draw() {
        let gl = this.gl
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute,
          this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute,
          this.vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute)

        gl.drawArrays(gl.TRIANGLES, 0, this.vertexPositionBuffer.numberOfItems);
        this.gl = gl
      },
      findCoords(x, y, z) {
        var corners = [];
        let pLength = this.pLength
        let pWidth = this.pWidth
        let width = this.width
        let Length = this.Length
        
        // console.log(x,y);

        var corner1 = [2 * ((pLength * x) / Length) - 1, 2 * ((pWidth * (y + 1)) / width) - 1, z];
        var corner2 = [2 * ((pLength * (x + 1)) / Length) - 1, 2 * ((pWidth * (y + 1)) / width) - 1, z];
        var corner3 = [2 * ((pLength * x) / Length) - 1, 2 * ((pWidth * y) / width) - 1, z];
        var corner4 = [2 * ((pLength * (x + 1)) / Length) - 1, 2 * ((pWidth * y) / width) - 1, z];

        corners.push(corner1[0], corner1[1], corner1[2]);
        corners.push(corner2[0], corner2[1], corner2[2]);
        corners.push(corner3[0], corner3[1], corner3[2]);
        corners.push(corner2[0], corner2[1], corner2[2]);
        corners.push(corner3[0], corner3[1], corner3[2]);
        corners.push(corner4[0], corner4[1], corner4[2]);

        this.pLength = pLength
        this.pWidth = pWidth
        return corners;
      },
      startup(data) {
        this.Length = (data[data.length - 1].col) * 20;
        this.width = (data[data.length - 1].row) * 8;
        this.pLength = data[0].dimension_length_inches;
        this.pWidth = data[0].dimension_width_inches;
        this.pNum = data.length;
        this.numCol = data[data.length - 1].col;
        this.numRow = data[data.length - 1].row;

        console.log("Pnum", this.pNum)
// console.log(data[0].col, data[0].row);
        for (var item of data) {
          
          for (var c of this.findCoords(item.col - 1, item.row - 1, 0)) {
            // console.log(c);
            this.verticesData.push(c);
          }
        }

        let redCount = 0;
        let greenCount = 0;

        for (item of data) {
          var color;
          if (item.is_road == 1) {
            color = [0.7, 0.7, 0.7, 1.0];
          } else if (item.is_available == 1) {
            if (greenCount % 4 == 0) {
              color = [0.0, 1.0, 0.0, 1.0];
            } else if (greenCount % 4 == 1) {
              color = [0.0, 0.75, 0.0, 1.0];
            } else if (greenCount % 4 == 2) {
              color = [0.0, 0.5, 0.0, 1.0];
            } else {
              color = [0.0, 0.25, 0.0, 1.0];
            }
            greenCount++;
          } else {
            if (redCount % 4 == 0) {
              color = [1.0, 0.0, 0.0, 1.0];
            } else if (redCount % 4 == 1) {
              color = [0.75, 0.0, 0.0, 1.0];
            } else if (redCount % 4 == 2) {
              color = [0.5, 0.0, 0.0, 1.0];
            } else {
              color = [0.25, 0.0, 0.0, 1.0];
            }
            redCount++;
          }
          for (let i = 0; i < 6; i++) {
            for (c of color) {
              this.colorsData.push(c);
            }
          }
          redCount++;
          greenCount++;
        }

        this.canvas = document.getElementById("myGLCanvas");
        console.log(this.canvas)
        this.gl = this.createGLContext(this.canvas);
        this.setupShaders();
        this.setupBuffers();
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        // document.onclick = handleClick;

        this.draw();
      },
      render() {
        // this.$store.dispatch("getVisual", this.warehouse).then((res) => {
        // console.log("Found ", res)
        // this.startup(res)
        // this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        warehouseService.getViz(this.warehouse).then((res) => {
          console.log("Got #", res.data.length)

          console.log(res)
          this.startup(res.data)
        })
        // })
      }
    },
    mounted() {
      console.log("s")
    }

  }
</script>


<style>
</style>