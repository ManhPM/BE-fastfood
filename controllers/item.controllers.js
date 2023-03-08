const { Item, Type } = require("../models");
const { QueryTypes } = require('sequelize');

const createItem = async (req, res) => {
    const { id_type ,image, name, price, description, energy, ingredient, quantity } = req.body
    try {
        await Item.create({
                id_type ,
                image, 
                name, 
                price, 
                description, 
                energy, 
                ingredient, 
                quantity,
                status: 1
        })
        res.status(201).json({message: "Tạo mới sản phẩm thành công!"})
    } catch (error) {
        res.status(500).json({message: "Đã có lỗi xảy ra!"})
    }
}

const updateItem = async (req, res) => {
    const { id_item } = req.params
    const { id_type , image, name, price, description, energy, ingredient, quantity, status } = req.body
    try {
        const itemUpdate = await Item.findOne({
            where:{
                id_item
            }
        })
        if(quantity > 0){
            itemUpdate.quantity = quantity
            itemUpdate.energy = energy
            itemUpdate.ingredient = ingredient
            itemUpdate.id_type = id_type
            itemUpdate.description = description
            itemUpdate.name = name
            itemUpdate.image = image 
            itemUpdate.price = price
            itemUpdate.status = status
            await itemUpdate.save();
            res.status(201).json({message: "Cập nhật sản phẩm thành công!"})
        }
        else {
            res.status(400).json({message: "Số lượng sản phẩm phải lớn hơn 0!"})
        }
    } catch (error) {
        res.status(500).json({message: "Đã có lỗi xảy ra!"})
    }
}

const deleteItem = async (req, res) => {
    const { id_item } = req.params
    try {
        const itemUpdate = await Item.findOne({
            where:{
                id_item
            }
        })
        itemUpdate.status = 0
        await itemUpdate.save();
        res.status(200).json({message: "Xoá sản phẩm thành công!"})
    } catch (error) {
        res.status(500).json({message: "Đã có lỗi xảy ra!"})
    }
}

const getAllItem = async (req, res) => {
    const { name, id_type } = req.query;
    let { typesort } = req.query;
    if(!typesort){
        typesort = 1;
    }
    const perPage = 12;
    const page = req.params.page || 1;
    try {
        if(name){
            if(id_type){
                const count = await Item.sequelize.query(
                    "SELECT COUNT(I.id_item) as totalPage FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type = :id_type AND I.status != 0 AND I.name COLLATE UTF8_GENERAL_CI LIKE :name", 
                { 
                    replacements: { name: `%${name}%`, perPage: perPage, id_type: id_type },
                    type: QueryTypes.SELECT,
                    raw: true
                });
                if(typesort == 1){
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type AND I.status != 0 AND T.id_type = :id_type AND I.name COLLATE UTF8_GENERAL_CI LIKE :name ORDER BY rating DESC LIMIT :from,:perPage", 
                    { 
                        replacements: { name: `%${name}%`, from: (page - 1)*perPage, perPage: perPage, id_type: id_type },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalItems: count[0].totalPage, itemList})
                }
                else if(typesort == 2){
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type AND I.status != 0 AND T.id_type = :id_type AND I.name COLLATE UTF8_GENERAL_CI LIKE :name ORDER BY I.price DESC LIMIT :from,:perPage", 
                    { 
                        replacements: { name: `%${name}%`, from: (page - 1)*perPage, perPage: perPage, id_type: id_type },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalItems: count[0].totalPage, itemList})
                }
                else {
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type AND I.status != 0 AND T.id_type = :id_type AND I.name COLLATE UTF8_GENERAL_CI LIKE :name ORDER BY I.price ASC LIMIT :from,:perPage", 
                    { 
                        replacements: { name: `%${name}%`, from: (page - 1)*perPage, perPage: perPage, id_type: id_type },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalItems: count[0].totalPage, itemList})
                }
                
            }
            else {
                const count = await Item.sequelize.query(
                    "SELECT COUNT(I.id_item) as totalPage FROM items as I, types as T WHERE T.id_type = I.id_type AND I.status != 0 AND I.name COLLATE UTF8_GENERAL_CI LIKE :name", 
                { 
                    replacements: { name: `%${name}%`, perPage: perPage },
                    type: QueryTypes.SELECT,
                    raw: true
                });
                if(typesort == 1){
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type AND I.status != 0 AND I.name COLLATE UTF8_GENERAL_CI LIKE :name ORDER BY rating DESC LIMIT :from,:perPage", 
                    { 
                        replacements: { name: `%${name}%`, from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalItems: count[0].totalPage, itemList})
                }
                else if(typesort == 2){
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type AND I.status != 0 AND I.name COLLATE UTF8_GENERAL_CI LIKE :name ORDER BY I.price DESC LIMIT :from,:perPage", 
                    { 
                        replacements: { name: `%${name}%`, from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalItems: count[0].totalPage, itemList})
                }
                else {
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type AND I.status != 0 AND I.name COLLATE UTF8_GENERAL_CI LIKE :name ORDER BY I.price ASC LIMIT :from,:perPage", 
                    { 
                        replacements: { name: `%${name}%`, from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalItems: count[0].totalPage, itemList})
                }
                
            }
        }
        else {
            if(id_type){
                const count = await Item.sequelize.query(
                    "SELECT COUNT(I.id_item) as totalPage FROM items as I, types as T WHERE T.id_type = I.id_type AND I.status != 0 AND T.id_type = :id_type", 
                { 
                    replacements: { perPage: perPage, id_type: id_type },
                    type: QueryTypes.SELECT,
                    raw: true
                });
                if(typesort == 1){
                    const itemList = await Item.sequelize.query(
                        "SELECT DISTINCT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T, reviews as R WHERE T.id_type = I.id_type AND I.status != 0 AND T.id_type = :id_type ORDER BY rating DESC LIMIT :from,:perPage", 
                    { 
                        replacements: { id_type: id_type, from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalItems: count[0].totalPage, itemList})
                }
                else if(typesort == 2){
                    const itemList = await Item.sequelize.query(
                        "SELECT DISTINCT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T, reviews as R WHERE T.id_type = I.id_type AND I.status != 0 AND T.id_type = :id_type ORDER BY I.price DESC LIMIT :from,:perPage", 
                    { 
                        replacements: { id_type: id_type, from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalItems: count[0].totalPage, itemList})
                }
                else {
                    const itemList = await Item.sequelize.query(
                        "SELECT DISTINCT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T, reviews as R WHERE T.id_type = I.id_type AND I.status != 0 AND T.id_type = :id_type ORDER BY I.price ASC LIMIT :from,:perPage", 
                    { 
                        replacements: { id_type: id_type, from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalItems: count[0].totalPage, itemList})
                }
            }
            else {
                const count = await Item.sequelize.query(
                    "SELECT COUNT(I.id_item) AS totalPage FROM items as I, types as T WHERE T.id_type = I.id_type AND I.status != 0", 
                { 
                    replacements: { perPage: perPage },
                    type: QueryTypes.SELECT,
                    raw: true
                });
                if(typesort == 1){//rating giam dan
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name AS name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type AND I.status != 0 ORDER BY rating DESC LIMIT :from,:perPage", 
                    { 
                        replacements: { from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalItems: count[0].totalPage, itemList})
                }
                else if(typesort == 2){//gia giam dan
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name AS name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type AND I.status != 0 ORDER BY I.price DESC LIMIT :from,:perPage", 
                    { 
                        replacements: { from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalItems: count[0].totalPage, itemList})
                }
                else{//gia tang dan
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name AS name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type AND I.status != 0 ORDER BY I.price ASC LIMIT :from,:perPage", 
                    { 
                        replacements: { from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalItems: count[0].totalPage, itemList})
                }
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const getDetailItem = async (req, res) => {
    const { id_item } = req.params
    try {
        const item = await Item.sequelize.query(
            "SELECT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = :id_item) as rating FROM items AS I, types as T WHERE T.id_type = I.id_type AND I.id_item = :id_item", 
        { 
            replacements: { id_item: id_item},
            type: QueryTypes.SELECT,
            raw: true
        });
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json(error);
    }
}

const get3ItemsEachType = async (req, res) => {
    try {
        const itemsEachType = await Item.sequelize.query(
            "SELECT * FROM (SELECT I.*, T.name AS name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating, row_number() over (partition by I.id_type order by I.energy ASC) as type_rank FROM items as I, types as T WHERE I.id_type = T.id_type ORDER BY rating DESC) test WHERE type_rank <= 3", 
        { 
            type: QueryTypes.SELECT,
            raw: true
        });
        res.status(200).json(itemsEachType)
    } catch (error) {
        res.status(500).json(error);
    }
}

const getItems = async (req, res) => {
    const {quantity} = req.body
    try {
        const items = await Item.sequelize.query(
            "SELECT (SELECT SUM(quantity) FROM order_details WHERE id_item = OD.id_item) as sold, I.*, T.name AS name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, order_details as OD, types as T WHERE OD.id_item = I.id_item AND T.id_type = I.id_type AND I.status != 0 ORDER BY sold DESC LIMIT :quantity", 
        { 
            replacements: { quantity },
            type: QueryTypes.SELECT,
            raw: true
        });
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getAllItem,
    getDetailItem,
    get3ItemsEachType,
    createItem,
    updateItem,
    deleteItem,
    getItems
};
