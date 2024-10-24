import express from "express";
import { PrismaClient } from "@prisma/client";
import { Virhe } from "../errors/virhekasittelija";
import sanitizeHtml from "sanitize-html";

const prisma : PrismaClient = new PrismaClient();

const apiPalstaRouter : express.Router = express.Router();

apiPalstaRouter.use(express.json());

apiPalstaRouter.post("/", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    
    try {

        await prisma.keskustelu.create({
            data : {
                otsikko : req.body.otsikko,
                sisalto : sanitizeHtml(req.body.sisalto),
                kirjoittaja : req.body.kirjoittaja,
            }
        });

        res.json(await prisma.keskustelu.findMany());

    } catch (e : any) {
        next(new Virhe());
    }


});

apiPalstaRouter.get("/", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    try {

        res.json(await prisma.keskustelu.findMany());

    } catch (e : any) {
        next(new Virhe());
    }

});

apiPalstaRouter.get("/viestit", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    try {

        res.json(await prisma.viestit.findMany());

    } catch (e : any) {
        next(new Virhe());
    }

});

apiPalstaRouter.post("/viestit", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    
    try {

        await prisma.viestit.create({
            data : {
                nimi : req.body.nimi,
                viesti : sanitizeHtml(req.body.viesti),
                keskusteluid : req.body.keskusteluid
            }
        });

        res.json(await prisma.viestit.findMany());

    } catch (e : any) {
        next(new Virhe());
    }


});

export default apiPalstaRouter;