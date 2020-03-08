const axios = require('axios');
const token = require ('./token');
const fs = require('fs');
var SHA1 = require("crypto-js/sha1");


    axios.get(`https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${token}`)
        .then(resp =>{
            console.log(resp.data);
            // fs.writeFileSync('answer.json',JSON.stringify(resp.data) )
            resp.data.decifrado =  decrypt(resp.data);
            console.log( resp.data);
            // fs.writeFileSync('answer.json',JSON.stringify(resp.data) )
            
            
        })
        .catch(error =>{
            console.log(error);
        });


const decrypt=(data) =>{
     [...data.cifrado].map(element => {
          const codeAt = element.charCodeAt(0);
          let aux = element;    
          if(codeAt >=97 && codeAt<=122){
            aux = String.fromCharCode(codeAt-data.numero_casas);
          }
          data.decifrado +=aux;
          
      });

      return data.decifrado;
}