import data from "../../database/data"

export default function handler(req, res) {

  const id = req.headers.id
  if (id in data) {
    res.status(200).send({ success: true, text: data[id], INFO: "fetch success" })
  }
  else {
    res.status(404).send({ success: false, INFO: "fetch faild", id })
  }


}
