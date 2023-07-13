import express from 'express';
import fetch from 'node-fetch'

const app = express();

const port = process.env.PORT || 4001

app.use(express.static('client'));


app.get('/tours', (req, res, next) => {
   const body = `
   query {
      welcome
      }
   `
   //sending the request to the backend
   holibobRequest(body)
       .then(data => res.send(data))

});

app.post('/')
app.listen(port, () => {
   console.log(`Server running on port ${port}`);
})

// request data from Holibob API
const holibobRequest = async (query) => {
   let myHeaders = new Headers();
   myHeaders.append("X-Authorization-Device-User", "252e8b0a-169d-11ee-9e3a-42ac5a37307c")
   myHeaders.append( "Content-Type", "application/json")
   let raw = JSON.stringify({
      query: query
   });

   let options = {
      method: "POST",
      headers: myHeaders,
      body: raw,
   }

   const response = await fetch("https://api.trzmo.ai/api/holibob/graphql", options)
   if(response.ok){
      return await response.json()
   }
}