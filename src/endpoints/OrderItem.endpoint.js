module.exports = (app, orderItemModel) => {
    ///////////////////////////////////////////////
    // Order Endpoints 
    ///////////////////////////////////////////////

    // Create an Order
    app.post('/api/order-item', (req, res) => {
        orderItemModel.create({
            orderId: req.body.orderId,
            prodId: req.body.prodId,
            quantity: req.body.quantity,
            itemPrice: req.body.itemPrice 
        })
        .then(result => {
            res.send(result);
            console.log('Order Created!');
        })
        .catch(err =>{
            res.send(err);
            console.log('Cannot Create Order: ', err.original)
        })
    })

    // Update an Order
    app.patch('/api/order-item/update/:id', (req, res) => {
        orderItemModel.update({
            orderId: req.body.orderId,
            prodId: req.body.prodId,
            quantity: req.body.quantity,
            itemPrice: req.body.itemPrice  
        },{
            where: {
                orderId: req.params.id
            }
        })
        .then(result => {
            if(result[0] === 1){
                res.send({
                    status: 200,
                    message: `Order Item ${req.params.id} Updated`
                });
                console.log('Order Updated!');
            }
            else{
                res.json({
                    status: 404,
                    message: `Order Item ${req.params.id} Not Found`
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
    app.get('/api/order-item', (req, res) => {
        orderItemModel.findAll()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err);
            console.log('Cannot Get Order: ', err);
        })
    })

    // Get Specified Order
    app.get('/api/order-item/:id', (req, res) => {
        orderItemModel.findAll({
            where: {
                orderId: req.params.id
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
    app.delete('/api/order-item/delete/:id', (req, res) => {
        orderItemModel.destroy({
            where: {
                orderId: req.params.id
            }
        })
        .then(result => {
            if(result === 1){
                res.json({
                    status: 200,
                    message: `Order Item ${req.params.id} Removed`
                });
                console.log('Order Removed!');
            }
            else{
                res.json({
                    status: 404,
                    message: `Order Item ${req.params.id} Not Found`
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