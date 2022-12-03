import * as fs from 'fs'

function storedata(req, res) {
    if (req.method === "POST") {
        const dataPath = './database/data.json'
        const { id, text, type } = req.body
        fs.promises.readFile(dataPath, 'utf-8')
            .then((v) => {
                const data = JSON.parse(v)
                if (id in data && type === 'add') {
                    data[id].push(text)
                    fs.promises.writeFile(dataPath, JSON.stringify(data))
                        .then(() => {
                            res.status(200).send({ success: true, INFO: "Text Added", text: data[id] })
                        })
                }
                else if (id in data) {
                    res.status(200).send({ success: true, text: data[id], INFO: "user found" })
                }
                else {
                    fs.promises.writeFile(dataPath, JSON.stringify({ ...data, [id]: [] }))
                        .then(() => {
                            res.status(200).send({ success: true, text: data[id], INFO: 'user added' })
                        })
                }
            })
    }
    else {
        res.status(500).send({ success: false, INFO: "Only POST Allowed!" })
    }
}

export default storedata
