//Make this whole thing a seperate file, or a class, or an interface, or a module
const width = 112;
const height = 64;
var size = width * height;
var imgData = new Uint8Array( 3 * size );
var r, g, b;

var z = 0;
var scale = 4.5;

makeNoise = () => {

	z = Math.random() * 1000;

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {

        		const index = (i + j * width) * 3;

                const x = scale * (i / width);
            	const y = scale * (j / height);

            	const n = Math.floor(255 * tooloud.Worley.Euclidean(x, y, z)[0] );


    			imgData[ index ] = n;
				imgData[ index + 1 ] = n;
				imgData[ index + 2 ] = n;
        }
    }

	return imgData;
}
