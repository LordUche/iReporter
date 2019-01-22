import Joi from 'joi';
import countries from './country_names';

export const signupSchema = Joi.object()
  .keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    othernames: Joi.string().optional(),
    email: Joi.string()
      .email()
      .required(),
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(16)
      .required(),
    password: Joi.string()
      .min(6)
      .required()
      .strict(),
    country: Joi.string()
      .valid(Object.keys(countries))
      .insensitive()
      .error(() => '"country" must be a valid ISO2 country code'),
    phonenumber: Joi.string().min(6),
  })
  .and(['phonenumber', 'country']);

export const loginSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required()
    .strict(),
});

export const createIncidentSchema = Joi.object().keys({
  location: Joi.string()
    .regex(
      /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
    )
    .error(() => '"location" must be a valid (lag,lng) location')
    .required(),
  comment: Joi.string()
    .min(3)
    .max(140)
    .required(),
  images: Joi.array().items([Joi.string().uri()]),
  videos: Joi.array().items([Joi.string().uri()]),
});

export const updateLocationSchema = Joi.object().keys({
  location: Joi.string()
    .regex(
      /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
    )
    .error(() => '"location" must be a valid (lag,lng) location')
    .required(),
});

export const updateCommentSchema = Joi.object().keys({
  comment: Joi.string()
    .min(3)
    .max(140)
    .required(),
});

export const updateStatusSchema = Joi.object().keys({
  status: Joi.string()
    .valid(['draft', 'under investigation', 'rejected', 'resolved'])
    .required(),
});
