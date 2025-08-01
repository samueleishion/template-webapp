import './styles.css';

const Layout = ({ children, ...props }) => {
  return (
    <div className="cs-layout" {...props}>
      {children}
    </div>
  );
}

const LayoutHeader = ({ children, ...props }) => {
  return (
    <header className="cs-layout-header" {...props}>
      {children}
    </header>
  );
}

const LayoutMain = ({ children, ...props }) => {
  return (
    <main className="cs-layout-main" {...props}>
      {children}
    </main>
  );
}

const LayoutFooter = ({ children, ...props }) => {
  return (
    <footer className="cs-layout-footer" {...props}>
      {children}
    </footer>
  );
}

const LayoutContent = ({ children, wide=false, ...props }) => {
  return (
    <div className={`cs-layout-content ${wide ? 'cs-layout-content-wide' : ''}`} {...props}>
      {children}
    </div>
  );
}

export default Layout;

export {
  LayoutHeader,
  LayoutMain,
  LayoutFooter,
  LayoutContent
}