const express = require('express')
const { body, validationResult } = require('express-validator');
const app = express()
const port = 3000

let datas = []
let id = 0;
/*
{
    id : 1,
    text : "Dinner with my GF",
    is_marked : false
}
*/

app.use(express.json());

app.get('/', (req, res) => {
    const query = req.query;
    let result = []
    let type = ""
    if("type" in query){
        type = query.type.toLowerCase()
    }
    switch (type) {
        case "marked":
            result = datas.filter(item => item["is_marked"]);
            break;
        case "all":
            result = datas
            break;
        default:
            result = datas.filter(item => !item["is_marked"]);
            break;
    }
    return res.json(result)
})

app.post('/', body('text').isLength({ min : 1 }), body('is_marked').optional().isBoolean() ,(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    datas.push({
        id : id + 1,
        text : req.body.text,
        is_marked : "is_marked" in req.body ? req.body.is_marked : false
    });
    id++;
    return res.status(201).json(datas[id-1])
})

app.put('/:id/', body('text').optional().isLength({ min : 1 }), body('is_marked').optional().isBoolean() ,(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let index = datas.findIndex(item => item.id == parseInt(req.params.id))
    if(index < 0){
        return res.status(404).json({ errors: "Data not found." });
    }

    datas[index]["text"] = "text" in req.body ? req.body.text : datas[index]["text"];
    datas[index]["is_marked"] = "is_marked" in req.body ? req.body.is_marked : datas[index]["is_marked"];

    return res.status(201).json(datas[index]);
})

app.delete('/:id/', (req, res) => {
    let index = datas.findIndex(item => item.id == parseInt(req.params.id))
    if(index < 0){
        return res.status(404).json({ errors: "Data not found." });
    }
    datas.splice(index, 1);
    return res.json({ msg : "Data had been deleted."})
})

app.all('*', (req, res) => res.status(404).json({ errors: "Route not found." }))

app.listen(port, () => {
    console.log(`To-Do API app listening on port ${port}`)
})