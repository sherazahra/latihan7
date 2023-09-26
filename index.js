const express = require('express')
const app = express()
const port = 3000

const bodyPs = require('body-parser');
app.use(bodyPs.urlencoded({ extended: false}));
app.use(bodyPs.json());

app.get('/', (req, res) => {
    res.send("Halo Shera!")
});

const ktpRouter = require('./routes/ktp');
app.use('/api/ktp', ktpRouter);

const kkRouter = require('./routes/kk');
app.use('/api/kk', kkRouter);

const detail_kkRouter = require('./routes/detail_kk');
app.use('/api/detail_kk', detail_kkRouter);

app.listen(port, () => {
    console.log(`aplikasi berjalan di http:://localhost:${port}`)
})