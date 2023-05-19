echo 'requesting all players'
curl localhost:3000/players

echo 'requesting ronaldo'
curl localhost:3000/players/1

echo 'requesting with wrong body'
curl --silent -X POST \
  --data-binary '{"invalid": "data"}' \
  localhost:3000/players

echo 'creating a new Haaland'
CREATE=$(curl --silent -X POST \
  --data-binary '{"name": "Haaland", "age": 22, "position": "Striker"}' \
  localhost:3000/players)

echo $CREATE
