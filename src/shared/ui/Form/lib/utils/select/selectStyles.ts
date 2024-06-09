import { StylesConfig } from 'react-select'
import { OptionsDataType } from 'entities/proposals/model/types'

/** Стили для select. */
export const customStyles: StylesConfig<OptionsDataType, false> = {
    container: (provided) => ({
        ...provided,
        width: '100%'
    }),
    control: (provided) => ({
        ...provided,
        padding: '18px 24px',
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        font: "400 16px/24px 'JetBrains', arial, sans-serif",
        color: '#8585ad',
        backgroundColor: 'var(--color-interface-input)',
        border: '2px dashed #4c4cff',
        borderRadius: '40px',
        boxShadow: 'none'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'var(--color-text-primary-light-text)',
        font: "400 16px/24px 'JetBrains', arial, sans-serif"
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--color-text-primary-light-text)',
        font: "400 16px/24px 'JetBrains', arial, sans-serif"
    }),
    menu: (provided) => ({
        ...provided,
        color: '#8585ad',
        font: "400 16px/24px 'JetBrains', arial, sans-serif",
        borderRadius: '40px',
        backgroundColor: '#2f2f37',
        border: '2px dashed #4c4cff',
        overflow: 'hidden'
    }),
    option: (provided) => ({
        ...provided,
        padding: '10px 20px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'all .6 ease'
    })
}
