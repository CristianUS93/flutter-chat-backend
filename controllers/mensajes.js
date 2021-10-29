const Mensaje = require('../models/mensaje');

const obtenerChat = async(req, res) => {

    const miUID = req.uid;
    const mensajesDe = req.params.de;

    const last30 = await Mensaje.find({
        $or: [{de: miUID, para: mensajesDe}, {de: mensajesDe, para: miUID}]
    })
    .sort({createdAt: 'desc'})
    .limit(30);

    res.json({
        ok: true,
        mensajes: last30    
    })

}

module.exports = {
    obtenerChat,
}