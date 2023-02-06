const { Item } = require("../models");
const { QueryTypes } = require('sequelize');

const getAllItem = async (req, res) => {
    const { name } = req.query;
    const { id_type } = req.body
    try {
        if(name){
            if(id_type){
                const itemList = await Item.sequelize.query(
                    "SELECT I.*, T.name as name_type FROM items AS I, types as T WHERE T.id_type = I.id_type AND I.name COLLATE UTF8_GENERAL_CI LIKE :name AND I.id_type = :id_type", 
                { 
                    replacements: { name: `%${name}%`, id_type: id_type},
                    type: QueryTypes.SELECT,
                    raw: true
                });
                res.status(200).json(itemList)
            }
            else {
                const itemList = await Item.sequelize.query(
                    "SELECT I.*, T.name as name_type FROM items AS I, types as T WHERE T.id_type = I.id_type AND I.name COLLATE UTF8_GENERAL_CI LIKE :name", 
                { 
                    replacements: { name: `%${name}%` },
                    type: QueryTypes.SELECT,
                    raw: true
                });
                res.status(200).json(itemList)
            }
        }
        else {
            if(id_type){
                const itemList = await Item.sequelize.query(
                    "SELECT I.*, T.name as name_type FROM items AS I, types as T WHERE T.id_type = I.id_type AND I.id_type = :id_type", 
                { 
                    replacements: { id_type: id_type },
                    type: QueryTypes.SELECT,
                    raw: true
                });
                res.status(200).json(itemList)
            }
            else {
                const itemList = await Item.sequelize.query(
                    "SELECT I.*, T.name as name_type FROM items AS I, types as T WHERE T.id_type = I.id_type", 
                { 
                    type: QueryTypes.SELECT,
                    raw: true
                });
                res.status(200).json(itemList)
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
