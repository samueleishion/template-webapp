import Alert from './index';

const AlertManager = ({ entries=[], onClose=() => {}, ...props}) => {  
  return (
    <div className="cs-alert-manager">
      {entries.map((entry, index) => (
        <Alert 
          key={index}
          type={entry.type}
          onClick={() => {
            onClose(entry);
          }}
          {...props}
        >
          {entry.message}
        </Alert>
      ))}
    </div>
  );
}; 

export default AlertManager;