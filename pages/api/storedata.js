import data from '../../database/data'
function storedata(req, res) {
    if (req.method === "POST") {
        const { id, text, type } = req.body

        if (id in data && type === 'add') {
            data[id].push(text)
            res.status(200).send({ success: true, INFO: "Text Added", text: data[id] })

        }
        else if (id in data) {
            res.status(200).send({ success: true, text: data[id], INFO: "user found" })
        }
        else {
            data[id] = []
            res.status(200).send({ success: true, text: data[id], INFO: 'user added' })
        }
    }
    else {
        res.status(500).send({ success: false, INFO: "Only POST Allowed!" })
    }
}

export default storedata
