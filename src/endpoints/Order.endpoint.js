module.exports = (app, orderModel) => {
    ///////////////////////////////////////////////
    // Order Endpoints 
    ///////////////////////////////////////////////

    // Create an Order
    app.post('/api/order', (req, res) => {
        orderModel.create({
            itemNo: req.body.itemNo,
            product: req.body.product,
            quantity: req.body.quantity,
            value: req.body.value 
        })
        .then(result => {
            res.send(result);
            console.log('Order Created!');
        })
        .catch(err =>{
            res.send(err);
            console.log('Cannot Create Order: ', err)
        })
    })

    // Update an Order
    app.patch('/api/order/update/:id', (req, res) => {
        orderModel.update({
            itemNo: req.body.itemNo,
            product: req.body.product,
            quantity: req.body.quantity,
            value: req.body.value 
        },{
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            if(result[0] === 1){
                res.send({
                    status: 200,
                    message: `Order ${req.params.id} Updated`
                });
                console.log('Order Updated!');
            }
            else{
                res.json({
                    status: 404,
                    message: `Order ${req.params.id} Not Found`
                });
                console.log('Order Not Found!');
            }
        })
        .catch(err => {
            res.send(err);
            console.log(err);
        })
    })

    // Get All Orders
    app.get('/api/order', (req, res) => {
        orderModel.findAll()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err);
            console.log('Cannot Get Order: ', err);
        })
    })

    // Get Specified Order
    app.get('/api/order/:id', (req, res) => {
        orderModel.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err)
            console.log('Cannot Get Order: ', err);
        })
    })

    // Delete Order
    app.delete('/api/order/delete/:id', (req, res) => {
        orderModel.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            if(result === 1){
                res.json({
                    status: 200,
                    message: `Order ${req.params.id} Removed`
                });
                console.log('Order Removed!');
            }
            else{
                res.json({
                    status: 404,
                    message: `Order ${req.params.id} Not Found`
                })
                console.log('Order Not Found!')
            }
            
        })
        .catch(err => {
            res.send(err)
            console.log('Cannot Remove Order: ', err)
        })
    })
}