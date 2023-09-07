const dataDB = {
    data: require('../model/data.json'),
    setData: function (data) { this.data = data }
}

const fsPromises = require('fs').promises;
const path = require('path');


const handleNewData = async (req, res) => {
    const { data } = req.body;
    
    try {
        // store the new data
        const newData = {
            "data_data" : data
        }
        dataDB.setData([...dataDB.data, newData]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'data.json'),
            JSON.stringify(dataDB.data)
            //dataDB.data
            );
            
        console.log(dataDB.data);
        res.status(201).json({ 'success': `New data ${data} created!`});
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

module.exports = { handleNewData };