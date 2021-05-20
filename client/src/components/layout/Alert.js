import { Fragment } from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
  const alerts = useSelector(state => state.alert);

  const renderMessage = () => {
    const displayAlerts =
      alerts !== null &&
      alerts.length > 0 &&
      alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      ));

    return displayAlerts;
  };

  return <Fragment>{renderMessage()}</Fragment>;
};

export default Alert;
