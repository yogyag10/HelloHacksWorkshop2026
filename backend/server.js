const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('Pokémon Battle Assistant API is running. Try /api/matchup/fire')
})

// Example: GET /api/matchup?type=fire (or a type ID)
app.get('/api/matchup/:name', async (req, res) => {

  const typeIdOrName = encodeURIComponent(req.params.name.toLowerCase())

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${typeIdOrName}/`)
    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json(data)
    }

    return res.json({
      half_damage_to: data.damage_relations.half_damage_to.map(({ name }) => name),
      double_damage_from: data.damage_relations.double_damage_from.map(({ name }) => name),
    })
  } catch (error) {
    console.error('PokéAPI request failed:', error)
    return res.status(502).json({ error: 'Could not reach PokéAPI.' })
  }
})

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`)
})
