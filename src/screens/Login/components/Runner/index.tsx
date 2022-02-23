import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './index.css'

interface RunnerProps {
  loginUrl: string
  class: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  isLoggedIn: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logoutAction: () => any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  alternativeLoginAction?: () => any
  refresh: () => void
}

export default function Runner(props: RunnerProps) {
  const { t } = useTranslation()
  async function handleLogout() {
    await props.logoutAction()
    window.localStorage.clear()
    props.refresh()
  }
  return (
    <div className={`runnerWrapper ${props.class}`}>
      <div>{props.icon()}</div>
      {props.isLoggedIn && (
        <div className="userData">
          <span>{props.user?.displayName || props.user?.username}</span>
        </div>
      )}
      <div>
        {!props.isLoggedIn ? (
          <Link to={props.loginUrl}>
            <div className="runnerLogin">{t('button.login', 'Login')}</div>
          </Link>
        ) : (
          <div
            className="runnerLogin logged"
            onClick={() => {
              handleLogout()
            }}
          >
            {t('userselector.logout', 'Logout')}
          </div>
        )}
      </div>
      {props.alternativeLoginAction && !props.isLoggedIn && (
        <div
          onClick={props.alternativeLoginAction}
          className="runnerLogin alternative"
        >
          {t('login.externalLogin', 'External Login')}
        </div>
      )}
    </div>
  )
}