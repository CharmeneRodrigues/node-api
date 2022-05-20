import {Router} from 'express';
import multer from 'multer';

import * as ApiControllers from '../controllers/apiControllers';

const upload = multer ({
  dest: './tmp',

  fileFilter: (req, file, cb) => { 
  const allowed: string[] = ['image/jpeg','image/jpg','image/png'];
  cb(null, allowed.includes(file.mimetype));
},
limits: { fieldSize: 2_000_000 }

});

const router = Router(); 

router.get('/ping', ApiControllers.ping); 
router.get ('/random', ApiControllers.random); 
router.get ('/nome/:nome', ApiControllers.nome);  


router.post('/frases', ApiControllers.createPhrase);
router.get('/frases', ApiControllers.listPhrase);
router.get('/frase/aleatoria', ApiControllers.randomPhrase);
router.get('/frases/:id', ApiControllers.getPhrase);
router.put('/frases/:id', ApiControllers.updatePhrase);
router.delete('/frases/:id', ApiControllers.deletePhrase);
router.post('/upload', upload.single('avatar'), ApiControllers.uploadFile);
router.delete('/fotos/:id', ApiControllers.deleteFotos);
// temporariamente
router.get('/upform', ApiControllers.showUpForm);

export default router;
