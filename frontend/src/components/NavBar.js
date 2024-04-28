import styles from "../styles/navbar.module.css"
import {appColor} from "../values/colors";
function NavBar({title}){
    return<>
        <div className={styles.navBar} style={{ backgroundColor: appColor }}>
            <h2>{title}</h2>
        </div>
    </>
}
export default NavBar;