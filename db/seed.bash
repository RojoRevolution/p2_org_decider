# seeding orgs and users via signup flow

  curl --request POST \
  --url http://localhost:8080/api/signup \
  --header 'Content-Type: application/json' \
  --data '{"org":"cool local startup","email":"stephen@mail.com","password":"password"}'

  curl --request POST \
  --url http://localhost:8080/api/signup \
  --header 'Content-Type: application/json' \
  --data '{"org":"cool local startup","email":"david@mail.com","password":"password"}'

  curl --request POST \
  --url http://localhost:8080/api/signup \
  --header 'Content-Type: application/json' \
  --data '{"org":"cool local startup","email":"trevor@mail.com","password":"password"}'

  curl --request POST \
  --url http://localhost:8080/api/signup \
  --header 'Content-Type: application/json' \
  --data '{"org":"cool local startup","email":"richard@mail.com","password":"password"}'

  curl --request POST \
  --url http://localhost:8080/api/signup \
  --header 'Content-Type: application/json' \
  --data '{"org":"g-squad","email":"t-bone@mail.com","password":"password"}'

  curl --request POST \
  --url http://localhost:8080/api/signup \
  --header 'Content-Type: application/json' \
  --data '{"org":"g-squad","email":"g-dawg@mail.com","password":"password"}'

  curl --request POST \
  --url http://localhost:8080/api/signup \
  --header 'Content-Type: application/json' \
  --data '{"org":"g-squad","email":"tiny@mail.com","password":"password"}'

  # seeding polls

  curl --request POST \
  --url http://localhost:8080/api/polls/ \
  --header 'Content-Type: application/json' \
  --data '{"name":"lunch?","description":"what should we eat to welcome the new hires?","winner":0,"UserId":1}'

  curl --request POST \
  --url http://localhost:8080/api/polls/ \
  --header 'Content-Type: application/json' \
  --data '{"name":"Templating Framework","description":"what templating framework should we use?","winner":0,"UserId":2}'

  curl --request POST \
  --url http://localhost:8080/api/polls/ \
  --header 'Content-Type: application/json' \
  --data '{"name":"who cleans the bathroom?","description":"I will not do it again this week...","winner":0,"UserId":5}'

  # seeding ideas

  curl --request POST \
  --url http://localhost:8080/api/ideas/ \
  --header 'Content-Type: application/json' \
  --data '{"name":"Tumble22","description":"Hot chicken rocks!","votes":0,"PollId":1,"UserId":1}'

  curl --request POST \
  --url http://localhost:8080/api/ideas/ \
  --header 'Content-Type: application/json' \
  --data '{"name":"Casa Colombia","description":"I want some latin food","votes":0,"PollId":1,"UserId":2}'

  curl --request POST \
  --url http://localhost:8080/api/ideas/ \
  --header 'Content-Type: application/json' \
  --data '{"name":"Michi Ramen","description":"Nice, hot ramen.","votes":0,"PollId":1,"UserId":3}'

  curl --request POST \
  --url http://localhost:8080/api/ideas/ \
  --header 'Content-Type: application/json' \
  --data '{"name":"Coriente","description":"Its some good Korean food","votes":0,"PollId":1,"UserId":4}'

  curl --request POST \
  --url http://localhost:8080/api/ideas/ \
  --header 'Content-Type: application/json' \
  --data '{"name":"g-dawg","description":"g-dawg is lazy and never does anything around the house","votes":0,"PollId":2,"UserId":5}'

  curl --request POST \
  --url http://localhost:8080/api/ideas/ \
  --header 'Content-Type: application/json' \
  --data '{"name":"t-bone","description":"man that t-bone is a complainer. I have had enough!","votes":0,"PollId":2,"UserId":6}'

  curl --request POST \
  --url http://localhost:8080/api/ideas/ \
  --header 'Content-Type: application/json' \
  --data '{"name":"tiny","description":"can you guys stop fighting???","votes":0,"PollId":2,"UserId":7}'
  