export const renderProposalStatusText = (status: string): string => {
    switch (status) {
        case 'PENDING':
            return 'Заявка находится на рассмотрении'
        case 'REJECTED':
            return 'Ваша заявка отклонена'
        case 'SUCCESS':
            return 'Вы успешно зарегистрировали заявку'
        default:
            return 'Статус заявки неизвестен'
    }
}
