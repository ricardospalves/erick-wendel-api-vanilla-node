echo '\n\n requesting all players'
curl localhost:3000/players

echo '\n\n requesting ronaldo'
curl localhost:3000/players/1

echo '\n\n requesting with wrong body'
curl --silent -X POST \
  --data-binary '{"invalid": "data"}' \
  localhost:3000/players

echo '\n\n creating Haaland'
CREATE=$(curl --silent -X POST \
  --data-binary '{"name": "Haaland", "age": 22, "position": "Striker"}' \
  localhost:3000/players)

echo $CREATE

echo '\n\n requesting Ronaldo'
curl localhost:3000/players/1
