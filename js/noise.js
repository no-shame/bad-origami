//Make this whole thing a seperate file, or a class, or an interface, or a module
var width = 112;
var height = 64;
var size = width * height;
var imgData = new Uint8Array( 3 * size );
var r, g, b;

var z = 0.0;
var scale = 4.5;


makeNoise = (value, noiseIndex) => {

    z += value || 0;


    if (noiseIndex < 3){


    for (let i = 0; i < 224; i++) {
        for (let j = 0; j < 128; j++) {

                const index = (i + j * width) * 3;

                const x = scale * (i / width);
                const y = scale * (j / height);

                var n;

                if(noiseIndex == 0)
                    n = Math.floor(255 * (1 + tooloud.Perlin.noise(x, y, z)) / 2 );
                else if(noiseIndex == 1) 
                    n = Math.floor(255 *  (1 + tooloud.Simplex.noise(x, y, z)) / 2 );
                else if(noiseIndex == 2){
                    n = Math.floor(255 * 
                    (
                        ((1 + tooloud.Perlin.noise(x, y, z)) / 2) + ((1 + tooloud.Perlin.noise(x*2, y*2, z + 200)) / 6) 
                        + ((1 + tooloud.Perlin.noise(x*4, y*4, z + 400)) / 6) 
                    ) 
                    );
                }
                else if(noiseIndex == 3) 
                    n = Math.floor(255 * tooloud.Worley.Euclidean(x, y, z)[0] );
                else if(noiseIndex == 4)
                    n = Math.floor(255 *  tooloud.Worley.Euclidean(x, y, z)[1] );
                else if(noiseIndex == 5){
                    n = Math.floor(255 *  (tooloud.Worley.Euclidean(x, y, z)[1] - tooloud.Worley.Euclidean(x, y, z)[0])   );
                }
                    


                imgData[ index ] = n;
                imgData[ index + 1 ] = n;
                imgData[ index + 2 ] = n;
        }
    }

    }else{


            for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {

                const index = (i + j * width) * 3;

                const x = scale * (i / width);
                const y = scale * (j / height);

                var n;

                if(noiseIndex == 0)
                    n = Math.floor(255 * (1 + tooloud.Perlin.noise(x, y, z)) / 2 );
                else if(noiseIndex == 1) 
                    n = Math.floor(255 *  (1 + tooloud.Simplex.noise(x, y, z)) / 2 );
                else if(noiseIndex == 2){
                    n = Math.floor(255 * 
                    (
                        ((1 + tooloud.Perlin.noise(x, y, z)) / 2) + ((1 + tooloud.Perlin.noise(x*2, y*2, z + 200)) / 6) 
                        + ((1 + tooloud.Perlin.noise(x*4, y*4, z + 400)) / 6) 
                    ) 
                    );
                }
                else if(noiseIndex == 3) 
                    n = Math.floor(255 * tooloud.Worley.Euclidean(x, y, z)[0] );
                else if(noiseIndex == 4)
                    n = Math.floor(255 *  tooloud.Worley.Euclidean(x, y, z)[1] );
                else if(noiseIndex == 5){
                    n = Math.floor(255 *  (tooloud.Worley.Euclidean(x, y, z)[1] - tooloud.Worley.Euclidean(x, y, z)[0])   );
                }
                    


                imgData[ index ] = n;
                imgData[ index + 1 ] = n;
                imgData[ index + 2 ] = n;
        }
    }

    }



    return imgData;
}
