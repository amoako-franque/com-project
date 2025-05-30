const validatePagination = (page, limit) => {
	const validatedPage = Math.max(1, parseInt(page) || 1)
	const validatedLimit = Math.min(100, Math.max(1, parseInt(limit) || 10)) // Cap at 100
	return { page: validatedPage, limit: validatedLimit }
}

module.exports = validatePagination
