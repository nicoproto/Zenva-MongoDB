const express = require('express')
const router = express.Router()
// Needs the .. because it's on an a parent folder
const Country = require('../models/Country.js')

// Filters with the query given in the url
router.get('/', (req, res, next) => {
	const query = req.query

	Country.find(query)
	.then(countries => {
		res.json({
			confirmation: 'success',
			data: countries
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})

})


router.get('/add', (req, res, next) => {
	const details = req.query

	Country.create(details)
	.then(country => {
		res.json({
			confirmation: 'success',
			data: country
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/update/:id', (req, res, next) => {
	const updatedDetails = req.query
	const countryId = req.params.id

	// The {new: true} makes it to return the country AFTER updated
	Country.findByIdAndUpdate(countryId, updatedDetails, {new:true})
	.then(country => {
		res.json({
			confirmation: 'success',
			data: country
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})

})

// Gets the Id and looks for an specific item
router.get('/:id', (req, res, next) => {

	Country.findById(req.params.id)
	.then(country => {
		res.json({
			confirmation: 'success',
			data: country
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Country with Id ' + req.params.id + ' not found.'
		})
	})

})

module.exports = router