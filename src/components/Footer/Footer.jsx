import { NavLink } from 'react-router-dom';
import iconinstagram from '../../assets/images/social-instagram.png';
import iconfacebook from '../../assets/images/social-facebook.png';

const Footer = (props) => {
	return (
		<footer className="footer-grid">
			<NavLink className="footer__link" to="/">
				<h1 className="footer__text--white">
					<span className="footer__text--color">.</span>Mov
				</h1>
			</NavLink>
			<NavLink className="footer__link--imprint" to="/">
				<p>Imprint</p>
			</NavLink>
			<section className="footer__social">
				<NavLink className="social__link" to="/">
					<img className="social__icon" src={iconinstagram} alt="instagram-icon"></img>
				</NavLink>
				<NavLink className="social__link" to="/">
					<img className="social__icon" src={iconfacebook} alt="facebook-icon"></img>
				</NavLink>
			</section>
		</footer>
	);
};

export default Footer;
