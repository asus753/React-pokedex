const token = '69TBDmPwUJgMrD_nJjqPyKhZWK8XKFwP5wAR4dQTqOo3W1JiZvY'
const options = {headers : {
  'Authorization' : token
}}

fetch(`https://api.pandascore.co/lol/players`, options)
  .then(response => response.json())
  .then(responseJson => console.log(JSON.stringify(responseJson[0])))



//Work