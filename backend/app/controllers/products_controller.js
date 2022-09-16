import Product from "../models/product_model.js";

async function getall_products(req, res) {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ msg: "An error has ocurred" });
    }//end trycath
}//getall_products

async function getone_product(req, res) {
    try {
        const id = req.params.id
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({ msg: "Product not found" })
        } else {
            res.json(product);
        };
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json({ msg: "Product not found" }); }
        res.status(500).json({ msg: "An error has ocurred" });
    }
};

async function create_product(req, res) {
    try {
        const product_data = {
            name: req.body.name || null,
            price: req.body.price || 0,
            description: req.body.description || null,
            owner: req.body.owner || null,
            picture: req.body.picture || [null],
        };
        const product = new Product(product_data);
        await product.save();
        res.json(product_data);
    } catch (error) {
        res.status(500).json({ msg: "An error has ocurred" });
    }//end try cath
}//create_product

async function delete_product(req, res) {
    try {
        const id = req.params.id
        const product = await Product.findByIdAndDelete(id);
        if (!product) { res.status(404).json({ msg: "Product not found" }); }
        res.json({ msg: "Product deleted" })
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json({ msg: "Product not found" }); }
        res.status(500).json({ msg: "An error has ocurred" });
    }//end try catch
}

const product_controller = {
    getall_products: getall_products,
    getone_product: getone_product,
    create_product: create_product,
    delete_product: delete_product
}

export default product_controller;