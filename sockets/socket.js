const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    
    // Verificar autenticacion
    if( !valido ) { return client.disconnect(); }


    //Cliente auntenticado
    usuarioConectado(uid);

    //Ingresar al usuario a una sala especifica
    //sala global - client.emit
    //mensaje directo - client.id
    //sala particular - uid del usuario
    client.join( uid );


    //Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async ( payload ) => {
        //TODO: grabar mensaje
        await grabarMensaje(payload);

        io.to( payload.para ).emit('mensaje-personal', payload);
    })


    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado( uid );
    });

});
