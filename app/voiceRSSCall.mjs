import express from 'express';
const router = express.Router();
import { Validator } from 'node-input-validator';
import fetch from 'node-fetch';
import VoiceRSSWebApi from 'voice-rss';

router.get("", (req, res) => {
    const v = new Validator({
        description: req.query.description
    }, {
        description: 'required|string|minLength:1'
    });
    v.check()
    .then(async matched => {
        if(!matched) {
            console.log(v.errors);
            res.status(400).json({ error: "Nessuna descrizione fornita." }).send();
            return;
        }
        const response = await fetch("https://api.voicerss.org/?key=" + process.env.VOICE_RSS_API_KEY + "&hl=it-it&src=" + req.query.description +
        "&c=MP3&f=44khz_16bit_stereo&b64=true");
        let webApi = new VoiceRSSWebApi({
            key: process.env.VOICE_RSS_API_KEY
        });
    })
});

export default router;