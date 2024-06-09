import BaseImage from 'shared/assets/images/auto/base.jpg'
import GrantaImage from 'shared/assets/images/auto/granta.jpg'
import VestaImage from 'shared/assets/images/auto/vesta.jpg'
import KalinaImage from 'shared/assets/images/auto/kalina.jpg'
import PoloImage from 'shared/assets/images/auto/polo.jpg'
import JettaImage from 'shared/assets/images/auto/jetta.jpg'
import TiguanImage from 'shared/assets/images/auto/tiguan.jpg'
import KaroqImage from 'shared/assets/images/auto/karoq.jpg'
import ArkanaImage from 'shared/assets/images/auto/arkana.jpg'
import DusterImage from 'shared/assets/images/auto/duster.jpg'
import SanderoImage from 'shared/assets/images/auto/sandero.jpg'
import OctaviaImage from 'shared/assets/images/auto/octavia.jpg'
import RapidImage from 'shared/assets/images/auto/rapid.jpg'
import KodiaqImage from 'shared/assets/images/auto/kodiaq.jpg'

/** Объект изображений автомобилей.  */
export const AutoImages: Record<string, string> = {
    BASE: BaseImage,
    GRANTA: GrantaImage,
    VESTA: VestaImage,
    KALINA: KalinaImage,
    POLO: PoloImage,
    JETTA: JettaImage,
    TIGUAN: TiguanImage,
    KAROQ: KaroqImage,
    ARKANA: ArkanaImage,
    DUSTER: DusterImage,
    SANDERO: SanderoImage,
    OCTAVIA: OctaviaImage,
    RAPID: RapidImage,
    KODIAQ: KodiaqImage
}

/** Объект описаний автомобилей.  */
export const AutoSubtitles: Record<string, string> = {
    BASE: 'Автомобиль отсутствует в продаже',
    GRANTA: 'Современный, стремительный и стильный — автомобиль, каким он должен быть.',
    VESTA: 'Вместимость и оснащенность, элегантность и практичность — Vesta превосходна во всем.',
    KALINA: 'Топ-модель семейства: комфорт, повышенная проходимость и яркий Cross-дизайн.',
    POLO: 'Новые тенденции молодости и динамики в одном автомобиле.',
    JETTA: 'Как внутри, так и снаружи, органичное сочетание элегантности и спорта.',
    TIGUAN: 'Кроссовер с просторным интерьером и потрясающим комфортом.',
    KAROK: 'Сочетает великолепный дизайн и выдающийся уровень комфорта.',
    ARKANA: 'Автомобиль, созданный с чистого листа. ',
    DUSTER: 'Это легендарная надежность и уверенность за рулем.',
    SANDERO: 'Привычная надежность в новом исполнении.',
    OCTAVIA: 'Абсолютный бестселлер марки.',
    RAPID: 'В балансе качеств, важных для покупателей, наиболее требовательных клиентов.',
    KODIAQ: 'Успешный представитель SUV, класса, объединяющего кроссоверы и внедорожники.'
}
