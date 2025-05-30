const validatePagination = (page, limit) => {
	const parsedPage = Math.max(1, parseInt(page) || 1)
	const parsedLimit = Math.min(100, Math.max(1, parseInt(limit) || 20))
	return { page: parsedPage, limit: parsedLimit }
}

module.exports = validatePagination
