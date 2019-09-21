const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();
const exec = require('child_process').exec;

app.get('/', (req, res) => {
    res.json({
        err: false,
        msg: "Welcome"
    })
})

const handlePwd = () => {
    return new Promise((resolve, reject) => {
        exec("sh shellscripts/pwd.sh", (err, stdout, stderr) => {
            if (err) {
                reject({
                    err: true,
                    msg: err.message
                })
            }
            return resolve({
                err: false,
                msg: stdout
            })
        })
    })

}

app.get('/pwd', async (req, res) => {
    try {
        const response = await handlePwd();
        res.json(response);
    }
    catch (e) {
        console.log(`Err`);
        res.json(e);
    }
})


app.listen(PORT, () => {
    console.log(`Listening at PORT ${PORT}`);
})