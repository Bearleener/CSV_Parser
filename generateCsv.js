require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Aqmpoint = require('./Aqmpoint');


mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

(async() => {
    const allPoints = await Aqmpoint.find({'aqm.noxevent': {$gte:10}});
    let CsvText = 'System Time,Nox\n';
    allPoints.map(row => {
        CsvText += `${row.gps.system_time},${row.aqm.noxevent}\n`
    })
    // console.log(CsvText);
    await fs.writeFileSync(process.env.DATALINK,CsvText);
   
    process.exit();
})();




