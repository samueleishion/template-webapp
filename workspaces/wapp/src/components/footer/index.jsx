import './styles.css'; 

const Footer = () => {
  return (
    <footer className="cs-footer">
      <p>&copy; {new Date().getFullYear()} Your Company</p>
    </footer>
  );
}

export default Footer;