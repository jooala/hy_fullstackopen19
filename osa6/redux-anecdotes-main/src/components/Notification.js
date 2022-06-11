import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

const Notification = ({notifications}) => {
  const [notification, setNotification] = useState({ message: '' })

  useEffect(() => {
    if (notifications.length > 0) {
      setNotification(notifications[notifications.length - 1]);
    } else {
      setNotification('')
    }
  }, [notifications]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>
      {notification &&
        <div style={style}>
          {notification.message}
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  }
}

const ConnectedNotifications = connect(mapStateToProps)(Notification)
export default ConnectedNotifications