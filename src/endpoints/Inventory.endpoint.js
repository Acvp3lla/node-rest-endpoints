module.exports = (app, inventoryModel) =>{
    //////////////////////////////////////////////
    // Inventory Endpoints
    /////////////////////////////////////////////

    // Create Record in Tabel
    app.post('/api/inventory', (req, res) => {
        inventoryModel.create({
            product: req.body.product,
            description: req.body.description,
            value: req.body.value,
            quantity: req.body.quantity,
            status: req.body.status
        })
        .then(result => {
            res.send(result)
            console.log('Inventory Item Created')
        })
        .catch(err =>{
            res.send('Cannot Create',err)
            console.log('Cannot Create',err)
        })
    });

    // Update Record in table
    app.patch('/api/inventory/update/:id', (req, res) => {
        inventoryModel.update({
            product: req.body.product,
            description: req.body.description,
            value: req.body.value,
            quantity: req.body.quantity,
            status: req.body.status
        }, {
            where: {id: req.params.id}
        })
        .then(result =>{
            if(result[0] === 1){
                res.send({
                    status: result[0],
                    message: 'Inventory Item Updated'
                })
                console.log('Inventory Item Updated')
            }
            else{
                res.send({
                    status: result[0],
                    message: 'Inventory Item Not Found'
                })
                console.log('Inventory Item Not Found')
            }
        })
        .catch(err => {
            res.send('Cannot Update',err)
            console.log('Cannot Update',err)
        })
    });

    // Get all Records in Table
    app.get('/api/inventory', (req, res) => {
        inventoryModel.findAll()
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.send('Cannot Get',err)
            console.log('Cannot Get',err)
        })
    });

    // Get all Records in Table with the matching criteria
    app.get('/api/inventory/:id', (req, res) => {
        inventoryModel.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res.send(result)
        })
        .catch(err =>{
            res.send('Cannot Get',err)
            console.log('Cannot Get',err)
        })
    });

    app.delete('/api/inventory/delete/:id', (req, res) => {
        inventoryModel.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            console.log(result)
            if(result === 1){
                res.json({
                    status: result,
                    message: 'Record Deleted'
                })
                console.log('Record Deleted', result)
            }
            else{
                res.json({
                    status: result,
                    message: 'Record Not Found'
                })
                // console.log('Record Not Found', result)
            }
        })
        .catch(err => {
            res.send('Cannot Remove',err)
            console.log('Cannot Remove',err)
        })
    })
}