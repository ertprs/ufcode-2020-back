import express from 'express'
import Bank from '../models/bank'

/**
 * Local router to be used by the main router
 */
const router = new express.Router()

router.post('/banks', async (req, res) => {
    let bank = new Bank(req.body)

    try {
        await bank.save()
        res.status(201).send(bank)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /banks?convenio=XX&valor=XX
router.get('/banks', async (req, res) => {
    const { convenio, valor } = req.query

    try {
        const banks = await Bank.find()

        /* That's just a hard coded way to return different number of installments and installment value */
        let numInstallments

        switch (convenio) {
            case 'inss':
                numInstallments = 64
                break
            case 'federal':
                numInstallments = 76
                break
            case 'estadual':
                numInstallments = 72
                break
        }

        let mapped = banks.map((bank) => ({
            image: bank.image,
            name: bank.name,
            interestRate: bank.interestRate,
            numInstallments,
            installmentValue: (valor / numInstallments) * bank.interestRate
        }))

        res.status(200).send(mapped)
    } catch (e) {
        res.status(400).send(e)
    }
})

export default router
