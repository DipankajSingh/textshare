import * as fs from 'fs'

function storedata(req, res) {
    if (req.method === "POST") {
        const dataPath = 'database/data.json'
        const { id, text } = req.body
        fs.promises.readFile(dataPath, 'utf-8')
            .then((v) => {
                const data = JSON.parse(v)
                if (id in data) {
                    data[id].push(text)
                    fs.promises.writeFile(dataPath, JSON.stringify(data))
                        .then(() => {
                            res.status(200).send({ success: true })

                        })
                }
            })
    }
    else {
        res.status(500).send({ success: false, info: "Only POST Allowed!" })
    }
}

export default storedata