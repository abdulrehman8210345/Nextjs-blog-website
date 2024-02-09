// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { isUtf8 } from 'buffer';
import * as fs from 'fs';

export default async function handler(req, res) {

  let tableofContent=await fs.promises.readdir("blogdata");
  // console.log(tableofContent);
  
  let filecontent;
  let getdata=[];
  for (let index = 0; index < tableofContent.length; index++) {
    const path = tableofContent[index];
    filecontent=await fs.promises.readFile(("blogdata/"+path),'utf-8');
    getdata.push(JSON.parse(filecontent));
  }
  res.status(200).json(getdata)



}

//Explanation of this code:

// Here it is foreach function by using promises but foreach function does not suuports promises ,async /await concept as it supports synchronous nature which means it does not wait for asynchronous function thats why we are using general for loop here.
  // tableofContent.forEach((path)=>{
  //     console.log(path)
  //     filecontent=await fs.promises.readFile('blogdata/'+path)
  //     console.log(filecontent);
      
  // })

  //By this method due to asynchronus nature of js, it is not respnding means it directly responds while our array is already empty thats why we use promises , async and await functionalities
  // fs.readdir("blogdata",(err,data)=>{
  //   if(err){
  //     console.log(err);
  //   }
  //   console.log(data)
  //   let getdata=[];
  //   data.forEach((path)=>{
  //     fs.readFile(('blogdata/' + path),(d)=>{
  //       getdata.push(d);
        
  //       res.status(200).json(getdata);
  //     })
      //It will return empty array because when reading file takes time and due js nature as it is async in nature , it does wait for reading file it accidently run res.status line means it directly gives response thats why getdata is empty array,but if we use res.status in the callback of readfile then also due to async nature it gives null array because foreach loop contnues and not waits for callback/reading of a file thats why when all loop iterates res has not given thats why no element is added to array thus giving null array 
  //   })
  // });

