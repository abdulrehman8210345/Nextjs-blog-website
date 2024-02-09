import * as fs from 'fs';

export default function handler(req,res){
    fs.readFile(`blogdata/${req.query.slug}.json`,'utf-8',(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json({error :"File not exist"});
            return;
        }
        // console.log(req.query.slug);
        // console.log(data)
        // res.status(200).json(JSON.parse(data));
    })


}