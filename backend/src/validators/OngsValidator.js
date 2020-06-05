const {celebrate, Segments, Joi } = require('celebrate');

module.exports  = {
    store: celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.string().min(10).max(11).required(),
                city: Joi.string().required(),
                uf: Joi.string().required().length(2)
            })
        })
    
}