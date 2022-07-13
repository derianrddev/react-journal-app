import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
  cloud_name: 'du6swb5v2',
  api_key: '595211184576739',
  api_secret: '2ylsq7dlnNuiMdY7-NdoIYcDRSY',
  secure: true
});

describe('Pruebas en fileUpload', () => { 

  test('Debe de subir el archivo correctamente a cloudinary', async() => { 

    const imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHw%3D&w=1000&q=80';
    const resp = await fetch( imageUrl );
    const blob = await resp.blob();
    const file = new File([blob], 'foto.jpg');

    const url = await fileUpload( file );
    expect( typeof url ).toBe('string');

    const segments = url.split('/');
    const imageId = segments[ segments.length - 1 ].replace('.jpg', '');
    
    cloudinary.api.delete_resources([ 'journal-app/' + imageId ], {
      resource_type: 'image'
    });
    
  });

  test('Debe de retornar null', async() => { 

    const file = new File([], 'foto.jpg');

    const url = await fileUpload( file );
    expect( url ).toBe( null );
    
  });
  
})