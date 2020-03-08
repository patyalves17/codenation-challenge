const axios = require('axios');
const token = require ('./token');
const fs = require('fs');
const SHA1 = require("crypto-js/sha1");
const CryptoJS = require("crypto-js");
const FormData = require('form-data');


    axios.get(`https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${token}`)
        .then(resp =>{
            
            fs.writeFileSync('answer.json',JSON.stringify(resp.data) );
            resp.data.decifrado =  decrypt(resp.data);

            console.log(resp.data);

            const ciphertext = SHA1(resp.data.decifrado);
            const hashhertext = ciphertext.toString(CryptoJS.enc.Base64);
            resp.data.resumo_criptografico = hashhertext;

             fs.writeFileSync('answer.json',JSON.stringify(resp.data) )
            const formDataSend = new FormData();
            formDataSend.append('answer', fs.createReadStream('./answer.json'));

            return axios.post(`https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${token}`, formDataSend, {
                headers: {
                    ...formDataSend.getHeaders()
                } 
            } );
            
        }).then(respPost=>{
            console.log(respPost);
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