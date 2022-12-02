const express = require('express')
const routes = require('../config/routes')

module.exports = (app) => {

    app.get('/status', (req, res) => {
        res.status(200).send({message: 'server online'})
    })
    app.head('/status', (req, res) => {
        res.status(200).end()
    })

    app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    app.use(express.json());

    app.use('/', routes)

    app.use((req, res, next) => {
        const err = new Error('Not Found')
        err['status'] = 404
        next(err)
    })

    app.use((err, req, res, next) => 
    {
        res.status(err.status || 500)
        res.json({
            errors: {
                message: err.message,
            },
        })
    })
}
