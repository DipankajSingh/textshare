// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from 'fs'

export default function handler(req, res) {

  const id = 'gfhg'
  const dataPath = 'database/data.json'

  fs.promises.readFile(dataPath, 'utf-8')
    .then((v) => {
      const data = JSON.parse(v)
      if (id in data) {
        res.status(200).send({ success: true, text: data[id] })
      }
      else {
        res.status(404).send({ success: false })
      }
    })


}
