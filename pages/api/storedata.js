import React from 'react'
import * as fs from 'fs'

function storedata(req, res) {
    if (req.method === "POST") {
        fs.readFile("database/data.json", 'utf-8', (err, res) => {
            const data = JSON.parse(res)
            for (let i = 0; i < data.length; i++) {
                const user = data[i];
                console.log(req.body)
                if (user === req.body.id) {
                    console.log("success")
                }
            }
        })
        res.status(200).json(['post'])
        console.log(req.body)
    }
    else {
        res.status(500).json(['please send only POST requist only 1'])
    }
}

export default storedata