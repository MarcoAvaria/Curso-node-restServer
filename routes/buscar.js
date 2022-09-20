import { Router } from "express";
import { buscar } from "../controllers/buscar.js";


const router5 = Router();

router5.get('/:coleccion/:termino', buscar)



export {
    router5
}