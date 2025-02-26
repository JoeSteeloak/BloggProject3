
import "./Footer.css"; // Importera CSS-filen för footern

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
