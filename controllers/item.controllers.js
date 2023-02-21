const { Item } = require("../models");
const { QueryTypes } = require('sequelize');

const getAllItem = async (req, res) => {
    const { name, id_type } = req.query;
    let { typesort } = req.query;
    if(!typesort){
        typesort = 1;
    }
    console.log(name)
    const perPage = 12;
    const page = req.params.page || 1;
    try {
        if(name){
            if(id_type){
                const count = await Item.sequelize.query(
                    "SELECT CEILING((COUNT(I.id_item)/(:perPage))) as totalPage FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type = :id_type AND I.name COLLATE UTF8_GENERAL_CI LIKE :name", 
                { 
                    replacements: { name: `%${name}%`, perPage: perPage, id_type: id_type },
                    type: QueryTypes.SELECT,
                    raw: true
                });
                if(typesort == 1){
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type = :id_type AND I.name COLLATE UTF8_GENERAL_CI LIKE :name ORDER BY rating DESC LIMIT :from,:perPage", 
                    { 
                        replacements: { name: `%${name}%`, from: (page - 1)*perPage, perPage: perPage, id_type: id_type },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalPage: count[0].totalPage, itemList})
                }
                else if(typesort == 2){
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type = :id_type AND I.name COLLATE UTF8_GENERAL_CI LIKE :name ORDER BY I.price DESC LIMIT :from,:perPage", 
                    { 
                        replacements: { name: `%${name}%`, from: (page - 1)*perPage, perPage: perPage, id_type: id_type },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalPage: count[0].totalPage, itemList})
                }
                else {
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type = :id_type AND I.name COLLATE UTF8_GENERAL_CI LIKE :name ORDER BY I.price ASC LIMIT :from,:perPage", 
                    { 
                        replacements: { name: `%${name}%`, from: (page - 1)*perPage, perPage: perPage, id_type: id_type },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalPage: count[0].totalPage, itemList})
                }
                
            }
            else {
                const count = await Item.sequelize.query(
                    "SELECT CEILING((COUNT(I.id_item)/(:perPage))) as totalPage FROM items as I, types as T WHERE T.id_type = I.id_type AND I.name COLLATE UTF8_GENERAL_CI LIKE :name", 
                { 
                    replacements: { name: `%${name}%`, perPage: perPage },
                    type: QueryTypes.SELECT,
                    raw: true
                });
                if(typesort == 1){
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type AND I.name COLLATE UTF8_GENERAL_CI LIKE :name ORDER BY rating DESC LIMIT :from,:perPage", 
                    { 
                        replacements: { name: `%${name}%`, from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalPage: count[0].totalPage, itemList})
                }
                else if(typesort == 2){
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type AND I.name COLLATE UTF8_GENERAL_CI LIKE :name ORDER BY I.price DESC LIMIT :from,:perPage", 
                    { 
                        replacements: { name: `%${name}%`, from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalPage: count[0].totalPage, itemList})
                }
                else {
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type AND I.name COLLATE UTF8_GENERAL_CI LIKE :name ORDER BY I.price ASC LIMIT :from,:perPage", 
                    { 
                        replacements: { name: `%${name}%`, from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalPage: count[0].totalPage, itemList})
                }
                
            }
        }
        else {
            if(id_type){
                const count = await Item.sequelize.query(
                    "SELECT CEILING((COUNT(I.id_item)/(:perPage))) as totalPage FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type = :id_type", 
                { 
                    replacements: { perPage: perPage, id_type: id_type },
                    type: QueryTypes.SELECT,
                    raw: true
                });
                if(typesort == 1){
                    const itemList = await Item.sequelize.query(
                        "SELECT DISTINCT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T, reviews as R WHERE T.id_type = I.id_type AND T.id_type = :id_type ORDER BY rating DESC LIMIT :from,:perPage", 
                    { 
                        replacements: { id_type: id_type, from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalPage: count[0].totalPage, itemList})
                }
                else if(typesort == 2){
                    const itemList = await Item.sequelize.query(
                        "SELECT DISTINCT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T, reviews as R WHERE T.id_type = I.id_type AND T.id_type = :id_type ORDER BY I.price DESC LIMIT :from,:perPage", 
                    { 
                        replacements: { id_type: id_type, from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalPage: count[0].totalPage, itemList})
                }
                else {
                    const itemList = await Item.sequelize.query(
                        "SELECT DISTINCT I.*, T.name as name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T, reviews as R WHERE T.id_type = I.id_type AND T.id_type = :id_type ORDER BY I.price ASC LIMIT :from,:perPage", 
                    { 
                        replacements: { id_type: id_type, from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalPage: count[0].totalPage, itemList})
                }
            }
            else {
                const count = await Item.sequelize.query(
                    "SELECT CEILING((COUNT(I.id_item)/(:perPage))) AS totalPage FROM items as I, types as T WHERE T.id_type = I.id_type", 
                { 
                    replacements: { perPage: perPage },
                    type: QueryTypes.SELECT,
                    raw: true
                });
                if(typesort == 1){//rating giam dan
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name AS name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type ORDER BY rating DESC LIMIT :from,:perPage", 
                    { 
                        replacements: { from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalPage: count[0].totalPage, itemList})
                }
                else if(typesort == 2){//gia giam dan
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name AS name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type ORDER BY I.price DESC LIMIT :from,:perPage", 
                    { 
                        replacements: { from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalPage: count[0].totalPage, itemList})
                }
                else{//gia tang dan
                    const itemList = await Item.sequelize.query(
                        "SELECT I.*, T.name AS name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, types as T WHERE T.id_type = I.id_type ORDER BY I.price ASC LIMIT :from,:perPage", 
                    { 
                        replacements: { from: (page - 1)*perPage, perPage: perPage },
                        type: QueryTypes.SELECT,
                        raw: true
                    });
                    res.status(200).json({totalPage: count[0].totalPage, itemList})
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
            "SELECT I.*, T.name as name_type FROM items AS I, types as T WHERE T.id_type = I.id_type AND I.id_item = :id_item", 
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

module.exports = {
    getAllItem,
    getDetailItem
};
