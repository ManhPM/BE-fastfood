const { Wishlist_detail, Item } = require("../models");
const { QueryTypes } = require('sequelize');

const getAllItemInWishList = async (req, res) => {
    const { name } = req.query;
    try {
        if(name){
            const itemList = await Item.sequelize.query(
                "SELECT I.id_item, I.image, I.name, I.price, I.description, I.energy, I.ingredient FROM wishlists as W, wishlist_details as WD, items as I, accounts as A, customers as CU WHERE A.id_account = CU.id_account AND CU.id_customer = W.id_customer AND W.id_wishlist = WD.id_wishlist AND WD.id_item = I.id_item AND A.username = :username AND I.name COLLATE UTF8_GENERAL_CI LIKE :name", 
            { 
                replacements: { name: `%${name}%`, username: `${req.username}`},
                type: QueryTypes.SELECT,
                raw: true
            });
            res.status(200).json(itemList)
        }
        else {
            const itemList = await Item.sequelize.query(
                "SELECT I.id_item, I.image, I.name, I.price, I.description, I.energy, I.ingredient FROM wishlists as W, wishlist_details as WD, items as I, accounts as A, customers as CU WHERE A.id_account = CU.id_account AND CU.id_customer = W.id_customer AND W.id_wishlist = WD.id_wishlist AND WD.id_item = I.id_item AND A.username = :username", 
            { 
                replacements: { username: `${req.username}` },
                type: QueryTypes.SELECT,
                raw: true
            });
            res.status(200).json(itemList)
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateItemInWishList = async (req, res) => {
    const { id_item } = req.params;
    try {
        const info = await Item.sequelize.query(
            "SELECT W.* FROM wishlists as W, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = W.id_customer", 
        { 
            replacements: { username: `${req.username}` },
            type: QueryTypes.SELECT,
            raw: true
        });
        const isExist = await Wishlist_detail.findOne({
            where: {
                id_item,
                id_wishlist: info[0].id_wishlist
            }
        })
        
        if(isExist){
            await Wishlist_detail.destroy({
                where: {
                    id_item,
                    id_wishlist: info[0].id_wishlist
                }
            });
            res.status(201).json({message: "Đã xoá khỏi danh sách yêu thích!", isSuccess: true});
        }
        else {
            await Wishlist_detail.create({ id_item, id_wishlist: info[0].id_wishlist });
            res.status(201).json({message: "Đã thêm vào danh sách yêu thích!", isSuccess: true});
        }
    } catch (error) {
        res.status(500).json({message: "Thao tác thất bại!", isSuccess: false});
    }
}


module.exports = {
    getAllItemInWishList,
    updateItemInWishList,
}
