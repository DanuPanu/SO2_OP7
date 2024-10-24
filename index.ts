import express from 'express';
import apiPalstaRouter from './routes/apiPalsta';
import path from 'path';
import virhekasittelija from './errors/virhekasittelija';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

const app : express.Application = express();

app.use(cors({origin : "http://localhost:3000"}));

app.use(express.static(path.resolve(__dirname, "public")));

app.use("/api/keskustelupalsta", apiPalstaRouter);

app.use("/api/keskustelupalsta/viestit", apiPalstaRouter);

app.use(virhekasittelija);

app.use((req : express.Request, res : express.Response, next : express.NextFunction) => {

    if (!res.headersSent) {
        res.status(404).json({ viesti : "Virheellinen reitti"});
    }

    next();
});

app.listen(Number(process.env.PORT), () => {

    console.log(`Palvelin käynnistyi porttiin : ${Number(process.env.PORT)}`);    

});