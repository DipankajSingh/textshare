// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from 'fs'

export default function handler(req, res) {

  const id = req.headers.id
  const dataPath = 'database/data.json'
  console.log(req.headers)
  fs.promises.readFile(dataPath, 'utf-8')
    .then((v) => {
      const data = JSON.parse(v)
      if (id in data) {
        res.status(200).send({ success: true, text: data[id], INFO: "fetch success" })
      }
      else {
        res.status(404).send({ success: false, INFO: "fetch faild", id })
      }
    })


}
