const Department = require('../models/department.model')
const Dictionary = require('../models/dictionary.model')
const errorResponse = require('../utils/errorResponse')

exports.createDepartment = async (req, res) => {
	try {
		const { name, dictionaryId, description, imageUrl } = req.body

		const dictionary = await Dictionary.findById(dictionaryId)
		if (!dictionary) {
			return res.status(404).json({ message: 'Lug‘at topilmadi' })
		}

		const department = new Department({
			name,
			dictionary: dictionaryId,
			imageUrl: req.file ? req.file.location : imageUrl || null,
			description: description || null,
			createdBy: req.user ? req.user._id : null,
		})

		await department.save()
		res.status(201).json({ message: 'Bo‘lim qo‘shildi', department })
	} catch (error) {
		errorResponse(res, error, 'Bo‘lim yaratishda xatolik')
	}
}

exports.getDepartments = async (req, res) => {
	try {
		const departments = await Department.find()
			.populate('dictionary', 'name') // lug‘at nomini chiqarish uchun
			.populate('createdBy', 'username email') // foydalanuvchini chiqarish uchun

		res.status(200).json({ departments })
	} catch (error) {
		errorResponse(res, error, 'Bo‘limlarni olishda xatolik')
	}
}

exports.updateDepartment = async (req, res) => {
	try {
		const { id } = req.params
		const { name, dictionaryId, description, imageUrl } = req.body

		const department = await Department.findById(id)
		if (!department) {
			return res.status(404).json({ message: 'Bo‘lim topilmadi' })
		}

		if (dictionaryId) {
			const dictionary = await Dictionary.findById(dictionaryId)
			if (!dictionary) {
				return res.status(404).json({ message: 'Lug‘at topilmadi' })
			}
			department.dictionary = dictionaryId
		}

		if (name) department.name = name
		if (typeof description !== 'undefined') department.description = description
		if (req.file) department.imageUrl = req.file.location
		else if (typeof imageUrl !== 'undefined') department.imageUrl = imageUrl

		await department.save()
		res.status(200).json({ message: 'Bo‘lim yangilandi', department })
	} catch (error) {
		res.status(500).json({ message: 'Xatolik yuz berdi', error })
	}
}

exports.deleteDepartment = async (req, res) => {
	try {
		const { id } = req.params

		const department = await Department.findByIdAndDelete(id)
		if (!department) {
			return res.status(404).json({ message: 'Bo‘lim topilmadi' })
		}

		res.status(200).json({ message: 'Bo‘lim o‘chirildi' })
	} catch (error) {
		res.status(500).json({ message: 'Xatolik yuz berdi', error })
	}
}
