const express = require('express')
const router = express.Router()

const { addContent, openTo, clear } = require('../service/index')

router.post('/add', async (req, res) => {

  const { name } = req.body

  await addContent({ file: 'person', name })
  
  res.json({ name })

})

router.get('/openTo', async (req, res) => {
  res.json(await openTo())
})

router.post('/register', async (req, res) => {

  const { name } = req.body
  console.log(name)
  await addContent({ file: 'open', name })
  
  res.json({ name })

})

router.get('/clear', async (req, res) => {
  res.json(await clear())
})

module.exports = router
