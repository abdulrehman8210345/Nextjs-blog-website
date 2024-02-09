import * as fs from 'fs';
export default async function handler(req,res){
    if(req.method == 'POST'){
        let numofContacts= await fs.promises.readdir('contactsdata');
        
        fs.writeFile(`contactsdata/${numofContacts.length +1}.json`,JSON.stringify(req.body),()=>{})
        res.status(200).json(["Data posts successfully"])
    }
    else{
        res.status(200).json(["AllBlogs"]);
    }
}