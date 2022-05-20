import {unlink} from 'fs/promises';
import{Request, Response} from 'express';
import {Sequelize} from 'sequelize';
import {Phrase} from '../models/Phrase';
import {openSync, readSync} from 'fs';
import {Foto} from '../models/Foto';
import sharp from 'sharp';

export const ping = (req: Request, res:Response) =>{
    res.json({pong:true}); 
}
export const random =  (req: Request, res:Response) => {
    let nRand:number = Math.floor(Math.random ()* 10); 
    res.json({number: nRand}); 
} 

export const nome = (req:Request, res:Response) => {
    let nome: string = req.params.nome; 
    res.json({nome});
}
export const createPhrase = async (req:Request, res:Response) => {
    //console.log(req.body);
    let {author, txt} = req.body;

    let newPhrase = await Phrase.create({author, txt});
    res.status(201);
    res.json({id: newPhrase.id, author, txt});

   // res.json({corpo: req.body});

}
export const listPhrase = async (req:Request, res:Response) => {
    let list = await Phrase.findAll();
    res.json({list});
}
export const getPhrase = async (req:Request, res:Response) => {
    let { id } = req.params; 
    //let phrase = await Phrase.findOne({ where: { id } });
    let phrase = await Phrase.findByPk(id);
    if(phrase){
        res.json({phrase});
    } else {
        res.json({error: "Frase não encontrada"});

    }
    
}
export const updatePhrase = async (req:Request, res:Response) => {
    let { id } = req.params; 
    let {author, txt} = req.body;

    let phrase = await Phrase.findByPk(id);
    if(phrase){
        phrase.author = author;
        phrase.txt = txt;
        await phrase.save();

        res.json({phrase});

    } else {
        res.json({error: "Frase não encontrada"});

    }
    
}

export const deletePhrase = async (req:Request, res:Response) => {
    let { id } = req.params; 
    await Phrase.destroy ({where: {id} });
    res.json({});
}
export const randomPhrase = async (req:Request, res:Response) => {
    let phrase = await Phrase.findOne({ order: [Sequelize.fn('RANDOM')]});
    
    if(phrase){
          res.json({phrase}); 
    } else {
        res.json({error:'Não há frases'});
    }
 
}
 export const uploadFile = async (req:Request, res:Response ) => {
   if(req.file) {
       const  filename = '${req.file.filename}.jpg';
    
    await sharp(req.file.path)
        .resize(500)
        .toFormat('jpg')
        .toFile(`./public/media/${filename}.jpg`);
         
        await unlink(req.file.path);

        const fd = openSync(`./public/media/${filename}.jpg`, 'r');
        const bytes = new ArrayBuffer();
        readSync(fs)
        const img = Foto.create({
            nome: req.file.filename,
            imagem: 
        });

        res.status(201);
        res.json({image:`${filename}.jpg`}); 
   } else {
       res.status(400);
       res.json({error:'Arquivo Inválido'});
   }

 }

 export const deleteFotos = async(req: Request, res: Response) => {



 }

 export const showUpForm = async(req: Request, res: Response) => {
    res.type("text/html");
    res.end(`
    <form method="POST" action="/upload" encType="multipart/form-data">
        <input type="file" name="avatar">
        <input type="submit" value="Enviar">
    </form>`);
 }
