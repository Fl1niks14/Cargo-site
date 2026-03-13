const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// Подключение к твоей локальной базе из Compass
const MONGO_URI =
	process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rus_cargo_db'

mongoose
	.connect(MONGO_URI)
	.then(() => console.log('✅ MongoDB Connected'))
	.catch(err => console.error('❌ MongoDB Connection Error:', err))

// Схема заявки
const OrderSchema = new mongoose.Schema({
	service: String,
	from: String,
	to: String,
	weight: Number,
	distance: Number,
	price: Number,
	status: { type: String, default: 'Новая' },
	createdAt: { type: Date, default: Date.now }
})

const Order = mongoose.model('Order', OrderSchema)

// API: Сохранение (POST)
app.post('/api/requests', async (req, res) => {
	try {
		const newOrder = new Order(req.body)
		await newOrder.save()
		res.status(201).json({ success: true })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

// API: Получение (GET)
app.get('/api/requests', async (req, res) => {
	const orders = await Order.find().sort({ createdAt: -1 })
	res.json(orders)
})

// API: Удаление (DELETE)
app.delete('/api/requests/:id', async (req, res) => {
	await Order.findByIdAndDelete(req.params.id)
	res.json({ message: 'Deleted' })
})

// API: Обновление статуса (PATCH)
app.patch('/api/requests/:id', async (req, res) => {
	const updated = await Order.findByIdAndUpdate(
		req.params.id,
		{ status: req.body.status },
		{ new: true }
	)
	res.json(updated)
})

app.listen(5000, () => console.log('🚀 Server started on port 5000'))
