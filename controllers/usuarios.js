const { response } = require("express");
const Usuarios = require('../models/usuarios');


const getUsuarios = async ( req, res = response ) => {

    const desde = Number( req.query.desde ) || 0;

    const usuarios = await Usuarios
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(desde)
        .limit(20)

    res.json ({
        ok: true,
        usuarios
    })

}

module.exports = {
    getUsuarios
}