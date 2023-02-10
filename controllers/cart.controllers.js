const { Cart, Cart_detail, Item, Order, Order_detail, Payment } = require("../models");
const { QueryTypes } = require('sequelize');

const getAllItemInCart = async (req, res) => {
    const { name } = req.query;
    try {
        const paymentList = await Payment.findAll({});
        if(name){
            const itemList = await Item.sequelize.query(
                "SELECT CD.*, I.name, I.price, (I.price*CD.quantity) as amount FROM carts as C, cart_details as CD, items as I, accounts as A, customers as CU WHERE A.id_account = CU.id_account AND CU.id_customer = C.id_customer AND C.id_cart = CD.id_cart AND CD.id_item = I.id_item AND A.username = :username AND I.name COLLATE UTF8_GENERAL_CI LIKE :name", 
            { 
                replacements: { name: `%${name}%`, username: `${req.username}`},
                type: QueryTypes.SELECT,
                raw: true
            });
            res.status(200).json({ itemList, paymentList })
        }
        else {
            const itemList = await Item.sequelize.query(
                "SELECT CD.*, I.name, I.price, (I.price*CD.quantity) as amount FROM carts as C, cart_details as CD, items as I, accounts as A, customers as CU WHERE A.id_account = CU.id_account AND CU.id_customer = C.id_customer AND C.id_cart = CD.id_cart AND CD.id_item = I.id_item AND A.username = :username", 
            { 
                replacements: { username: `${req.username}` },
                type: QueryTypes.SELECT,
                raw: true
            });
            res.status(200).json({ itemList, paymentList })
        }
    } catch (error) {
        res.status(500).json(error);    
    }
}

const createItemInCart = async (req, res) => {
    const { id_item } = req.params;
    const { quantity } = req.body;
    try {
        const info = await Cart.sequelize.query(
            "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer", 
        { 
            replacements: { username: `${req.username}` },
            type: QueryTypes.SELECT,
            raw: true
        });
        const isExist = await Cart_detail.findOne({
            where: {
                id_item,
                id_cart: info[0].id_cart
            }
        })
        if(isExist){
            if(quantity){
                isExist.quantity = quantity;
                await isExist.save();
                res.status(201).json({message: "Đã thêm vào giỏ hàng!"});
            }
            else{
                isExist.quantity = isExist.quantity + 1;
                await isExist.save();
                res.status(201).json({message: "Đã thêm vào giỏ hàng!"});
            }
        }
        else {
            if(quantity){
                await Cart_detail.create({ id_item, id_cart: info[0].id_cart, quantity: quantity });
                res.status(201).json({message: "Đã thêm vào giỏ hàng!"});
            }
            else{
                await Cart_detail.create({ id_item, id_cart: info[0].id_cart, quantity: 1 });
                res.status(201).json({message: "Đã thêm vào giỏ hàng!"});
            }
        }
    } catch (error) {
        res.status(500).json({message: "Thao tác thất bại!"});
    }
}

const increaseNumItemInCart = async (req, res) => {
    const { id_item } = req.params;
    try {
        const info = await Cart.sequelize.query(
            "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer", 
        { 
            replacements: { username: `${req.username}` },
            type: QueryTypes.SELECT,
            raw: true
        });
        const itemInCart = await Cart_detail.findOne({
            where: {
                id_item,
                id_cart: info[0].id_cart
            }
        })
        itemInCart.quantity = itemInCart.quantity + 1;
        await itemInCart.save();
        res.status(201).json();
    } catch (error) {
        res.status(500).json({message: "Thao tác thất bại!"});
    }
}

const decreaseNumItemInCart = async (req, res) => {
    const { id_item } = req.params;
    try {
        const info = await Cart.sequelize.query(
            "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer", 
        { 
            replacements: { username: `${req.username}` },
            type: QueryTypes.SELECT,
            raw: true
        });
        const itemInCart = await Cart_detail.findOne({
            where: {
                id_item,
                id_cart: info[0].id_cart
            }
        })
        if(itemInCart.quantity < 2){
            await Cart_detail.destroy({
                where: {
                    id_item,
                    id_cart: info[0].id_cart
                }
            });
            res.status(201).json();
        }else {
            itemInCart.quantity = itemInCart.quantity - 1;
            await itemInCart.save();
            res.status(201).json();
        }
    } catch (error) {
        res.status(500).json({message: "Thao tác thất bại!"});
    }
}

const deleteOneItemInCart = async (req, res) => {
    const { id_item } = req.params;
    try {
        const info = await Cart.sequelize.query(
            "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer", 
        { 
            replacements: { username: `${req.username}` },
            type: QueryTypes.SELECT,
            raw: true
        });
        const result = await Cart_detail.destroy({
            where: {
                id_item,
                id_cart: info[0].id_cart
            }
        });
        if(result){
            res.status(201).json({message: "Đã xoá khỏi giỏ hàng!"});
        }
        else{
            res.status(501).json({message: "Đã có lỗi xảy ra!"});
        }
    } catch (error) {
        res.status(500).json({message: "Thao tác thất bại!"});
    }
}

const order = async (req, res) => {
    const {id_payment} = req.body
    try {
        const info = await Cart.sequelize.query(
            "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer", 
        { 
            replacements: { username: `${req.username}` },
            type: QueryTypes.SELECT,
            raw: true
        });
        const itemInCartList = await Cart_detail.findAll({
            where: {
                id_cart: info[0].id_cart
            }
        })
        const date = new Date();
        date.setHours(date.getHours() + 7)
        console.log(date, info[0].id_customer)
        const newOrder = await Order.create({ id_payment, datetime: date, id_customer: info[0].id_customer, status: 0});
        let i = 0;
        while(itemInCartList[i]){
            await Order_detail.create({id_order: newOrder.id_order, id_item: itemInCartList[i].id_item, quantity: itemInCartList[i].quantity});
            await Cart_detail.destroy({
                where: {
                    id_item: itemInCartList[i].id_item,
                    id_cart: itemInCartList[i].id_cart
                }
            });
            i++;
        }
        res.status(201).json({message: "Đặt hàng thành công!"});
    } catch (error) {
        res.status(500).json({message: "Đặt hàng thất bại!"});
    }
}

module.exports = {
    getAllItemInCart,
    createItemInCart,
    increaseNumItemInCart,
    decreaseNumItemInCart,
    deleteOneItemInCart,
    order,
};
