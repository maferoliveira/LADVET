const prisma = require("../data/prisma")

const cadastraranimal = async(req, res)=>{
    const animal = await prisma.animal.create({
        data: req.body;
    }); res.status(201).json(animal)
}