require('dotenv').config();
var app;
import('./app/app.mjs').then(a => {
    app = a.default;

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});