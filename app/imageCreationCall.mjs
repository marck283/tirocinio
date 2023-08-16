import 'express';
const router = express.Router();
import { Configuration, OpenAIApi } from 'openai';
import { Validator } from 'node-input-validator';

router.post("", async (req, res) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const v = new Validator({
        prompt: req.body.prompt,
    }, {
        prompt: 'required|string|minLength:1'
    });
    v.check()
    .then(async matched => {
        if(!matched) {
            res.status(400).json({ error: "Nessuna descrizione fornita." }).send();
            return;
        }

        try {
            const response = await openai.createImage({
                prompt: req.body.prompt,
                n: 1,
                size: "1024x1024",
            });
            if(response.status == 200) {
                res.status(200).json({ image: response.data.url }).send();
            } else {
                res.status(403).json({ error: "Errore durante la creazione dell'immagine da parte di OpenAI." }).send();
            }
            return;
        } catch(err) {
            console.log(err);
            res.status(500).json({ error: "Errore durante la creazione dell'immagine." }).send();
            return;
        }
    });
});

export default router;