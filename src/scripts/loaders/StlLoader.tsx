class StlLoader {
	
	/*	* Zwraca tablice coordynatów po zaladowaniu pliku i sparsowaniu danych
		* @param {string} url
		* @param {Function} callback
	 *	*/
	public load (url: string, callback: Function) : void {
		let request = new XMLHttpRequest();
		let self: StlLoader = this;
		request.addEventListener('load', function() {
			if (this.status === 200 || this.status === 0) {
				callback(self.parse(this.response));
			}
		});
		request.open('GET', url, true);
		request.responseType = "arraybuffer";
		request.setRequestHeader('Access-Control-Allow-Origin', '*');
		request.setRequestHeader('Access-Control-Allow-Methods', '*');
		request.send(null);
	}
	
	/*	* Parsuje zaladowane dane na tablice vertexów
		* @param {string} data
		* @returns {number[]}
	 *	*/
	private parse (data: string | ArrayBuffer) : number[] {
		var binData: ArrayBuffer = this.ensureBinary(data);
		var stringData: string = this.ensureString(data);
		var binaryCheck: Boolean = this.isBinary(binData);
		var vertices: number[];
		
		if (binaryCheck === true) {
			vertices = this.parseBinary(binData);
		} else {
			vertices = this.parseASCII(stringData);
		}
		
		return vertices;
	}
	
	/*	* Zmienia na format string
		* @param {string | ArrayBuffer} buffer
		* @returns {string}
	 *	*/
	private ensureString (buffer: string | ArrayBuffer) : string {
		if (typeof buffer !== 'string') {
			return new TextDecoder().decode(new Uint8Array(buffer));
		}

		return buffer;
	}
	
	/*	* Zmienia na binarny format
		* @param {string} buffer
		* @returns {ArrayBuffer}
	 *	*/
	private ensureBinary (buffer: string | ArrayBuffer) : ArrayBuffer {
		if (typeof buffer == "string") {
			var arrayBuffer = new Uint8Array(buffer.length);
			for (let i: number = 0; i < buffer.length; i++) {
				arrayBuffer[ i ] = buffer.charCodeAt(i) & 0xff; // implicitly assumes little-endian

			}
			return arrayBuffer.buffer || arrayBuffer;
		} else {
			return buffer;
		}
	}
	
	/*	* Sprawdza czy kazdy byte w query pokrywa sie z bytem w DataView na podstawie offsetu
		* @param {number[]} query
		* @param {DataView} reader
		* @param {number} offset
		* @returns {Boolean}
	 *	*/
	private matchDataViewAt (query: number[], reader: DataView, offset: number) : Boolean {
		// Check if each byte in query matches the corresponding byte from the current offset
		for (let i: number = 0, il: number = query.length; i < il; i++) {
			if (query[i] !== reader.getUint8(offset + i)) return false;
		}

		return true;

	}
	
	/*	* Sprawdza czy dane są binarne
		* @param {ArrayBuffer} data
		* @returns {Boolean}
	 *	*/
	private isBinary (data: ArrayBuffer) : Boolean {

		var expect, face_size, n_faces, reader;
		reader = new DataView(data);
		face_size = ( 32 / 8 * 3 ) + ( ( 32 / 8 * 3 ) * 3 ) + ( 16 / 8 );
		n_faces = reader.getUint32( 80, true );
		expect = 80 + ( 32 / 8 ) + ( n_faces * face_size );

		if ( expect === reader.byteLength ) {

			return true;

		}

		// An ASCII STL data must begin with 'solid ' as the first six bytes.
		// However, ASCII STLs lacking the SPACE after the 'd' are known to be
		// plentiful.  So, check the first 5 bytes for 'solid'.

		// Several encodings, such as UTF-8, precede the text with up to 5 bytes:
		// https://en.wikipedia.org/wiki/Byte_order_mark#Byte_order_marks_by_encoding
		// Search for "solid" to start anywhere after those prefixes.

		// US-ASCII ordinal values for 's', 'o', 'l', 'i', 'd'

		var solid = [ 115, 111, 108, 105, 100 ];

		for (var off = 0; off < 5; off++) {

			// If "solid" text is matched to the current offset, declare it to be an ASCII STL.

			if (this.matchDataViewAt(solid, reader, off)) return false;

		}

		// Couldn't find "solid" text at the beginning; it is binary STL.

		return true;

	}
	
	/*	* Parsuje binarne dane wejsciowe na tablice vertexów
		* @param {ArrayBuffer} data
		* @returns {number[]}
	 *	*/
	private parseBinary (data: ArrayBuffer) : number[] {
		var reader = new DataView(data);
		var faces = reader.getUint32(80, true);
		
		var vertices: number[] = [];
		vertices.length = faces * 9;

		var dataOffset = 84;
		var faceLength = 12 * 4 + 2;

		for ( var face = 0; face < faces; face ++ ) {

			var start = dataOffset + face * faceLength;

			for ( var i = 1; i <= 3; i ++ ) {

				var vertexstart = start + i * 12;
				var vertexoffset = face * 9 + (i - 1) * 3;

				vertices[vertexoffset] = reader.getFloat32( vertexstart, true );
				vertices[vertexoffset + 1] =  reader.getFloat32( vertexstart + 4, true );
				vertices[vertexoffset + 2] = reader.getFloat32( vertexstart + 8, true );

			}

		}

		return vertices;

	}

	/*	* Parsuje ASCII dane wejsciowe na tablice vertexów
		* @param {string} data
		* @returns {number[]}
	 *	*/
	private parseASCII (data: string) : number[] {
		
		let patternFace = /facet([\s\S]*?)endfacet/g;
		let faceCounter: number = 0;

		let patternFloat = /[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source;
		let patternVertex = new RegExp( 'vertex' + patternFloat + patternFloat + patternFloat, 'g' );

		let vertices: number[] = [];

		let result: any;

		while ((result = patternFace.exec(data)) !== null) {
			let vertexCountPerFace = 0;

			let text = result[ 0 ];

			while ( ( result = patternVertex.exec( text ) ) !== null ) {

				vertices.push( parseFloat( result[ 1 ] ) * 0.005, parseFloat( result[ 2 ] ) * 0.005, parseFloat( result[ 3 ] ) * 0.005 );
				vertexCountPerFace++;

			}

			// each face have to own three valid vertices

			if (vertexCountPerFace !== 3) {

				console.error( 'THREE.STLLoader: Something isn\'t right with the vertices of face number ' + faceCounter );

			}

			faceCounter ++;
		}

		return vertices;

	}

}

export default StlLoader;
