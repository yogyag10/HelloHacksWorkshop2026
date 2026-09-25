This folder contains the Express API.

## Run the API

From this folder, run `npm run dev` while developing, or `npm start` to run it
without automatic restarts. The server listens on port 5001 by default; set the
`PORT` environment variable to use another port.

## Example GET endpoint

Request `GET http://localhost:5001/api?type=fire` (or provide a type ID)
to receive only the names in `half_damage_to` and `double_damage_from` from
`https://pokeapi.co/api/v2/type/fire/`.
The `type` query parameter is required; if it is missing, the endpoint responds
with status `400` and a JSON error. Errors from PokéAPI are passed through, and
connection failures return status `502`.
