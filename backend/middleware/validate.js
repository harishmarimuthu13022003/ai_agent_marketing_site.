const validate = (schema) => async (req, res, next) => {
  try {
    const validatedBody = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    // Replace req.body with the sanitized/validated object
    req.body = validatedBody;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.errors ? error.errors.join(', ') : error.message,
    });
  }
};

module.exports = validate;
