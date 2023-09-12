import s from './Loader.module.css'
import loading from '../../img/Loading.png'

export const Loader = () => {
    return (
        <div className={s.loader}>
            <img src={loading}/>
        </div>
    )
}
