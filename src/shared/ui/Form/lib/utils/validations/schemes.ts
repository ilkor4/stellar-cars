import * as yup from 'yup'
import { ValidationMessages } from './constants'

/** Схема валидации формы авторизации. */
export const authSchema = yup
    .object({
        login:
            yup.string()
                .typeError(ValidationMessages.STRING)
                .required(ValidationMessages.REQUIRED)
                .min(3, ValidationMessages.MIN),
        password:
            yup.string()
                .typeError(ValidationMessages.STRING)
                .required(ValidationMessages.REQUIRED)
                .min(3, ValidationMessages.MIN)
    })
    .required()

/** Схема валидации поля code. */
export const codeSchema = yup
    .object().shape({
        value:
            yup.string()
                .required(ValidationMessages.REQUIRED),
        label:
            yup.string()
                .required(ValidationMessages.REQUIRED_MODEL)
    }).required(ValidationMessages.REQUIRED_MODEL)

/** Схема валидации формы создания/редактирования заявок. */
export const proposalSchema = yup
    .object().shape({
        lastName:
            yup.string()
                .typeError(ValidationMessages.STRING)
                .required(ValidationMessages.REQUIRED)
                .min(3, ValidationMessages.MIN),
        firstName:
            yup.string()
                .typeError(ValidationMessages.STRING)
                .required(ValidationMessages.REQUIRED)
                .min(3, ValidationMessages.MIN),
        driverLicense:
            yup.string()
                .typeError(ValidationMessages.STRING)
                .required(ValidationMessages.REQUIRED)
                .min(3, ValidationMessages.MIN),
        email:
            yup.string()
                .typeError(ValidationMessages.STRING)
                .required(ValidationMessages.REQUIRED)
                .email(ValidationMessages.EMAIL),
        autoCategory: codeSchema,
        model: codeSchema,
        city: codeSchema
    })
